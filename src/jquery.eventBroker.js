
(function($)
{
    var broker = {};
    
    $.eventBroker = {
        
        add : function()
        {
            if( typeof arguments[1] === 'function')
            {
                addObserver('app', arguments[0], arguments[1]);
            }
            else if( typeof arguments[1] === 'string' && typeof arguments[2] === 'function')
            {
                addObserver(arguments[0], arguments[1], arguments[2]);
            }
            else if( typeof arguments[1] === 'object')
            {
                addMuliObservers(arguments[0], arguments[1]);
            }
        },
    
        remove : function(key)
        {
            for(var evt in broker)
            {
                delete broker[evt][key];
            }
        },
    
        notify : function() //...args
        {
            var evt = Array.prototype.shift.call(arguments);
            
            if(evt in broker)
            {
                for(var x in broker[evt])
                {
                    broker[evt][x].apply(this, arguments);
                }
            }
        }
    };
    
    function addObserver(key, event, method)
    {
        if(typeof broker[event] !== 'object') 
            broker[event] = {};

        broker[event][key] = method;
    }
    
    function addMuliObservers(key, observers)
    {
        for(var evt in observers)
            addObserver(key, evt, observers[evt]);
    }
    
}(jQuery));


