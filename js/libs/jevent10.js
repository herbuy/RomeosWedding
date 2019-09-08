
var jEvent = (function (){
    var self = this;
    
    var $ = function(preferedValue,alternativeValue){            
        return preferedValue || alternativeValue;//return typeof(preferedValue) === "undefined" ? alternativeValue : preferedValue;
    };
    
    var readyCallback = function(e){};
    self.ready = function(callback){
        readyCallback = callback || function(e){};
        return self;
    };
    
    var log = function(text){
        console.log(text);
    };
    
    var eventHandlers = []; //keys include: value, type, callback
        
    var SelectedObjects = function(selectorString){
        var self = this;        
        
        var getDefaultEventHandler = function(selectorString,eventType){
            return eventHandler = {
                'selectorString':selectorString,
                'eventType':eventType,
                'enabled':true,
                'tagName':"",
                'className':"",
                'id':"",
                'callback':function(e){},
                'useCapture':false
            };
        };
        var modifyEventHandler = function(eventHandler,selectorString,callback,useCapture){
            if(selectorString.startsWith("#")){
                eventHandler.id = selectorString.slice(1);
            }
            else if(selectorString.startsWith(".")){
                eventHandler.className = selectorString.slice(1);
            }
            else{
                eventHandler.tagName = selectorString;
            }
            if(typeof(callback) === 'function'){
                eventHandler.callback = callback;
            }            
            if(useCapture === true){
                eventHandler.useCapture = useCapture;
            }            
            return eventHandler;
        };
        var createEventHandler = function(selectorString,eventType,callback,useCapture){
            var defaultEventHandler = getDefaultEventHandler(selectorString,eventType);
            return modifyEventHandler(defaultEventHandler,selectorString,callback,useCapture);
        };
        self.click = function(callback,useCapture){            
            eventHandlers.push(createEventHandler(selectorString,'click',callback,useCapture));             
            return self;
        };
        self.dblclick = function(callback,useCapture){            
            eventHandlers.push(createEventHandler(selectorString,'dblclick',callback,useCapture));             
            return self;
        };
        
        self.hover = function(callback,useCapture){            
            eventHandlers.push(createEventHandler(selectorString,'hover',callback,useCapture));             
            return self;
        };
        self.mousemove = function(callback,useCapture){            
            eventHandlers.push(createEventHandler(selectorString,'mousemove',callback,useCapture));             
            return self;
        };
        self.mouseenter = function(callback,useCapture){            
            eventHandlers.push(createEventHandler(selectorString,'mouseenter',callback,useCapture));             
            return self;
        };
        self.mouseover = function(callback,useCapture){            
            eventHandlers.push(createEventHandler(selectorString,'mouseover',callback,useCapture));             
            return self;
        };
        self.mousedown = function(callback,useCapture){            
            eventHandlers.push(createEventHandler(selectorString,'mousedown',callback,useCapture));             
            return self;
        };
        self.mouseup = function(callback,useCapture){            
            eventHandlers.push(createEventHandler(selectorString,'mouseup',callback,useCapture));             
            return self;
        };
        self.mouseout = function(callback,useCapture){            
            eventHandlers.push(createEventHandler(selectorString,'mouseout',callback,useCapture));             
            return self;
        };
        self.mouseleave = function(callback,useCapture){            
            eventHandlers.push(createEventHandler(selectorString,'mouseleave',callback,useCapture));             
            return self;
        };
        self.keydown = function(callback,useCapture){            
            eventHandlers.push(createEventHandler(selectorString,'keydown',callback,useCapture));             
            return self;
        };
        self.keyup = function(callback,useCapture){            
            eventHandlers.push(createEventHandler(selectorString,'keyup',callback,useCapture));             
            return self;
        };
        self.keypress = function(callback,useCapture){            
            eventHandlers.push(createEventHandler(selectorString,'keypress',callback,useCapture));             
            return self;
        };
        self.focusin = function(callback,useCapture){            
            eventHandlers.push(createEventHandler(selectorString,'focusin',callback,useCapture));             
            return self;
        };
        self.focusout = function(callback,useCapture){            
            eventHandlers.push(createEventHandler(selectorString,'focusout',callback,useCapture));             
            return self;
        };
        self.change = function(callback,useCapture){
            eventHandlers.push(createEventHandler(selectorString,'change',callback,useCapture));             
            return self;
        };
        self.scroll = function(callback,useCapture){            
            eventHandlers.push(createEventHandler(selectorString,'scroll',callback,useCapture));             
            return self;
        };
        
        var disableEvent = function(eventType){
            for(var i = 0; i < eventHandlers.length;i++){
                var eventHandler = eventHandlers[i];
                if(
                        eventHandler.eventType.toLowerCase() === eventType.toLowerCase() && 
                        eventHandler.selectorString.toLowerCase() === selectorString.toLowerCase())
                {
                    eventHandlers[i]['enabled'] = false;
                }
            }
            return self;
            
        };
        
        self.disableClick = function(){            
            return disableEvent('click');
        };
       
    };
    
    self.select = function(selectorString){
        return new SelectedObjects(selectorString);
    };
    
    
    var getCallbacks = function(e,useCapture){
        var target = e.currentTarget2;
        useCapture = (useCapture === true) ? true : false;
        var matchingCallbacks = [];
                
        for(var i = 0; i < eventHandlers.length;i++){           
            
            var eventHandler = eventHandlers[i];                
            var conditions = 
                    eventHandler.eventType.toLowerCase() === e.type.toLowerCase() && 
                    eventHandler.enabled === true && 
                    eventHandler.useCapture === useCapture &&
                    (                    
                    eventHandler.tagName.toLowerCase() === target.tagName.toLowerCase() ||
                    (eventHandler.className !=="" && eventHandler.className.toLowerCase() === $(target.getAttribute("class"),"").toLowerCase()) ||
                    (eventHandler.id !== "" && eventHandler.id.toLowerCase() === $(target.getAttribute('id'),"").toLowerCase())
                    );
            //alert(conditions);            
            if(conditions){
                matchingCallbacks.push(eventHandler.callback);
            }            
        }                
        return matchingCallbacks;
        
    };
    
    var invokeCallbacks = function(callbacks,e,i){ 
               
        //assumes callbacks is an array, e is an event object, and i is an int
        if (i >= 0 && i < callbacks.length /*&& e.isPropagationStopped === false*/){
            var cb = callbacks[i];
            if(!cb(e)){
                e.preventDefault();
            }
            i+=1;
            invokeCallbacks(callbacks,e,i);
        }
    };
    
    var getParents = function(target){
        //what if we pass a non element?
        var parents = [];        
        var currentParent = target.parentElement;
        while(currentParent !== null && currentParent !== document){
            parents.push(currentParent);            
            currentParent = currentParent.parentElement;
        }        
        return parents;
    };
    
    var notifyElements = function(elements,event,useCapture){               
        for(var i = 0; i < elements.length;i++){
            var currentTarget = elements[i];
            event.currentTarget2 = currentTarget;
            invokeCallbacks(getCallbacks(event,useCapture),event,0);
        }        
    };
    var captureAndBubble = function(e){                   
        var target = e.target;             
        var parents = getParents(target);
        parents.reverse();
        e.eventPhase2 = 1;
        notifyElements(parents,e,true);
        e.eventPhase2 = 2;
        notifyElements([target],e,false);            
        parents.reverse();
        e.eventPhase2 = 3;
        notifyElements(parents,e,false); 
    };
    //our library captures all click events    
    window.onload = function(){    
        //at this point, the only html element we are sure is loaded into the DOM is the document
        //hence we add all events possible to the document element
        
        document.addEventListener('click',function(e){  
            captureAndBubble(e);
        }); 
                        
        document.addEventListener('dblclick',function(e){
            captureAndBubble(e);
        });
        
        document.addEventListener('mouseenter',function(e){
            captureAndBubble(e);
        });
        document.addEventListener('mousemove',function(e){
            captureAndBubble(e);
        });
        document.addEventListener('mouseover',function(e){
            captureAndBubble(e);
        });
        document.addEventListener('hover',function(e){
            //alert("hover");
        });
        document.addEventListener('mousedown',function(e){
            captureAndBubble(e);
        });
        document.addEventListener('mouseup',function(e){
            captureAndBubble(e);
        });
        //these events are a combination of mousedown, mousemove, and mouseup
        window.addEventListener('resize',function(e){
            
            //works for only window object, but could simulate it using mouse event combinations//alert("resize");
        });
        document.addEventListener('scroll',function(e){
            captureAndBubble(e);
        });
        //alert("working");
        
        document.addEventListener('submit',function(e){
            //NOT WORKING, simulate it if element is input of type submit//alert("submit");
        });
        document.addEventListener('focusin',function(e){
            captureAndBubble(e);
        });        
        //mouseclick should come here i.e click should come here
        document.addEventListener('keydown',function(e){            
            captureAndBubble(e);
        });        
        document.addEventListener('keyup',function(e){
            captureAndBubble(e);
        });
        //key press is a combination fo keydown and key up
        document.addEventListener('keypress',function(e){            
            captureAndBubble(e);
        });
        document.addEventListener('change',function(e){
            captureAndBubble(e);
        });
        document.addEventListener('focusout',function(e){            
            captureAndBubble(e);
        });
        document.addEventListener('mouseout',function(e){            
            captureAndBubble(e);
        });
        document.addEventListener('mouseleave',function(e){            
            captureAndBubble(e);
        });
                
        //do something with the event information: prevent default, pagex, pagey,target, timestamp, type, which, result, data
        //call additional call backs for ready event
        readyCallback(document);
    };




//lets use the library to add some events

return self;
})();
var $$ = function(selectorString){
    return jEvent.select(selectorString);
};
