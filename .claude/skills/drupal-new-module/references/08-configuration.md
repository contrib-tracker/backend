# Configuration, State, UserData, and TempStore

## Choosing the Right Storage

| | Config API | State API | UserData API | TempStore (Private) | TempStore (Shared) |
|---|---|---|---|---|---|
| Scope | Site-wide | Site-wide | Per user | Per user, per session | Cross-user |
| Exported to Git | **Yes** | No | No | No | No |
| Translatable | Yes (with schema) | No | No | No | No |
| Overridable | Yes | No | No | No | No |
| Survives cache clear | Yes | Yes | Yes | Yes | Yes |
| Use for | Module settings, structure | Runtime state, cron timestamps | User preferences | Multi-step form state | Collaborative draft editing |

## Configuration API

### Reading Config (Read-Only)

```php
// Immutable (read-only, cached)
$config = \Drupal::config('my_module.settings');
$value = $config->get('key');
$nested = $config->get('parent.child');

// Or inject ConfigFactoryInterface:
$config = $this->configFactory->get('my_module.settings');
```

### Writing Config (Editable)

```php
// Mutable — must use getEditable() or the config.factory service directly
$config = \Drupal::service('config.factory')->getEditable('my_module.settings');
$config->set('key', $value);
$config->set('parent.child', $value);
$config->save();

// Delete a key
$config->clear('key')->save();

// Delete entire config object
$config->delete();
```

### Config Schema (REQUIRED)

Every config key must have a schema. In `config/schema/my_module.schema.yml`:

```yaml
my_module.settings:
  type: config_object
  label: 'My Module settings'
  mapping:
    salutation:
      type: string
      label: 'Salutation message'
    max_items:
      type: integer
      label: 'Maximum items'
    enabled:
      type: boolean
      label: 'Feature enabled'
    items:
      type: sequence
      label: 'List of items'
      sequence:
        type: string
        label: 'Item'

# Config entity schema
my_module.importer.*:
  type: config_entity
  label: 'Importer configuration'
  mapping:
    id:
      type: string
      label: 'ID'
    label:
      type: label
      label: 'Label'
    plugin:
      type: string
      label: 'Plugin ID'

# Field type storage settings
field.storage_settings.my_field_type:
  type: mapping
  label: 'My field type storage settings'
  mapping:
    max_length:
      type: integer
      label: 'Maximum length'
```

**Rules:**
- A missing schema causes config validation failures and broken translation/override systems.
- Schema types: `string`, `label`, `text`, `boolean`, `integer`, `float`, `mapping`, `sequence`, `config_object`, `config_entity`.
- Use `label` type for human-readable labels (automatically translatable).
- Add validation `constraints:` (e.g. `Range`, `Choice`, `NotBlank`) so the config is fully validatable; recipes and the config validation checker depend on it.
- YAML files may use `!php/const` for PHP constants and enum cases since 11.5 (`max_items: !php/const Drupal\my_module\Settings::DEFAULT_MAX`). Keep it to constants that are genuinely shared with PHP; plain literals stay readable.

### Default Config in `config/install/`

```yaml
# config/install/my_module.settings.yml
salutation: 'Hello'
max_items: 10
enabled: true
```

**Rules:**
- Files in `config/install/` are imported once when the module is first installed.
- **Remove the `uuid` key** before placing exported YAML here — UUIDs are site-specific.
- Do NOT modify these files to update config on existing installations — use update hooks or post-update hooks instead.
- Use `config/optional/` for config that depends on other modules being present.

### Config Overrides

**In `settings.php`** (highest priority, untrackable in config UI):

```php
$config['system.site']['name'] = 'My Dev Site';
$config['system.maintenance']['message'] = 'Back soon.';
```

**Via service** (lower priority, programmatic):

```php
class MyConfigOverride implements ConfigFactoryOverrideInterface {
  public function loadOverrides($names): array {
    if (in_array('system.maintenance', $names)) {
      return ['system.maintenance' => ['message' => 'Custom message.']];
    }
    return [];
  }
  public function getCacheSuffix(): string { return 'MyOverride'; }
  public function getCacheableMetadata(string $name): CacheableMetadata { return new CacheableMetadata(); }
  public function createConfigObject(string $name, string $collection = StorageInterface::DEFAULT_COLLECTION): ?Config { return NULL; }
}
```

Service tag: `{ name: config.factory.override, priority: 5 }`. Higher priority overrides win.

## State API

```php
// Write
\Drupal::state()->set('my_module.last_run', time());
\Drupal::state()->setMultiple([
  'my_module.flag'  => TRUE,
  'my_module.count' => 0,
]);

// Read
$last_run = \Drupal::state()->get('my_module.last_run');
$last_run = \Drupal::state()->get('my_module.last_run', 0); // with default
$values = \Drupal::state()->getMultiple(['key1', 'key2']);

// Delete
\Drupal::state()->delete('my_module.last_run');
\Drupal::state()->deleteMultiple(['key1', 'key2']);
```

**Use State for:**
- Last cron run timestamps
- API tokens and OAuth tokens (environment-specific, should not be in code)
- Install/migration flags
- Anything site-specific that should NOT be exported to other environments

**Do NOT use State for:**
- Module settings (use Config)
- Per-user data (use UserData)
- Sensitive secrets (State is stored unencrypted in DB)

## UserData API

```php
/** @var \Drupal\user\UserDataInterface $userData */
$userData = \Drupal::service('user.data');

// Write
$userData->set('my_module', $uid, 'preference_key', $value);

// Read
$value = $userData->get('my_module', $uid, 'preference_key');

// Delete specific key
$userData->delete('my_module', $uid, 'preference_key');

// Delete all for a user
$userData->delete('my_module', $uid);

// Delete all for a module
$userData->delete('my_module');
```

**Use UserData for:**
- Per-user notification preferences
- Per-user UI settings
- Per-user flags that don't warrant a full entity field

## TempStore (Multi-Step Forms / Wizards)

### Private (per-user)

```php
$store = \Drupal::service('tempstore.private')->get('my_module');

$store->set('wizard_step1', $data);
$value = $store->get('wizard_step1');
$store->delete('wizard_step1');
```

### Shared (cross-user, with owner tracking)

```php
$store = \Drupal::service('tempstore.shared')->get('my_module');
// Same set/get/delete interface.
// Records the UID of the last writer — used for "being edited by X" warnings.
```

**Use TempStore for:**
- Multi-step form data that spans multiple page requests
- Draft data not yet committed to permanent storage
- "Currently being edited by" functionality

## Roles and Permissions Programmatically

`user_role_grant_permissions()`, `user_role_revoke_permissions()` and `user_role_change_permissions()` are deprecated in 11.5. Use the role entity, loaded override-free so `settings.php` overrides are not written back:

```php
use Drupal\user\Entity\Role;
use Drupal\user\RoleInterface;

Role::loadOverrideFree(RoleInterface::AUTHENTICATED_ID)
  ->grantPermissions(['access my feature'])
  ->save();

Role::loadOverrideFree('editor')
  ->changePermissions(['edit any article content' => TRUE, 'delete any article content' => FALSE])
  ->save();
```

In install hooks and post-update hooks this is the only place `Role::loadOverrideFree()` static calls are acceptable; elsewhere inject `entity_type.manager` and use `getStorage('user_role')->loadOverrideFree($id)`.

## Config Management Workflow

```bash
# Export current active config to filesystem (sync directory)
drush config:export   # or: drush cex

# Import config from filesystem to active config
drush config:import   # or: drush cim

# Check what differs between filesystem and database
drush config:status
```

**Standard deployment:**
1. Developer changes config on local/dev site
2. `drush cex` → commits YAML files to Git
3. On staging/production after code deploy: `drush deploy` (includes config:import)

**Never:**
- Manually edit config in the database directly
- Make structural config changes on production without exporting first
- Import config from an environment with a different UUID (causes errors — UUIDs must match or be absent)
