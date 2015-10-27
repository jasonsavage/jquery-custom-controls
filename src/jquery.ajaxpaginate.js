/**
 * ajaxpaginate()
 * A version of the paginate plugin that loads pages from the serve with ajax.
 *
 * Usage:
 * var pager = $("ul.list").ajaxpaginate({
 *                  index : 0,
 *                  size : 2,
 *                  loop : false,
 *                  length : 10,
 *                  url : 'json.php',
 *                  renderer : function(data)
 *                  {
 *                      return "<li>" + data + "</li>";
 *                  },
 *                  prevButton : "a.prev",
 *                  nextButton : "a.next",
 *                  pageButtonsTemplate : "ul#buttons li",
 *                  change : function()
 *                  {
 *                      console.log("change");
 *                  }
 *              });
 *
 */

///<param name="index" default="0">The page you want to start at</param>
///<param name="size" default="10">How many items to a page</param>
///<param name="length" default="0">How many items total</param>
///<param name="url" default="">The ajax url that will return page results, ?index=0&size=10 will be appended to this url</param>
///<param name="renderer" default="method">The method to use to build each item in the json result list</param>
///<param name="loop" default="false">Whether or not you want the next() method to return to 0 when it reaches the last item, and if prev() jumps to end when it reaches 0</param>

///<param name="prevButton" default="null">Selector for the button you would like to use as the goto next page button</param>
///<param name="nextButton" default="null">Selector for the button you would like to use as the goto previous page button</param>
///<param name="pageButtonsTemplate" default="null">Selector for the template you would like to use as the jump to page buttons, this html will be duplicated for each page. Use {i} to insert th page number.</param>

///<param name="change" default="0">Event that is fired when the next(), prev(), or page(i) methods are called</param>

(function($)
{

    $.fn.ajaxpaginate = function (options)
    {
        $container = $(this);

       var pager = $.extend({
            index : 0,
            size : 10,
            loop : false,
            url : "",
            length : 0,
            renderer : function(data){ return data },
            container : $container,
            next : function()
            {
                if(this.hasNext())
                {
                    this.index++;
                    this.load();
                }
                else if(this.loop && this.index == this.count()-1 )
                {
                    this.index = 0;
                    this.load();
                }
            },
            prev : function()
            {
                if(this.hasPrev())
                {
                    this.index--;
                    this.load();
                }
                else if(this.loop && this.index == 0 )
                {
                   this.index = this.count()-1;
                   this.load();
                }
            },
            hasNext : function()
            {
                return (this.index + 1 < this.count());
            },
            hasPrev : function()
            {
                return (this.index - 1 > -1);
            },
            count : function()
            {
                return Math.ceil((this.length - 1) / this.size);
            },
            page : function(i)
            {
                if(i != null)
                {
                    this.index = Math.min(Math.max(i, 0), this.count()-1);
                    this.load();
                }
            },
            load : function()
            {
                $.ajax({
                    url : this.url,
                    method : "GET",
                    dataType : "json",
                    context : this,
                    data : {
                        index : this.index * this.size,
                        size : this.size
                    },
                    success : function(data)
                    {
                        //loop through results and populate page
                        var pager = this;
                        $(pager.container).html("");
                        $(data.results).each(function(index, ele)
                        {
                            $(pager.container).append(pager.renderer(ele));
                        });

                        pager.change();
                    },
                    error : function(jqXHR, textStatus, errorThrown)
                    {
                        $(pager.container).html(textStatus.toUpperCase() + " :: " + errorThrown.message);
                    }
                });
            },

            //events
            change : function() { },

            //ui
            nextButton : null,
            prevButton : null,
            pageButtonsTemplate : null

        }, options);

        //add listener to prev button
        $(pager.prevButton).unbind().click(function(){
            pager.prev();
        });
        //add listener to next button
        $(pager.nextButton).unbind().click(function(){
             pager.next();
        });
        //build and add listener to page buttons
        if(pager.pageButtonsTemplate != null)
        {
            buildPageBtns(pager);
        }

        //initial data load
        pager.load();

        //return pager
        return pager;
    };


    function buildPageBtns(context)
    {
        var $container = $(context.pageButtonsTemplate).parent();
        var template = $(context.pageButtonsTemplate).wrap('<div></div>').parent().html();

        $container.html("");

        var c = context.count();
        for(var i = 0; i < c; i++)
        {
           var btn = $(template.replace(/\{i\}/g, i+1) ).appendTo($container);

           if(!$(btn).is("a"))
                btn = $(btn).find("a");

           $(btn).attr("data-page", i).click(function(){
               var index = parseInt( $(this).attr("data-page") );
                context.page(index);
                return false;
            });
        }
    }

})(jQuery);
