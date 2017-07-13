$(window).scroll(function() {
if ($(this).scrollTop() > 50){  
    $('header').addClass("sticky");
  }
  else{
    $('header').removeClass("sticky");
  }
});