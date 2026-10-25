# Entity API

## Content Entity vs Config Entity

| | Content Entity | Config Entity |
|---|---|---|
| Base class | `ContentEntityBase` | `ConfigEntityBase` |
| Interface | `ContentEntityInterface` | `ConfigEntityInterface` |
| Storage | Database tables | Config system (YAML) |
| Fieldable | Yes (with bundles) | No |
| Revisionable | Yes | No |
| Translatable | Yes | Yes (via Config Translation) |
| Use for | Nodes, users, taxonomy terms, custom data entities | Image styles, views, roles, text formats, custom settings entities |
| UUID in entity_keys | Required | Required |

## Content Entity Definition

Entity types are declared with PHP attributes. The Doctrine annotation form is deprecated and removed in Drupal 13; never use it in new entities.

```php
namespace Drupal\products\Entity;

use Drupal\Core\Entity\Attribute\ContentEntityType;
use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\Core\StringTranslation\TranslatableMarkup;

#[ContentEntityType(
  id: 'product',
  label: new TranslatableMarkup('Product'),
  label_collection: new TranslatableMarkup('Products'),
  label_singular: new TranslatableMarkup('product'),
  label_plural: new TranslatableMarkup('products'),
  handlers: [
    'view_builder'  => 'Drupal\Core\Entity\EntityViewBuilder',
    'list_builder'  => 'Drupal\products\ProductListBuilder',
    'form' => [
      'default' => 'Drupal\products\Form\ProductForm',
      'add'     => 'Drupal\products\Form\ProductForm',
      'edit'    => 'Drupal\products\Form\ProductForm',
      'delete'  => 'Drupal\Core\Entity\ContentEntityDeleteForm',
    ],
    'route_provider' => [
      'html' => 'Drupal\Core\Entity\Routing\AdminHtmlRouteProvider',
    ],
    'access'     => 'Drupal\products\Access\ProductAccessControlHandler',
    'views_data' => 'Drupal\products\Entity\ProductViewsData',
  ],
  base_table: 'product',
  admin_permission: 'administer site configuration',
  entity_keys: [
    'id'       => 'id',
    'label'    => 'name',
    'uuid'     => 'uuid',
    'langcode' => 'langcode',
  ],
  links: [
    'canonical'   => '/admin/structure/product/{product}',
    'add-form'    => '/admin/structure/product/add',
    'edit-form'   => '/admin/structure/product/{product}/edit',
    'delete-form' => '/admin/structure/product/{product}/delete',
    'collection'  => '/admin/structure/product',
  ],
)]
class Product extends ContentEntityBase implements ProductInterface {

  public static function baseFieldDefinitions(EntityTypeInterface $entity_type): array {
    $fields = parent::baseFieldDefinitions($entity_type);

    $fields['name'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Name'))
      ->setRequired(TRUE)
      ->setTranslatable(TRUE)
      ->setRevisionable(TRUE)
      ->setSetting('max_length', 255)
      ->setDisplayOptions('view', ['type' => 'string', 'weight' => -5])
      ->setDisplayOptions('form', ['type' => 'string_textfield', 'weight' => -5])
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['remote_id'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Remote ID'))
      ->setRequired(TRUE)
      ->setSetting('max_length', 255);

    $fields['image'] = BaseFieldDefinition::create('image')
      ->setLabel(t('Image'))
      ->setDisplayOptions('view', [
        'type' => 'image',
        'weight' => 10,
        'settings' => ['image_style' => 'large'],
      ])
      ->setDisplayOptions('form', ['type' => 'image_image', 'weight' => 5])
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    return $fields;
  }
}
```

**Rules:**
- Always define `uuid` in `entity_keys` — required for cross-environment identification.
- Include `langcode` in `entity_keys` for translatable entities.
- Call `setDisplayConfigurable(TRUE)` on fields that site builders should be able to configure in UI.
- Call `setTranslatable(TRUE)` on fields that should vary per language.
- Call `setRevisionable(TRUE)` on fields that should be tracked in revisions.
- Use `AdminHtmlRouteProvider` to auto-generate CRUD routes from the `links` in the attribute — avoids manual route definitions. Entity routes stay in the route provider; do not add `#[Route]` attributes to entity forms.
- Define `admin_permission` — the default access control handler checks it.
- **Always provide an interface** for your entity class. Enables mocking and documents the contract.

**Legacy annotation form — do not use in new code:**
```php
/**
 * @ContentEntityType(
 *   id = "product",
 *   ...
 * )
 */
```

## Config Entity Definition

```php
use Drupal\Core\Entity\Attribute\ConfigEntityType;
use Drupal\Core\StringTranslation\TranslatableMarkup;

#[ConfigEntityType(
  id: 'importer',
  label: new TranslatableMarkup('Importer'),
  config_prefix: 'importer',
  admin_permission: 'administer site configuration',
  entity_keys: [
    'id'    => 'id',
    'label' => 'label',
  ],
  config_export: [
    'id',
    'label',
    'plugin',
    'plugin_configuration',
    'source',
  ],
  handlers: [/* ... */],
  links: [/* ... */],
)]
class Importer extends ConfigEntityBase implements ImporterInterface {
  protected string $id;
  protected string $label;
  protected string $plugin;
  protected array $plugin_configuration = [];
}
```

**Rules:**
- `config_prefix` + module name = the config key prefix (e.g., `products.importer.*`)
- `config_export` must explicitly list every property to include in exported YAML.
- A `config/schema/` entry is REQUIRED for every config entity — otherwise config will not validate.
- Config entities do not support fieldable fields — use content entities if you need Field UI.

## Entity CRUD

```php
$storage = \Drupal::entityTypeManager()->getStorage('product');

// Load single
$entity = $storage->load($id);

// Load multiple
$entities = $storage->loadMultiple([$id1, $id2]);

// Load by properties
$entities = $storage->loadByProperties([
  'type'   => 'article',
  'status' => 1,
]);

// Create
$entity = $storage->create([
  'name'      => 'My Product',
  'remote_id' => '123',
]);
$entity->save();

// Update
$entity->set('name', 'Updated name');
$entity->save();

// Delete single
$entity->delete();

// Delete multiple
$storage->delete([$entity1, $entity2]);
```

## Entity Query

```php
$ids = \Drupal::entityTypeManager()
  ->getStorage('product')
  ->getQuery()
  ->accessCheck(FALSE)               // explicitly disable (or TRUE) access check
  ->condition('type', 'article')
  ->condition('status', 1)
  ->condition('remote_id', $ids, 'NOT IN')
  ->condition('created', strtotime('-1 month'), '>')
  ->range(0, 10)
  ->sort('created', 'DESC')
  ->execute();
```

**Rules:**
- Always specify `->accessCheck(FALSE)` or `->accessCheck(TRUE)` explicitly — omitting it throws an exception on execute.
- Pass only the query object you built; since 11.4 the query methods no longer accept a different query object implicitly.
- Entity queries respect the entity's access control handler when `accessCheck(TRUE)`.
- Do not use raw SQL for entity data — use entity queries or the Storage API.

## Entity Access Control Handler

```php
// In src/Access/ProductAccessControlHandler.php
class ProductAccessControlHandler extends EntityAccessControlHandler {

  protected function checkAccess(
    EntityInterface $entity,
    string $operation,
    AccountInterface $account,
  ): AccessResultInterface {
    return match($operation) {
      'view'   => AccessResult::allowedIfHasPermission($account, 'view product entities'),
      'update' => AccessResult::allowedIfHasPermission($account, 'edit product entities'),
      'delete' => AccessResult::allowedIfHasPermission($account, 'delete product entities'),
      default  => AccessResult::neutral(),
    };
  }

  protected function checkCreateAccess(
    AccountInterface $account,
    array $context,
    ?string $entity_bundle = NULL,
  ): AccessResultInterface {
    return AccessResult::allowedIfHasPermission($account, 'add product entities');
  }
}
```

Register in the entity attribute under `handlers: ['access' => ...]`.

## Programmatic Entity Access Check

```php
// Boolean
$can_view = $entity->access('view', $account);

// Full AccessResultInterface with cache metadata
$access = $entity->access('view', $account, TRUE);

// Check create access
$access = \Drupal::entityTypeManager()
  ->getAccessControlHandler('product')
  ->createAccess('product_bundle', $account, [], TRUE);
```

## Bundle Classes

Bundle classes let you put entity-specific logic on the entity object itself:

```php
// In src/Entity/Trip.php
class Trip extends Node {
  public function getDestination(): ?string {
    return $this->get('field_destination')->value;
  }

  public function isAvailable(): bool {
    return $this->get('field_availability')->value === 'available';
  }
}
```

Register in `hook_entity_bundle_info_alter()` from a hook class:

```php
// src/Hook/MyModuleEntityHooks.php
use Drupal\Core\Hook\Attribute\Hook;
use Drupal\my_module\Entity\Trip;

class MyModuleEntityHooks {

  #[Hook('entity_bundle_info_alter')]
  public function entityBundleInfoAlter(array &$bundles): void {
    if (isset($bundles['node']['trip'])) {
      $bundles['node']['trip']['class'] = Trip::class;
    }
  }

}
```

Use in a theme's preprocess hook (`THEME/src/Hook/`):

```php
#[Hook('preprocess_node')]
public function preprocessNode(array &$variables): void {
  $node = $variables['node'];
  if ($node instanceof Trip) {
    $variables['destination'] = $node->getDestination();
  }
}
```

## Entity Hooks

All entity hooks are `#[Hook]` methods on a class in `src/Hook/` (see `14-oop-hooks.md`):

```php
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Hook\Attribute\Hook;
use Drupal\node\NodeInterface;

class MyModuleEntityHooks {

  // Before save (entity not yet in DB — can modify $entity)
  #[Hook('entity_presave')]
  public function entityPresave(EntityInterface $entity): void {}

  #[Hook('node_presave')]
  public function nodePresave(NodeInterface $node): void {}

  // After create
  #[Hook('entity_insert')]
  public function entityInsert(EntityInterface $entity): void {}

  // After update
  #[Hook('entity_update')]
  public function entityUpdate(EntityInterface $entity): void {}

  // After delete
  #[Hook('entity_delete')]
  public function entityDelete(EntityInterface $entity): void {}

  // On load (avoid heavy operations here — called for every loaded entity)
  #[Hook('entity_load')]
  public function entityLoad(array $entities, string $entity_type_id): void {}

}
```

Prefer the specific `ENTITY_TYPE_presave` variants over generic `entity_presave` for performance. Inside `entity_update` use `$entity->getOriginal()` to compare with the previous revision; the `$entity->original` property is deprecated.

## Rendering Entities

```php
$view_builder = \Drupal::entityTypeManager()->getViewBuilder('node');

// Render single entity
$render = $view_builder->view($entity, 'teaser');

// Render multiple
$render = $view_builder->viewMultiple($entities, 'teaser');
```

## Editorial Entities (Revisioning + Publishing Workflow)

For entities that need Content Moderation / Publishing workflow support, extend `EditorialContentEntityBase` instead of `ContentEntityBase`:

```php
use Drupal\Core\Entity\EditorialContentEntityBase;

class MyEntity extends EditorialContentEntityBase implements MyEntityInterface {
  // Inherits: published/unpublished status, revision support,
  // moderation_state field, isPublished(), setPublished(), etc.
}
```

Required `entity_keys` additions:
```php
entity_keys: [
  'id'        => 'id',
  'revision'  => 'revision_id',
  'published' => 'status',
  // ...
],
```

## PHP Enums for List Field Allowed Values (PHP 8.1+)

PHP 8.1 backed enums can declare the allowed values for `list_string` or `list_integer` fields:

```php
// src/Enum/NodeStatus.php
enum NodeStatus: string {
  case Published = 'published';
  case Draft = 'draft';
  case Archived = 'archived';

  public function label(): string {
    return match($this) {
      self::Published => 'Published',
      self::Draft     => 'Draft',
      self::Archived  => 'Archived',
    };
  }
}

// In baseFieldDefinitions():
$fields['status'] = BaseFieldDefinition::create('list_string')
  ->setLabel(new TranslatableMarkup('Status'))
  ->setSetting('allowed_values_enum', NodeStatus::class);
```

## When to Use Each Entity Type

| Use | Entity Type |
|---|---|
| Primary content with URLs | Node (content type) |
| Categorization, hierarchical | Taxonomy term |
| Structured components embedded in nodes | Paragraphs (contrib) |
| Digital assets (images, video, docs) | Media |
| User profile data | User fields |
| Visual asset regions, cross-page | Custom Block / Block Content |
| Site configuration (exportable) | Config entity |
| Custom structured data without UI fields | Custom content entity |
