/*=======================

        Global
 
=======================*/
$(window).click(function (e) {
  e.preventDefault();
});


/* This for make navigation sticky */
$(".navbar").sticky({
  topSpacing: 0
});



/* These are for sidenav dropdown animation */
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
  var sa_about_us_popup_img = {
    delay: 600,
    duration: 500,
  }
  sr.reveal('.sa-about-us-popup-img', sa_about_us_popup_img);
  var sa_about_us_popup_text = {
    delay: 700,
    duration: 500,
  }
  sr.reveal('.sa-about-us-popup-text', sa_about_us_popup_text);
  var sa_about_us_popup = {
    delay: 200,
    duration: 500,
  }
  sr.reveal('.sa-about-us-popup', sa_about_us_popup);
  var sa_about_us_popup = {
    delay: 200,
    duration: 500,
  }
  sr.reveal('.sa-about-us-popup', sa_about_us_popup);
  var sa_pt_50 = {
    delay: 400,
    duration: 500,
  }
  sr.reveal('.sa-pt-50', sa_pt_50);
  var logos_panel = {
    delay: 400,
    duration: 500,
  }
  sr.reveal('.logos-panel', logos_panel);

  var section_description = {
    delay: 300,
    duration: 500,
  }
  sr.reveal('.section-description', section_description);
  var grey_text_2 = {
    delay: 300,
    duration: 500,
    origin: 'bottom',
    distance: '20px',
  }
  sr.reveal('.grey-text-2', grey_text_2);
  var center_on_small_only = {
    delay: 300,
    duration: 500,
    origin: 'bottom',
    distance: '20px',
  }
  sr.reveal('.center_on_small_only', center_on_small_only);
  var detail_mobile_right = {
    delay: 700,
    duration: 700,
    origin: 'right',
    distance: '40px',
  }
  sr.reveal('.detail_mobile_right', detail_mobile_right);

  var detail_mobile_left = {
    delay: 700,
    duration: 700,
    origin: 'left',
    distance: '40px',
  }
  sr.reveal('.detail_mobile_left', detail_mobile_left);
  var abilities_show = {
    delay: 400,
    duration: 700,
  }
  sr.reveal('.abilities_show', abilities_show);
  var pro_memeber_base = {
    delay: 400,
    duration: 700,
  }
  sr.reveal('.pro-memeber-base', pro_memeber_base);
  var contact_us = {
    delay: 400,
    duration: 700,
  }
  sr.reveal('.contact-us', contact_us);
  var form_popup = {
    delay: 500,
    duration: 700,
  }
  sr.reveal('.form_popup', form_popup);
  var footer_detail_middle = {
    delay: 600,
    duration: 700,
        origin: 'bottom',
    distance: '20px',
  }
  sr.reveal('.sa-footer-detail-middle', footer_detail_middle);
  sa_footer_detail_right
  var sa_footer_detail_right = {
    delay: 800,
    duration: 700,
    origin: 'right',
    distance: '30px',
  }
  sr.reveal('.sa_footer_detail_right', sa_footer_detail_right);
    var sa_footer_detail_left = {
    delay: 800,
    duration: 700,
    origin: 'left',
    distance: '30px',
  }
  sr.reveal('.sa_footer_detail_left', sa_footer_detail_left);
  
  var footer_copyright = {
    delay: 800,
    duration: 700,
    origin: 'bottom',
    distance: '30px',
  }
  sr.reveal('.footer-copyright', footer_copyright);
}