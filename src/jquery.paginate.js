/**
 * Paginate()
 * A Simple lightweight JQuery plugin.
 *
 *
 * Usage:
 * var pager = $("ul.list > li").paginate({
 *                  index : 0,
 *                  size : 2,
 *                  loop : false,
 *                  prevButton : "a.prev",
 *                  nextButton : "a.next",
 *                  pageButtonsTemplate : "ul#buttons li",
 *                  change : function()
 *                  {
 *                      $(this.items()).hide();
 *                      $(this.page()).show();
 *                  }
 *              });
 *
 */

///<param name="index" default="0">The page you want to start at</param>
///<param name="size" default="10">How many items to a page</param>
///<param name="loop" default="false">Whether or not you want the next() method to return to 0 when it reaches the last item, and if prev() jumps to end when it reaches 0</param>
///<param name="prevButton" default="null">Selector for the button you would like to use as the goto next page button</param>
///<param name="nextButton" default="null">Selector for the button you would like to use as the goto previous page button</param>
///<param name="pageButtonsTemplate" default="null">Selector for the template you would like to use as the jump to page buttons, this html will be duplicated for each page. Use {i} to insert th page number.</param>

///<param name="change" default="0">Event that is fired when the next(), prev(), or page(i) methods are called</param>

(function($)
{

    $.fn.paginate = function (options)
    {
       var pager = $.extend({
            _items: this.toArray(),
            index : 0,
            size : 10,
            loop : false,
            next : function()
            {
                if(this.hasNext())
                {
                    this.index++;
                    this.change();
                }
                else if(this.loop && this.index == this.count()-1 )
                {
                    this.index = 0;
                    this.change();
                }
            },
            prev : function()
            {
                if(this.hasPrev())
                {
                    this.index--;
                    this.change();
                }
                else if(this.loop && this.index == 0 )
                {
                   this.index = this.count()-1;
                   this.change();
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
                return Math.ceil((this._items.length - 1) / this.size);
            },
            page : function(i)
            {
                if(i != null)
                {
                    this.index = Math.min(Math.max(i, 0), this.count()-1);
                    this.change();
                }

                return $(this._items).splice(this.index * this.size, this.size);
            },
            items : function()
            {
                return this._items;
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

        //auto-call to initialize view if needed
        pager.change();

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
