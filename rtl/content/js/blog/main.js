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
(function(){
	var d = document,
	accordionToggles = d.querySelectorAll('.js-accordionTrigger'),
	setAria,
	setAccordionAria,
	switchAccordion,
  touchSupported = ('ontouchstart' in window),
  pointerSupported = ('pointerdown' in window);
  
  skipClickDelay = function(e){
    e.preventDefault();
    e.target.click();
  }

		setAriaAttr = function(el, ariaType, newProperty){
		el.setAttribute(ariaType, newProperty);
	};
	setAccordionAria = function(el1, el2, expanded){
		switch(expanded) {
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
switchAccordion = function(e) {
  console.log("triggered");
	e.preventDefault();
	var thisAnswer = e.target.parentNode.nextElementSibling;
	var thisQuestion = e.target;
	if(thisAnswer.classList.contains('is-collapsed')) {
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
	for (var i=0,len=accordionToggles.length; i<len; i++) {
		if(touchSupported) {
      accordionToggles[i].addEventListener('touchstart', skipClickDelay, false);
    }
    if(pointerSupported){
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
  l
});

/*=======================

        sub
 
=======================*/
jQuery(document).ready(function ($) {

  var MqM = 768,
    MqL = 1024;

  var faqsSections = $('.faq-group'),
    faqTrigger = $('.trigger'),
    faqsContainer = $('.faq-items'),
    faqsCategoriesContainer = $('.categories'),
    faqsCategories = faqsCategoriesContainer.find('a'),
    closeFaqsContainer = $('.cd-close-panel');

  //select a faq section 
  faqsCategories.on('click', function (event) {
    event.preventDefault();
    var selectedHref = $(this).attr('href'),
      target = $(selectedHref);
    if ($(window).width() < MqM) {
      faqsContainer.scrollTop(0).addClass('slide-in').children('ul').removeClass('selected').end().children(selectedHref).addClass('selected');
      closeFaqsContainer.addClass('move-left');
      $('body').addClass('cd-overlay');
    } else {
      $('body,html').animate({
        'scrollTop': target.offset().top - 19
      }, 200);
    }
  });

  //close faq lateral panel - mobile only
  $('body').bind('click touchstart', function (event) {
    if ($(event.target).is('body.cd-overlay') || $(event.target).is('.cd-close-panel')) {
      closePanel(event);
    }
  });
  faqsContainer.on('swiperight', function (event) {
    closePanel(event);
  });


  faqTrigger.on('click', function (event) {
    event.preventDefault();
    $(this).next('.faq-content').slideToggle(200).end().parent('li').toggleClass('content-visible');
  });

  $(window).on('scroll', function () {
    if ($(window).width() > MqL) {
      (!window.requestAnimationFrame) ? updateCategory(): window.requestAnimationFrame(updateCategory);
    }
  });

  $(window).on('resize', function () {
    if ($(window).width() <= MqL) {
      faqsCategoriesContainer.removeClass('is-fixed').css({
        '-moz-transform': 'translateY(0)',
        '-webkit-transform': 'translateY(0)',
        '-ms-transform': 'translateY(0)',
        '-o-transform': 'translateY(0)',
        'transform': 'translateY(0)',
      });
    }
    if (faqsCategoriesContainer.hasClass('is-fixed')) {
      faqsCategoriesContainer.css({
        'left': faqsContainer.offset().left,
      });
    }
  });

  function closePanel(e) {
    e.preventDefault();
    faqsContainer.removeClass('slide-in').find('li').show();
    closeFaqsContainer.removeClass('move-left');
    $('body').removeClass('cd-overlay');
  }

  function updateCategory() {
    updateCategoryPosition();
    updateSelectedCategory();
  }

  function updateCategoryPosition() {
    var top = $('.faq').offset().top,
      height = jQuery('.faq').height() - jQuery('.categories').height(),
      margin = 70;
    if (top - margin <= $(window).scrollTop() && top - margin + height > $(window).scrollTop()) {
      var leftValue = faqsCategoriesContainer.offset().left,
        widthValue = faqsCategoriesContainer.width();
      faqsCategoriesContainer.addClass('is-fixed').css({
        'left': leftValue,
        'top': margin,
        '-moz-transform': 'translateZ(0)',
        '-webkit-transform': 'translateZ(0)',
        '-ms-transform': 'translateZ(0)',
        '-o-transform': 'translateZ(0)',
        'transform': 'translateZ(0)',
      });
    } else if (top - margin + height <= $(window).scrollTop()) {
      var delta = top - margin + height - $(window).scrollTop();
      faqsCategoriesContainer.css({
        '-moz-transform': 'translateZ(0) translateY(' + delta + 'px)',
        '-webkit-transform': 'translateZ(0) translateY(' + delta + 'px)',
        '-ms-transform': 'translateZ(0) translateY(' + delta + 'px)',
        '-o-transform': 'translateZ(0) translateY(' + delta + 'px)',
        'transform': 'translateZ(0) translateY(' + delta + 'px)',
      });
    } else {
      faqsCategoriesContainer.removeClass('is-fixed').css({
        'left': 0,
        'top': 0,
      });
    }
  }

  function updateSelectedCategory() {
    faqsSections.each(function () {
      var actual = $(this),
        margin = parseInt($('.faq-title').eq(1).css('marginTop').replace('px', '')),
        activeCategory = $('.categories a[href="#' + actual.attr('id') + '"]'),
        topSection = (activeCategory.parent('li').is(':first-child')) ? 0 : Math.round(actual.offset().top);

      if ((topSection - 20 <= $(window).scrollTop()) && (Math.round(actual.offset().top) + actual.height() + margin - 20 > $(window).scrollTop())) {
        activeCategory.addClass('selected');
      } else {
        activeCategory.removeClass('selected');
      }
    });
  }
});


/*=======================

    show comment box
 
=======================*/

/*$(document).ready(function () {
  $(".comment").click(function (e) {
    e.preventDefault();
    $(".comment-inbox").toggleClass("commentBoxShow");
    $(".submit-comment").toggleClass("commentButtonShow");
    $(".comment").toggleClass("commentOptionOn");
  });
});*/

/*=======================

        scroll.js
 
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