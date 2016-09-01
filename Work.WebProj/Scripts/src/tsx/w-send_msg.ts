namespace SendMsg {
    interface LoginResult {
        result: boolean;
        message: string;
        url: string;
    }
    $(document).ready(function () {
        $("#ask").submit(function (event) {
            event.preventDefault();
            let data: server.MsgBoard = {
                q_name: $("#m_q_name").val(),
                q_tel: $("#m_q_tel").val(),
                q_email: $("#m_q_email").val(),
                msg_type_id: $("#m_type option:selected").val(),
                q_content: $("#m_q_content").val()
            };

            $("body").mask("送出中請稍後...");
            $.ajax({
                type: "POST",
                url: gb_approot + 'Comments/sendMsg',
                data: data,
                dataType: 'json'
            }).done(function (result: LoginResult, textStatus, jqXHRdata) {
                $("body").unmask();
                alert(result.message);
            }).fail(function (jqXHR, textStatus, errorThrown) {
                alert(errorThrown);
            });
        });
    });



}

