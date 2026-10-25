# Theme Development

## Theme File Structure

```
mytheme/
├── mytheme.info.yml              # Required: metadata, regions, libraries, base theme
├── mytheme.libraries.yml         # CSS/JS asset library definitions
├── mytheme.breakpoints.yml       # Responsive breakpoint definitions
├── mytheme.tokens.yml            # Design tokens (11.5+, optional)
├── src/
│   └── Hook/                     # #[Hook] classes: preprocess, suggestions, alters, theme settings form
│       ├── MyThemePreprocessHooks.php
│       └── MyThemeSettingsHooks.php
├── config/
│   ├── install/mytheme.settings.yml   # Default theme setting values
│   └── schema/mytheme.schema.yml      # Schema for theme settings
├── templates/
│   ├── layout/         # html.html.twig, page.html.twig, region.html.twig
│   ├── block/          # block.html.twig, block--TYPE.html.twig
│   ├── content/        # node.html.twig, node--TYPE.html.twig
│   ├── field/          # field.html.twig, field--NAME.html.twig
│   ├── views/          # views-view.html.twig, etc.
│   └── navigation/     # menu.html.twig
├── css/                # Source CSS/SCSS
├── js/                 # JavaScript files
├── build/              # Compiled assets (committed or gitignored based on setup)
└── components/         # Single Directory Components
    └── my-component/
        ├── my-component.component.yml
        ├── my-component.html.twig
        ├── my-component.css
        └── my-component.js
```

**No `mytheme.theme` and no `theme-settings.php`.** Both are deprecated in Drupal 11.5 and stop being autoloaded in Drupal 13. Since 11.3 themes implement hooks with the same `#[Hook]` attribute as modules, in `src/Hook/` (namespace `Drupal\mytheme\Hook`). See `14-oop-hooks.md` for the theme-specific limitations.

## theme.info.yml

```yaml
name: My Theme
type: theme
base theme: false
core_version_requirement: ^11.5 || ^12
description: 'My custom theme'
package: Custom

regions:
  header: Header
  breadcrumb: Breadcrumb
  help: Help
  content: Content
  sidebar: Sidebar
  footer: Footer
  page_top: 'Page top'
  page_bottom: 'Page bottom'

libraries:
  - mytheme/base
  - mytheme/main

ckeditor5-stylesheets:
  - build/main.css

libraries-override:
  core/normalize: false   # disable a core library

libraries-extend:
  user/drupal.user:
    - mytheme/user-styles   # load mytheme/user-styles whenever user/drupal.user loads
```

**Base theme choice in Drupal 12:**

| Base | Use |
|---|---|
| `false` + Starterkit-generated templates | Default for new front-end themes. `generate-theme` copies `starterkit_theme` into your theme, so there is no runtime base theme to keep up with. |
| `default_admin` | Sub-theming the core admin theme (Drupal 12's default admin and front-end theme in the Standard profile). |
| `olivero` / `claro` / `stable9` | Removed from core in 12.0. Only with the contrib project in `composer.json` (`drupal/olivero`, `drupal/claro`, `drupal/stable9`). Do not start new themes on them. |

**Generating from Starterkit:**
```bash
vendor/bin/dr generate-theme mytheme --path themes/custom
# core/scripts/drupal generate-theme is deprecated since 11.4
```

## theme.libraries.yml

```yaml
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
    - core/drupal
    - core/once

# Must load after a library it does not depend on (11.5+). Prefer this over
# per-file weight:, which is discouraged and may be deprecated.
print:
  css:
    theme:
      build/print.css: { media: print }
  after:
    - mytheme/base

swiper:
  remote: https://swiperjs.com
  version: 11.2.6
  license:
    name: MIT
    url: https://github.com/nolimits4web/swiper/blob/master/LICENSE
    gpl-compatible: true
  js:
    https://cdn.jsdelivr.net/npm/swiper@11.2.6/swiper-bundle.min.js:
      { type: external, minified: true }
  css:
    component:
      https://cdn.jsdelivr.net/npm/swiper@11.2.6/swiper-bundle.min.css:
        { type: external, minified: true }
```

### CSS SMACSS Categories (order matters for specificity)

| Key | Purpose |
|---|---|
| `base` | Reset/normalize rules, element defaults |
| `layout` | Page structure, grids |
| `component` | Reusable UI components |
| `state` | `.is-active`, `.is-hidden`, etc. |
| `theme` | Visual overrides |

### JS Placement Options

```yaml
js:
  js/my-script.js:
    scope: footer    # default — load before </body>
    # scope: header  # load in <head> (use only when necessary)
    attributes:
      defer: true
```

Drupal aggregates and, when the PHP extension is available, Brotli-compresses CSS/JS in production (11.4+). Do not pre-bundle vendor code into one file "for performance"; let aggregation do it and keep libraries granular so pages only load what they attach.

## Twig Templating

### Enable Debug Mode

In `sites/default/services.yml` (development only):

```yaml
parameters:
  twig.config:
    debug: true
    auto_reload: true
    cache: false
```

With debug enabled, HTML comments show available template suggestions:

```html
<!-- THEME HOOK: 'node' -->
<!-- FILE NAME SUGGESTIONS:
   * node--article--full.html.twig
   * node--article.html.twig
   * node--full.html.twig
   x node.html.twig          ← active template
-->
```

### Template Naming Convention

| Suggestion | Filename |
|---|---|
| `block` | `block.html.twig` |
| `block__system` | `block--system.html.twig` |
| `block__system_branding_block` | `block--system-branding-block.html.twig` |
| `node__article__teaser` | `node--article--teaser.html.twig` |
| `field__field_image__article` | `field--field-image--article.html.twig` |
| `views_view__my_view__page_1` | `views-view--my-view--page-1.html.twig` |

**Rule:** Underscores in PHP hook names become hyphens in filenames. Double underscores become double hyphens.

### Template Override Process

1. Enable Twig debug mode
2. Load the page and inspect HTML source comments
3. Copy the active template from its current location into `themes/custom/mytheme/templates/`
4. Rename with the more-specific suggestion you want to match
5. Clear cache: `drush cr` (or `vendor/bin/dr cache:rebuild`)

### Adding Custom Template Suggestions

```php
// src/Hook/MyThemeSuggestionsHooks.php
namespace Drupal\mytheme\Hook;

use Drupal\Core\Hook\Attribute\Hook;
use Drupal\Core\Path\PathMatcherInterface;

class MyThemeSuggestionsHooks {

  public function __construct(
    private readonly PathMatcherInterface $pathMatcher,
  ) {}

  #[Hook('theme_suggestions_block_alter')]
  public function blockSuggestions(array &$suggestions, array $variables): void {
    if (isset($variables['elements']['content']['#block_content'])) {
      $bundle = $variables['elements']['content']['#block_content']->bundle();
      $suggestions[] = 'block__' . $bundle;
    }
  }

  #[Hook('theme_suggestions_region_alter')]
  public function regionSuggestions(array &$suggestions, array $variables): void {
    if ($this->pathMatcher->isFrontPage()) {
      $suggestions[] = 'region__' . $variables['elements']['#region'] . '__front';
    }
  }

}
```

Theme hook classes are autowired, so inject services instead of calling `\Drupal::service()`.

## Preprocess Functions

```php
// src/Hook/MyThemePreprocessHooks.php
namespace Drupal\mytheme\Hook;

use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Hook\Attribute\Hook;
use Drupal\my_module\Entity\Trip;

class MyThemePreprocessHooks {

  public function __construct(
    private readonly ConfigFactoryInterface $configFactory,
  ) {}

  // Add variables to all node templates
  #[Hook('preprocess_node')]
  public function preprocessNode(array &$variables): void {
    $node = $variables['node'];
    if ($node instanceof Trip) {
      $variables['destination'] = $node->getDestination();
    }
  }

  // Add variables to a specific region
  #[Hook('preprocess_region')]
  public function preprocessRegion(array &$variables): void {
    if ($variables['region'] === 'footer') {
      $variables['site_name'] = $this->configFactory->get('system.site')->get('name');
      $variables['copyright'] = theme_get_setting('copyright');
    }
  }

  // Inject block content entity into block template
  #[Hook('preprocess_block')]
  public function preprocessBlock(array &$variables): void {
    if (isset($variables['elements']['content']['#block_content'])) {
      $variables['block_content'] = $variables['elements']['content']['#block_content'];
    }
  }

  // Pass drupalSettings from preprocess
  #[Hook('preprocess_page')]
  public function preprocessPage(array &$variables): void {
    $variables['#attached']['drupalSettings']['mytheme']['copyright'] = theme_get_setting('copyright');
  }

}
```

**Rules:**
- Preprocess adds display-specific variables, not business logic.
- Use bundle classes for complex entity-specific logic instead of long preprocess methods.
- Preprocess is per-hook; always use the most specific hook available (`preprocess_node__article`).
- When a variable depends on data that can change (config, another entity), apply its cacheability: `CacheableMetadata::createFromObject($config)->applyTo($variables)`.
- `hide()`/`show()` are deprecated (11.4); set `$variables['content']['field_x']['#printed'] = TRUE` or use `|without` in Twig.

## Drupal-Specific Twig Functions and Filters

```twig
{# Functions #}
{{ attach_library('mytheme/swiper') }}
{{ path('entity.node.canonical', {node: node.id()}) }}
{{ url('user.login') }}
{{ link('Click here', url) }}
{{ file_url(file.uri.value) }}
{{ create_attribute({'class': ['card'], 'data-id': id}) }}

{# twig/html-extra helpers (11.4+) #}
<div class="{{ html_classes('card', {'card--featured': featured, 'card--compact': compact}) }}">
<button {{ html_attr({'type': 'button', 'aria-expanded': 'false'}) }}>
{% set btn = html_cva(base: 'btn', variants: {size: {sm: 'btn--sm', lg: 'btn--lg'}}) %}
<a class="{{ btn.apply({size: size}) }}">

{# Filters #}
{{ label|t }}
{{ content|without('field_image', 'field_tags') }}
{{ class|clean_class }}
{{ id|clean_id }}
{{ timestamp|format_date('short') }}
{{ file_uri|image_style('thumbnail') }}
{{ render_array|render }}
{{ items|safe_join(', ') }}
```

There is no `check_url` filter in core. Render link fields through their formatter, or build a `Url` object in preprocess; for a raw external string use `UrlHelper::stripDangerousProtocols()` in PHP before it reaches Twig.

`drupal_block()`, `drupal_view()`, `drupal_entity()` and friends come from the contrib Twig Tweak module, not core. Prefer placing blocks and views through configuration; reach for Twig Tweak only when the layout genuinely cannot be expressed in config.

### The `|without` Filter (Critical for Cache)

```twig
{# Output specific fields #}
{{ content.field_title }}
{{ content.field_image }}

{# Output everything except certain fields — PRESERVES cache metadata #}
{{ content|without('field_image', 'field_tags') }}
```

Using `|without` ensures that cache tags and contexts from excluded fields still bubble up to the parent. Never pick fields by omission if you need correct caching.

## JavaScript Behaviors

**Never use `$(document).ready()` or `window.onload`.** Always use `Drupal.behaviors`:

```javascript
// Without jQuery (preferred)
(function (Drupal, once) {
  'use strict';
  Drupal.behaviors.myThemeBehavior = {
    attach(context, settings) {
      once('my-behavior', '.my-element', context).forEach((element) => {
        element.addEventListener('click', () => {
          Drupal.announce(Drupal.t('Item selected'));
        });
      });
    }
  };
})(Drupal, once);

// With jQuery (only when a jQuery plugin requires it)
(function ($, Drupal, once) {
  'use strict';
  Drupal.behaviors.myThemeSlider = {
    attach(context, settings) {
      once('my-slider', '.slider', context).forEach((element) => {
        $(element).slick(settings.mytheme.slider);
      });
    }
  };
}(jQuery, Drupal, once));
```

**Why `once()`:** `attach()` is called on initial page load AND after every AJAX or htmx response. `once()` ensures event listeners are attached only once per element.

### Passing Data from PHP to JavaScript

```php
// In a render array or preprocess:
$build['#attached']['drupalSettings']['mytheme']['message'] = 'Hello';
```

```javascript
// In Drupal.behaviors:
settings.mytheme.message  // 'Hello'
```

### Required Library Dependencies for JS

```yaml
my-js-library:
  js:
    js/my-script.js: {}
  dependencies:
    - core/drupal      # REQUIRED for Drupal.behaviors
    - core/jquery      # only if using $
    - core/once        # REQUIRED for once()
    - core/drupal.ajax # if using AJAX commands
```

Core still ships jQuery, but nothing in a new theme should need it. `jQuery().resetForm()` was removed in 11.5.

## Single Directory Components (SDC)

```yaml
# components/my-button/my-button.component.yml
'$schema': 'https://git.drupalcode.org/project/drupal/-/raw/12.0.x/core/assets/schemas/v1/metadata.schema.json'
name: "My Button"
status: "stable"
props:
  type: object
  properties:
    label:
      type: string
      title: "Label"
    variant:
      type: string
      enum: ["primary", "secondary"]
      default: "primary"
  required:
    - label
```

```twig
{# components/my-button/my-button.html.twig #}
<div {{ attributes.addClass('my-button') }}>
  <button class="btn btn--{{ variant }}">{{ label }}</button>
</div>
```

```twig
{# Using in another template — with_context = false prevents variable leaking #}
{{ include('mytheme:my-button', {
  'label': 'Click me',
  'variant': 'primary'
}, with_context = false) }}
```

**Slots with expectations (12.0+):** a component can say which components a slot accepts and how many. Page builders can enforce this; templates ignore it.

```yaml
# components/accordion/accordion.component.yml
name: Accordion
tags: [accordion]
slots:
  items:
    title: Accordion items
    expected: ['mytheme:accordion-item']   # component IDs or tags
    minItems: 1
    maxItems: 10
```

**Override a module's SDC from a theme:**

```yaml
# themes/custom/mytheme/components/my-button/my-button.component.yml
replaces: 'my_module:my-button'
```

`libraryOverrides:` in the component YAML declares dependencies (and, since 11.4, a `fonts:` key for preloading).

## Design Tokens (11.5+)

Themes and modules can declare design tokens in DTCG format in `mytheme.tokens.yml`; core turns them into CSS custom properties, and the `design_token` config entity lets sites override values per scope (`:root`, `.card`). Supported types today: dimension, fontFamily, fontWeight, number, typography.

```yaml
# mytheme.tokens.yml
corner-radius-small:
  $type: dimension
  $value: { value: 4, unit: px }
corner-radius-big:
  $type: dimension
  $value: { value: 12, unit: px }
```

```css
.card { border-radius: var(--corner-radius-big); }
```

Use tokens for the values a site builder or the admin theme should be able to tune; keep one-off values in plain CSS.

## Responsive Images

### 1. Define breakpoints (`mytheme.breakpoints.yml`)

```yaml
mytheme.mobile:
  label: Mobile
  mediaQuery: 'all and (min-width: 0px)'
  weight: 0
  multipliers: ['1x']

mytheme.md:
  label: Medium
  mediaQuery: 'all and (min-width: 768px)'
  weight: 2
  multipliers: ['1x']

mytheme.lg:
  label: Large
  mediaQuery: 'all and (min-width: 1024px)'
  weight: 3
  multipliers: ['1x', '2x']
```

### 2. Create image styles per breakpoint at `/admin/config/media/image-styles`

### 3. Create a responsive image style at `/admin/config/media/responsive-image-style` mapping breakpoints to styles

### 4. Use the "Responsive image" formatter in field display settings

## Accessibility

```twig
{# aria-live for dynamic content updates #}
<div aria-live="polite">{{ dynamic_content }}</div>

{# Skip link target #}
<a id="main-content" tabindex="-1"></a>

{# Visually hidden but accessible to screen readers #}
<span class="visually-hidden">{{ 'More about %title'|t({'%title': node.title.value}) }}</span>
```

```javascript
// Polite announcement (waits for user to be idle)
Drupal.announce(Drupal.t('Item added to cart'));

// Assertive (interrupts screen reader)
Drupal.announce(Drupal.t('Form error: email required'), 'assertive');
```

Status messages use ARIA live region roles since 11.5; if your `status-messages.html.twig` override still wraps them in `role="contentinfo"`, update it.

## Theme Settings

The settings form alter lives in a hook class; `theme-settings.php` is deprecated (11.5).

```php
// src/Hook/MyThemeSettingsHooks.php
namespace Drupal\mytheme\Hook;

use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Hook\Attribute\Hook;
use Drupal\Core\StringTranslation\StringTranslationTrait;

class MyThemeSettingsHooks {

  use StringTranslationTrait;

  #[Hook('form_system_theme_settings_alter')]
  public function themeSettingsAlter(array &$form, FormStateInterface $form_state): void {
    $form['mytheme_settings']['copyright'] = [
      '#type'          => 'textfield',
      '#title'         => $this->t('Copyright text'),
      '#default_value' => theme_get_setting('copyright'),
      '#required'      => TRUE,
    ];
  }

}
```

```yaml
# config/install/mytheme.settings.yml
copyright: '© 2026 My Company'
```

```yaml
# config/schema/mytheme.schema.yml
mytheme.settings:
  type: theme_settings
  label: 'My Theme settings'
  mapping:
    copyright:
      type: string
      label: 'Copyright text'
```

Reading theme settings in PHP: `theme_get_setting('copyright')`.
