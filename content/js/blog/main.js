/* 

This for make navigation sticky 

*/
$(".navbar").sticky({topSpacing:0});



/* 

These are for sidenav dropdown animation

*/
( function( $ ) {
$( document ).ready(function() {
$('#cssmenu li.has-sub>a').on('click', function(){
		$(this).removeAttr('href');
		var element = $(this).parent('li');
		if (element.hasClass('open')) {
			element.removeClass('open');
			element.find('li').removeClass('open');
			element.find('ul').slideUp();
		}
		else {
			element.addClass('open');
			element.children('ul').slideDown();
			element.siblings('li').children('ul').slideUp();
			element.siblings('li').removeClass('open');
			element.siblings('li').find('li').removeClass('open');
			element.siblings('li').find('ul').slideUp();
		}
	});
});
} )( jQuery );

/*function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    document.body.style.backgroundColor = "white";
}*/

/*<div class="sidenav-overlay" style="opacity: 1;" class=""></div>*/


// create overlay and put it in one var
var $overlay = $('<div id="overlay"></div>');
// undisplay side nav before user click on it
/*$('#cssmenu').hide();*/
// when open button click by user
  // side nav will show
  // hider class disabled
  // overlay will show
// when close button click by user 
  // side nav will show
  // hider class will avalaible
  // overlay will diapear
  


