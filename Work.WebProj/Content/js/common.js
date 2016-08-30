
var $gotoTop = $('.goTop');

$(window).scroll(function(){
    // 沒有卷軸時不出現 goTop 按鈕
    if ( $(this).scrollTop() != 0 ) {
        $gotoTop.addClass('fadeIn').removeClass('fadeOut');
    } else {
        $gotoTop.addClass('fadeOut').removeClass('fadeIn');
    }
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

// 錨點選單特效 by jquery.scroller.js
$('.scroll-nav').scroller({
    bodyName: '#main'
});