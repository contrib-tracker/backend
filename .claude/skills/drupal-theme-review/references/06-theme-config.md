# Theme Configuration (info.yml, theme settings, breakpoints, tokens)

## theme.info.yml — Required Fields

```yaml
name: My Theme
type: theme
base theme: false               # Starterkit-generated themes have no runtime base theme
core_version_requirement: ^11.5 || ^12
description: 'Custom theme for Example project'
package: Custom

regions:
  header: Header
  breadcrumb: Breadcrumb
  help: Help
  content: Content        # REQUIRED — blocks that fill "main content" go here
  sidebar_first: 'Sidebar first'
  footer: Footer
  page_top: 'Page top'   # used by navigation, messages; typically hidden from editors
  page_bottom: 'Page bottom'

libraries:
  - mytheme/base           # attach these to every page

ckeditor5-stylesheets:
  - build/editor.css       # styles loaded in the CKEditor 5 editing frame
```

### Base Theme Guidance (Drupal 12)

| Base theme | When to use |
|---|---|
| `false` (Starterkit-generated) | New front-end themes. `generate-theme` copies Starterkit's templates and CSS into the theme so nothing is inherited at runtime. |
| `default_admin` | Admin sub-themes. Default Admin is the core admin theme in Drupal 12 and the Standard profile's default front-end theme. |
| `olivero`, `claro`, `stable9` | **Removed from core in 12.0.** Only valid when the contrib project (`drupal/olivero`, `drupal/claro`, `drupal/stable9`) is required in `composer.json`. Flag any new theme starting on these. |
| `classy`, `stable`, `bartik`, `seven` | Removed in Drupal 10/11. Contrib copies exist but are legacy. |

Generate from starterkit:
```bash
vendor/bin/dr generate-theme mytheme --path themes/custom
```

`php core/scripts/drupal generate-theme` is deprecated since 11.4.

### core_version_requirement

- `^11.5 || ^12` for themes written now. OOP theme hooks need 11.3, design tokens and library `before`/`after` need 11.5.
- `^10 || ^11` on a theme that uses `src/Hook/` is wrong: it will fatal on Drupal 10.
- A theme with a `.theme` file and `core_version_requirement: ^12` has not finished its conversion.

### libraries-override and libraries-extend

```yaml
# Disable core libraries you're replacing entirely
libraries-override:
  core/normalize: false

# Replace a specific file within a library
libraries-override:
  default_admin/global-styling:
    css:
      theme:
        css/theme/colors.css: css/my-colors.css

# Attach your library whenever another library loads (for targeted style overrides)
libraries-extend:
  user/drupal.user:
    - mytheme/user-styles
  core/drupal.dialog:
    - mytheme/dialog-overrides
```

`libraries-extend` is cleaner than global CSS for overriding contrib module styles — it only loads when needed. Overrides that reference `bartik/*`, `olivero/*` or `claro/*` libraries break when those themes are absent.

## Theme Settings

### Settings form (replaces theme-settings.php)

`theme-settings.php` is deprecated in 11.5. The form alter is a hook class method:

```php
// src/Hook/MyThemeSettingsHooks.php
declare(strict_types=1);

namespace Drupal\mytheme\Hook;

use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Hook\Attribute\Hook;
use Drupal\Core\StringTranslation\StringTranslationTrait;

class MyThemeSettingsHooks {

  use StringTranslationTrait;

  #[Hook('form_system_theme_settings_alter')]
  public function themeSettingsAlter(array &$form, FormStateInterface $form_state): void {
    $form['mytheme_settings'] = [
      '#type'  => 'details',
      '#title' => $this->t('My Theme Settings'),
      '#open'  => TRUE,
    ];
    $form['mytheme_settings']['copyright'] = [
      '#type'          => 'textfield',
      '#title'         => $this->t('Copyright text'),
      '#default_value' => theme_get_setting('copyright'),
      '#required'      => TRUE,
    ];
    $form['mytheme_settings']['show_breadcrumb'] = [
      '#type'          => 'checkbox',
      '#title'         => $this->t('Show breadcrumb'),
      '#default_value' => theme_get_setting('show_breadcrumb') ?? TRUE,
    ];
  }

}
```

Review flag: a `theme-settings.php` file, or `THEME_form_system_theme_settings_alter()` in the `.theme` file, is a standards violation. Note that `#required` only validates server-side; HTML5 validation is off by default in Drupal 12.

### config/install/mytheme.settings.yml

Default values for all custom settings, installed when the theme is enabled:

```yaml
copyright: '© 2026 My Company'
show_breadcrumb: true
logo_path: ''
```

### config/schema/mytheme.schema.yml

Schema is required for config to pass validation and be exportable:

```yaml
mytheme.settings:
  type: theme_settings
  label: 'My Theme settings'
  mapping:
    copyright:
      type: string
      label: 'Copyright text'
    show_breadcrumb:
      type: boolean
      label: 'Show breadcrumb on all pages'
    logo_path:
      type: string
      label: 'Custom logo path'
```

Missing schema means `drush config:export` will warn about unknown config keys, and the Drupal status page may flag validation errors.

### Reading theme settings

```php
// In preprocess hooks
$copyright = theme_get_setting('copyright');
$show_breadcrumb = (bool) theme_get_setting('show_breadcrumb');
```

## Design Tokens (mytheme.tokens.yml, 11.5+)

Tokens in DTCG format become CSS custom properties, and sites can override them per scope through `design_token` config entities. Reviewers should check that tokens, not hardcoded values, back anything the Default Admin theme or site builders are expected to tune.

```yaml
# mytheme.tokens.yml
corner-radius-small:
  $type: dimension
  $value: { value: 4, unit: px }
font-family-base:
  $type: fontFamily
  $value: ['Inter', 'sans-serif']
```

Supported `$type` values today: `dimension`, `fontFamily`, `fontWeight`, `number`, `typography`.

## Breakpoints (mytheme.breakpoints.yml)

```yaml
mytheme.mobile:
  label: Mobile
  mediaQuery: 'all and (min-width: 0px)'
  weight: 0
  multipliers: ['1x']

mytheme.sm:
  label: Small
  mediaQuery: 'all and (min-width: 576px)'
  weight: 1
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

mytheme.xl:
  label: Extra Large
  mediaQuery: 'all and (min-width: 1280px)'
  weight: 4
  multipliers: ['1x', '2x']
```

Breakpoints defined here appear in the responsive image style UI at `/admin/config/media/responsive-image-style`. The `multipliers` array enables HiDPI (retina) image styles.

**Rules:**
- Order by weight ascending (smallest screen first)
- Use `min-width` (mobile-first)
- `multipliers: ['1x', '2x']` for breakpoints where HiDPI images are worth the cost (typically `lg` and above)
