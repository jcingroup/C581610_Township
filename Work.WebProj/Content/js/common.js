
var $gotoTop = $('.goTop');

$(window).scroll(function(){
    // 沒有卷軸時不出現 goTop 按鈕
    if ( $(this).scrollTop() != 0 ) {
        $gotoTop.addClass('fadeIn').removeClass('fadeOut');
    } else {
        $gotoTop.addClass('fadeOut').removeClass('fadeIn');
    }

    // 卷動到定位時該元素固定
    // var $sticky = $('.scroll-nav');
    // var stickyOffset = $sticky.offset().top + $sticky.length;
    // // if ($sticky.length) {
    // // }
    // if (stickyOffset < $(window).scrollTop()) {
    //     $sticky.addClass('fixed');
    // } else {
    //     $sticky.removeClass('fixed');
    // }
});

// 點選後跳到 href 指向的位置
$('.scroll').click(function () {
    var scrollToAnchor = $(this).attr('href');
    $('html, body').stop(true).animate({
        scrollTop: $(scrollToAnchor).offset().top - 40
    }, 750);
    return false;
});
$gotoTop.click(function() {
    $('body, html').stop(true).animate({scrollTop:0},800);
    return false;
});

// 下拉特效
// var $dropbtn = $("[data-dropdown='toggle']"),
//     dropcontent = "[data-dropdown='content']";
// $dropbtn.click(function(){
//     event.preventDefault();
//     $(this).next(dropcontent).slideToggle("300");
// });
// $dropbtn.blur(function(){
//     $(this).next(dropcontent).slideUp("300");
// });

// 同類物件時伸縮特效
var $collapse = $("[data-toggle='collapse']");
var fall = '.collapse-content';

$collapse.click(function () {
    $(this).next(fall).slideToggle();
    $(this).parent().siblings().children().next().slideUp(150);
    // $(this).siblings().next(fall).slideUp();
    $(this).toggleClass("current"),
            $collapse.not(this).removeClass("current");
    return false;
});

// 行動裝置的主選單
// $menuLeft = $('#menu');
// $trigger = $('.mobile-trigger');

// $trigger.click(function() {
//     $(this).toggleClass('active');
//     $('body').toggleClass('push');
// });
// $('.toggle').click(function() {
//     $('body').removeClass('push');
// });

// 搜尋框彈出
var $submit = $("[data-expand='btn']"),
    $submitIcon = $("[data-expand='toggle']"),
    $inputBox = $("[data-expand='input']"),
    $searchBox = $("[data-expand='box']"),
    isOpen = false;

$submitIcon.click(function(){
    $searchBox.toggleClass('search-open');
    if(isOpen == false){
        // $searchBox.addClass('search-open');
        $inputBox.focus();
        isOpen = true;
    } else {
        // $searchBox.removeClass('search-open');
        $inputBox.focusout().val('');
        $submit.removeClass('enter');
        isOpen = false;
    }
});
$submitIcon.mouseup(function(){
    return false;
});
$searchBox.mouseup(function(){
    return false;
});
$(document).mouseup(function(){
    if(isOpen == true){
        $submitIcon.css('display','block');
        $submitIcon.click();
    }
});

function buttonUp(){
    var inputVal = $inputBox.val();
    inputVal = $.trim(inputVal).length;
    if( inputVal !== 0){
        $submitIcon.css('display','none');
        $submit.addClass('enter');
    } else {
        $inputBox.val('');
        $submitIcon.css('display','block');
        $submit.removeClass('enter');
    }
}
