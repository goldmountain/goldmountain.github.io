/*!
* classie - class helper functions
* from bonzo https://github.com/ded/bonzo
*
* classie.has( elem, 'my-class' ) -> true/false
* classie.add( elem, 'my-new-class' )
* classie.remove( elem, 'my-unwanted-class' )
* classie.toggle( elem, 'my-class' )
*/

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

( function( window ) {

	'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
	return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
	hasClass = function( elem, c ) {
		return elem.classList.contains( c );
	};
	addClass = function( elem, c ) {
		elem.classList.add( c );
	};
	removeClass = function( elem, c ) {
		elem.classList.remove( c );
	};
}
else {
	hasClass = function( elem, c ) {
		return classReg( c ).test( elem.className );
	};
	addClass = function( elem, c ) {
		if ( !hasClass( elem, c ) ) {
			elem.className = elem.className + ' ' + c;
		}
	};
	removeClass = function( elem, c ) {
		elem.className = elem.className.replace( classReg( c ), ' ' );
	};
}

function toggleClass( elem, c ) {
	var fn = hasClass( elem, c ) ? removeClass : addClass;
	fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}

})( window );


/**
 * sidebarEffects.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */

 window.SidebarMenuEffects = function() {

	function hasParentClass( e, classname ) {
		if(e === document) return false;
		if( classie.has( e, classname ) ) {
			return true;
		}
		return e.parentNode && hasParentClass( e.parentNode, classname );
	}

	function init() {
		var container = document.getElementById( 'st-container' ),
		menutrigger = Array.prototype.slice.call( document.querySelectorAll( '.js-trigger-menu' ) ),
		resetMenu = function() {
			classie.remove( container, 'nav-contents-open' );
			$(".js-trigger-menu").html("Menu");
		}
		bodyClickFn = function(evt) {
			if( !hasParentClass( evt.target, 'nav-contents' ) ) {
				resetMenu();
				document.removeEventListener( 'touchstart', bodyClickFn );
				document.removeEventListener( 'click', bodyClickFn );
			}
			return true;
		};

		menuClickFn = function( ev ) {
			ev.stopPropagation();
			ev.preventDefault();
			classie.remove( container, 'st-hideatstart' );
			if ( $("#st-container").hasClass('nav-contents-open')) {
				resetMenu();
				document.removeEventListener( 'touchstart', bodyClickFn );
				document.removeEventListener( 'click', bodyClickFn );
			} else {
				setTimeout( function() {
					classie.add( container, 'nav-contents-open' );
				}, 25 );
				$(".js-trigger-menu").html("Close");
				document.addEventListener( 'touchstart', bodyClickFn );
				document.addEventListener( 'click', bodyClickFn );
			}
		}

		menutrigger.forEach( function( el, i ) {
			el.addEventListener( 'touchstart', menuClickFn);
			el.addEventListener( 'click', menuClickFn);
		});
	}

	init();
};

SidebarMenuEffects();