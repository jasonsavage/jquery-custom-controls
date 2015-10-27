/**
* modal() plug-in
 *
 */
(function ($)
{
    var settings = {
        id : null,
        width : null,
        height : null,

        //base modal content providers
        content : null,
        selector : null,

        //effects
        open    : null,
        close   : null
    }

    var $currentModal = null;

    var methods = {
        init: function (options)
        {
            settings = $.extend(settings, options);

            //step 1 : create if needed
            if($currentModal === null)
                methods.create();

            //content is changing so show loader
            $currentModal.find(".content").html("");
            $currentModal.find(".loader").show();

            //Step 2 : populate
            if(settings.selector !== null)
            {
                //populate dialog this selector
                var content = $(settings.selector).clone().wrap('<div>').parent().html();
                methods.update(content);
            }
            else if(settings.content !== null)
            {
                //populate dialog with content
                methods.update(settings.content);
            }

            //step 3 : show
            methods.open();

            return $currentModal;

        },
        create : function()
        {
            //clean up any open dialogs
            methods.close();

            //append overlay
            $currentModal = $("<div class='modal-overlay'>").appendTo("body").hide();

            if(settings.id !== null)
                $currentModal.attr("id", settings.id);

            //append background fill
            $("<div class='fill'>").appendTo($currentModal).click(function() {
                methods.close();
            });

            //append dialog
            $dialog = $("<div class='dialog'>").appendTo($currentModal);

            //size and center
            if(settings.width !== null)
            {
                $dialog.css("width", settings.width);
                $dialog.css("margin-left", settings.width * -0.5);
            }

             if(settings.height !== null)
             {
                $dialog.css("height", settings.height);
                $dialog.css("margin-top", settings.height * -0.5);
             }

            //append dialog content
            $("<div class='content'>").appendTo($dialog);

            //append dialog close button
            $("<a class='close' href='javascript:void(0)' title='close'>&times;</a>").appendTo($dialog).click(function(){
                methods.close();
            });

            //append dialog loader
            $("<div class='loader'>loading</div>").appendTo($dialog);

            return $currentModal;
        },
        update : function(message)
        {
            if($currentModal != null)
            {
                $currentModal.find(".content").html(message);
                $currentModal.find(".loader").hide();
            }

            return $currentModal;
        },
        open : function()
        {
            if($currentModal != null)
            {
                if(settings.open != null)
                    settings.open.apply($currentModal);
                else
                    $currentModal.show();
            }

            return $currentModal;
        },
        close : function()
        {
            if($currentModal != null)
            {
                if(settings.close != null)
                    settings.close.apply($currentModal);
                else
                    $currentModal.remove();
            }
            $currentModal = null;
        }
    };

    /**
    * Constructor
    */
    $.modal = function (method)
    {
        // Method calling logic
        if (methods[method])
        {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || !method)
        {
            return methods.init.apply(this, arguments);
        }
        else
        {
            $.error('Method ' + method + ' does not exist on jQuery.modal');
        }
    }

    $.fn.modal = function (options)
    {
        //pass any options on with selector
        var opts = $.extend({
            selector : this
        }, options);

        //open dialog
        $.modal(opts);
    };


} (jQuery));
