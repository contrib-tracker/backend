# Deployment, DevOps, and Configuration Management

## Core Principle: "Code Up, Content Down"

- **Code** (modules, themes, config YAML) flows **up** from dev → staging → production.
- **Database and files** (content, media) flow **down** from production → staging → dev.
- Production is the source of truth for content. Git is the source of truth for code and config.

## Standard Post-Deploy Steps

```bash
# Single command
drush deploy

# Which is equivalent to:
drush updb              # run database update hooks
drush config:import     # import config from code (sync directory)
drush cr                # clear all caches

# Full deploy script pattern (non-production)
git checkout main
git pull
composer install --no-dev
drush sql:sync @prod @self        # sync production DB down (NOT on production!)
drush rsync @prod:%files @self:%files  # sync production files down (NOT on production!)
drush deploy
```

**Never run `sql:sync` or `rsync` on production** — it would overwrite live data.

## Environment Workflow

```
local → feature branch → dev → staging → production
```

- **Local:** Full codebase, production DB synced down (sanitized), all dev modules enabled.
- **Dev:** Continuous deployment from main branch. Dev modules enabled. Verbose logging.
- **Staging:** Release candidate testing. Production DB synced. No dev modules.
- **Production:** Tagged releases only. Never direct commits. No dev modules.

## Configuration Split (Environment-Specific Config)

Use `drupal/config_split` to manage configuration that differs between environments.

### Setup Example

```yaml
# config/sync/config_split.config_split.production.yml
id: production
label: Production
status: true
folder: config/envs/production
module:
  views_ui: 0    # disable Views UI on production
  devel: 0       # disable Devel on production
  dblog: 0       # disable DB log on production
```

```bash
# On production:
drush config:import --source=config/sync --delta

# Or with the split-aware commands:
drush cim   # automatically applies active splits based on environment
```

### What to Put in Each Split

| Split | Modules to disable | Settings to override |
|---|---|---|
| Production | `views_ui`, `devel`, `dblog` | `system.logging` (errors off), CSS/JS aggregation on |
| Development | — | CSS/JS aggregation off, verbose logging, Twig debug |
| CI | `dblog` | Performance settings off |

## Disabling Development Modules on Production

Production environments must have these modules disabled:
- `views_ui` — Views editing UI
- `devel` / `kint` — Developer tools (security risk)
- `dblog` — Database logging (performance, storage)
- `field_ui` — Field UI editing

Enabling production instead:
- `syslog` — System logging to OS log (faster, enterprise log aggregation)

In `settings.php` for production:
```php
$config['system.logging']['error_level'] = 'hide';
$config['system.performance']['css']['preprocess'] = TRUE;
$config['system.performance']['js']['preprocess'] = TRUE;
```

## Composer Best Practices

```json
{
  "require": {
    "drupal/core-recommended": "^12",
    "drupal/core-composer-scaffold": "^12",
    "drupal/core-project-message": "^12",
    "drupal/pathauto": "^1.13",
    "drush/drush": "^13"
  },
  "require-dev": {
    "drupal/core-dev": "^12"
  },
  "config": {
    "platform": {
      "php": "8.5.0"
    },
    "allow-plugins": {
      "composer/installers": true,
      "cweagans/composer-patches": true,
      "drupal/core-composer-scaffold": true,
      "drupal/core-project-message": true,
      "php-http/discovery": true,
      "phpstan/extension-installer": true,
      "symfony/runtime": true,
      "tbachert/spi": true
    }
  },
  "extra": {
    "patches": {
      "drupal/some_module": {
        "Fix important bug #1234567": "patches/fix-bug.patch"
      }
    }
  }
}
```

**Rules:**
- Start from `drupal/recommended-project`; `drupal/legacy-project` is abandoned since 11.4.
- Commit `composer.lock` to Git — it guarantees identical builds across environments.
- Use `composer install --no-dev` in production (excludes dev tools from the deployment).
- Set `platform.php` to the production PHP version (8.5 for Drupal 12) — prevents a `composer update` from pulling packages incompatible with your PHP version.
- `symfony/runtime` is a Composer plugin since 11.4; it must be in `allow-plugins` or `composer install` fails.
- `drupal/core-recommended` allows minor updates of core's dependencies since 11.4 and no longer pins Guzzle, Twig or the polyfills; `composer update "drupal/core-*" --with-dependencies` is the normal update command.
- Never commit the `vendor/` directory.
- Never manually modify files in `vendor/` or `web/core` — use patches instead.
- Patching: use `cweagans/composer-patches` — patches are tracked in `composer.json`, applied automatically on `composer install`.

## Backup Before Production Deployment

```bash
# Create a database backup before any production deploy
drush @prod sql:dump > backup-$(date +%Y%m%d-%H%M%S).sql

# After a failed deployment, restore:
drush @prod sql:cli < backup-TIMESTAMP.sql
git checkout [previous-tag]
composer install --no-dev
drush deploy
```

Always verify a backup exists before any production change.

## Git Workflow

```bash
# Feature development
git checkout -b feature/my-feature
# ... make changes, export config ...
drush cex
git add config/sync/
git commit -m "Add new feature configuration"
git push origin feature/my-feature

# Create pull request → code review → merge to main
# Tag releases for production
git tag v1.2.0
git push origin v1.2.0
```

**Rules:**
- Never commit directly to the `main`/`master` branch.
- Use pull/merge requests for all changes — enables code review.
- Tag releases (`v1.1.0`, `v1.2.0`) for staging and production deployments.
- Run automated tests in CI on every pull request before merging.

## Drush Site Aliases

```php
// drush/sites/prod.site.yml
prod:
  host: prod.example.com
  user: deploy
  root: /var/www/html
  uri: https://www.example.com

staging:
  host: staging.example.com
  user: deploy
  root: /var/www/html
  uri: https://staging.example.com
```

```bash
# Run a command on production
drush @prod status
drush @prod sql:dump > backup.sql

# Sync production DB to local
drush sql:sync @prod @self
```

## Stage File Proxy (Development)

Install `drupal/stage_file_proxy` on non-production environments to serve files from production without syncing gigabytes of assets:

```php
// settings.local.php
$config['stage_file_proxy.settings']['origin'] = 'https://www.example.com';
$config['stage_file_proxy.settings']['hotlink'] = FALSE;
```

Files are fetched from production on first request and cached locally.

## Database Sanitization

When syncing the production database to a development environment, sanitize PII:

```bash
drush sql:sync @prod @self
drush sql:sanitize   # replaces emails and passwords with safe values
```

Or use a custom sanitize script to handle project-specific sensitive fields.

## Content Moderation and Deployment

When deploying with Content Moderation enabled:
1. Export and import config includes workflow definitions
2. Content in any workflow state persists across deployments
3. Test workflow transitions on staging before production

## Local Development Setup

1. Install DDEV (community-standard containerized environment)
2. Run `ddev start` to bring up the environment
3. `ddev drush sql:sync @prod @self` to pull production data
4. `ddev drush rsync @prod:%files @self:%files` to pull files
5. `ddev drush deploy` to apply any pending updates
6. `ddev drush user:login` (or `ddev exec dr user:login`) to get a one-time admin login link

Local `settings.local.php` should include:
```php
// Disable production caches
$settings['cache']['bins']['render']        = 'cache.backend.null';
$settings['cache']['bins']['page']           = 'cache.backend.null';
$settings['cache']['bins']['dynamic_page_cache'] = 'cache.backend.null';

// Stage File Proxy
$config['stage_file_proxy.settings']['origin'] = 'https://www.example.com';

// Verbose error reporting
$config['system.logging']['error_level'] = 'verbose';
```

## Command-Line Tools: Drush 13 and the Core `dr` CLI

Two CLIs coexist:

| | Drush 13 | Core `dr` (11.4+) |
|---|---|---|
| Install | `composer require drush/drush` | ships with core, `vendor/bin/dr` |
| Status | stable; Drush 14 (branch `14.x`) targets Drupal 12 | `@internal` and experimental; API may change |
| Site aliases, `sql:sync`, `deploy`, `cex/cim`, generators | yes | no |
| Built-in commands | hundreds | `cache:rebuild`, `system:cron`, `system:status`, `user:login` (11.5), `install`, `quick-start`, `server`, `generate-theme`, `recipe:apply`, `recipe:info`, `content:export` |
| Module commands | `src/Drush/Commands/` | `src/Command/` |

Use Drush for deployments and day-to-day operations. Write module business logic once in a service, then expose it through a thin Drush command and (optionally) a thin `dr` command. `core/scripts/drupal` is deprecated; use `vendor/bin/dr` for `generate-theme`, `recipe:apply` and friends.

### Service Holding the Logic

```php
// src/Sync/ProductSync.php — plain service registered in my_module.services.yml
final class ProductSync {
  public function run(string $id, bool $dryRun = FALSE): int { /* ... */ }
}
```

### Core `dr` Command (11.4+)

Invokable class in `src/Command/`, discovered by the `#[AsCommand]` attribute, autowired, no `services.yml` entry. Command namespace is the module name with hyphens; never use the bare `core` namespace.

```php
namespace Drupal\my_module\Command;

use Drupal\my_module\Sync\ProductSync;
use Symfony\Component\Console\Attribute\Argument;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Attribute\Option;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(
  name: 'my-module:sync',
  description: 'Sync products from the remote API.',
  aliases: ['mms'],
)]
final class SyncCommand {

  public function __construct(
    private readonly ProductSync $sync,
  ) {}

  public function __invoke(
    OutputInterface $output,
    #[Argument('The product ID to sync.')]
    string $id,
    #[Option('Simulate without saving.')]
    bool $dryRun = FALSE,
  ): int {
    $count = $this->sync->run($id, $dryRun);
    $output->writeln("Synced $count products.");
    return Command::SUCCESS;
  }

}
```

Run with `vendor/bin/dr my-module:sync 42 --dry-run` (or `ddev exec dr ...`). Return `Command::SUCCESS` / `Command::FAILURE`; write with `OutputInterface`, log through the injected logger. The `#[Ask]` attribute prompts interactively for a missing argument.

### Drush 13 Command

Drush 13 discovers commands in `src/Drush/Commands/` through attributes, autowired with `AutowireTrait`. `drush.services.yml` is deprecated in Drush 13 and removed in Drush 14.

```php
namespace Drupal\my_module\Drush\Commands;

use Drupal\my_module\Sync\ProductSync;
use Drush\Attributes as CLI;
use Drush\Commands\AutowireTrait;
use Drush\Commands\DrushCommands;

final class MyModuleCommands extends DrushCommands {

  use AutowireTrait;

  public function __construct(
    private readonly ProductSync $sync,
  ) {
    parent::__construct();
  }

  #[CLI\Command(name: 'my-module:sync', aliases: ['mms'])]
  #[CLI\Argument(name: 'id', description: 'The product ID to sync.')]
  #[CLI\Option(name: 'dry-run', description: 'Simulate without saving.')]
  public function sync(string $id, array $options = ['dry-run' => FALSE]): void {
    $count = $this->sync->run($id, (bool) $options['dry-run']);
    $this->logger()->success(dt('Synced @count products.', ['@count' => $count]));
  }

}
```

Keep the same command name in both so documentation and CI scripts work with either tool. Drush-specific niceties (`--format=table`, site aliases) stay in the Drush wrapper.

### Old Drush Style — Do Not Use

```php
// DEPRECATED — drush.services.yml-registered class with @command annotations
class OldStyleCommands extends DrushCommands {
  /**
   * @command my_module:process
   * @argument id The entity ID
   */
  public function process(string $id): void { ... }
}
```

---

## Recipes — Configuration Packages

**Recipes** replace Distributions as the recommended way to apply reusable configuration. Unlike modules, recipes are applied once and leave no ongoing maintenance coupling.

### Recipe Structure

```
recipes/my-recipe/
├── recipe.yml        # metadata + instructions
└── config/           # optional: config YAML to install
```

```yaml
# recipe.yml
name: 'My Recipe'
description: 'Configures the site for a specific use case'
type: 'Site'

recipes:
  - core/recipes/content_editor_role

install:
  - my_module
  - pathauto
  - metatag

config:
  actions:
    my_module.settings:
      setMultiple:
        enabled: true
        max_items: 20
    core.extension:
      installModule:
        - views_ui   # only on dev environments — exclude from production recipe
```

### Applying a Recipe

```bash
# Via the core CLI (11.4+)
vendor/bin/dr recipe:apply path/to/recipes/my-recipe
vendor/bin/dr recipe:info path/to/recipes/my-recipe

# Via Drush
drush recipe path/to/recipes/my-recipe
```

Since 11.4 recipes install extensions in batches; code that drove recipes programmatically should call `RecipeRunner::installModules()`. Install profiles can list recipes to apply automatically (11.5), which is the preferred way to build a reusable "site template" instead of a distribution.

### Recipe vs Module vs Distribution

| | Recipe | Module | Distribution |
|---|---|---|---|
| Applied once | Yes | No (installed/uninstalled) | At install only |
| Ongoing maintenance | None | Yes | Yes (coupled to distro) |
| Reversible | No | Yes | No |
| Config changes after apply | Site owns it | Module owns it | Distro owns it |
| Composer distribution | Yes (`composer/installers`) | Yes | Yes |

**Use Recipes** for: initial site configuration, enabling a set of features, applying a content model without ongoing module coupling.

---

## Key Admin Paths Reference

| Path | Purpose |
|---|---|
| `/admin/reports/status` | Site status, warnings, errors, platform requirements |
| `/admin/config/development/configuration` | Config sync: compare filesystem vs database |
| `/admin/config/development/performance` | Cache settings, CSS/JS aggregation |
| `/admin/config/development/logging` | Error reporting verbosity |
| `/admin/config/development/settings` | Twig debug, render cache disable |
| `/admin/modules` | Enable/disable modules |
| `/admin/reports/updates` | Available security and module updates |
| `/admin/people/permissions` | Permission management |
| `/admin/structure/views` | Views management |
| `/admin/structure/types` | Content type management |
| `/admin/structure/taxonomy` | Taxonomy management |
