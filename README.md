# min.js

A super tiny JavaScript library to execute simple DOM querying and hooking event listeners. Aims to return the raw DOM node for you to manipulate directly, using HTML5 (et al) tech like `element.classList` or `element.innerHTML`, etc.

Expanded to include a few of the most frequently used helpers from jQuery.

Checks for querySelectorAll and addEventListener and returns undefined if not present.

**WIP** Tests for updated on(), off(), addClass(), removeClass(), hasClass() and getOffsetTop() have not been written (yet)


## Query elements

```js
var links = $('p:first-child a');
```

If there is more than one link, the return value is `NodeList`, if there's only a single match, you have an `Element` object. So you need to have an idea of what to expect if you want to modify the DOM.

Optionally you can supply a context in which to look:

```js
var links = $('p:first-child a','#content');
```

## Events

### Bind events with on()

Basic:

```js
$('p:first-child a').on('click', function (event) {
  event.preventDefault();
  // do something else
});
```
Or with a namespace:
```js
$('p:first-child a').on('click.foo', function (event) {
  event.preventDefault();
  // do something else
});
```

Note:
* the `on` and `trigger` methods are on both `Node` objects and `NodeList` objects, which also means this affects the `document` node, so `document.on(type, callback)` will also work.
* only accepts singular events and singular namespaces
* **must** contain an event type (namespace is optional)

### Unbind events with off()

```js
$('p:first-child a').off(); // clears all handlers
$('p:first-child a').off('click'); // clears just the click handlers
$('p:first-child a').off('click.foo'); // clears just foo namespaced click handlers
$('p:first-child a').off('.foo'); // clears foo namespaced handlers
```

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

## Read/write attributes

```js
$('div:last-child').attr('data-url');
$('div:first-child').attr('data-url','http://www.github.com/13twelve');
```

Expects a singular item.

## Read/write CSS styles

```js
$('a:last-child').css('color');
$('a:first-child').css('color','#000000');
$('a:first-child').css({
  color: '#000000',
  text-decoration: 'underline'
});
```

Expects a singular item.

## Offset Top

```js
var ot = $('a').getOffsetTop(); // number
```

## Silent failing

Like jQuery, this tiny library silently fails when it doesn't match any elements. As you might expect.

# More info

* Apologies to Remy Sharp for introducing my cludgy JS into his nice min.js code ;-)
* License: MIT
