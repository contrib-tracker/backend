# Module Architecture

## System Requirements (Drupal 12)

| Requirement | Drupal 12 minimum | Notes |
|---|---|---|
| PHP | 8.5.0 | Drupal 11.x runs on 8.3+; write code that works on 8.5 |
| MySQL | 8.0 | |
| MariaDB | 10.11 | |
| PostgreSQL | 18 | |
| SQLite | 3.45 with json1 | |
| Composer | 2 (latest 2.x) | |
| Symfony | 8.1 | `symfony/runtime` bootstraps `index.php` |
| Twig | 3.28+ | Drupal 12 stays on Twig 3 |
| PHPUnit | 12.5 | Annotations no longer work; attributes only |
| Drush | 13.x today; 14.x in development for Drupal 12 | Core also ships the `dr` CLI since 11.4 |
| Node.js | 24 | Only for core front-end development |

Drupal 12.0.0 ships in the week of 7 December 2026 alongside 11.5.0. Sites must be on 11.4.0 or later (11.5 strongly recommended) before updating. Hosting Drupal in production on Windows is deprecated.

## Module Directory Structure

```
my_module/
├── my_module.info.yml           # Required: module metadata
├── my_module.install            # hook_schema(), hook_update_N(), hook_install() — the only procedural hooks
├── my_module.post_update.php    # hook_post_update_NAME() (data migrations)
├── my_module.routing.yml        # Route definitions (or #[Route] attributes on controllers/forms)
├── my_module.services.yml       # Service definitions (hook classes and commands need no entry)
├── my_module.permissions.yml    # Permission declarations
├── my_module.links.menu.yml     # Menu link definitions
├── my_module.links.task.yml     # Local task (tab) definitions
├── my_module.links.action.yml   # Action link definitions
├── my_module.libraries.yml      # CSS/JS asset libraries
├── config/
│   ├── install/                 # Config imported on module install
│   ├── optional/                # Config imported only if dependencies are met
│   └── schema/                  # Config schema — REQUIRED for every config key
├── src/                         # PSR-4 root → namespace \Drupal\my_module
│   ├── Hook/                    # #[Hook] classes — ALL hook implementations live here
│   ├── Install/Requirements/    # InstallRequirementsInterface (replaces hook_requirements('install'))
│   ├── Command/                 # #[AsCommand] classes for the core `dr` CLI
│   ├── Drush/Commands/          # Drush 13 commands (if the project uses Drush)
│   ├── Controller/
│   ├── Form/
│   ├── Plugin/
│   │   ├── Block/
│   │   ├── Field/
│   │   │   ├── FieldType/
│   │   │   ├── FieldWidget/
│   │   │   └── FieldFormatter/
│   │   ├── QueueWorker/
│   │   └── views/
│   ├── Entity/
│   ├── EventSubscriber/
│   ├── Access/
│   ├── Attribute/               # Attribute classes for custom plugin types
│   └── Routing/
├── templates/                   # Twig templates
├── js/                          # JavaScript files
└── tests/
    ├── src/
    │   ├── Unit/
    │   ├── Kernel/
    │   ├── Functional/
    │   └── FunctionalJavascript/
    └── modules/                 # Test-helper sub-modules
```

**There is no `my_module.module` file.** The `.module` extension is deprecated in Drupal 11.5 and stops being autoloaded in Drupal 13. Every hook is a `#[Hook]` method (see `14-oop-hooks.md`); helpers become services or methods. If an existing module still has one, it must contain nothing but `#[LegacyHook]` shims, and only when the module supports Drupal < 11.1.

## Required info.yml

```yaml
name: My Module
description: Description of what this module does.
type: module
core_version_requirement: ^11.5 || ^12
package: Custom
dependencies:
  - drupal:image
  - drupal:node
```

**Rules:**
- `name`, `type`, `core_version_requirement` are required.
- `^11.5 || ^12` is the default for new code written now. Lower the 11.x floor (`^11.3 || ^12`) only when the site is still on an older minor and the module avoids 11.4+/11.5+ APIs (`#[Route]` attributes, `#[HookDependsOnModule]`, `dr` commands, Route `title:`).
- Never use `^11` alone for code that relies on OOP hooks (11.1), hook ordering (11.2) or OOP theme hooks (11.3).
- `package: Custom` groups custom modules together in the UI.
- List all required modules under `dependencies` using the `drupal:module_name` format.
- `hooks_converted:` is **not** an info.yml key and never was. The hook-scan optimisation is a `services.yml` parameter (`my_module.skip_procedural_hook_scan: true`) and only matters while a `.module` file exists.

## PSR-4 and Namespacing

| Namespace | Directory |
|---|---|
| `Drupal\my_module` | `src/` |
| `Drupal\my_module\Hook` | `src/Hook/` (auto-registered services) |
| `Drupal\my_module\Command` | `src/Command/` (auto-registered `dr` commands) |
| `Drupal\my_module\Controller` | `src/Controller/` (`#[Route]` discovery) |
| `Drupal\my_module\Form` | `src/Form/` (`#[Route]` discovery) |
| `Drupal\my_module\Plugin\Block` | `src/Plugin/Block/` |
| `Drupal\my_module\Plugin\Field\FieldType` | `src/Plugin/Field/FieldType/` |
| `Drupal\my_module\Entity` | `src/Entity/` |
| `Drupal\my_module\EventSubscriber` | `src/EventSubscriber/` |
| `Drupal\my_module\Attribute` | `src/Attribute/` |
| `Drupal\Tests\my_module\Unit` | `tests/src/Unit/` |
| `Drupal\Tests\my_module\Kernel` | `tests/src/Kernel/` |
| `Drupal\Tests\my_module\Functional` | `tests/src/Functional/` |

**Rules:**
- One class per file. Filename must exactly match the class name (`HelloWorldSalutation.php`).
- Directory structure mirrors the namespace hierarchy.
- Never put classes directly in the module root; always under `src/`.
- Start every PHP file with `declare(strict_types=1);` (core does since 11.x).

## Key YAML Files Summary

| File | What it declares |
|---|---|
| `*.info.yml` | Module name, type, version, dependencies |
| `*.routing.yml` | URL paths and their controller/access requirements (optional when using `#[Route]`) |
| `*.services.yml` | PHP classes registered as services; container parameters |
| `*.permissions.yml` | Human-readable permission strings |
| `*.links.menu.yml` | Admin/navigation menu links |
| `*.links.task.yml` | Tab links on entity/admin pages |
| `*.links.action.yml` | "Add" and operation action links |
| `*.libraries.yml` | CSS and JS asset definitions |
| `*.tokens.yml` | Design tokens (11.5+), mostly for themes |
| `config/schema/*.schema.yml` | Type definitions for every config key |
| `config/install/*.yml` | Default config imported on module install |
| `config/optional/*.yml` | Config imported only if all dependencies exist |

YAML files may reference PHP constants and enum cases with the `!php/const` tag since 11.5 (`timeout: !php/const Drupal\my_module\Settings::DEFAULT_TIMEOUT`).

## Naming Conventions

- **Module machine name:** lowercase letters, numbers, underscores only. Start with a letter. Max 50 chars.
- **Class names:** UpperCamelCase (`HelloWorldSalutation`)
- **Method/property names:** lowerCamelCase (`getSalutation()`)
- **Constants:** ALL_CAPS (`MY_MODULE_CONSTANT`); prefer enums for sets of values
- **Hook methods:** any lowerCamelCase name; the `#[Hook('name')]` attribute carries the hook
- **Service IDs:** `module_name.service_name` (dot-separated); hook classes and commands use their FQCN
- **Route names:** `module_name.route_name` (dot-separated)
- **`dr` command names:** `my-module:command` (module name with hyphens as the namespace)
- **Permission strings:** lowercase, human-readable (`administer my feature`)
- **Config names:** `module_name.config_type` (e.g., `hello_world.custom_salutation`)
- **Update hooks:** `my_module_update_12001()`; the first two digits track the Drupal major, never reuse a number

## Submodules

Use submodules when a feature is:
- Optional (not all sites need it)
- Adds significant weight (extra DB tables, services)
- Could conflict with other modules

Prefer `#[HookDependsOnModule]` over a submodule when the only purpose is "implement hooks if module X is installed".

## Module vs Theme Decision

| Belongs in Module | Belongs in Theme |
|---|---|
| Business logic | HTML markup / Twig templates |
| Custom routes and controllers | CSS and JavaScript |
| Service definitions | Preprocess for display-only variables |
| Permissions | Library definitions |
| Entity types and fields | Template suggestions |
| REST API endpoints | Theme settings |
| Views plugins | Region definitions |
| Queue workers | Single Directory Components (either) |
| Cron tasks | Design tokens |

**Rule:** If removing the theme would break a feature, that feature belongs in a module.

## Removed in Drupal 12 (Do Not Use or Depend On)

**Modules removed from core and moved to contrib:** `ban`, `contact`, `field_layout`, `history`, `search`, `settings_tray`, `shortcut`, `telephone`, `toolbar`. The "Text with summary" field type also moved to contrib (`text_with_summary`).

**Modules removed without a contrib replacement:** `migrate_drupal`, `migrate_drupal_ui`. The Migrate API itself (`migrate`) stays. Drupal 6/7 sites must migrate to Drupal 11 first.

**Themes removed from core:** `claro`, `olivero`, `stable9`. All three exist as contrib projects. Core now ships `default_admin` (the new default front-end and admin theme in the Standard profile), `stark` and `starterkit_theme`.

**Previously removed (10.0 / 11.0):** `aggregator`, `book`, `color`, `forum`, `hal`, `quickedit`, `rdf`, `statistics`, `tour`, `tracker`, `actions_ui`, CKEditor 4, Bartik, Seven, Classy, Stable, `authorize.php` and the module upload UI.

**Still in core but under discussion for a later major:** `announcements_feed`, Block UI, `comment`, `layout_builder`, `rest`. Do not build new features on those assumptions either way; check drupal.org/docs/core-modules-and-themes/deprecated-and-obsolete before depending on a core module.

**Other Drupal 12 behaviour changes to know:**
- Default password hashing is argon2id (bcrypt via the `password.algorithm: 2y` container parameter).
- HTML5 client-side form validation is off by default (`$settings['enable_html5_validation']`, removed in 13).
- `hook_hook_info()` and `hook_module_implements_alter()` are gone; procedural hooks in `.inc` files are ignored.
- The installer no longer offers profile selection; Umami is hidden; the Standard profile has no Article/Page content types since 11.4.
- PHPStan in core flags `md5()`, `sha1()`, `crc32()` and weak `hash()` algorithms; use `hash('xxh3', ...)` for non-cryptographic hashing and `Crypt` for the rest.

## Contrib Module Evaluation Order

1. **Drupal core** (most stable, best-maintained, zero upgrade risk)
2. **Core Recipes** (declarative, one-time configuration packages; prefer over distributions)
3. **Contrib modules** on drupal.org. Check: well-adopted, actively maintained, declares `^12` compatibility (or has a Drupal 12 issue with a tested merge request)
4. **Custom code**, only for unique business logic, third-party integrations, specific company requirements

Never jump to custom code before exhausting core and contrib options.
