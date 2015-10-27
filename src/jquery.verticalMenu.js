(function ($)
{
    "use strict";

    //private variables
    var $control    = null;
    var $pane       = null;
    var $menu       = null;
    var $arrowUp    = null;
    var $arrowDwn   = null;

    var isUpPressed     = false;
    var isDownPressed   = false;
    
    var settings = {
        scrollSpeed         : 5,
        arrowUpSize         : 55,
        arrowDownSize       : 55,
        arrowUpSelector     : "a.top",
        arrowDownSelector   : "a.bottom",
        paneSelector        : ".pane",
        menuSelector        : "ul"
    }

    //public methods
    var methods = {
        init: function (options)
        {
            
            settings = $.extend(settings, options);
            
            $control    = $(this);
            $pane       = $control.find(settings.paneSelector);
            $menu       = $pane.find(settings.menuSelector);
            $arrowUp    = $control.find(settings.arrowUpSelector);
            $arrowDwn   = $control.find(settings.arrowDownSelector);

            //init
            updateScroll();
            toggleArrows(0);

            //add listeners to arrows
            $arrowUp.mousedown(function(){ isUpPressed = true; })
                    .mouseup(function(){ isUpPressed = false; })
                    .mouseout(function(){ isUpPressed = false; });

            $arrowDwn.mousedown(function(){ isDownPressed = true; })
                     .mouseup(function(){ isDownPressed = false; })
                     .mouseout(function(){ isDownPressed = false; });

            return this;
        },
        menuItems : function()
        {
            return $menu.children();
        },
        scrollTo: function (selector)
        {
            var pos;
            if(typeof selector == 'number')
                pos = selector;
            else
                pos = $(selector).position().top;
            
            var next = limit(-pos, -(Math.abs($menu.height()-$control.height()) + settings.arrowUpSize), 0);

            $menu.stop().animate({
                top : next
            },
            {
                duration : 300,
                step : function(now)
                {
                    toggleArrows(now);
                }
            });

            return this;
        },
        updateScroll:function ()
        {
            updateScroll();
            toggleArrows(0);
        }

    }

    $.fn.verticalMenu = function(method)
    {
        // Method calling logic
        if (methods[method])
        {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method)
        {
            return methods.init.apply(this, arguments);
        } else
        {
            $.error('Method ' + method + ' does not exist for verticalMenu');
        }
        
        return this;
    }

    //private methods
    var updateScroll = function()
    {
        //loop
        requestAnimFrame(updateScroll);

        if(isUpPressed || isDownPressed)
        {
            var direction   = isUpPressed ? 1 : -1;
            var pos         = $menu.position();
            var next        = pos.top + (direction * settings.scrollSpeed);
            $menu.css("top", next);

            toggleArrows(next);
        }
    }

    var toggleArrows = function(pos)
    {
        //reset
        var paneHeight = $control.height();

        //check up arrow
        if( pos < 0 )
        {
            //show up arrow
            $arrowUp.show();
            paneHeight -= settings.arrowUpSize;
            $pane.css("top", settings.arrowUpSize)
        }
        else
        {
            isUpPressed = false;
            $pane.css("top", 0);
            $arrowUp.hide();
        }

        //check down arrow
        if( pos + $menu.height() > paneHeight )
        {
            //show down arrow
            $arrowDwn.show();
            paneHeight -= settings.arrowDownSize;
        }
        else
        {
            isDownPressed = false;
            $arrowDwn.hide();
        }

        //resize pane
        $pane.css("height", paneHeight);
    }

    var limit = function(value, min, max)
    {
        return Math.max(Math.min(value, max), min);
    };
    

} (jQuery));
