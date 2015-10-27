
(function ($)
{
    "use strict";
    
    var defaults = {
        contentSelector : ".content",
        openDuration : 300,
        openEasing : "swing",
        closeDuration : 300,
        closeEasing : "swing",
        allowMultiple : true
    }

    $.fn.collapsibleGroup = function(options)
    {
        return $(this).each(function()
        {
            var $items = $(this).children();
            var settings = $.extend({}, defaults, options);
            
            if(!settings.allowMultiple)
            {
                //add all item to a selected group
                $items.selectedGroup();
            }
            
            $items.each(function()
            {
               $(this).collapsible(settings);
            });

        });
    }

} (jQuery));
