/**
* lazyimage() plug-in
 */
(function ($)
{
    $.fn.lazyimage = function (method)
    {
        return $(this).each(function()
        {
            var $image  = $(this),
                dir     = $image.attr("src"),
                dir     = dir.substring(0, dir.lastIndexOf("/")),
                tmpImg  = new Image();

            $image.wrap('<div style="display:inline-block; position:relative; min-width:16px; min-height:16px;" />');
            $loader = $("<img src='" + dir + "/ajax-loader.gif' style='display:block; position:absolute; top:50%; left:50%; margin:-8 0px 0px -8px' />").appendTo($image.parent());

            $(tmpImg).on('load', function()
            {
                $loader.remove();
                $image.unwrap().attr("src", tmpImg.src);

                tmpImg.unbind();
                tmpImg = null;
            });

            tmpImg.src = $image.attr("data-src");
        });
    };

    $(document).ready(function()
    {
        //unobtrusive call
        $("img[data-src]").lazyimage();
    });


} (jQuery));
