(function() {

  // Kill exeuction for bad browsers
  if(typeof document.querySelectorAll !== undefined && !('addEventListener' in window)) {
    return;
  }

  $ = function (s,c) {
    return (c || document).querySelectorAll(s || '☺');
  };

  $.VERSION = '2.0.0';

  $.events_cache = {};
  $.event_uuid = 0;

  // $.forEach(nodelist,function(el,i) { ... });
  $.forEach = function(elements,func){
    Array.prototype.forEach.call(elements, func);
  };

  $.on = function(nodelist,type,fn) {
    $.forEach(nodelist,function(el,i) {
      $.event_uuid++;
      if (!this.handlers) {
        this.handlers = {};
      }
      // check for namespace
      var type_arr = type.split(".");
      // store event data
      this.handlers[$.event_uuid] = type;
      $.events_cache[$.event_uuid] = {
        type: type_arr[0],
        namespace: type_arr[1] || "",
        fn: fn
      };
      // add listener
      this.addEventListener(type_arr[0], fn, false);
    });
    // allow for chaining
    return nodelist;
  };

  $.off = function(nodelist,type) {
    $.forEach(nodelist,function(el,i) {
      // check for namespace
      var node = this;
      var node_handlers = node.handlers || [];
      var type_arr = (typeof type === "undefined") ? [] : type.split(".");
      var event_type, event_namespace;
      //
      if (type_arr.length > 0) {
        event_type = type_arr[0] || "";
        event_namespace = type_arr[1] || "";
      }
      // loop handlers
      Object.keys(node_handlers).forEach(function(key,i){
        if (
          (type_arr.length === 0) || // off(); so remove all events from node
          (event_type === $.events_cache[key].type && event_namespace === $.events_cache[key].namespace) || // match type and namespace
          (event_type === $.events_cache[key].type && event_namespace === "") || // match type and no namespace
           (event_namespace === $.events_cache[key].namespace && event_type === "") // match namespace and no type
        ){
          // remove the listener
          node.removeEventListener($.events_cache[key].type, $.events_cache[key].fn, false);
          // clean up after yourself
          delete node.handlers[key];
          delete $.events_cache[key];
        }
      });
    });
    // allow for chaining
    return nodelist;
  };


}.call(this));
