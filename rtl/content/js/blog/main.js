/* 

This for make navigation sticky 

*/
$(".navbar").sticky({
  topSpacing: 0
});



/* 

These are for sidenav dropdown animation

*/
(function ($) {
  $(document).ready(function () {
    $('.cssmenu > ul > li > a').click(function () {
      $('.cssmenu li').removeClass('active');
      $(this).closest('li').addClass('active');
      var checkElement = $(this).next();
      if ((checkElement.is('ul')) && (checkElement.is(':visible'))) {
        $(this).closest('li').removeClass('active');
        checkElement.slideUp('normal');
      }
      if ((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
        $('.cssmenu ul ul:visible').slideUp('normal');
        checkElement.slideDown('normal');
      }
      if ($(this).closest('li').find('ul').children().length == 0) {
        return true;
      } else {
        return false;
      }
    });
  });
})(jQuery);

// Show cssmenu in big devises
$('.menu-bars').click(function (e) {
  e.preventDefault();
  $('.cssmenu').addClass('cssmenuShow');
  $('main').addClass('mainPartner');
});
$('main').click(function () {
  $('.cssmenu').removeClass('cssmenuShow');
  $('main').removeClass('mainPartner');
});

$('.sa-close-btn').click(function () {
  $('.cssmenu').removeClass('cssmenuShow');
  $('main').removeClass('mainPartner');
});

$('footer').click(function () {
  $('.cssmenu').removeClass('cssmenuShow');
  $('main').removeClass('mainPartner');
});

// Show cssmenu in small devises
$('.sa-header-button').click(function (e) {
  e.preventDefault();
  $('.cssmenu').addClass('cssmenuShow');
});

$('main').click(function () {
  $('.cssmenu').removeClass('cssmenuShow');
});

$('.sa-close-btn').click(function () {
  $('.cssmenu').removeClass('cssmenuShow');
});

$('footer').click(function () {
  $('.cssmenu').removeClass('cssmenuShow');
});