// Just put the app's JS in here and let the good times roll.

// Responsive text scaling

var theheadline = $('#responsive_headline');
if(theheadline!==null && theheadline.length!== 0)
{
	window.fitText( document.getElementById("responsive_headline") );
}

// Initialise foundation JS components
$(document).foundation();

// Function for our other bits and pieces
(function ($, window, document, undefined) {

	'use strict';

	var teamGrid = $('.team__grid');

	if(teamGrid!==null) {
		$(teamGrid).imagesLoaded( function() {
			function enlargeLink() {
				var shipmatecontainer = $(".team__shipmate__overlay");
				var tdH = $(shipmatecontainer).height();
			    var tdW = $(shipmatecontainer).width();
				$(".team__shipmate__overlay__inner").each(function() {
					$(this).height("100%");
					$(this).css({height: tdH});
					$(this).css({width: tdW});
				});
			}
			enlargeLink(); // Runs once on startup
			$(window).resize(function() {enlargeLink();}); // Runs on every browser resize
		});
	}

})(jQuery, window, document);

// Not using this one for now
// $('#bigtext').bigtext();