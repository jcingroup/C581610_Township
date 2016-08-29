$(document).ready(function () {
    var id = location.hash.split('-')[1];
    if (id != undefined) {
        var val = $('.scroll-nav > a[href="#p-' + id + '"]').html();
        $("#e-title").html(val);
        $("#b-name").html(val);
    }
    $('.scroll-nav > a').click(function (e) {
        $("#e-title").html($(this).html());
        $("#b-name").html($(this).html());
    });
});