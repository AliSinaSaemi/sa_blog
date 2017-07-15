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
    $('#cssmenu li.has-sub>a').on('click', function () {
      $(this).removeAttr('href');
      var element = $(this).parent('li');
      if (element.hasClass('open')) {
        element.removeClass('open');
        element.find('li').removeClass('open');
        element.find('ul').slideUp();
      } else {
        element.addClass('open');
        element.children('ul').slideDown();
        element.siblings('li').children('ul').slideUp();
        element.siblings('li').removeClass('open');
        element.siblings('li').find('li').removeClass('open');
        element.siblings('li').find('ul').slideUp();
      }
    });
  });
})(jQuery);

$('.menu-bars').click(function () {
  $("#cssmenu").addClass('width_nav');
  $("#cssmenu").removeClass('no_width_nav');
});



$('.closebtn').click(function () {
  $("#cssmenu").addClass('no_width_nav');
  $("#cssmenu").removeClass('width_nav');
});