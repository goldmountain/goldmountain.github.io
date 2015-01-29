/*
* Author: Kevin Liew @ queness.com
* Website: http://www.queness.com
* License: MIT 
*
* Usage:
* $('#id').dribbble({
* 	player: 'popular', //username, debuts, popular or everyone
* 	total: 5
* });
*
*/

(function($){
	
    //Attach this new method to jQuery
    $.fn.extend({ 
         
        dribbble: function(options) {

			var defaults = {
				player: '',	//username, debuts, popular or everyone
				total: 3 // 1 - 15
			} 		
 			
 			var options = $.extend(defaults, options);
			var o = options; 
 
            //Iterate over the current set of matched elements
            return this.each(function() {
			
				var struct = '<div class="drib-item"><div class="drib-image"><a href="{url}"><img src="{image}" alt="{title}" /></a></div><div class="drib-detail"><div class="drib-detail-wrapper"><a href="#">{title}</a><ul><li class="views">{views}</li><li class="likes">{likes}</li><li class="comments">{comments}</li></ul></div></div></div>',
					html = '',
					holder = $(this);
			
				$.ajax({
				   type: "get",
				   url: "dribbble-call.php",
				   data: "player=" + o.player,
				   success: function(data){
						
							try {
							
								if (data.shots.length > 0) {
									var shots = data.shots;
									
									for (var i=0; i< shots.length; i++) {
			
										if (i < o.total) {
			
											html += struct.replace(/{title}/g, shots[i].title)
													.replace(/{image}/g, shots[i].image_teaser_url)
													.replace(/{url}/g, shots[i].url)
													.replace(/{views}/g, shots[i].views_count)
													.replace(/{likes}/g, shots[i].likes_count)
													.replace(/{comments}/g, shots[i].comments_count);		
										}										
														
									}
	
									holder.append(html);
									
								} else alert('No data returned from dibbble!');
						
							} catch (e) {
								alert(e);
							}
						
				   		}
					});
				 		            
					$('.drib-item').live({
				        mouseenter: function() {
								$(this).find('.drib-image').stop().animate({top: ($(this).height() / 2 * -1)}, 300);
				           },
				        mouseleave: function() {
								$(this).find('.drib-image').stop().animate({top: 0}, 300);
				           }
				       }
				    );            
            });          
        }
    });

})(jQuery);	