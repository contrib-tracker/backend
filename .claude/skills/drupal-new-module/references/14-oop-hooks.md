# OOP Hook System (Drupal 11.1+, the only supported style in Drupal 12+)

Drupal 11.1 introduced the `#[Hook]` attribute. Hook implementations are methods on autowired classes in `src/Hook/` instead of magic-named functions in `.module` files. Drupal 12 is the first major that treats procedural hooks as legacy:

| Version | What changed |
|---|---|
| 11.1 | `#[Hook]` attribute, `#[LegacyHook]` shim, auto-registration of `src/Hook/` classes |
| 11.2 | `order:` parameter, `#[ReorderHook]`, `#[RemoveHook]`, `#[LegacyModuleImplementsAlter]`, OOP `hook_preprocess*` in modules, `hook_requirements()` replacements, `hooks_converted` renamed to `skip_procedural_hook_scan` |
| 11.3 | Themes support `#[Hook]` in `THEME/src/Hook/`; `hook_requirements()` formally deprecated |
| 11.4 | `dr` CLI; `#[Route]` attributes (not hooks, but the same "attributes over magic" direction) |
| 11.5 | `.module`, `.theme` and `.profile` files deprecated (autoloading removed in 13); `#[HookDependsOnModule]`; `#[ExtensionFileIsConverted]` |
| 12.0 | `hook_hook_info()` and `hook_module_implements_alter()` removed; procedural hooks are only collected from the main `.module`/`.theme` file, never from `.inc` files; a plugin manager must provide an attribute class |
| 13.0 (planned) | `.module`/`.theme`/`.profile` autoloading removed; annotation discovery removed |

**Standard:** every hook a module or theme implements is an `#[Hook]` method. New modules have no `.module` file at all. The only procedural code left lives in `.install` and `.post_update.php`.

## Why OOP Hooks?

| Procedural `.module` | OOP `#[Hook]` |
|---|---|
| No dependency injection, `\Drupal::` everywhere | Constructor autowiring |
| Global functions, one per hook | Classes, several implementations of one hook per module |
| Every `.module` file scanned at container build | Only registered services |
| Ordering via `hook_module_implements_alter()` (removed in 12) | `order:` parameter, `#[ReorderHook]`, `#[RemoveHook]` |
| Deprecated in 11.5, autoloading removed in 13 | The only supported style going forward |

## File Location

Classes in the `Drupal\my_module\Hook` namespace (any depth) are **discovered and registered as autowired services automatically**. No `services.yml` entry is needed; the service ID is the class name.

```
my_module/
  src/
    Hook/
      MyModuleHooks.php       # general hooks
      NodeHooks.php           # entity hooks
      FormHooks.php           # form alters
      MyModuleThemeHooks.php  # hook_theme() + initial preprocess callbacks
```

Split by concern rather than putting every hook in one class. A hook class with injected services that are only needed by one hook is a smell; move that hook to its own class.

## Basic Syntax

```php
namespace Drupal\my_module\Hook;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Hook\Attribute\Hook;
use Drupal\node\NodeInterface;

class MyModuleHooks {

  public function __construct(
    private readonly EntityTypeManagerInterface $entityTypeManager,
  ) {}

  #[Hook('node_presave')]
  public function nodePresave(NodeInterface $node): void {
    if ($node->bundle() === 'article') {
      // Pre-save logic using the injected service.
    }
  }

  #[Hook('cron')]
  public function cron(): void {
    // Cron logic with injected dependencies.
  }

}
```

Method names are free-form; the attribute carries the hook name. Keep the `Implements hook_NAME().` docblock line only if your tooling needs it (Rector's hook converter keys on it).

## Attribute Placement

```php
// A: on a method (most common)
class MyFormHooks {
  #[Hook('form_alter')]
  public function formAlter(array &$form, FormStateInterface $form_state, string $form_id): void {}
}

// B: on the class, naming the method
#[Hook('form_alter', method: 'alterForms')]
class MyFormHooks {
  public function alterForms(array &$form, FormStateInterface $form_state, string $form_id): void {}
}

// C: on an invokable class (cleanest for single-hook classes)
#[Hook('form_alter')]
class FormAlterHook {
  public function __invoke(array &$form, FormStateInterface $form_state, string $form_id): void {}
}
```

## One Method, Several Hooks; One Hook, Several Methods

```php
class MyModuleHooks {

  // Same method for insert and update.
  #[Hook('node_insert')]
  #[Hook('node_update')]
  public function nodeInsertOrUpdate(NodeInterface $node): void {}

  // Two independent form_alter implementations in the same module, each
  // with its own condition. Not possible with procedural hooks.
  #[Hook('form_alter')]
  public function hideAdminFields(array &$form, FormStateInterface $form_state, string $form_id): void {}

  #[Hook('form_alter')]
  public function attachTracking(array &$form, FormStateInterface $form_state, string $form_id): void {}

}
```

Exceptions: `hook_library_info_build()`, `hook_mail()`, `hook_help()` and `hook_node_update_index()` allow only one implementation per module.

## Dependency Injection in Hook Classes

Hook classes are autowired. Type-hint interfaces; use `#[Autowire]` when the type alone is ambiguous (logger channels, named cache bins, non-default services).

```php
namespace Drupal\my_module\Hook;

use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Hook\Attribute\Hook;
use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\Attribute\Autowire;

class MyModuleHooks {

  public function __construct(
    private readonly ConfigFactoryInterface $configFactory,
    #[Autowire(service: 'logger.channel.my_module')]
    private readonly LoggerInterface $logger,
  ) {}

  #[Hook('entity_presave')]
  public function entityPresave(EntityInterface $entity): void {
    if ($this->configFactory->get('my_module.settings')->get('auto_tag')) {
      $this->logger->info('Auto-tagging @type @id', [
        '@type' => $entity->getEntityTypeId(),
        '@id' => $entity->id(),
      ]);
    }
  }

}
```

Never call `\Drupal::service()` inside a hook class. If a service cannot be autowired, register the class manually in `services.yml` with explicit `arguments:`; the `#[Hook]` discovery still applies.

## Implementing a Hook on Behalf of Another Module

```php
// Acts as if `other_module` implemented hook_node_presave().
#[Hook('node_presave', module: 'other_module')]
public function otherModuleNodePresave(NodeInterface $node): void {}
```

## Conditional Hooks: `#[HookDependsOnModule]` (11.5+)

Register a hook (or a whole class) only when another module is installed. This replaces nullable injections plus `moduleExists()` checks, and lets you inject that module's services as required constructor properties.

```php
use Drupal\Core\Hook\Attribute\HookDependsOnModule;
use Drupal\search\SearchIndexInterface;

#[HookDependsOnModule('search')]
class SearchHooks {

  public function __construct(
    private readonly SearchIndexInterface $searchIndex,  // required, no `?`
  ) {}

  #[Hook('cron')]
  public function cron(): void {
    $this->searchIndex->clear('my_module_search');
  }

}
```

Stack several attributes to require several modules. The attribute also works on a single method.

## Hook Ordering (11.2+)

`hook_module_implements_alter()` is **removed in Drupal 12**. Use the `order:` parameter instead:

```php
use Drupal\Core\Hook\Attribute\Hook;
use Drupal\Core\Hook\Order\Order;
use Drupal\Core\Hook\Order\OrderAfter;
use Drupal\Core\Hook\Order\OrderBefore;

class MyModuleHooks {

  // Run after other_module's implementation.
  #[Hook('form_alter', order: new OrderAfter(modules: ['other_module']))]
  public function formAlter(array &$form, FormStateInterface $form_state, string $form_id): void {}

  // Run before a specific class method, not a whole module.
  #[Hook('node_presave', order: new OrderBefore(classesAndMethods: [[OtherHooks::class, 'nodePresave']]))]
  public function nodePresave(NodeInterface $node): void {}

  // First / last of all implementations.
  #[Hook('entity_bundle_info_alter', order: Order::First)]
  public function bundleInfoAlter(array &$bundles): void {}

  #[Hook('page_attachments', order: Order::Last)]
  public function pageAttachments(array &$page): void {}

}
```

Default order without `order:` is module weight, then alphabetical by module name. Procedural implementations of a module run before its OOP implementations. Dynamic (runtime-computed) ordering is not supported.

### Reordering or Removing Another Module's Implementation

```php
use Drupal\Core\Hook\Attribute\RemoveHook;
use Drupal\Core\Hook\Attribute\ReorderHook;
use Drupal\layout_builder\Hook\LayoutBuilderHooks;

// Push layout_builder's entity_view_alter to the end.
#[ReorderHook('entity_view_alter', class: LayoutBuilderHooks::class, method: 'entityViewAlter', order: Order::Last)]
// Stop another module's implementation from running at all.
#[RemoveHook('form_alter', class: OtherModuleHooks::class, method: 'formAlter')]
class MyModuleHooks {}
```

Both attributes go on a class (anywhere in `src/Hook/`). They target OOP implementations only, so the other module must already be converted.

## Preprocess and Theme Hooks in Modules (11.2+)

```php
class MyModuleThemeHooks {

  #[Hook('theme')]
  public function theme(): array {
    return [
      'my_module_widget' => [
        'variables' => ['data' => NULL, 'label' => ''],
        // Replaces template_preprocess_my_module_widget(). Any CallableResolver
        // callable works; static::class . ':method' keeps it on this service.
        'initial preprocess' => static::class . ':preprocessWidget',
      ],
    ];
  }

  public function preprocessWidget(array &$variables): void {
    $variables['label'] = $variables['label'] ?: 'Widget';
  }

  // hook_preprocess_HOOK() for a theme hook another module defines.
  #[Hook('preprocess_block')]
  public function preprocessBlock(array &$variables): void {}

  // hook_preprocess_HOOK() for a specific suggestion (double underscore).
  #[Hook('preprocess_block__my_module_block')]
  public function preprocessMyBlock(array &$variables): void {}

}
```

`hook_preprocess` and `hook_preprocess_HOOK` allow one implementation per module.

## OOP Hooks in Themes (11.3+)

Themes use the same attribute. Classes live in `THEME/src/Hook/`, namespace `Drupal\THEME\Hook`, and are autowired like module hook classes.

```php
// themes/custom/mytheme/src/Hook/MyThemeHooks.php
namespace Drupal\mytheme\Hook;

use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Hook\Attribute\Hook;

class MyThemeHooks {

  #[Hook('preprocess_node')]
  public function preprocessNode(array &$variables): void {
    $variables['theme_variable'] = 'computed';
  }

  #[Hook('theme_suggestions_node_alter')]
  public function themeSuggestionsNodeAlter(array &$suggestions, array $variables): void {
    $suggestions[] = 'node__' . $variables['elements']['#node']->bundle() . '__custom';
  }

  // Replaces theme-settings.php (deprecated in 11.5).
  #[Hook('form_system_theme_settings_alter')]
  public function themeSettingsAlter(array &$form, FormStateInterface $form_state): void {}

}
```

Theme limitations: no `order:` or `module:` parameters, no `#[ReorderHook]`/`#[RemoveHook]`, base theme hooks run before the active theme, hooks in inactive themes never run. Themes cannot define services, so helper classes in a theme use `\Drupal::service()` or the class resolver.

## Hooks That MUST Remain Procedural

These run before the container exists or are tied to the install/update system. They stay in `.install` and `.post_update.php`:

```
hook_install()               hook_uninstall()
hook_schema()                hook_update_N()
hook_post_update_NAME()      hook_removed_post_updates()
hook_update_last_removed()   hook_update_dependencies()
hook_install_tasks()         hook_install_tasks_alter()   (profiles; OOP replacement pending)
```

`hook_requirements()` is deprecated (11.3). Its replacements:

| Phase | Replacement |
|---|---|
| install | `src/Install/Requirements/MyModuleRequirements.php` implementing `InstallRequirementsInterface::getRequirements()` (static; runs without the full API) |
| runtime (status report) | `#[Hook('runtime_requirements')]` and `#[Hook('runtime_requirements_alter')]` |
| update | `#[Hook('update_requirements')]` and `#[Hook('update_requirements_alter')]` |

```php
use Drupal\Core\Extension\Requirement\RequirementSeverity;

#[Hook('runtime_requirements')]
public function runtimeRequirements(): array {
  return [
    'my_module_api' => [
      'title' => $this->t('My Module API'),
      'value' => $this->client->isReachable() ? $this->t('Reachable') : $this->t('Unreachable'),
      'severity' => $this->client->isReachable() ? RequirementSeverity::OK : RequirementSeverity::Error,
    ],
  ];
}
```

Severity is the `RequirementSeverity` enum (`Info`, `OK`, `Warning`, `Error`), not the old `REQUIREMENT_*` constants.

## Removed in Drupal 12

- `hook_hook_info()` and its `MODULE.GROUP.inc` autoloading. Move any remaining hook to a `#[Hook]` class.
- `hook_module_implements_alter()`. Use `order:`, `#[ReorderHook]`, `#[RemoveHook]`.
- Procedural hooks in any file other than the main `.module`/`.theme` file are **silently ignored**, even if the file is `require`d. Only `#[LegacyHook]`-marked shims may stay in include files.
- `ModuleHandler::getHookInfo()` and `::writeCache()`.

## The `.module` File Is Deprecated (11.5)

Every function left in a `.module`, `.theme` or `.profile` file triggers a deprecation in 11.5, and those files stop being autoloaded in Drupal 13. Convert and then delete the file:

| Was in `.module` | Goes to |
|---|---|
| Hook implementations | `#[Hook]` method |
| Hook helper functions | private/protected method on the hook class, or a service |
| Form `#submit`/`#validate` callbacks | `[$this, 'method']` or `static::class . '::method'` on a hook class or form class |
| Batch callbacks | static methods on a dedicated class (`[MyBatch::class, 'process']`) |
| `template_preprocess_HOOK()` | `'initial preprocess'` on the `hook_theme()` definition |
| Public API functions other projects call | a service; keep a deprecated wrapper function only while contrib callers exist |

If a `.module` file must remain for backward compatibility (dual-version contrib), add `#[ExtensionFileIsConverted]` to its first function to silence the deprecation. Only do this when the extension already works without the file on 11.3+.

## Performance Flags (Only While a `.module` File Exists)

Once no procedural hooks remain but the `.module` file still exists (for example because it holds `#[LegacyHook]` shims), tell the hook collector to skip scanning it. This is a **container parameter in `services.yml`**, not an `info.yml` key:

```yaml
# my_module.services.yml
parameters:
  my_module.skip_procedural_hook_scan: true
```

Alternatively, put `#[ProceduralHookScanStop]` on the first non-hook function in the `.module` file; scanning stops there. Do not set either while procedural hooks remain below that point; they would silently stop firing. Modules with no `.module` file need neither.

(`hooks_converted` and `StopProceduralHookScan` were the 11.1 names; they were renamed in 11.2.)

## Backward Compatibility Shim (Only for Contrib Supporting < 11.1)

```php
// src/Hook/MyModuleHooks.php — unchanged.

// my_module.module — procedural shim.
use Drupal\Core\Hook\Attribute\LegacyHook;
use Drupal\my_module\Hook\MyModuleHooks;

// On 11.1+ this function is skipped entirely; on 10.1–11.0 it delegates.
#[LegacyHook]
function my_module_node_presave(NodeInterface $node): void {
  \Drupal::service(MyModuleHooks::class)->nodePresave($node);
}
```

On Drupal 10.x the class is not auto-registered, so also add:

```yaml
# my_module.services.yml — only needed for Drupal 10.x compatibility
services:
  Drupal\my_module\Hook\MyModuleHooks:
    autowire: true
```

Site-specific custom code never needs this. Drop the shims as soon as the minimum supported core is 11.1 (hooks) or 11.3 (themes, preprocess, requirements).

## Common Hook Examples

### Form Alter with Submit Handler

```php
#[Hook('form_node_article_form_alter')]
public function formNodeArticleFormAlter(array &$form, FormStateInterface $form_state, string $form_id): void {
  $form['#submit'][] = [$this, 'nodeArticleSubmit'];
}

public function nodeArticleSubmit(array &$form, FormStateInterface $form_state): void {
  // Plain method, not a hook.
}
```

### Entity CRUD

```php
#[Hook('node_presave')]
public function nodePresave(NodeInterface $node): void {}

#[Hook('node_insert')]
public function nodeInsert(NodeInterface $node): void {}

#[Hook('entity_delete')]
public function entityDelete(EntityInterface $entity): void {}
```

### Cron with Queue

```php
public function __construct(
  private readonly QueueFactory $queueFactory,
) {}

#[Hook('cron')]
public function cron(): void {
  $this->queueFactory->get('my_module_queue')->createItem(['run' => time()]);
}
```

### Page Attachments

```php
#[Hook('page_attachments')]
public function pageAttachments(array &$page): void {
  $page['#attached']['library'][] = 'my_module/global-styling';
}
```

### Query Alter by Tag

```php
#[Hook('query_my_custom_tag_alter')]
public function queryMyCustomTagAlter(AlterableInterface $query): void {
  $query->condition('p.status', 1);
}
```

## Summary: When to Use What

| Situation | Use |
|---|---|
| Any hook in custom code targeting 11.1+ / 12 | `#[Hook]` method in `src/Hook/`; no `.module` file |
| Theme hooks, preprocess, suggestions, theme settings form | `#[Hook]` in `THEME/src/Hook/`; no `.theme` file |
| Run only when another module is installed | `#[HookDependsOnModule('module')]` |
| Ordering relative to other modules | `order: new OrderBefore()/OrderAfter()`, `Order::First`, `Order::Last` |
| Change or remove another module's implementation | `#[ReorderHook]`, `#[RemoveHook]` |
| Schema, install, update, post-update hooks | Procedural in `.install` / `.post_update.php` |
| Requirements checks | `InstallRequirementsInterface` + `runtime_requirements` / `update_requirements` hooks |
| Contrib that still supports Drupal 10.1–11.0 | `#[LegacyHook]` shim in `.module` + `#[ExtensionFileIsConverted]` |
| `.module` still present with no procedural hooks | `MODULE.skip_procedural_hook_scan: true` parameter |
