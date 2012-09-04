jquery-onFirst
==============

Replacement for "one", which will run the bound event-handler once **for each element** that triggers the event, vs. current "one" that will run only once for the first element that triggers the event.
jQuery >= 1.7 required (or 1.4.3 with [on/off shim](https://github.com/MoonScript/jquery-on-off-shim)).

Example:

```JavaScript
$(document).onFirst('focus', 'textarea.mywidget', function(){
  // hook up "mywidget"
});
```

> Note: the only way to unbind this is to call "off" with the same event name and selector, without passing the handler.