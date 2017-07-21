/* 

This for make navigation sticky 

*/
$(".navbar").sticky({topSpacing:0});



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

// Show cssmenu
var $overlay = $('<div class="overlay"></div>');
$("body").append($overlay);
$('button').click(function() {
  $('.cssmenu').addClass('cssmenuShow');
  $overlay.fadeIn(300);
});
$overlay.click(function(){
  $('.cssmenu').removeClass('cssmenuShow');
  $overlay.fadeOut(300);
});



