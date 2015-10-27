/**
 * The selectedGroup() plug-in.
 * This jQuery Plugin is ment to be used with the selected() plugin to create a group of selected items which only one item can be selected at a time.
 * (radio button functionality)
 * 
 * @author Jason Savage
 * 2013 jasonsavage.com
 * 
 * Usage ::
 * 
 *  $("ul li").selectedGroup(function(selectedIndex, selectedItem) {
 *     $(selectedItem).css("background-color","red");
 *  });
 * 
 */


/**
 * Selected Group plugin
 */
$.fn.selectedGroup = function (onChange)
{
    var $items = $(this),
        selectedIndex = -1,
        onSelectionChange = onChange || function(index, element) { };
    
    return $items.each(function (index, element)
    {
        //add a selected listener to each html element in the group
        $(element).on( $.selected.events.SELECTED, function(e)
        {
            //check if this html element isn't already the selected
            if(selectedIndex !== index ) 
            {
                selectedIndex = index;
                
                //get all the elements that are selected, that are not this element, and deselect them.
                $items.selected()
                      .not(element)
                      .selected(false);
                
                //call change callback
                onSelectionChange( selectedIndex, element );
             }
        });
    });
};

//helpers
$.fn.selectedGroupIndex = function ()
{
    return $(this).index( $(this).selected().first() );
};


