/*globals Node:true, NodeList:true*/
$ = (function (document, window, $) {
  // Node covers all elements, but also the document objects
  var node = Node.prototype,
      nodeList = NodeList.prototype,
      forEach = 'forEach',
      trigger = 'trigger',
      each = [][forEach],
      // note: createElement requires a string in Firefox
      dummy = document.createElement('i');

  nodeList[forEach] = each;

  // we have to explicitly add a window.on as it's not included
  // in the Node object.
  window.on = node.on = function (event, fn) {
    if (!this.handlers) {
      this.handlers = [];
    }
    this.addEventListener(event, fn, false);
    this.handlers.push(fn);
    // allow for chaining
    return this;
  };
    nodeList.on = function (event, fn) {
      this[forEach](function (el) {
        el.on(event, fn);
      });
      return this;
    };
  
  window.off = node.off = function (event, fn) {
    if (!fn) {
      this.handlers[forEach](function(handler) {
        this.removeEventListener(event, handler, false);
      }.bind(this));
    } else {
      this.removeEventListener(event, fn, false);
    }
    // allow for chaining
    return this;
  };
    nodeList.off = function (event, fn) {
      this[forEach](function (el) {
        el.off(event, fn);
      });
      return this;
    };

  // we save a few bytes (but none really in compression)
  // by using [trigger] - really it's for consistency in the
  // source code.
  window[trigger] = node[trigger] = function (type, data) {
    // construct an HTML event. This could have
    // been a real custom event
    var event = document.createEvent('HTMLEvents');
    event.initEvent(type, true, true);
    event.data = data || {};
    event.eventName = type;
    event.target = this;
    this.dispatchEvent(event);
    return this;
  };
    nodeList[trigger] = function (event) {
      this[forEach](function (el) {
        el[trigger](event);
      });
      return this;
    };
  
  // add remove classes
  window.addClass = node.addClass = function(className) {
    this.classList.add(className);
  }
    nodeList.addClass = function (className) {
      this[forEach](function (el) {
        el.addClass(className);
      });
      return this;
    };
  window.removeClass = node.removeClass = function(className) {
    this.classList.remove(className);
  }
    nodeList.removeClass = function (className) {
      this[forEach](function (el) {
        el.removeClass(className);
      });
      return this;
    };
  window.hasClass = node.hasClass = function (selector) {
   return this.classList.contains(className);
  }
  
  // offset top
  window.getOffsetTop = node.getOffsetTop = function(){
    return this.getBoundingClientRect().top + document.body.scrollTop;
  }

  $ = function (s,c) {
    // querySelectorAll requires a string with a length
    // otherwise it throws an exception
    var r = (c || document).querySelectorAll(s || '☺'),
        length = r.length;
    // if we have a single element, just return that.
    // if there's no matched elements, return a nodeList to chain from
    // else return the NodeList collection from qSA
    return length == 1 ? r[0] : r;
  };

  // $.on and $.trigger allow for pub/sub type global
  // custom events.
  $.on = node.on.bind(dummy);
  $.off = node.off.bind(dummy);
  $[trigger] = node[trigger].bind(dummy);

  return $;
})(document, this);