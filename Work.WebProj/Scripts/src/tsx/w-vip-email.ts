namespace Email {
    interface BasicData {
        name: string,//申請人姓名
        gender: boolean;//性別
        line_id: string;//line id
        birthday_y: number;//生日
        birthday_m: number;
        birthday_d: number;
        mobile: string;//手機
        tel: string;//市話
        address: string;//聯絡地址
        job_type: string;//工作概況
        job_name: string;//job_type=自營業 公司名稱或營業項目
        content: string;//內容
        skill: string;//個人專長
        licenses: string;//證照
        other_content: string;//其他事項
        response?: string;
    }
    interface LoginResult {
        result: boolean;
        message: string;
        url: string;
    }
    $(document).ready(function () {
        $("#m_job_type").change(function (e) {
            if ($(this).val() == "自營業") {
                $("#m_job_name").attr("required", "true");
            } else {
                $('#m_job_name').removeAttr('required');
            }
        });

        $("#VipEmail").submit(function (event) {
            event.preventDefault();

            let data: BasicData = {
                name: $("#m_name").val().replace(/<|>/g, ""),
                gender: $("[name='gender']:checked").val(),
                line_id: $("#m_line_id").val().replace(/<|>/g, ""),
                birthday_y: $("#m_birthday_y").val().replace(/<|>/g, ""),
                birthday_m: $("#m_birthday_m").val().replace(/<|>/g, ""),
                birthday_d: $("#m_birthday_d").val().replace(/<|>/g, ""),
                mobile: $("#m_mobile").val().replace(/<|>/g, ""),
                tel: $("#m_tel").val().replace(/<|>/g, ""),
                address: $("#m_address").val().replace(/<|>/g, ""),
                job_type: $("#m_job_type").val(),
                job_name: $("#m_job_name").val().replace(/<|>/g, ""),
                content: $("#m_content").val().replace(/<|>/g, ""),
                skill: $("#m_skill").val().replace(/<|>/g, ""),
                licenses: $("#m_licenses").val().replace(/<|>/g, ""),
                other_content: $("#m_other_content").val().replace(/<|>/g, ""),
                response: ''
            };

            console.log(data);

            if (data.tel == "" && data.mobile == "") {
                alert("手機 / 市話 請至少填寫一項！");
                return;
            }

            //$("body").mask("送信中請稍後...");
            $.ajax({
                type: "POST",
                url: gb_approot + 'VIP/sendMail',
                data: data,
                dataType: 'json'
            }).done(function (result: LoginResult, textStatus, jqXHRdata) {
                //$("body").unmask();
                alert(result.message);
            }).fail(function (jqXHR, textStatus, errorThrown) {
                //$("body").unmask();
                alert(errorThrown);
            });


        });
    })

}

