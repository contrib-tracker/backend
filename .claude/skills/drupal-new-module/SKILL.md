---
name: drupal-new-module
description: Scaffold a new Drupal 12 module following team standards - correct directory structure, PSR-4 namespaces, PHP 8.5 patterns, OOP hooks with no .module file, attribute-based plugins and routes, and proper service definitions. Use this skill whenever someone wants to create a new Drupal module, add a plugin type, create a custom entity, or start a new Drupal component from scratch.
allowed-tools: Read, Write, Bash
argument-hint: "<module-name> <brief description of what it does>"
---

# Scaffold a New Drupal 12 Module

You are creating a new Drupal module that follows this team's coding standards. Getting the structure right from the start prevents a class of technical debt — wrong namespaces, missing service definitions, procedural hooks in a `.module` file that Drupal 13 will stop loading, and missing config schemas all compound over time.

Target: Drupal 12 (released December 2026) with Drupal 11.5 as the bridge, PHP 8.5, PHPUnit 12. Everything generated must also run on Drupal 11.5.

**References library:** `references/`

## Step 1: Gather requirements

If the user hasn't provided enough information, ask:
1. **Module machine name** (lowercase, underscores, e.g. `my_module`)
2. **What it does** — one sentence
3. **What components it needs** — check which apply:
   - [ ] Services (injectable business logic)
   - [ ] Routes and controllers
   - [ ] Forms
   - [ ] Plugins (Block, FieldType, QueueWorker, etc.)
   - [ ] Content entity (custom node-like thing)
   - [ ] Config entity (exportable configuration)
   - [ ] Event subscribers
   - [ ] Hooks (node presave, entity insert, form alter, etc.)
   - [ ] CLI commands (Drush and/or the core `dr` CLI)
   - [ ] Tests
4. **Minimum Drupal version the site runs** — default to `^11.5 || ^12`; only lower it if the site is still on 11.3/11.4 and the module avoids the newer APIs

## Step 2: Load relevant reference files

Always read these before generating:
- `01-module-architecture.md` — structure, info.yml, naming conventions, what Drupal 12 removed
- `14-oop-hooks.md` — every hook is OOP; `.module` files are deprecated
- `15-modern-php.md` — PHP 8.5 patterns that apply to all generated code

Then read the relevant component references:
- `02-services-dependency-injection.md` — if services are needed
- `03-plugins.md` — if plugins are needed
- `04-entities.md` — if entities are needed
- `05-routing-access.md` — if routes/controllers are needed (YAML or `#[Route]` attributes)
- `06-forms.md` — if forms are needed
- `07-database.md` — if custom tables are needed (schema definition objects)
- `12-testing.md` — if tests are needed (PHPUnit 12 attributes)
- `13-deployment.md` — if Drush or `dr` commands are needed
- `16-drupal-12-changes.md` — when unsure whether an API still exists in Drupal 12

## Step 3: Generate the module

Create files in the current working directory under `[module_name]/`. Generate only what is needed for the stated requirements — don't create empty placeholder files.

### Files to always generate

**`[module_name].info.yml`**
```yaml
name: '[Human-readable name]'
type: module
description: '[One-sentence description]'
core_version_requirement: ^11.5 || ^12
package: Custom
dependencies: []
```

`hooks_converted:` is not an info.yml key; never add it.

**`src/` directory with PSR-4 classes** — namespace `Drupal\[module_name]`, every file starting with `declare(strict_types=1);`

### Files to never generate

- `[module_name].module` — deprecated in 11.5, not autoloaded in 13. Hooks go in `src/Hook/`, helpers become services.
- `src/Annotation/*` — plugin types use `src/Attribute/*`.
- `drush.services.yml` — Drush 13 autowires commands.
- `theme-settings.php` or `*.theme` (for themes) — same rule as `.module`.

### Conditional files

Generate these only when the module needs them:

| Component | Files to create |
|---|---|
| Services | `[module].services.yml`, `src/[ServiceName].php` with constructor property promotion |
| Controller + route | `src/Controller/[Name]Controller.php` with `#[Route]` attributes (or `[module].routing.yml` if the project standardises on YAML) |
| Form | `src/Form/[Name]Form.php` extending `FormBase` or `ConfigFormBase`; class-level `#[Route]` or a YAML route |
| Block plugin | `src/Plugin/Block/[Name]Block.php` with `#[Block(...)]` attribute |
| Queue worker | `src/Plugin/QueueWorker/[Name]Worker.php` with `#[QueueWorker(...)]` attribute |
| Content entity | `src/Entity/[Name].php` with `#[ContentEntityType(...)]` attribute, interface, list builder, form handlers |
| Config entity | `src/Entity/[Name].php` with `#[ConfigEntityType(...)]` attribute |
| Hooks | `src/Hook/[ModuleName]Hooks.php` with `#[Hook('hook_name')]` methods; auto-registered, no `services.yml` entry |
| Requirements checks | `src/Install/Requirements/[ModuleName]Requirements.php` (install phase), `#[Hook('runtime_requirements')]` (status report) |
| Custom DB table | `[module].install` with `hook_schema()` returning a `Schema` object |
| Drush command | `src/Drush/Commands/[ModuleName]Commands.php` with `#[CLI\Command]` attributes and `AutowireTrait` |
| Core `dr` command | `src/Command/[Name]Command.php` with `#[AsCommand(...)]` and `__invoke()` |
| Tests | `tests/src/Unit/`, `tests/src/Kernel/`, `tests/src/Functional/` with `#[Group]` and `#[RunTestsInSeparateProcesses]` |
| Config schema | `config/schema/[module].schema.yml` — required if module introduces any configuration |

## PHP patterns to apply in all generated code

These aren't optional — they're the team's current standard and what code review will check for:

**Services and injection**
```php
// Always constructor property promotion + readonly for injected services
public function __construct(
  private readonly EntityTypeManagerInterface $entityTypeManager,
  private readonly ConfigFactoryInterface $configFactory,
) {}

// Static factory for controllers, forms and plugins
public static function create(ContainerInterface $container): static {
  return new static(
    $container->get('entity_type.manager'),
    $container->get('config.factory'),
  );
}
```

**Hooks — OOP only, auto-registered**
```php
// src/Hook/MyModuleHooks.php
declare(strict_types=1);

namespace Drupal\my_module\Hook;

use Drupal\Core\Hook\Attribute\Hook;
use Drupal\node\NodeInterface;

class MyModuleHooks {

  public function __construct(
    private readonly EntityTypeManagerInterface $entityTypeManager,
  ) {}

  #[Hook('node_presave')]
  public function nodePresave(NodeInterface $node): void {
    // logic here
  }

}
```
Classes in `src/Hook/` are discovered and autowired automatically. Do not add them to `services.yml` and do not tag them. Order with `order: new OrderBefore(modules: [...])`, never with `hook_module_implements_alter()` (removed in 12). Only `hook_schema`, `hook_install`, `hook_uninstall`, `hook_update_N` and `hook_post_update_NAME` stay procedural, in `.install` / `.post_update.php`.

**Plugin attributes — never Doctrine annotations**
```php
use Drupal\Core\Block\Attribute\Block;
use Drupal\Core\StringTranslation\TranslatableMarkup;

#[Block(
  id: 'my_block',
  admin_label: new TranslatableMarkup('My Block'),
  category: new TranslatableMarkup('Custom'),
)]
class MyBlock extends BlockBase { ... }
```

**Routes — attributes or YAML, with requirements**
```php
use Drupal\Core\Routing\Attribute\Route;

#[Route(
  path: '/my-module/report',
  name: 'my_module.report',
  title: new TranslatableMarkup('Report'),
  requirements: ['_permission' => 'access my module reports'],
)]
public function report(): array { ... }
```

**Type declarations everywhere**
```php
// All parameters, return types, and properties must be typed
public function process(int $id, string $label): array { ... }
public function save(): void { ... }
```

**Things that must not appear in generated code**
`\Drupal::` inside classes, `drupal_static()`, `check_markup()`, `watchdog_exception()`, `hide()`/`show()`, `user_role_grant_permissions()`, `md5()`/`sha1()`/`crc32()`, `@group` docblock annotations in tests, `core/scripts/drupal`, `REQUIREMENT_*` constants (use the `RequirementSeverity` enum).

## Step 4: After generating

Tell the user:
1. What files were created and why
2. What to do next (e.g., "Run `drush cr` after enabling the module")
3. Which reference files to read for the next steps (e.g., "See `03-plugins.md` if you need to add more plugin types")
4. Any decisions that were made on their behalf (e.g., "I used `EditorialContentEntityBase` because you mentioned publishing workflow — change to `ContentEntityBase` if you don't need revision/publishing support", or "Routes are attributes; switch to `routing.yml` if the rest of the project uses YAML")
