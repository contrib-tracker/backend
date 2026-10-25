# Caching

## The Three Cache Primitives

Every cacheable piece of data must declare all three:

| Primitive | Purpose | Example |
|---|---|---|
| **Cache Tags** | What data does this depend on? Invalidate when that data changes. | `['node:42', 'config:system.site']` |
| **Cache Contexts** | What request conditions does this vary with? | `['user.roles', 'url.query_args']` |
| **Max-age** | How long (in seconds) is this valid regardless of tags? | `3600`, `0` (never), `-1` (forever) |

## Cache Tags

```php
// Entity tags
$tags = $node->getCacheTags();          // ['node:42']
$tags = $config->getCacheTags();         // ['config:my_module.settings']

// Entity list tags (invalidated when any entity of this type is saved/deleted)
$tags = \Drupal::entityTypeManager()
  ->getDefinition('node')
  ->getListCacheTags();                  // ['node_list']

// Custom tag
$tags = ['my_module:dashboard'];

// Merge tags
$tags = Cache::mergeTags($tags1, $tags2);

// Invalidate by tags (cache.tags.invalidator service preferred)
Cache::invalidateTags(['node:42', 'my_module:dashboard']);
\Drupal::service('cache_tags.invalidator')->invalidateTags(['node:42']);
```

**Rules:**
- Add tags for every piece of data a render array depends on.
- Missing tags = stale content that doesn't update when data changes.
- Use entity `getCacheTags()` rather than constructing tag strings manually.

## Cache Contexts

```php
// Common contexts (ordered by cardinality — low cardinality = more cacheable)
'languages:language_interface'   // vary by interface language
'user.roles'                     // vary by role set (low-medium cardinality)
'route'                          // vary by route name
'url.path'                       // vary by current path
'url.query_args'                 // vary by all query parameters
'url.query_args:page'            // vary by a specific query parameter
'session'                        // vary by session (HIGH cardinality — effectively uncacheable)
'user'                           // vary by user ID (HIGH cardinality — effectively uncacheable)

// Merge contexts
$contexts = Cache::mergeContexts($contexts1, $contexts2);
```

**Rules:**
- **Prefer `user.roles` over `user`.** The `user` context creates one cache entry per user — effectively disabling the cache. Only use `user` when content truly varies per-individual.
- **Avoid `session` and `user` contexts in page cache.** They prevent page-level caching entirely.
- Missing contexts = wrong content shown to different users/languages/etc.

## Render Array Cache Metadata

```php
$build = [
  '#theme' => 'my_module_widget',
  '#data'  => $data,
  '#cache' => [
    'tags'     => Cache::mergeTags($node->getCacheTags(), ['my_module:widget']),
    'contexts' => ['user.roles', 'languages:language_interface'],
    'max-age'  => Cache::PERMANENT,  // -1 = permanent; 0 = never cache
  ],
];
```

## Block Plugin Cache Methods

```php
class MyBlock extends BlockBase {
  public function getCacheContexts(): array {
    return Cache::mergeContexts(
      parent::getCacheContexts(),
      ['user.roles']
    );
  }

  public function getCacheTags(): array {
    $tags = parent::getCacheTags();
    foreach ($this->getItems() as $item) {
      $tags = Cache::mergeTags($tags, $item->getCacheTags());
    }
    return $tags;
  }

  public function getCacheMaxAge(): int {
    return Cache::PERMANENT;
  }
}
```

## Access Result Cacheability

```php
$access = AccessResult::allowed();
$access->addCacheableDependency($config);        // inherits tags from config
$access->addCacheContexts(['user.roles']);
$access->setCacheMaxAge(0);                      // uncacheable
```

Always add cache contexts to access results. If you don't, the first user's access check is cached for everyone.

## Lazy Builders (For Uncacheable Components)

Use lazy builders when a small part of a page is user-specific (max-age=0) but the rest is cacheable:

```php
// In a block's build() or a render array
$build = [
  '#lazy_builder' => ['my_module.lazy_builder:renderPersonalized', [$node_id]],
  '#create_placeholder' => TRUE,
];
```

The lazy builder class must implement `TrustedCallbackInterface`:

```php
use Drupal\Core\Security\TrustedCallbackInterface;

class MyLazyBuilder implements TrustedCallbackInterface {
  public static function trustedCallbacks(): array {
    return ['renderPersonalized'];
  }

  public function renderPersonalized(int $node_id): array {
    return [
      '#markup' => 'Welcome, ' . $this->currentUser->getDisplayName(),
      '#cache'  => ['max-age' => 0],
    ];
  }
}
```

Register as a service:
```yaml
my_module.lazy_builder:
  class: Drupal\my_module\MyLazyBuilder
  arguments: ['@current_user']
```

**Why:** Without lazy builders, a single `max-age: 0` in a deeply nested element poisons the cache of the entire page. With lazy builders, Drupal extracts the uncacheable part, serves everything else from cache, and fills in the placeholder via a subrequest or BigPipe.

## Cache Bubbling

Cache metadata bubbles up automatically through the render tree. Child render arrays' tags and contexts propagate to parents.

**Critical: `|without()` filter in Twig**

```twig
{# WRONG — silently drops cache metadata from excluded fields #}
{{ content.field_title }}
{{ content.field_body }}

{# CORRECT — renders remaining fields and preserves ALL cache metadata #}
{{ content|without('field_image', 'field_tags') }}
```

The `|without` filter removes fields from rendering output but keeps their cache metadata bubbling upward.

## Cache Bins

```php
// Default bin
$cache = \Drupal::cache();

// Specific bins
$cache = \Drupal::cache('render');    // rendered output
$cache = \Drupal::cache('data');      // data
$cache = \Drupal::cache('discovery'); // plugin discovery
$cache = \Drupal::cache('bootstrap'); // bootstrap config
$cache = \Drupal::cache('config');    // configuration
$cache = \Drupal::cache('menu');      // menu trees
$cache = \Drupal::cache('page');      // full page cache
$cache = \Drupal::cache('memory');    // per-request memory bin — replaces drupal_static()
$cache = \Drupal::cache('my_bin');    // custom bin

// Read
$item = $cache->get('my_cid');
if ($item !== FALSE) {
  $data = $item->data;
}

// Write (tags for invalidation, PERMANENT or seconds for expiry)
$cache->set('my_cid', $data, Cache::PERMANENT, ['node:42']);
$cache->set('my_cid', $data, time() + 3600, ['node:42']); // expires in 1 hour

// Delete
$cache->delete('my_cid');
$cache->deleteAll();         // all entries in this bin

// Invalidate by tags
Cache::invalidateTags(['node:42']);
```

### Custom Cache Bin

```yaml
# my_module.services.yml
cache.my_bin:
  class: Drupal\Core\Cache\CacheBackendInterface
  tags:
    - { name: cache.bin }
  factory: cache_factory:get
  arguments: [my_bin]
```

```php
// Inject with @cache.my_bin
$this->cache = $container->get('cache.my_bin');
```

### Per-Request Static Caching

`drupal_static()` and `drupal_static_reset()` are deprecated in 11.5. Keep per-request results in a property on the service, or in the `memory` cache bin when several services share them:

```php
// Was: $cache = &drupal_static(__FUNCTION__, []);
$memory = \Drupal::cache('memory');          // inject 'cache.memory' in classes
if ($item = $memory->get('my_module:labels')) {
  return $item->data;
}
$memory->set('my_module:labels', $labels);
// Was: drupal_static_reset('my_function');
$memory->delete('my_module:labels');
```

## Development: Disable Caching

In `settings.local.php`:

```php
$settings['cache']['bins']['render'] = 'cache.backend.null';
$settings['cache']['bins']['page'] = 'cache.backend.null';
$settings['cache']['bins']['dynamic_page_cache'] = 'cache.backend.null';
```

Also enable Twig debug and disable Twig caching in `services.local.yml`:

```yaml
parameters:
  twig.config:
    debug: true
    auto_reload: true
    cache: false
```

**Never disable caches in production.**

## Invalidating Plugin Caches

After changing plugin attributes or YAML definitions:

```php
\Drupal::service('plugin.manager.block')->clearCachedDefinitions();
// Or clear all caches:
drupal_flush_all_caches();
```
