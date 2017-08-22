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


if ($(window).width() >= 1000) {
  $(function () {
    setTimeout(function () {
      $('.fly-in-text').removeClass('sa-hidden');
    }, 200);
    setTimeout(function () {
      $('.hr-light').removeClass('opacity-hidden-lg-up');
    }, 800);
  });
}

if ($(window).width() >= 992) {
  window.sr = ScrollReveal();
  // all * pages
  var subtextHeader = {
    delay: 1200,
    duration: 1500,
    origin: 'bottom',
    distance: '40px',
  }
  sr.reveal('.subtext-header', subtextHeader);
  var aboutBannerButton = {
    delay: 1600,
    duration: 1500,
  }
  sr.reveal('.sa-about-banner-button', aboutBannerButton);

}