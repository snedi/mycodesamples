from datetime import timedelta
from math import ceil

def solution(S):
    log = []
    for item in S.split('\n'):
        data = item.split(',')
        log.append([convert_sec(data[0]),data[1]])

    price = 0
    for record in log:
        t = tariff(record[0])
        price += t[0] * t[1]

    return int(price)

def convert_sec(time):
    time_split = time.split(':')
    d = timedelta(hours=int(time_split[0]), minutes=int(time_split[1]), seconds=int(time_split[2]))

    return d.total_seconds()

def tariff(duration):
    if (duration < 300):
        price = 3
        a = duration
    if (duration >= 300):
        price = 150
        a = ceil(duration/60)

    return [price,a]
