

(function($)
{
    var current = "";
    var $frame  = null; 
    var template = "<img class='loader' src='/assets/img/ajax-loader.gif' />";
    
    //init 
    $.fn.initAjaxPageLoader = function()
    {
        $.eventBroker.notify("status", "initAjaxPageLoader");
        
        $frame  = $(this);
        
        return $frame;
    };
    
    //Plugin
    $.ajaxPageLoad = function(uri)
    {
        $.eventBroker.notify("status", "ajaxPageLoad( " + uri + ")");
        
        //load page into frame
        loadPageIntoFrame(uri);
    };
    
    //private
    function getNameFromUrl(url)
    {
        url = url.charAt(0) === "/" ? url.substring(1) : url;
        return url.split("/").shift();
    }
    
    function loadPageIntoFrame(uri)
    {
        //notify and remove last page
        $.eventBroker.notify("pageRemove", current);
        $frame.children().remove();
        
        //set new page
        current = getNameFromUrl(uri);
        
        //add loader
        var $loader = $(template).appendTo($frame);
        
        //start ajax load
        $.ajax({
            url         : uri,
            method      : "GET",
            context     : $frame,
            dataType    : "html",
            success     : function(data, textStatus, jqXHR)
            {
                //remove loader
                $loader.remove();
                
                //add page
                $frame.append(data);
                
                //trigger event for javascript
                $.eventBroker.notify("pageAdd", current);
            },
            error       : function(jqXHR, textStatus, errorThrown )
            {
                $.ajaxPageLoader("/error?e=" + errorThrown);
            }
        });
    }
    
}(jQuery));

