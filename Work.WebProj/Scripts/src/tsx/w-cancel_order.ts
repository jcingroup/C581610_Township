namespace CanceleOrder {
    interface LoginResult {
        result: boolean;
        message: string;
        url: string;
    }
    $(document).ready(function () {
        $("#r_cancel").click(function (event) {
            event.preventDefault();
            let data = {
                id: $(this).data("id")
            };
            console.log(data);

            $("body").mask("送出中請稍後...");
            $.ajax({
                type: "POST",
                url: gb_approot + 'Service/cancelOrder',
                data: data,
                dataType: 'json'
            }).done(function (result: LoginResult, textStatus, jqXHRdata) {
                $("body").unmask();
                if (result.result) {
                    alert(result.message);
                    location.reload();
                } else {
                    alert(result.message);
                }
            }).fail(function (jqXHR, textStatus, errorThrown) {
                alert(errorThrown);
            });
        });
    });



}

