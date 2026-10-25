# Preprocess Hooks and Template Suggestions

## Where Theme PHP Lives Now

Since Drupal 11.3 themes implement hooks the same way modules do: `#[Hook]` methods on classes in `THEME/src/Hook/` (namespace `Drupal\THEME\Hook`), autowired. The `.theme` file is deprecated in 11.5 and stops being autoloaded in Drupal 13; `theme-settings.php` is deprecated in 11.5 too. In Drupal 12 a hook function placed in any other file (`includes/*.inc`, `*.php`) is **silently ignored**.

```php
// themes/custom/mytheme/src/Hook/MyThemePreprocessHooks.php
declare(strict_types=1);

namespace Drupal\mytheme\Hook;

use Drupal\Core\Datetime\DateFormatterInterface;
use Drupal\Core\Hook\Attribute\Hook;

class MyThemePreprocessHooks {

  public function __construct(
    private readonly DateFormatterInterface $dateFormatter,
  ) {}

  #[Hook('preprocess_node')]
  public function preprocessNode(array &$variables): void {
    $variables['display_date'] = $this->dateFormatter
      ->format($variables['node']->getCreatedTime(), 'medium');
  }

}
```

Review flags:
- A `.theme` file with hook functions in it: standards violation (deprecated). Recommend converting with the core Rector rule and deleting the file. `#[ExtensionFileIsConverted]` is only acceptable in contrib themes that must support Drupal < 11.3.
- Hook functions in `.inc` files or `includes/`: **critical** on Drupal 12, they do not run.
- `\Drupal::service()` inside a hook class: standards violation, inject it (theme hook classes are autowired). Static calls are only acceptable in theme helper classes, since themes cannot define services.
- Theme hook attributes using `order:` or `module:`, or `#[ReorderHook]`/`#[RemoveHook]` in a theme: not supported for themes; the hook will not behave as written.

## What Preprocess Is For

Preprocess methods add or modify variables available in Twig templates. Their job is display logic, transforming data into a form Twig can use, not business logic.

**Wrong use of preprocess:**
- Fetching entities from the database and applying business rules
- Sending emails or triggering side effects
- Performing access control decisions

**Right use of preprocess:**
- Formatting dates for display
- Combining fields into a convenient variable
- Passing `drupalSettings` to JavaScript
- Exposing a block content entity to its template

## Preprocess Patterns

```php
class MyThemePreprocessHooks {

  public function __construct(
    private readonly ConfigFactoryInterface $configFactory,
    private readonly RequestStack $requestStack,
  ) {}

  // Add a variable to a specific region
  #[Hook('preprocess_region')]
  public function preprocessRegion(array &$variables): void {
    if ($variables['region'] === 'footer') {
      $config = $this->configFactory->get('system.site');
      $variables['site_name'] = $config->get('name');
      $variables['copyright'] = theme_get_setting('copyright');
      CacheableMetadata::createFromObject($config)->applyTo($variables);
    }
  }

  // Expose a block content entity to the block template
  #[Hook('preprocess_block')]
  public function preprocessBlock(array &$variables): void {
    if (isset($variables['elements']['content']['#block_content'])) {
      $variables['block_content'] = $variables['elements']['content']['#block_content'];
    }
  }

  // Pass data to JavaScript via drupalSettings
  #[Hook('preprocess_page')]
  public function preprocessPage(array &$variables): void {
    $variables['#attached']['drupalSettings']['mytheme']['apiBase'] =
      $this->requestStack->getCurrentRequest()->getBaseUrl();
  }

}
```

## Common Preprocess Mistakes

**Long preprocess methods.** If a preprocess method exceeds ~20 lines or contains complex entity logic, extract to a bundle class or a module service.

**Missing specificity.** Always use the most specific hook available:
```php
// PREFER — runs only for article nodes
#[Hook('preprocess_node__article')]
public function preprocessArticle(array &$variables): void {}

// AVOID — runs for all nodes, requires a bundle check inside
#[Hook('preprocess_node')]
public function preprocessNode(array &$variables): void {
  if ($variables['node']->bundle() === 'article') { /* ... */ }
}
```

**Hiding fields with `hide()`.** `hide()` and `show()` are deprecated since 11.4. Use `{{ content|without('field_x') }}` in Twig, or set `$variables['content']['field_x']['#printed'] = TRUE` in preprocess when Twig cannot do it.

**Untyped signatures.** `function mytheme_preprocess_node(&$variables)` without `array` and `: void` is the old style; the OOP method is `public function preprocessNode(array &$variables): void`.

## Template Suggestion Hooks

```php
class MyThemeSuggestionsHooks {

  public function __construct(
    private readonly PathMatcherInterface $pathMatcher,
    private readonly RouteMatchInterface $routeMatch,
  ) {}

  // Add suggestion based on block content bundle
  #[Hook('theme_suggestions_block_alter')]
  public function blockSuggestions(array &$suggestions, array $variables): void {
    if (isset($variables['elements']['content']['#block_content'])) {
      $bundle = $variables['elements']['content']['#block_content']->bundle();
      $suggestions[] = 'block__' . $bundle;
    }
  }

  // Add suggestion based on current path
  #[Hook('theme_suggestions_region_alter')]
  public function regionSuggestions(array &$suggestions, array $variables): void {
    if ($this->pathMatcher->isFrontPage()) {
      $suggestions[] = 'region__' . $variables['elements']['#region'] . '__front';
    }
  }

  // Add suggestion to page template based on node bundle
  #[Hook('theme_suggestions_page_alter')]
  public function pageSuggestions(array &$suggestions, array $variables): void {
    $node = $this->routeMatch->getParameter('node');
    if ($node instanceof NodeInterface) {
      $suggestions[] = 'page__' . $node->bundle();
    }
  }

}
```

## Cache Metadata in Preprocess

When you add a variable based on data that can change, you must also declare the cache dependency. Otherwise Drupal caches the page and never refreshes the variable.

```php
#[Hook('preprocess_block')]
public function preprocessBlock(array &$variables): void {
  $config = $this->configFactory->get('system.site');
  $variables['site_name'] = $config->get('name');

  // Declare that this output depends on this config object
  CacheableMetadata::createFromObject($config)->applyTo($variables);
}
```

Without `applyTo()`, if `system.site` changes, the block stays stale until the cache is manually cleared. The same applies to referenced entities pulled in from preprocess (`$node->getOwner()`, `$tag->entity`): add their cache tags or render the field instead.

## Using Bundle Classes

For complex entity-specific logic, use bundle classes rather than long preprocess methods. A bundle class is registered by a module (not the theme), from a `#[Hook('entity_bundle_info_alter')]` implementation:

```php
// modules/custom/my_module/src/Entity/Article.php
class Article extends Node {
  public function getReadingTime(): int {
    $words = str_word_count($this->get('body')->value);
    return (int) ceil($words / 200);
  }
}

// modules/custom/my_module/src/Hook/MyModuleEntityHooks.php
#[Hook('entity_bundle_info_alter')]
public function bundleInfoAlter(array &$bundles): void {
  $bundles['node']['article']['class'] = Article::class;
}
```

```twig
{# node--article.html.twig #}
{{ node.readingTime }} min read
```

This keeps preprocess methods thin and makes entity-specific methods reusable across the theme and modules.
