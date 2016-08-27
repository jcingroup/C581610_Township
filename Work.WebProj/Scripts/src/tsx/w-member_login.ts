namespace MemberLogin {
    interface LoginData {
        account?: string;
        password?: string;
        validate?: string;
        lang?: string
    }
    interface LoginResult {
        result: boolean;
        message: string;
        url: string;
    }
    $(document).ready(function () {
        $("#m_act").val(debug_account);
        $("#m_pwd").val(debug_password);
        
        $("#MLogin").submit(function (event) {
            event.preventDefault();
            let data: LoginData = {
                "account": $("#m_act").val(),
                "password": $("#m_pwd").val(),
                "validate": $("#g-recaptcha-response").val(),
                "lang": "zh-TW"
            };

            $("body").mask("檢查中請稍後...");
            $.ajax({
                type: "POST",
                url: gb_approot + 'Base/Login/ajax_Login',
                data: data,
                dataType: 'json'
            }).done(function (result: LoginResult, textStatus, jqXHRdata) {
                $("body").unmask();
                if (result.result) {
                    document.location.href = result.url;
                }
                else {
                    $("#m_pwd").val("");
                    grecaptcha.reset(widgetId);
                    alert(result.message);
                }
            }).fail(function (jqXHR, textStatus, errorThrown) {
                alert(errorThrown);
            });
        });
    });



}

