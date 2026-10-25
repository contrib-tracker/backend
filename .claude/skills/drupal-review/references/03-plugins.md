# Plugin System

## PHP Attributes vs Doctrine Annotations

**Standard: PHP native attributes.** Doctrine annotation-based discovery (`@Block(...)` in docblocks) is deprecated and must not appear in new code. The timeline:

- 10.2: attribute classes exist for core plugin types.
- 11.2: a plugin type that offers no attribute class is deprecated.
- 11.3: `doctrine/annotations` was abandoned upstream; core forked the parts it still needs.
- **12.0: every plugin manager must be constructed with an attribute class.** An annotation class may still be passed alongside it for contrib that supports older cores.
- 13.0: annotation-based plugin definitions are removed.

| Old (Drupal 8–10, deprecated) | New (standard) |
|---|---|
| `@Block(id = "x", ...)` in docblock | `#[Block(id: 'x', ...)]` before `class` |
| `@Translation("text")` | `new TranslatableMarkup('text')` |
| `=` key-value assignment | `:` named argument syntax |
| No `use` needed | Explicit `use` import required |

## Plugin Types and Locations

| Plugin Type | Attribute Class | Plugin Directory |
|---|---|---|
| Block | `Drupal\Core\Block\Attribute\Block` | `src/Plugin/Block/` |
| QueueWorker | `Drupal\Core\Queue\Attribute\QueueWorker` | `src/Plugin/QueueWorker/` |
| FieldType | `Drupal\Core\Field\Attribute\FieldType` | `src/Plugin/Field/FieldType/` |
| FieldWidget | `Drupal\Core\Field\Attribute\FieldWidget` | `src/Plugin/Field/FieldWidget/` |
| FieldFormatter | `Drupal\Core\Field\Attribute\FieldFormatter` | `src/Plugin/Field/FieldFormatter/` |
| Action | `Drupal\Core\Action\Attribute\Action` | `src/Plugin/Action/` |
| Condition | `Drupal\Core\Condition\Attribute\Condition` | `src/Plugin/Condition/` |
| ContentEntityType | `Drupal\Core\Entity\Attribute\ContentEntityType` | `src/Entity/` |
| ConfigEntityType | `Drupal\Core\Entity\Attribute\ConfigEntityType` | `src/Entity/` |
| RestResource | `Drupal\rest\Attribute\RestResource` | `src/Plugin/rest/resource/` |
| ViewsField | `Drupal\views\Attribute\ViewsField` | `src/Plugin/views/field/` |
| ViewsFilter | `Drupal\views\Attribute\ViewsFilter` | `src/Plugin/views/filter/` |
| ViewsSort | `Drupal\views\Attribute\ViewsSort` | `src/Plugin/views/sort/` |
| ViewsRelationship | `Drupal\views\Attribute\ViewsRelationship` | `src/Plugin/views/relationship/` |
| ViewsDisplay | `Drupal\views\Attribute\ViewsDisplay` | `src/Plugin/views/display/` |
| ViewsWizard | `Drupal\views\Attribute\ViewsWizard` | `src/Plugin/views/wizard/` |

Plugin discovery is automatic — no `services.yml` entry needed for built-in plugin types.

---

## Block Plugin

```php
namespace Drupal\my_module\Plugin\Block;

use Drupal\Core\Block\Attribute\Block;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Access\AccessResult;
use Drupal\Core\StringTranslation\TranslatableMarkup;
use Symfony\Component\DependencyInjection\ContainerInterface;

#[Block(
  id: 'my_module_example_block',
  admin_label: new TranslatableMarkup('My example block'),
  category: new TranslatableMarkup('Custom'),
)]
class ExampleBlock extends BlockBase implements ContainerFactoryPluginInterface {

  public function __construct(
    array $configuration,
    string $plugin_id,
    mixed $plugin_definition,
    private readonly MyService $myService,
  ) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
  }

  public static function create(
    ContainerInterface $container,
    array $configuration,
    string $plugin_id,
    mixed $plugin_definition,
  ): static {
    return new static(
      $configuration, $plugin_id, $plugin_definition,
      $container->get('my_module.my_service'),
    );
  }

  public function defaultConfiguration(): array {
    return ['greeting' => 'Hello'];
  }

  public function blockForm($form, $form_state): array {
    $form['greeting'] = [
      '#type'          => 'textfield',
      '#title'         => $this->t('Greeting'),
      '#default_value' => $this->configuration['greeting'],
    ];
    return $form;
  }

  public function blockSubmit($form, $form_state): void {
    $this->configuration['greeting'] = $form_state->getValue('greeting');
  }

  public function build(): array {
    return [
      '#lazy_builder'       => ['my_module.lazy_builder:render', []],
      '#create_placeholder' => TRUE,
    ];
  }

  protected function blockAccess(AccountInterface $account): AccessResult {
    return AccessResult::allowedIfHasPermission($account, 'access content');
  }
}
```

**Legacy (deprecated) annotation form — do not use in new code:**
```php
/**
 * @Block(
 *   id = "my_module_example_block",
 *   admin_label = @Translation("My example block"),
 *   category = @Translation("Custom")
 * )
 */
```

---

## QueueWorker Plugin

```php
namespace Drupal\my_module\Plugin\QueueWorker;

use Drupal\Core\Queue\Attribute\QueueWorker;
use Drupal\Core\Queue\QueueWorkerBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\StringTranslation\TranslatableMarkup;
use Symfony\Component\DependencyInjection\ContainerInterface;

#[QueueWorker(
  id: 'my_module_queue',
  title: new TranslatableMarkup('My queue worker'),
  cron: ['time' => 30],   // max seconds per cron invocation
)]
class MyQueueWorker extends QueueWorkerBase implements ContainerFactoryPluginInterface {

  public function __construct(
    array $configuration,
    string $plugin_id,
    mixed $plugin_definition,
    private readonly MyService $myService,
  ) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
  }

  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition): static {
    return new static($configuration, $plugin_id, $plugin_definition,
      $container->get('my_module.my_service'));
  }

  public function processItem(mixed $data): void {
    // Throw \Exception to log and retry after lease expiry.
    // Throw SuspendQueueException to stop the queue for this cron run.
    $this->myService->process($data->id);
  }
}
```

---

## FieldType Plugin

```php
namespace Drupal\my_module\Plugin\Field\FieldType;

use Drupal\Core\Field\Attribute\FieldType;
use Drupal\Core\Field\FieldItemBase;
use Drupal\Core\Field\FieldStorageDefinitionInterface;
use Drupal\Core\StringTranslation\TranslatableMarkup;
use Drupal\Core\TypedData\DataDefinition;

#[FieldType(
  id: 'license_plate',
  label: new TranslatableMarkup('License plate'),
  description: new TranslatableMarkup('Stores a vehicle license plate code and number.'),
  category: 'custom',
  default_widget: 'default_license_plate_widget',
  default_formatter: 'default_license_plate_formatter',
)]
class LicensePlate extends FieldItemBase {

  public static function schema(FieldStorageDefinitionInterface $field_definition): array {
    return [
      'columns' => [
        'code'   => ['type' => 'varchar', 'length' => 5,   'not null' => TRUE, 'default' => ''],
        'number' => ['type' => 'varchar', 'length' => 10,  'not null' => TRUE, 'default' => ''],
      ],
    ];
  }

  public static function propertyDefinitions(FieldStorageDefinitionInterface $field_definition): array {
    return [
      'code'   => DataDefinition::create('string')->setLabel(new TranslatableMarkup('Code')),
      'number' => DataDefinition::create('string')->setLabel(new TranslatableMarkup('Number')),
    ];
  }
}
```

**Note:** `schema()` and `propertyDefinitions()` must define the exact same columns.
FieldType plugins cannot use constructor DI (they extend TypedData) — use `\Drupal::service()` where needed.

---

## FieldWidget Plugin

```php
namespace Drupal\my_module\Plugin\Field\FieldWidget;

use Drupal\Core\Field\Attribute\FieldWidget;
use Drupal\Core\Field\WidgetBase;
use Drupal\Core\StringTranslation\TranslatableMarkup;

#[FieldWidget(
  id: 'default_license_plate_widget',
  label: new TranslatableMarkup('Default license plate widget'),
  field_types: ['license_plate'],
)]
class DefaultLicensePlateWidget extends WidgetBase {
  // Implement formElement(), settingsForm(), settingsSummary()
}
```

---

## FieldFormatter Plugin

```php
namespace Drupal\my_module\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\Attribute\FieldFormatter;
use Drupal\Core\Field\FormatterBase;
use Drupal\Core\StringTranslation\TranslatableMarkup;

#[FieldFormatter(
  id: 'default_license_plate_formatter',
  label: new TranslatableMarkup('Default license plate'),
  field_types: ['license_plate'],
)]
class DefaultLicensePlateFormatter extends FormatterBase {
  // Implement viewElements(), settingsForm(), settingsSummary()
}
```

---

## Action Plugin

```php
use Drupal\Core\Action\Attribute\Action;
use Drupal\Core\StringTranslation\TranslatableMarkup;

#[Action(
  id: 'my_module_publish_action',
  label: new TranslatableMarkup('Publish content'),
  type: 'node',
  category: new TranslatableMarkup('Custom'),
)]
class PublishAction extends ActionBase implements ContainerFactoryPluginInterface {
  public function execute(mixed $entity = NULL): void {
    $entity->setPublished()->save();
  }
}
```

---

## Condition Plugin

```php
use Drupal\Core\Condition\Attribute\Condition;
use Drupal\Core\StringTranslation\TranslatableMarkup;

#[Condition(
  id: 'my_condition',
  label: new TranslatableMarkup('My condition'),
)]
class MyCondition extends ConditionPluginBase {
  public function evaluate(): bool { /* ... */ }
  public function summary(): string { /* ... */ }
}
```

---

## Creating a Custom Plugin Type

### 1. Attribute Class (`src/Attribute/Importer.php`)

Define the attribute as a native PHP `#[Attribute]` class. Do not create an `src/Annotation/` class for a new plugin type:

```php
namespace Drupal\products\Attribute;

use Drupal\Component\Plugin\Attribute\Plugin;
use Drupal\Core\StringTranslation\TranslatableMarkup;

#[\Attribute(\Attribute::TARGET_CLASS)]
class Importer extends Plugin {

  public function __construct(
    public readonly string $id,
    public readonly TranslatableMarkup $label,
    public readonly ?string $product_type = NULL,
    public readonly ?string $deriver = NULL,
  ) {}
}
```

### 2. Plugin Interface (`src/Plugin/ImporterPluginInterface.php`)

```php
namespace Drupal\products\Plugin;

interface ImporterPluginInterface {
  public function import(ImporterInterface $importer): bool;
}
```

### 3. Plugin Manager (`src/ImporterManager.php`)

```php
namespace Drupal\products;

use Drupal\Core\Plugin\DefaultPluginManager;
use Drupal\Core\Cache\CacheBackendInterface;
use Drupal\Core\Extension\ModuleHandlerInterface;
use Drupal\products\Attribute\Importer;

class ImporterManager extends DefaultPluginManager {

  public function __construct(
    \Traversable $namespaces,
    CacheBackendInterface $cache_backend,
    ModuleHandlerInterface $module_handler,
  ) {
    parent::__construct(
      'Plugin/Importer',                               // subdirectory
      $namespaces,
      $module_handler,
      ImporterPluginInterface::class,                  // interface (use ::class)
      Importer::class,                                 // attribute class (use ::class)
    );
    $this->alterInfo('products_importer_info');        // defines hook_products_importer_info_alter
    $this->setCacheBackend($cache_backend, 'products_importer_plugins'); // REQUIRED
  }
}
```

### 4. Register Manager as Service

```yaml
# products.services.yml
products.importer_manager:
  class: Drupal\products\ImporterManager
  arguments: ['@container.namespaces', '@cache.discovery', '@module_handler']
```

### 5. Plugin Implementation

```php
namespace Drupal\csv_importer\Plugin\Importer;

use Drupal\products\Attribute\Importer;
use Drupal\Core\StringTranslation\TranslatableMarkup;

#[Importer(
  id: 'csv',
  label: new TranslatableMarkup('CSV Importer'),
  product_type: 'default',
)]
class CsvImporter extends PluginBase implements ImporterPluginInterface, ContainerFactoryPluginInterface {
  // ...
}
```

### 6. Use the Plugin Manager

```php
$manager = \Drupal::service('products.importer_manager');
$instance = $manager->createInstance('csv', ['config' => $config]);
$instance->import($importer_entity);
```

**Rules:**
- Pass the attribute class as the fifth argument to `DefaultPluginManager::__construct()`. In Drupal 12 this argument is mandatory; a manager without it is a fatal error.
- Always call `$this->setCacheBackend()`. Without it, Drupal re-scans the filesystem every request.
- Always call `$this->alterInfo('hook_name')` to provide a module alter hook.
- Contrib that still supports Drupal 10.x may pass the annotation class as the sixth argument as well; both forms are discovered until Drupal 13. Custom site code never needs this.

---

## Altering Plugin Definitions

```php
// src/Hook/MyModulePluginHooks.php — see 14-oop-hooks.md
use Drupal\Core\Hook\Attribute\Hook;
use Drupal\Core\StringTranslation\TranslatableMarkup;

class MyModulePluginHooks {

  #[Hook('block_alter')]
  public function blockAlter(array &$definitions): void {
    if (isset($definitions['system_main_block'])) {
      $definitions['system_main_block']['admin_label'] = new TranslatableMarkup('Main content');
    }
  }

  // Alter hook for the custom plugin type defined above.
  #[Hook('products_importer_info_alter')]
  public function importerInfoAlter(array &$definitions): void {
    // modify definitions
  }

}
```

---

## Plugin Manager Cache Invalidation

```php
\Drupal::service('plugin.manager.block')->clearCachedDefinitions();
// Or to clear everything:
drupal_flush_all_caches();
```
