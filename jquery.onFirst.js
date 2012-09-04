(function($){
"use strict";
var onFirstCounter = +(new Date());

// Returns a function that will only be executed once
var onFirstProxyHandler = function(handler){
  var eventKey = 'onfirst_' + (onFirstCounter++);
  return function(){
    var $element = $(this);
    if (!$element.data(eventKey)) {
      handler.apply(this, arguments);
      $element.data(eventKey, true);
    }
  };
};

// Alternative to jQuery "one" that will run the handler once for EACH element that triggers the event
$.fn.onFirst = function(events, selector, data, handler){
  var eventsMap = {};
  // When no selector is passed, this will be direct-bound to the element using "one"
  if ($.type(selector) !== 'string') {
    return $.fn.one.apply(this, arguments);
  }
  // Handle either a string of event names or a map of events-and-callbacks for the 1st parameter
  if ($.isPlainObject(events)) {
    // Intercept each handler with our own one-time callback
    $.each(events, function(eventName, callback){
      eventsMap[eventName] = onFirstProxyHandler(callback);
    });
  } else {
    // shift params when data was not passed
    if (!$.isPlainObject(data)) {
      handler = data;
      data = null;
    }
    // Assign the single handler to the events map
    eventsMap[events] = onFirstProxyHandler(handler);
  }
  return this.on(eventsMap, selector, data);
};
  
})(jQuery);