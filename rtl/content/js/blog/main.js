/*=======================

        Global
 
=======================*/
$(window).click(function (e) {
  e.preventDefault();
});

/*=======================

        sticky nav
 
=======================*/
$(document).ready(function () {
  $(".navbar").sticky({
    topSpacing: 0
  });
});

/*=======================

     Searchbox show
 
=======================*/

$(document).ready(function () {
  $(".nav-searchbox").click(function () {
    $("#searchBoxNav").toggleClass("search-show");
  });
});
/*=======================

        hide/ show
        nav
 
=======================*/
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
/*=======================

        collapse
 
=======================*/
(function () {
  var d = document,
    accordionToggles = d.querySelectorAll('.js-accordionTrigger'),
    setAria,
    setAccordionAria,
    switchAccordion,
    touchSupported = ('ontouchstart' in window),
    pointerSupported = ('pointerdown' in window);

  skipClickDelay = function (e) {
    e.preventDefault();
    e.target.click();
  }

  setAriaAttr = function (el, ariaType, newProperty) {
    el.setAttribute(ariaType, newProperty);
  };
  setAccordionAria = function (el1, el2, expanded) {
    switch (expanded) {
    case "true":
      setAriaAttr(el1, 'aria-expanded', 'true');
      setAriaAttr(el2, 'aria-hidden', 'false');
      break;
    case "false":
      setAriaAttr(el1, 'aria-expanded', 'false');
      setAriaAttr(el2, 'aria-hidden', 'true');
      break;
    default:
      break;
    }
  };
  //function
  switchAccordion = function (e) {
    console.log("triggered");
    e.preventDefault();
    var thisAnswer = e.target.parentNode.nextElementSibling;
    var thisQuestion = e.target;
    if (thisAnswer.classList.contains('is-collapsed')) {
      setAccordionAria(thisQuestion, thisAnswer, 'true');
    } else {
      setAccordionAria(thisQuestion, thisAnswer, 'false');
    }
    thisQuestion.classList.toggle('is-collapsed');
    thisQuestion.classList.toggle('is-expanded');
    thisAnswer.classList.toggle('is-collapsed');
    thisAnswer.classList.toggle('is-expanded');

    thisAnswer.classList.toggle('animateIn');
  };
  for (var i = 0, len = accordionToggles.length; i < len; i++) {
    if (touchSupported) {
      accordionToggles[i].addEventListener('touchstart', skipClickDelay, false);
    }
    if (pointerSupported) {
      accordionToggles[i].addEventListener('pointerdown', skipClickDelay, false);
    }
    accordionToggles[i].addEventListener('click', switchAccordion, false);
  }
})();
/*=======================

        banner text
 
=======================*/
$(document).ready(function () {
  var TxtRotate = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };

  TxtRotate.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 300 - Math.random() * 100;

    if (this.isDeleting) {
      delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(function () {
      that.tick();
    }, delta);
  };

  window.onload = function () {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i = 0; i < elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-rotate');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
      }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    document.body.appendChild(css);
  };
});

/*=======================

        slider sample
 
=======================*/
$('#carouselExample').on('slide.bs.carousel', function (e) {

  var $e = $(e.relatedTarget);
  var idx = $e.index();
  var itemsPerSlide = 3;
  var totalItems = $('.carousel-item').length;

  if (idx >= totalItems - (itemsPerSlide - 1)) {
    var it = itemsPerSlide - (totalItems - idx);
    for (var i = 0; i < it; i++) {
      if (e.direction == "left") {
        $('.carousel-item').eq(i).appendTo('.carousel-inner');
      } else {
        $('.carousel-item').eq(0).appendTo('.carousel-inner');
      }
    }
  }
});


/*=======================

      back to top
 
=======================*/
// ===== Scroll to Top ==== 
$(window).scroll(function () {
  if ($(this).scrollTop() >= 50) { // If page is scrolled more than 50px
    $('#return-to-top').fadeIn(200); // Fade in the arrow
  } else {
    $('#return-to-top').fadeOut(200); // Else fade out the arrow
  }
});
$('#return-to-top').click(function () { // When arrow is clicked
  $('body,html').animate({
    scrollTop: 0 // Scroll to top of body
  }, 500);
});



/*=======================

      comapies slider
 
=======================*/
$(document).ready(function () {
  $('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    items: 4,
    margin: 30,
    nav: true,
    smartSpeed: 900,
    navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      600: {
        items: 3,
        nav: false
      },
      1000: {
        items: 4,
        nav: true,
        loop: false,
        margin: 20
      }
    }
  });

});
$(document).ready(function () {
  $('.owl-one').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      1000: {
        items: 3
      }
    }
  });

  $('.owl-two').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      1000: {
        items: 3
      }
    }
  });
});

/*=======================

        sidenav.js
 
=======================*/
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
};


/*=======================

        reveal.js
 
=======================*/
if ($(window).width() >= 992) {
  window.sr = ScrollReveal();
  // banner - landing page
  var banner_animation = {
    delay: 300,
    duration: 1000,
  }
  sr.reveal('.banner_animation', banner_animation);
  var banner_hr = {
    delay: 500,
    duration: 1000,
  }
  sr.reveal('.banner_hr', banner_hr);
  var banner_simple_btn = {
    delay: 800,
    duration: 1000,
  }
  sr.reveal('.banner_simple_btn', banner_simple_btn);
  var banner_vip_btn = {
    delay: 1000,
    duration: 1000,
  }
  sr.reveal('.banner_vip_btn', banner_vip_btn);
  var banner_p = {
    delay: 1300,
    duration: 1000,
  }
  sr.reveal('.banner_p', banner_p);

  // all section titles - landing page
  var title_top = {
    delay: 100,
    duration: 800,
  }
  sr.reveal('.title_top', title_top);
  var title_bottom = {
    delay: 300,
    duration: 800,
  }
  sr.reveal('.title_bottom', title_bottom);
  var title_hr = {
    delay: 500,
    duration: 800,
  }
  sr.reveal('.title_hr', title_hr);

  // hover-img-1 - landing page
  var hover_img_1 = {
    delay: 500,
    duration: 800,
  }
  sr.reveal('.hover_img_1', hover_img_1);
  var hover_img_1_button = {
      delay: 500,
      duration: 700,
    }
    // ice section - landing page
  sr.reveal('.hover_img_1_button', hover_img_1_button);
  var ice_planet = {
    delay: 400,
    duration: 800,
    distance: '40px',
    origin: 'bottom',
  }
  sr.reveal('.ice_planet', ice_planet);
  var ice_planet_title = {
    delay: 400,
    duration: 800,
    distance: '5px',
    origin: 'right',
  }
  sr.reveal('.ice_planet_title', ice_planet_title);
  var ice_planet_text = {
    delay: 500,
    duration: 800,
    distance: '5px',
    origin: 'right',
  }
  sr.reveal('.ice_planet_text', ice_planet_text);
  var ice_planet_list = {
    delay: 600,
    duration: 800,
    distance: '5px',
    origin: 'right',
  }
  sr.reveal('.ice_planet_list', ice_planet_list);
  var ice_planet_button = {
    delay: 600,
    duration: 800,
    distance: '40px',
    origin: 'bottom',
  }
  sr.reveal('.ice_planet_button', ice_planet_button);

  // testimial - landing page
  var member_slider = {
    delay: 500,
    duration: 800,
    distance: '40px',
    origin: 'bottom',
  }
  sr.reveal('.member_slider', member_slider);
  var member_slider_arrows = {
    delay: 700,
    duration: 800,
    distance: '40px',
    origin: 'top',
  }
  sr.reveal('.member_slider_arrows', member_slider_arrows);
  // features - landing page
  var features_icons = {
    delay: 700,
    duration: 800,
    distance: '30px',
    origin: 'bottom',
  }
  sr.reveal('.features_icons', features_icons);
  // samples - landing page
  var carousel_slider = {
    delay: 700,
    duration: 800,
    distance: '40px',
    origin: 'top',
  }
  sr.reveal('.carousel_slider', carousel_slider);
  var carousel_slider_arrows = {
    delay: 800,
    duration: 800,
    distance: '40px',
    origin: 'top',
  }
  sr.reveal('.carousel_slider_arrows', carousel_slider_arrows);
  // news - landing page
  var posts = {
    delay: 700,
    duration: 800,
    distance: '40px',
    origin: 'top',
  }
  sr.reveal('.posts', posts);
  // footer - landing page
  var footer_1 = {
    delay: 700,
    duration: 800,
    distance: '5px',
    origin: 'right',
  }
  sr.reveal('.footer_1', footer_1);
  var footer_2 = {
    delay: 700,
    duration: 800,
    distance: '40px',
    origin: 'bottom',
  }
  sr.reveal('.footer_2', footer_2);
  var footer_3 = {
    delay: 700,
    duration: 800,
    distance: '5px',
    origin: 'left',
  }
  sr.reveal('.footer_3', footer_3);
  // benefits - landing page
  var phone_nalf = {
    delay: 900,
    duration: 1000,
    distance: '80px',
    origin: 'bottom',
  }
  sr.reveal('.phone_nalf', phone_nalf);
}