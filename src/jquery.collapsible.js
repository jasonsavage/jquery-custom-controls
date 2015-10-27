
(function ($)
{
    "use strict";

    var defaults = {
        contentSelector : ".content",
        openDuration : 300,
        openEasing : "swing",
        closeDuration : 300,
        closeEasing : "swing"
    }

    var methods = {

        init : function(options)
        {
            var data = $.extend({}, defaults, options);

            var $control = $(this);
            var $content = $control.find(data.contentSelector);

            data.originalHeight = $content.height();

            //initial close
            $content.css("height", 0);

            //save setttings
            $control.data("collapsible", data);

            //add listeners
            $control.on($.selected.events.SELECTED, function() {
                $(this).collapsible("open");
            });
            $control.on($.selected.events.UNSELECTED, function() {
                $(this).collapsible("close");
            });
            $control.on("click", function() {
                $(this).selected( ! $(this).isSelected() );
            });

            return this;
        },
        open : function()
        {
            var data = $(this).data("collapsible");
            if (data !== null)
            {
                var $content = $(this).find(data.contentSelector);

                $content.stop().animate({
                    height : data.originalHeight
                },
                {
                    duration    : data.openDuration,
                    easing      : data.openEasing
                });
            }
            return this;
        },
        close : function()
        {
            var data = $(this).data("collapsible");
            if (data !== null)
            {
                var $content = $(this).find(data.contentSelector);

                $content.stop().animate({
                    height : 0
                },
                {
                    duration    : data.closeDuration,
                    easing      : data.closeEasing
                });
            }

            return this;
        },
        destroy : function()
        {
            var data = $(this).data("collapsible");
            if (data !== null) {
                var $content = $(this).find(data.contentSelector);
                $content.css("height", data.originalHeight);

                $(this).removeData("collapsible");
            }

            //unbind events
            $(this).unbind($.selected.events.SELECTED);
            $(this).unbind($.selected.events.UNSELECTED);
            $(this).unbind("click");

        }
    }

    $.fn.collapsible = function(method)
    {
        // Method calling logic
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.collapsible' );
        }
        return this;
    }

} (jQuery));
