# Database API

## Core Principle

**Never write raw SQL with concatenated user input.** Always use the Drupal Database API — it handles parameterization, table prefixing, and cross-database compatibility.

## Table Naming

- Wrap table names in `{}` braces: `{node}`, `{users_field_data}`, `{my_module_items}`
- Wrap column names in `[]` brackets for cross-database compatibility: `[nid]`, `[status]`, `[created]`

## Query Types

### Select

```php
// Simple
$result = $database->select('my_module_players', 'p')
  ->fields('p')                               // all columns
  ->condition('p.status', 1)
  ->orderBy('p.name')
  ->execute()
  ->fetchAll();

// Specific fields
$query = $database->select('my_module_players', 'p');
$query->addField('p', 'name');
$query->addField('p', 'id');
$query->condition('p.active', 1);
$records = $query->execute()->fetchAllAssoc('id');

// With JOIN
$query = $database->select('my_module_players', 'p');
$query->join('my_module_teams', 't', 't.id = p.team_id');
$query->addField('p', 'name', 'player_name');
$query->addField('t', 'name', 'team_name');
$result = $query->execute()->fetchAll();

// Counting
$count = $database->select('my_module_players', 'p')
  ->countQuery()
  ->execute()
  ->fetchField();
```

### Insert

```php
$database->insert('my_module_players')
  ->fields([
    'name'    => $name,
    'team_id' => $team_id,
    'created' => time(),
  ])
  ->execute();

// Multi-row insert
$query = $database->insert('my_module_items')->fields(['name', 'value']);
foreach ($items as $item) {
  $query->values([$item['name'], $item['value']]);
}
$query->execute();
```

### Update

```php
$database->update('my_module_players')
  ->fields(['status' => 0, 'updated' => time()])
  ->condition('id', $id)
  ->execute();
```

### Delete

```php
$database->delete('my_module_players')
  ->condition('id', $ids, 'IN')
  ->execute();
```

### Upsert (Insert or Update)

```php
$database->upsert('my_module_settings')
  ->key('name')
  ->fields(['name', 'value'])
  ->values(['my_key', $value])
  ->execute();
```

### Direct Query (use only when query builder is insufficient)

```php
// Always use placeholders — NEVER concatenate variables
$result = $database->query(
  "SELECT [id], [name] FROM {teams} WHERE [status] = :status AND [created] > :since",
  [':status' => 1, ':since' => $timestamp]
)->fetchAllAssoc('id');
```

## Transactions

Commit explicitly with `commitOrRelease()` (11.5+). Relying on the transaction object going out of scope is deprecated and stops working in Drupal 13.

```php
use Drupal\Core\Utility\Error;

$transaction = $database->startTransaction();
try {
  $database->insert('my_module_teams')->fields(['name' => 'Team A'])->execute();
  $database->update('my_module_players')->fields(['team_id' => $id])->execute();
  $transaction->commitOrRelease();   // COMMIT, or RELEASE SAVEPOINT when nested
}
catch (\Throwable $e) {
  $transaction->rollBack();
  Error::logException($this->logger, $e);   // watchdog_exception() was removed in 11
  throw $e;
}
```

Connection keys and targets passed to `Database::getConnection()` must be strings; integer keys are deprecated in 11.5.

## Pager Query

```php
$query = $database->select('my_module_players', 'p')
  ->fields('p')
  ->extend('Drupal\Core\Database\Query\PagerSelectExtender')
  ->limit(25);  // 25 items per page

$results = $query->execute()->fetchAll();
// Render pager in the return array:
$build['pager'] = ['#type' => 'pager'];
```

## Query Tags and Access Control

```php
// Tag a query so hook_query_TAG_alter() can modify it
$query->addTag('node_access');   // built-in: enforces node access
$query->addTag('my_custom_tag'); // custom tag for your own alter hook

// In any module's src/Hook/ class:
#[Hook('query_my_custom_tag_alter')]
public function queryMyCustomTagAlter(AlterableInterface $query): void {
  $query->condition('p.status', 1);
}
```

Always add the `node_access` tag to queries that return node data visible to users.

## Schema Definition (`hook_schema()` in `.install`)

`hook_schema()` stays procedural. Since 11.5 it returns a `Schema` object built from typed value objects (`Drupal\Core\Database\SchemaDefinition\*`) instead of nested arrays. Use the objects for new tables; the array form still works but is on its way out and cannot express driver-specific features (GIN/GIST indexes, generated columns).

```php
use Drupal\Core\Database\SchemaDefinition\Column;
use Drupal\Core\Database\SchemaDefinition\ColumnSize;
use Drupal\Core\Database\SchemaDefinition\Index;
use Drupal\Core\Database\SchemaDefinition\IntValue;
use Drupal\Core\Database\SchemaDefinition\PrimaryKey;
use Drupal\Core\Database\SchemaDefinition\Schema;
use Drupal\Core\Database\SchemaDefinition\SchemaDefinitionType;
use Drupal\Core\Database\SchemaDefinition\StringValue;
use Drupal\Core\Database\SchemaDefinition\Table;

/**
 * Implements hook_schema().
 */
function my_module_schema(): Schema {
  $tables[] = new Table(
    name: 'my_module_teams',
    description: 'Stores team data.',
    columns: [
      Column::serial(name: 'id'),
      Column::varchar(name: 'name', length: 255, notNull: TRUE, default: new StringValue('')),
      Column::blob(name: 'data', size: ColumnSize::Big, notNull: FALSE, serialize: TRUE),
      Column::int(name: 'created', unsigned: TRUE, notNull: TRUE, default: new IntValue(0)),
    ],
    primaryKey: new PrimaryKey(['id']),
    indexes: [
      new Index(name: 'name', columns: ['name']),
    ],
  );

  return new Schema(
    type: SchemaDefinitionType::Module,
    name: 'my_module',
    tables: $tables,
  );
}
```

Entity storage handlers that override `schemaDefinition()` return a `Schema` too, and create tables with `createSchemaFromDefinition()`. See `core/lib/Drupal/Core/Database/database.api.php` for the full list of `Column::*()` factories.

**Legacy array form (existing modules):**

```php
function my_module_schema(): array {
  $schema['my_module_teams'] = [
    'description' => 'Stores team data.',
    'fields' => [
      'id'      => ['type' => 'serial', 'unsigned' => TRUE, 'not null' => TRUE],
      'name'    => ['type' => 'varchar', 'length' => 255, 'not null' => TRUE, 'default' => ''],
      'created' => ['type' => 'int', 'unsigned' => TRUE, 'not null' => TRUE, 'default' => 0],
    ],
    'primary key' => ['id'],
    'indexes' => ['name' => ['name']],
  ];
  return $schema;
}
```

## Update Hooks (Schema Changes)

In `my_module.install`:

```php
/**
 * Add location column to teams table.
 */
function my_module_update_12001(array &$sandbox): void {
  $schema = \Drupal::database()->schema();
  $spec = ['type' => 'varchar', 'length' => 255, 'not null' => FALSE];
  $schema->addField('my_module_teams', 'location', $spec);
}
```

**Naming:** `modulename_update_XXYYZ` where XX = Drupal major (12), YY = module major, Z = increments. Always increment, never reuse. Keep the `hook_update_last_removed()` marker current when you delete old updates; Drupal 12 itself removed every core update added before 11.4.0, which is why sites must be on 11.4+ first.

## Post-Update Hooks (Data Updates with Sandbox)

In `my_module.post_update.php`:

```php
/**
 * Migrate player status values to new format.
 */
function my_module_post_update_migrate_player_status(array &$sandbox): string {
  $database = \Drupal::database();

  // Initialize on first call
  if (empty($sandbox)) {
    $result = $database->query("SELECT [id] FROM {my_module_players}")->fetchAllAssoc('id');
    $sandbox['ids'] = array_keys($result);
    $sandbox['max'] = count($sandbox['ids']);
    $sandbox['progress'] = 0;
  }

  // Process a batch of 50
  $batch = array_splice($sandbox['ids'], 0, 50);
  foreach ($batch as $id) {
    $database->update('my_module_players')
      ->fields(['new_status' => 'active'])
      ->condition('id', $id)
      ->execute();
    $sandbox['progress']++;
  }

  $sandbox['#finished'] = $sandbox['max'] > 0
    ? $sandbox['progress'] / $sandbox['max']
    : 1;

  return t('@progress of @max processed.', [
    '@progress' => $sandbox['progress'],
    '@max'      => $sandbox['max'],
  ]);
}
```

**Rules:**
- Use `hook_update_N()` for schema/structural changes (adding columns, tables, indexes).
- Use `hook_post_update_NAME()` for data migrations — it supports multi-request processing via `$sandbox` and `$sandbox['#finished']`.
- Never modify data in `hook_update_N()` — use post_update hooks instead.
- Post-update hooks run after all `hook_update_N()` hooks.

## Injecting the Database Connection

```yaml
services:
  my_module.my_service:
    class: Drupal\my_module\MyService
    arguments: ['@database']
```

```php
class MyService {
  public function __construct(
    protected readonly Connection $database,
  ) {}
}
```
