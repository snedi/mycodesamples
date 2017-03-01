<?php
namespace app\commands;

use yii\console\Controller;
use app\models\Streamer;
use Google_Client;
use Google_Service_YouTube;
use Google_Auth_AssertionCredentials;
use Google_Auth_AppIdentity;
use Yii;
use GuzzleHttp;

/**
 * Интеграция с сервисами онлайн-стримов
 * Class StreamerController
 * @package app\commands
 */
class StreamerController extends Controller
{
    /**
     * Данные для подключения к API YouTube
     */
    const OAUTH2_CLIENT_ID = '<random string>';
    const OAUTH2_CLIENT_SECRET = '<random string>';
    const CODE = '<random string>';
    const REFRESH_TOKEN = '<random string>';

    private $scopes = ['https://www.googleapis.com/auth/youtube'];

    /**
     * Получает данные посредством Twitch-API
     */
    public function actionUpdateTwitchData()
    {
        $parsedData = [];
        /**
         * Забираем данные из API и формируем из них набор для последующего обновления модели
         */
        foreach (Streamer::getActiveStreamers(Streamer::TYPE_TWITCH) as $streamer){
            $twitchData = json_decode($this->get_url_contents("https://api.twitch.tv/kraken/streams/".$streamer->username));
            if (isset($twitchData->stream)) {
                $parsedData[$streamer->id]['game'] = $twitchData->stream->game;
                $parsedData[$streamer->id]['viewers'] = $twitchData->stream->viewers;
                $parsedData[$streamer->id]['image'] = $twitchData->stream->preview->large;
                $parsedData[$streamer->id]['is_online'] = 1;
            } else {
                $twitchData = json_decode($this->get_url_contents("https://api.twitch.tv/kraken/channels/".$streamer->username));
                $parsedData[$streamer->id]['game'] = $twitchData->game;
                $parsedData[$streamer->id]['image_offline'] = $twitchData->video_banner;
                $parsedData[$streamer->id]['is_online'] = 0;
            }
        }

        /**
         * Здесь в цикле реализуем обновление данных для тех, кто в онлайне, а также для тех, кто в оффлайне
         * и обновляем соответствющие данные в таблице
         */
        foreach ($parsedData as $id => $item){
            $model = Streamer::findOne(['id' => $id]);

            if ($item['is_online'] === 1) {
                $model->game = $item['game'];
                $model->viewers = $item['viewers'];
                $model->image = $item['image'];
                $model->image_offline = null;
                $model->is_online = 1;
                $model->save();
            } else {
                $model->game = $item['game'];
                $model->image_offline = $item['image_offline'];
                $model->image = null;
                $model->is_online = 0;
                $model->save();
            }
        }
    }

    public function actionUpdateYoutubeData()
    {
        /**
         * Авторизация в API YouTube
         */
        $callbackUrl = 'http://dev.local';

        $client = new Google_Client();

        $client->setClientId(self::OAUTH2_CLIENT_ID);
        $client->setClientSecret(self::OAUTH2_CLIENT_SECRET);
        $client->setScopes('https://www.googleapis.com/auth/youtube');
        $redirect = filter_var($callbackUrl, FILTER_SANITIZE_URL);
        $client->setRedirectUri($redirect);
        $client->setAccessType("offline");
        $client->refreshToken(self::REFRESH_TOKEN);
        $youtube = new Google_Service_YouTube($client);

        $parsedData = [];

        /**
         * Забираем данные из API и формируем из них набор для последующего обновления модели
         */
        foreach (Streamer::getActiveStreamers(Streamer::TYPE_YOUTUBE) as $streamer) {
            /**
             * Сначала получаем ID канала по username
             */
            $channelResponse = $youtube->channels->listChannels('snippet', [
                'forUsername' => $streamer->username,
            ]);

            /**
             * Делаем запрос уже по ID канала для выборки стримов
             */
            $searchResponse = $youtube->search->listSearch('snippet', [
                'eventType' => 'live',
                'type' => 'video',
                'channelId' => $channelResponse->getItems()[0]['id']
            ]);

            /**
             * Запрос для получения данных о стриме (получаем количество зрителей)
             */
            $videosResponse = $youtube->videos->listVideos('liveStreamingDetails', [
                'id' => $searchResponse->getItems()[0]['id']['videoId']
            ]);

            if (isset($searchResponse->getItems()[0])) {
                $parsedData[$streamer->id]['viewers'] = $videosResponse->getItems()[0]['liveStreamingDetails']['concurrentViewers'];
                $parsedData[$streamer->id]['image'] = $searchResponse->getItems()[0]['snippet']['modelData']['thumbnails']['high']['url'];
                $parsedData[$streamer->id]['is_online'] = 1;
            } else {
                $parsedData[$streamer->id]['is_online'] = 0;
            }

            /**
             * Здесь в цикле реализуем обновление данных для тех, кто в онлайне, а также для тех, кто в оффлайне
             * и обновляем соответствющие данные в таблице
             */
            foreach ($parsedData as $id => $item){
                $model = Streamer::findOne(['id' => $id]);

                if ($item['is_online'] === 1) {
                    $model->viewers = $item['viewers'];
                    $model->image = $item['image'];
                    $model->image_offline = null;
                    $model->is_online = 1;
                    $model->save();
                } else {
                    $model->image = null;
                    $model->is_online = 0;
                    $model->save();
                }
            }
        }
    }

    /**
     * @param $url
     * @return mixed
     */
    private function get_url_contents($url){
        $crl = curl_init();
        $timeout = 30;
        curl_setopt ($crl, CURLOPT_URL,$url);
        curl_setopt ($crl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt ($crl, CURLOPT_CONNECTTIMEOUT, $timeout);
        $ret = curl_exec($crl);
        curl_close($crl);
        return $ret;
    }
}
