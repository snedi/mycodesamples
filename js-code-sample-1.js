$( document ).ready(function() {
    var f_switch;
    $('#ru').hide();
    $('#all').hide();

    if ($("select[id='list1']").val().length === 0) {
        $("select[id='list1']").on('change', function () {
            var a = $(this).val();
            if (a == 181) {
                $('#ru').show();
                $('#all').hide();
                f_switch = '.ru';
            } else {
                $('#ru').hide();
                $('#all').show();
                f_switch = '.all';
            }
        });
    } else {
        var a = $("select[id='list1']").val();
        if (a == 181) {
            $('#ru').show();
            $('#all').hide();
            f_switch = '.ru';
        } else {
            $('#ru').hide();
            $('#all').show();
            f_switch = '.all';
        }
    }

    $('#test11').click(function(){
        $('input').attr("style", 'background-color:none;');
        $('select').attr("style", 'background-color:none;');
        if (f_switch == '.all') {
            var total = 4;
            if ($(f_switch + ' #identity-fname').val().length === 0) {
                total -= 1;
                $(f_switch + ' #identity-fname').attr("style", 'background-color:#FFCCCC;');
            }
            if ($(f_switch + ' #identity-lname').val().length === 0) {
                total -= 1;
                $(f_switch + ' #identity-lname').attr("style", 'background-color:#FFCCCC;');
            }
            if ($(f_switch + ' #identity-phone_number').val().length === 0) {
                total -= 1;
                $(f_switch + ' #identity-phone_number').attr("style", 'background-color:#FFCCCC;');
            }
            if ($(f_switch + ' #identity-pp_email').val().length === 0) {
                total -= 1;
                $(f_switch + ' #identity-pp_email').attr("style", 'background-color:#FFCCCC;');
            }
            if (total == 4){
                var Identity = {
                    'identity-fname' : $(f_switch + ' #identity-fname').val(),
                    'identity-lname' : $(f_switch + ' #identity-lname').val(),
                    'identity-phone_number' : $(f_switch + ' #identity-phone_number').val(),
                    'identity-pp_email' : $(f_switch + ' #identity-pp_email').val(),
                    'identity-country' : $('#list1').val(),
                    'flag' : 'all'
                };
                $.ajax({
                    type : 'POST',
                    url : 'identity',
                    data : Identity,
                    dataType : 'json',
                    encode   : true
                });
            }
        }
        if (f_switch == '.ru') {
            var total = 15;
            if ($(f_switch + ' #identity-fname').val().length === 0) {
                total -= 1;
                $(f_switch + ' #identity-fname').attr("style", 'background-color:#FFCCCC;');
            }
            if ($(f_switch + ' #identity-lname').val().length === 0) {
                total -= 1;
                $(f_switch + ' #identity-lname').attr("style", 'background-color:#FFCCCC;');
            }
            if ($(f_switch + ' #identity-mname').val().length === 0) {
                total -= 1;
                $(f_switch + ' #identity-mname').attr("style", 'background-color:#FFCCCC;');
            }
            if ($(f_switch + ' #identity-pp_email').val().length === 0) {
                total -= 1;
                $(f_switch + ' #identity-pp_email').attr("style", 'background-color:#FFCCCC;');
            }
            if ($(f_switch + ' #identity-dob').val().length === 0) {
                total -= 1;
                $(f_switch + ' #identity-dob').attr("style", 'background-color:#FFCCCC;');
            }
            if ($(f_switch + ' #identity-zip').val().length === 0) {
                total -= 1;
                $(f_switch + ' #identity-zip').attr("style", 'background-color:#FFCCCC;');
            }
            if ($(f_switch + ' #identity-region').val().length === 0) {
                total -= 1;
                $(f_switch + ' #identity-region').attr("style", 'background-color:#FFCCCC;');
            }
            if ($(f_switch + ' #identity-city').val().length === 0) {
                total -= 1;
                $(f_switch + ' #identity-city').attr("style", 'background-color:#FFCCCC;');
            }
            if ($(f_switch + ' #identity-street').val().length === 0) {
                total -= 1;
                $(f_switch + ' #identity-street').attr("style", 'background-color:#FFCCCC;');
            }
            if ($(f_switch + ' #identity-home').val().length === 0) {
                total -= 1;
                $(f_switch + ' #identity-home').attr("style", 'background-color:#FFCCCC;');
            }
            if ($(f_switch + ' #identity-id_type').val().length === 0) {
                total -= 1;
                $(f_switch + ' #identity-id_type').attr("style", 'background-color:#FFCCCC;');
            }
            if ($(f_switch + ' #identity-id_ser').val().length === 0) {
                total -= 1;
                $(f_switch + ' #identity-id_ser').attr("style", 'background-color:#FFCCCC;');
            }
            if ($(f_switch + ' #identity-id_number').val().length === 0) {
                total -= 1;
                $(f_switch + ' #identity-id_number').attr("style", 'background-color:#FFCCCC;');
            }
            if ($(f_switch + ' #identity-id_issue_auth_code').val().length === 0) {
                total -= 1;
                $(f_switch + ' #identity-id_issue_auth_code').attr("style", 'background-color:#FFCCCC;');
            }

            if (total == 15){
                var Identity = {
                    'identity-fname' : $(f_switch + ' #identity-fname').val(),
                    'identity-lname' : $(f_switch + ' #identity-lname').val(),
                    'identity-mname' : $(f_switch + ' #identity-mname').val(),
                    'identity-pp_email' : $(f_switch + ' #identity-pp_email').val(),
                    'identity-phone_number' : $(f_switch + ' #identity-phone_number').val(),
                    'identity-dob' : $(f_switch + ' #identity-dob').val(),
                    'identity-pob' : $(f_switch + ' #identity-pob').val(),
                    'identity-zip' : $(f_switch + ' #identity-zip').val(),
                    'identity-country' : $('#list1').val(),
                    'identity-region' : $(f_switch + ' #identity-region').val(),
                    'identity-district' : $(f_switch + ' #identity-district').val(),
                    'identity-city' : $(f_switch + ' #identity-city').val(),
                    'identity-np' : $(f_switch + ' #identity-np').val(),
                    'identity-street' : $(f_switch + ' #identity-street').val(),
                    'identity-home' : $(f_switch + ' #identity-home').val(),
                    'identity-korp' : $(f_switch + ' #identity-korp').val(),
                    'identity-app' : $(f_switch + ' #identity-app').val(),
                    'identity-id_type' : $(f_switch + ' #identity-id_type').val(),
                    'identity-id_ser' : $(f_switch + ' #identity-id_ser').val(),
                    'identity-id_number' : $(f_switch + ' #identity-id_number').val(),
                    'identity-id_issue_date' : $(f_switch + ' #identity-id_issue_date').val(),
                    'identity-id_issue_auth_name' : $(f_switch + ' #identity-id_issue_auth_name').val(),
                    'identity-id_issue_auth_code' : $(f_switch + ' #identity-id_issue_auth_code').val(),
                    'identity-inn' : $(f_switch + ' #identity-inn').val(),
                    'flag' : 'ru'
                };

                $.ajax({
                    type : 'POST',
                    url : 'identity',
                    data : Identity,
                    dataType : 'json',
                    encode   : true
                });
            }
        }
    });
});
