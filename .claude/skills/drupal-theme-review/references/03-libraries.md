# Asset Libraries (libraries.yml)

## Library Definition Structure

```yaml
# mytheme.libraries.yml

base:
  version: VERSION
  css:
    base:
      css/reset.css: {}
    layout:
      build/layout.css: {}
    theme:
      build/theme.css: {}
  js:
    build/theme.js: {}
  dependencies:
    - core/drupal      # required for Drupal namespace
    - core/once        # required if using once()

swiper:
  remote: https://swiperjs.com
  version: 6.8.4
  license:
    name: MIT
    url: https://github.com/nolimits4web/swiper/blob/master/LICENSE
    gpl-compatible: true
  js:
    https://unpkg.com/swiper@6.8.4/swiper-bundle.min.js:
      { type: external, minified: true }
  css:
    component:
      https://unpkg.com/swiper@6.8.4/swiper-bundle.min.css:
        { type: external, minified: true }
```

## CSS SMACSS Weight Keys

The key under `css:` determines load order (specificity cascade). Use the correct category — wrong weight causes style override problems.

| Key | Purpose | Examples |
|---|---|---|
| `base` | Reset/normalize rules, bare element defaults | `reset.css`, `typography.css` |
| `layout` | Page structure, grid systems | `layout.css`, `grid.css` |
| `component` | Reusable UI components | `buttons.css`, `cards.css` |
| `state` | Dynamic state classes | `.is-active`, `.is-hidden` rules |
| `theme` | Visual/brand overrides | `colors.css`, `brand.css` |

Drupal loads CSS files in this order. Putting component styles under `base` means they load before layout — that's usually wrong.

## Ordering Libraries: `before` / `after` (11.5+)

When one library must load before or after another without depending on it, use the library-level `before:` and `after:` keys:

```yaml
theme-overrides:
  css:
    theme:
      build/overrides.css: {}
  after:
    - core/drupal.dialog
    - mytheme/base
```

Per-file `weight:` is discouraged since 11.5 and may be deprecated. Flag new `weight:` keys and suggest `before`/`after`; flag a `dependencies:` entry whose only purpose is ordering, since it forces the other library to load even when nothing else needs it.

## JavaScript Load Options

```yaml
js:
  js/my-script.js:
    scope: footer    # default — append before </body> (preferred)
    # scope: header  # load in <head> — only use for scripts that must block render
    attributes:
      defer: true    # defer execution until DOM is ready
      async: true    # load and execute without blocking (use only for truly independent scripts)
      crossorigin: anonymous
```

Prefer `scope: footer` for almost all scripts. `scope: header` blocks page rendering and should be reserved for polyfills or critical scripts that must run before paint.

`defer` and `async` cannot both be set — `defer` is preferred for scripts that use the DOM.

## Required Dependencies

Always declare what your JS files need:

```yaml
my-feature:
  js:
    js/my-feature.js: {}
  dependencies:
    - core/drupal      # REQUIRED: provides the Drupal namespace and behaviors system
    - core/once        # REQUIRED: if using once() to guard attach() calls
    - core/jquery      # only if using $ — don't assume jQuery is a global
    - core/drupal.ajax # only if triggering or responding to AJAX commands
    - core/backbone    # only if using Backbone models/views
```

**Common mistake:** forgetting `core/once`. If your `attach()` does `$('.selector').on(...)` without `once()`, every AJAX response re-attaches the listener. Five clicks on an AJAX link → five handlers → unexpected behavior.

## Library Attachment

```yaml
# mytheme.info.yml — attach to all pages
libraries:
  - mytheme/base
  - mytheme/main

# template — attach only on pages where the template renders
{{ attach_library('mytheme/swiper') }}

# preprocess hook (src/Hook/) — conditionally attach
#[Hook('preprocess_node')]
public function preprocessNode(array &$variables): void {
  if ($variables['node']->bundle() === 'gallery') {
    $variables['#attached']['library'][] = 'mytheme/swiper';
  }
}
```

Don't attach heavy libraries globally via `mytheme.info.yml` if they're only needed on certain pages. Use `attach_library()` in Twig or `#attached` in preprocess to scope them.

## Overriding and Extending Core/Contrib Libraries

```yaml
# mytheme.info.yml

# Disable a core library entirely
libraries-override:
  core/normalize: false

# Replace a library's asset with your own version
libraries-override:
  core/jquery:
    js:
      assets/vendor/jquery/jquery.min.js: js/jquery-custom.min.js

# Add your library whenever another library loads
libraries-extend:
  user/drupal.user:
    - mytheme/user-styles
  core/drupal.dialog:
    - mytheme/dialog-overrides
```

`libraries-extend` is the right way to add theme CSS that customizes a specific contrib module's output — much cleaner than fighting specificity wars in a global stylesheet.

## Aggregation and Minification

Drupal aggregates CSS and JS in production (`/admin/config/development/performance`), and since 11.4 also serves Brotli-compressed aggregates when the PHP extension is installed. This means:

- Multiple files get concatenated into one
- Order is determined by SMACSS key, `before`/`after`, then weight
- External libraries are never aggregated
- Since 11.5 a library can name an `aggregate:` target to control which bundle it lands in

Don't manually concatenate files and commit the bundle — let Drupal's aggregation handle it. Commit source files; if you use a build tool (Webpack, Vite), commit `build/` output files but not `node_modules/`.
