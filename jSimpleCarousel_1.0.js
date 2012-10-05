?(function($) {
    $.fn.jSimpleCarousel = function( options ) {
        settings = $.extend({
			childType: 'div',
            btnNext: null,
            btnPrev: null,
            speed: 200,
            displacement: 145,
            scroll: 1,
            visible: 0,
			forever: true
        }, options || {});

			
        return this.each(function() {
            var running = false,
                curr = 0,
				displacement = settings.displacement,
				scrollSize = settings.scroll,
				container = $(this),
				ths = $(settings.childType, container),
				only = settings.visible > 0 ? Math.max(settings.visible, ths.length) - settings.visible : ths.length,
				infinite = settings.forever;
			
            if (settings.btnNext) {
                $(settings.btnNext).click(function() {
                    return go( curr + scrollSize );
                });
            };

            if ( settings.btnPrev ) {
                $(settings.btnPrev).click(function() {
                    return go( curr - scrollSize );
                });
            };

            function go( to ) {
                if ( !running ) {
					if ( !infinite && (to < 0 || to > only) ) return;
				
					if( infinite && to < 0 ){
						to = curr + only;
					}else if( infinite && to > only ) {
						to = 0;
					}
					
                    running = true;
                    curr = to;
                    container.animate({ left: -(curr * displacement) }, speed);					
                    running = false;
                }
                return false;
            };
			
			function init( container ){
				container.wrap($("<div />").attr("id", "simpleCarouselMain").addClass("simpleCarouselMain"));
			}
			
			init( container );
        });
    };
})(jQuery);