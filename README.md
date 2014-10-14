# min.js

A super tiny JavaScript library to execute simple DOM querying and hooking event listeners. Aims to return the raw DOM node for you to manipulate directly, using HTML5 (et al) tech like `element.classList` or `element.innerHTML`, etc.

Expanded to include a few of the most frequently used helpers from jQuery. 

WIP


## Query elements

```js
var links = $('p:first-child a');
```

If there is more than one link, the return value is `NodeList`, if there's only a single match, you have an `Element` object. So you need to have an idea of what to expect if you want to modify the DOM.

## Events

### Bind events

```js
$('p:first-child a').on('click', function (event) {
  event.preventDefault();
  // do something else
});
```

Note: the `on` and `trigger` methods are on both `Node` objects and `NodeList` objects, which also means this affects the `document` node, so `document.on(type, callback)` will also work.

### Custom events

```js
$('a').on('foo', function () {
  // foo was fired
});

$('a:first-child').trigger('foo');
```

### Arbitrary events / pubsub

```js
$.on('foo', function () {
  // foo was fired, but doesn't require a selector
});
```

### Turning off events?

```js
$('a').off('click');
```

## Looping

```js
$('p').forEach(function (el, index) {
  console.log(el.innerHTML);
});
```

Note: jQuery-like libraries tend to make the context `this` the element. Since we're borrowing `forEach` from the array object, `this` does not refer to the element.

## Chaining events

```js
$('a').on('foo', bar).on('click', doclick).trigger('foobar');
```

Also when a single element is matched, you have access to it:

```js
$('a').href = '/some-place.html';
```

## Add, remove, has CSS class

```js
$('a').addClass("foo");
$('a').removeClass("bar");
var is_foo = $('a').hasClass("foo"); // true/false
```

## Offset Top

```js
var ot = $('a').getOffsetTop(); // number
```

## Silent failing

Like jQuery, this tiny library silently fails when it doesn't match any elements. As you might expect.

# More info

* Special thanks and inspired by [Andrew Lunny](http://github.com/alunny)'s [slide](http://youtu.be/ssR7SKJfcG4?t=20m14s).
* I've started using this library in conjunction with some [microlibraries](https://github.com/remy/libraries) that I've written for data binding and XHR.
* License: MIT / http://rem.mit-license.org
