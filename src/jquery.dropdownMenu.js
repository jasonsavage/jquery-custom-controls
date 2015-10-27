
(function ($)
{
    $.fn.removeDropdownMenu = function ()
    {
        var $pane = $($(this).data("menu"));

        $(this).unbind('mouseenter mouseleave');
        $pane.unbind('mouseenter mouseleave');

        $(this).children(".icon-dd-arrow").remove();
        $pane.remove();
    }

    $.fn.addDropdownMenu = function ()
    {
        return $(this).each(function()
        {
            var isOverPane = false;
            var isOverTab = false;
            var timeoutId;
            var $btn    = $(this);
            var $menu   = $( $btn.data("menu") );
            var h = $menu.height();

            var closeMenu = function()
            {
                if (!isOverTab && !isOverPane)
                {
                    $menu.stop().animate({height:0}, 300, function()
                    {
                        $menu.removeClass("active");
                    });
                }
            }

            //add arrow
            $btn.append('<span class="icon-dd-arrow"></span>');

            //hide
            $menu.css("height",0);

            //init tab
            $btn.hover(function()
            {
                isOverTab = true;
                $menu.addClass("active").stop().animate({height:h}, 200);
            },
            function()
            {
                isOverTab = false;
                clearTimeout(timeoutId);
                timeoutId = setTimeout(closeMenu, 10);
            });

            //init pane
            $menu.hover(function()
            {
                isOverPane = true;
            },
            function()
            {
                isOverPane = false;
                clearTimeout(timeoutId);
                timeoutId = setTimeout(closeMenu, 10);
            });

        });
    }

} (jQuery));
