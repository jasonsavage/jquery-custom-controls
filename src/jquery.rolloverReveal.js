/**
 * rolloverReveal() plug-in
 */
(function ($)
{
    var defaults = {
        direction : "up",
        reverse : false,
        overlaySelector: ".overlay",
        openDuration: 300,
        closeDuration: 300,
        openEasing: 'swing',
        closeEasing: 'swing'
    }

    $.fn.rolloverReveal = function (options)
    {
        return this.each(function ()
        {
            var settings = $.extend({}, defaults, options);

            var $control = $(this);
            var $overlay = $(this).find(settings.overlaySelector);

            var openOverlay = function()
            {
                var props = {};

                if(settings.direction == "right")
                {
                    props.left = $overlay.width();
                }
                else if (settings.direction == "left")
                {
                    props.left = -$overlay.width();
                }
                else if(settings.direction == "down")
                {
                    props.top = $overlay.height();
                }
                else //default up
                {
                    props.top = -$overlay.height();
                }

                $overlay.stop().animate(props, {
                    duration: settings.openDuration,
                    easing: settings.openEasing
                });
            }
            var closeOverlay = function()
            {
                var props = {};

                if(settings.direction == "right" || settings.direction == "left")
                {
                    props.left = 0
                }
                else
                {
                    props.top = 0
                }

                $overlay.stop().animate(props, {
                    duration: settings.closeDuration,
                    easing: settings.closeEasing
                });
            }

            if(settings.reverse)
            {
                $control.hover(closeOverlay, openOverlay);
                openOverlay();
            }
            else
            {
                $control.hover(openOverlay, closeOverlay);
            }
        });
    };


} (jQuery));
