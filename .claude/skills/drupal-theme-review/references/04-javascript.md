# JavaScript Behaviors

## The Core Rule: Always Use `Drupal.behaviors`

Never use `$(document).ready()`, `window.onload`, or `DOMContentLoaded` in Drupal themes. These fire once on initial page load and do nothing after AJAX updates the DOM.

Drupal's `attach()` system fires on initial page load AND after every AJAX response. This is what makes AJAX-loaded blocks, Views, and forms work correctly.

```javascript
// WRONG — fires once on load, misses AJAX-injected content
$(document).ready(function () {
  $('.my-element').on('click', handler);
});

// WRONG — same problem, different syntax
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.my-element').forEach(el => {
    el.addEventListener('click', handler);
  });
});

// CORRECT — fires on load and after every AJAX response
(function (Drupal, once) {
  'use strict';
  Drupal.behaviors.myThemeFeature = {
    attach(context, settings) {
      once('my-feature', '.my-element', context).forEach((element) => {
        element.addEventListener('click', handler);
      });
    }
  };
})(Drupal, once);
```

## Why `once()` Is Required

`attach()` is called every time AJAX updates the page. Without `once()`, each call re-attaches the event listener to elements already in the DOM. After 5 AJAX requests, a click handler fires 5 times.

```javascript
// WRONG — no once() protection
Drupal.behaviors.myBehavior = {
  attach(context, settings) {
    document.querySelectorAll('.my-element', context).forEach((el) => {
      el.addEventListener('click', handler); // attaches again on each AJAX call
    });
  }
};

// CORRECT — once() marks elements so they're skipped on re-attachment
Drupal.behaviors.myBehavior = {
  attach(context, settings) {
    once('my-behavior', '.my-element', context).forEach((el) => {
      el.addEventListener('click', handler); // runs once per element, period
    });
  }
};
```

`once(id, selector, context)` returns only elements that haven't been processed with that `id` yet, and marks them so future calls skip them. The `context` parameter scopes the search to the DOM fragment that was just updated by AJAX.

## The `detach` Lifecycle (Optional but Correct)

If your behavior creates timers, intervals, or MutationObservers, implement `detach()` to clean up:

```javascript
Drupal.behaviors.myTimer = {
  attach(context, settings) {
    once('my-timer', 'body', context).forEach((el) => {
      el.myTimer = setInterval(() => tick(), 1000);
    });
  },
  detach(context, settings, trigger) {
    if (trigger === 'unload') {
      once.remove('my-timer', 'body', context).forEach((el) => {
        clearInterval(el.myTimer);
      });
    }
  }
};
```

`detach` is called before AJAX replaces a region and when the user navigates away. The `trigger` value is `'unload'` in those cases.

## With jQuery

If your library declares `core/jquery` as a dependency, jQuery is available as `$`:

```javascript
(function ($, Drupal, once) {
  'use strict';
  Drupal.behaviors.mySlider = {
    attach(context, settings) {
      once('my-slider', '.slider', context).forEach((element) => {
        $(element).slick({
          dots: true,
          infinite: true,
        });
      });
    }
  };
}(jQuery, Drupal, once));
```

Note `jQuery` (not `$`) in the IIFE arguments — jQuery in Drupal runs in noConflict mode, so `$` is not a global. It's safe inside the IIFE closure.

## Passing Data from PHP to JavaScript

Use `drupalSettings` — never render JSON into inline `<script>` tags or data attributes for structured data.

```php
// In preprocess or a render array:
$variables['#attached']['drupalSettings']['mytheme']['mapCenter'] = [
  'lat' => 51.5,
  'lng' => -0.1,
];
```

```javascript
// In Drupal.behaviors:
Drupal.behaviors.myMap = {
  attach(context, settings) {
    once('my-map', '#map', context).forEach((el) => {
      const { lat, lng } = settings.mytheme.mapCenter;
      initMap(el, lat, lng);
    });
  }
};
```

Never use `<?php echo json_encode($data); ?>` in a Twig template to pass data to JS — it breaks content security policies and bypasses Drupal's attachment system. Use `drupalSettings`.

## Accessibility in JavaScript

Use `Drupal.announce()` to communicate dynamic changes to screen readers:

```javascript
// Polite — waits for user to be idle before announcing
Drupal.announce(Drupal.t('Search results updated: @count items', { '@count': results.length }));

// Assertive — interrupts screen reader immediately (use sparingly)
Drupal.announce(Drupal.t('Error: please fill in the email field'), 'assertive');
```

Use `Drupal.t()` for all user-visible strings — even in JS, strings should be translatable.

## Required Library Dependencies

```yaml
# mytheme.libraries.yml
my-feature:
  js:
    js/my-feature.js: {}
  dependencies:
    - core/drupal   # provides Drupal.behaviors and Drupal.t
    - core/once     # provides once()
    - core/jquery   # if using $ / jQuery
```

Forgetting these means the script loads before its dependencies are available, causing `Drupal is not defined` or `once is not a function` errors — often only when the page loads without cache.
