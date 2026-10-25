# Major Version Upgrade Workflow

A generic, repeatable workflow for upgrading Drupal from one major version to the next (e.g., 10→11, 11→12). The same pattern has applied to every major upgrade since Drupal 8→9. Drupal 11 → 12 specifics are called out inline; the full verified list of 12.0 changes is in `16-drupal-12-changes.md`.

---

## Phase 1: Assess (on current major, latest minor)

**Goal:** Understand the scope of work before changing any code.

### 1.1 Update to the latest minor patch

The last minor of the current major is the bridge to the next. It contains all deprecation notices that tell you what will break. For Drupal 12 the bridge is **11.5**; 11.4.0 is the hard minimum because 12.0 removed every core update hook older than that.

```bash
composer update "drupal/core-*" --with-all-dependencies
drush updatedb && drush cr
```

### 1.2 Check infrastructure requirements

Every major version raises minimum versions of PHP, database server, and Composer. Before touching code, verify that your hosting environment meets the target requirements. Check drupal.org release notes for the exact matrix.

| | Drupal 11 | Drupal 12 |
|---|---|---|
| PHP | 8.3+ | **8.5+** |
| MySQL / MariaDB | 8.0 / 10.6 | 8.0 / **10.11** |
| PostgreSQL | 16 | **18** |
| SQLite | 3.45 | 3.45 |
| Drush | 12 / 13 | 13.x now, 14.x in development |
| PHPUnit (for test suites) | 11 | **12.5** |
| Windows production hosting | supported | deprecated |

```bash
php -v                    # PHP version
mysql --version           # or mariadb, psql, sqlite3
composer --version        # Composer version
```

### 1.3 Run Upgrade Status

```bash
composer require --dev drupal/upgrade_status
drush en upgrade_status
```

Visit `/admin/reports/upgrade-status`. It reports on:
- **Custom modules and themes**: deprecated API usage, missing `core_version_requirement` declarations
- **Contrib modules**: whether a compatible release exists for the target version
- **Environment**: PHP version, database version, extension availability

Export the report. This is your work backlog.

### 1.4 Run static analysis

```bash
# PHPStan approach (preferred for CI integration)
composer require --dev mglaman/phpstan-drupal phpstan/phpstan-deprecation-rules
vendor/bin/phpstan analyse web/modules/custom web/themes/custom --level 2

# Or the simpler drupal-check
composer require --dev mglaman/drupal-check
vendor/bin/drupal-check web/modules/custom web/themes/custom
```

For Drupal 12 add core's own rules to `phpstan.neon` so PHPUnit annotations and weak hashes are caught before the upgrade:

```neon
rules:
  - Drupal\PHPStan\Rules\TestClassClassMetadata
  - Drupal\PHPStan\Rules\TestClassMethodMetadata
```

Also grep for things static analysis does not see:

```bash
# Procedural hooks still outside src/Hook/
grep -rlE '^function [a-z0-9_]+_(form_alter|preprocess|node_|entity_|cron|theme|views_)' web/modules/custom web/themes/custom
# Hooks in include files (silently ignored in Drupal 12)
grep -rlE '^function [a-z0-9_]+_' web/modules/custom --include='*.inc'
# Removed meta hooks and legacy flags
grep -rnE 'hook_module_implements_alter|_module_implements_alter\(|_hook_info\(|hooks_converted' web/modules/custom web/themes/custom
# Test metadata still in annotations
grep -rlE '@(group|covers|dataProvider)' web/modules/custom/*/tests
# Dependencies on extensions that left core in 12
grep -rnE "^\s*- (drupal:)?(search|toolbar|shortcut|contact|ban|telephone|history|field_layout|settings_tray)$" web/modules/custom --include='*.info.yml'
grep -rnE "base theme: (olivero|claro|stable9)" web/themes/custom --include='*.info.yml'
```

### 1.5 Inventory contrib modules

For each contrib module:
1. Check drupal.org for a release compatible with the target version
2. If no release exists: check the issue queue for a compatibility patch, or identify an alternative module
3. Note any modules that were removed from core in the target version — they may be available as contrib

**Rule:** Do not upgrade until every enabled module has a compatible release or a tested patch. Contrib readiness is the most common blocker.

---

## Phase 2: Fix (still on current major)

**Goal:** Resolve all deprecations and compatibility issues while the site is still running on the current major. This is the safest time to make changes because the old APIs still work — you can test both old and new patterns side by side.

### 2.1 Run Drupal Rector

```bash
composer require --dev drupal/rector
```

Create `rector.php` at the project root:

```php
use DrupalRector\Set\DrupalSetList;
use Rector\Config\RectorConfig;

return RectorConfig::configure()
    ->withPaths([
        __DIR__ . '/web/modules/custom',
        __DIR__ . '/web/themes/custom',
    ])
    ->withSets([
        // Use the set for your TARGET version:
        DrupalSetList::DRUPAL_12,
    ]);
```

Rector covers deprecated function and method calls. For the hook conversion, core publishes a separate Rector rule and DDEV script (linked from the `.module` deprecation change record, drupal.org/node/3619765); it converts functions that carry a correct `Implements hook_NAME().` docblock into `#[Hook]` methods. Review the generated classes: injected services, ordering and `.inc` includes still need a human.

```bash
# Preview changes
vendor/bin/rector process --dry-run

# Apply changes
vendor/bin/rector process
```

Review every change. Rector handles the bulk of mechanical replacements but cannot fix:
- Complex logic or dynamic calls
- Twig template syntax
- Configuration or schema changes
- Custom plugin architecture decisions

### 2.2 Fix remaining deprecations manually

Work through the Upgrade Status report item by item. For each deprecation:
1. Read the `@deprecated` docblock — it names the replacement
2. If unclear, search the change records at `drupal.org/list-changes/drupal`
3. Replace the deprecated call with the recommended alternative
4. Run tests

### 2.3 Convert hooks, plugin managers and tests (Drupal 11 → 12)

These three areas are where Drupal 12 differs most from earlier majors, and all three can be finished on 11.5 with no behaviour change:

1. **Hooks.** Move every procedural hook into `#[Hook]` classes under `src/Hook/` (modules) or `THEME/src/Hook/` (themes), then delete the `.module` / `.theme` / `theme-settings.php` files. Replace `hook_module_implements_alter()` with `order:` / `#[ReorderHook]` / `#[RemoveHook]`, `hook_hook_info()` includes with hook classes, and `hook_requirements()` with `InstallRequirementsInterface` plus `runtime_requirements` / `update_requirements` hooks. Hooks that remain in `.inc` files do not run on 12. See `14-oop-hooks.md`.
2. **Plugin managers.** Every custom `DefaultPluginManager` subclass must pass an attribute class; convert `src/Annotation/*` to `src/Attribute/*` and the plugin classes from `@Annotation` to `#[Attribute]`. See `03-plugins.md`.
3. **Tests.** Convert `@group`/`@covers`/`@dataProvider` to attributes, add `#[RunTestsInSeparateProcesses]` to every Kernel/Functional/FunctionalJavascript class, make data providers static, replace `SYMFONY_DEPRECATIONS_HELPER` with the `DeprecationHandler` extension in `phpunit.xml`, and add return types wherever a core interface is implemented. See `12-testing.md`.

Also sweep for the removed and deprecated functions listed in `16-drupal-12-changes.md` (`drupal_static()`, `check_markup()`, `hide()`/`show()`, `user_role_grant_permissions()`, `node_access_rebuild()`, implicit transaction commits, weak hash functions).

### 2.4 Update `core_version_requirement`

In every custom module and theme `*.info.yml`, declare compatibility with both versions during the transition:

```yaml
core_version_requirement: ^11.5 || ^12
```

Pin the old-side minor to the oldest release that has every API the code uses (11.3 for OOP theme hooks, 11.4 for `#[Route]`, 11.5 for `#[HookDependsOnModule]`).

### 2.5 Migrate text editors (if applicable)

If the target version removes a text editor (CKEditor 4 was removed in D11), migrate while still on the current major where the migration path exists. Drupal 12 keeps CKEditor 5 but switches it from DLL builds to UMD builds; custom CKEditor 5 plugins built against the DLL manifest need rebuilding.

Custom editor plugins will need to be rewritten for the new editor's API. Plan time for this.

### 2.6 Migrate themes (if applicable)

If the target version removes themes your site depends on (base themes or admin themes), migrate while still on the current major. **Drupal 12 removes Olivero, Claro and Stable 9** and ships Default Admin (`default_admin`) as the default admin and front-end theme.

**If using a removed base theme (Olivero, Claro, Stable 9; earlier Classy, Stable):**
- Option A: Require the contrib version of the removed theme before the core update (`composer require drupal/olivero`, `drupal/claro`, `drupal/stable9`). Short-term bridge; the contrib copies are maintained but no longer evolve with core.
- Option B: Generate a standalone theme using Starterkit and port your customisations:
  ```bash
  vendor/bin/dr generate-theme my_theme --path themes/custom
  ```
- Admin sub-themes of Claro: evaluate rebasing on `default_admin`; its templates and CSS variables differ from Claro's, so this is a redesign task, not a rename.

**Convert theme hooks** to `THEME/src/Hook/` classes (11.3+) and delete `.theme` and `theme-settings.php` (deprecated 11.5). Rename any `includes/*.php` hook files first: on 12 they are ignored outright.

**Check Twig templates** for syntax that was already removed in Twig 3 (`{% filter %}` → `{% apply %}`, `spaceless` tag, `sameas`). Drupal 12 stays on Twig 3, so this is a leftover-debt check, not a new migration.

**Check `libraries-override` / `libraries-extend`** for `olivero/*`, `claro/*`, `stable9/*`, `bartik/*` references; they fail silently when the theme is gone.

### 2.7 Uninstall or replace removed core modules

If the target version removes core modules your site uses, either:
- **Uninstall** them while still on the current major if no longer needed: `drush pmu module_name`
- **Require the contrib replacement** before upgrading: `composer require drupal/module_name`, keep it installed, then update core

Never uninstall a removed module *after* the core update: its code is gone, so the uninstall hooks cannot run and its config is orphaned.

For Drupal 12 the list is `ban`, `contact`, `field_layout`, `history`, `search`, `settings_tray`, `shortcut`, `telephone`, `toolbar` (contrib available), `text_with_summary` (field type, contrib), and `migrate_drupal` + `migrate_drupal_ui` (no replacement; finish any Drupal 6/7 migration on 11 first). Toolbar users move to the core Navigation module. The Upgrade Status report confirms which of these a given site actually has installed.

### 2.8 Update contrib modules

Update all contrib to versions compatible with the target major:

```bash
composer update drupal/* --with-all-dependencies
drush updatedb && drush cr
```

### 2.9 Run tests

Run your full test suite on the current major after all fixes:

```bash
# PHPUnit
vendor/bin/phpunit --configuration web/core/phpunit.xml.dist web/modules/custom

# Functional / end-to-end
# (Nightwatch, Cypress, Playwright — whatever the project uses)
```

All tests must pass before proceeding to Phase 3. Browser tests that depended on HTML5 client-side validation blocking a submit will start failing on Drupal 12 (validation is off by default); fix them now by asserting on Drupal's server-side messages.

---

## Phase 3: Upgrade (move to next major)

**Goal:** Switch the codebase to the new major version. If Phases 1 and 2 were thorough, this should be uneventful.

### 3.1 Back up everything

```bash
# Database
drush sql:dump --gzip > /path/to/backup-pre-upgrade.sql.gz

# Files
tar -czf /path/to/files-backup.tar.gz web/sites/default/files/

# Code is in Git — ensure everything is committed
git status
```

### 3.2 Update Composer dependencies

```bash
# Allow the Composer plugins core 11.4+ relies on (one-time)
composer config allow-plugins.symfony/runtime true
composer config platform.php 8.5.0

composer require \
  drupal/core-recommended:^NEXT \
  drupal/core-composer-scaffold:^NEXT \
  drupal/core-project-message:^NEXT \
  --no-update

# If drupal/core is listed explicitly, drop it; core-recommended pulls it in:
composer remove drupal/core --no-update

# If using core-dev for testing (required on 12: packaged core no longer ships its tests):
composer require drupal/core-dev:^NEXT --dev --no-update

# Drush: the newest 13.x, or 14.x once it has a release for Drupal 12
composer require drush/drush --no-update

# Execute the update
composer update --dry-run
composer update
```

Replace `^NEXT` with the target version constraint (e.g., `^11`, `^12`).

If Composer reports dependency conflicts:
```bash
# Diagnose what is blocking:
composer why-not drupal/core:^NEXT

# Reset every direct constraint to "whatever resolves" and retry (last resort):
composer show --no-dev --direct --name-only | xargs composer require --no-update
```

Use the Drupal Lenient Composer endpoint (`mglaman/composer-drupal-lenient`) for contrib that works with a patch but has not tagged a compatible release.

### 3.3 Run database updates

```bash
drush updatedb
drush cr
```

### 3.4 Export and review configuration

```bash
drush config:export
git diff config/
```

Review any config changes introduced by core update hooks. Clean up orphaned configuration from removed modules:

```bash
# If a removed module left stale config:
drush config:delete module_name.settings
```

Drupal 12 specifics to check in the diff: `system.theme` (if it pointed at Olivero/Claro and the contrib copies are not installed), `core.extension` (removed modules must be absent), and `robots.txt` customisations (`Disallow: /search?` and `/index.php/search?` were added in 11.4).

### 3.5 Smoke test

Verify critical functionality:
- [ ] Site loads (no white screen)
- [ ] Admin login works
- [ ] Content creation and editing
- [ ] Views and listings render correctly
- [ ] Custom forms submit without errors
- [ ] Search returns results
- [ ] REST / JSON:API endpoints respond
- [ ] Cron runs successfully
- [ ] File and media uploads work
- [ ] Email sending works
- [ ] Error log is clean (`/admin/reports/dblog` or syslog)
- [ ] (12.0) Users can still log in: argon2id is now the default hash, bcrypt hashes are rehashed on login; if PHP lacks argon2, set `password.algorithm: 2y`
- [ ] (12.0) Forms behave with HTML5 validation off; nothing relied on the browser blocking a submit
- [ ] (12.0) Admin UI renders in Default Admin (or contrib Claro) and the navigation works without Toolbar

---

## Phase 4: Deploy to production

**Goal:** Apply the same upgrade to production with minimal downtime.

### 4.1 Pre-deployment

- [ ] Schedule a maintenance window
- [ ] Notify stakeholders
- [ ] Ensure the staging upgrade has been fully tested
- [ ] Take a fresh production database backup

### 4.2 Deployment sequence

```bash
# Enable maintenance mode
drush state:set system.maintenance_mode 1 --input-format=integer
drush cr

# Back up database
drush sql:dump --gzip > /path/to/prod-backup-pre-upgrade.sql.gz

# Deploy code (git pull, rsync, or CI/CD pipeline)
# ...

# Install Composer dependencies from lock file
composer install --no-dev

# Run database updates
drush updatedb

# Import configuration
drush config:import

# Clear caches
drush cr

# Disable maintenance mode
drush state:set system.maintenance_mode 0 --input-format=integer
drush cr
```

Or replace the `updatedb` + `config:import` + `cr` sequence with `drush deploy`.

### 4.3 Post-deployment

- [ ] Run the smoke test checklist from Phase 3
- [ ] Monitor error logs for the first 24 hours
- [ ] Keep the pre-upgrade database backup for at least 2 weeks

---

## Rollback Plan

If the upgrade fails in production:

```bash
# Restore the database
drush sql:drop
drush sql:cli < /path/to/prod-backup-pre-upgrade.sql.gz

# Restore the code to the previous version
git checkout tags/pre-upgrade-tag

# Install old dependencies
composer install --no-dev

# Clear caches
drush cr
```

**Rule:** Always tag the codebase before deploying a major upgrade so you have a clean rollback point.

---

## Ongoing: Prevent Upgrade Debt

After a successful upgrade, establish habits that make the next major upgrade trivial:

1. **Fix deprecations as they appear** in minor updates — don't defer them
2. **Run PHPStan in CI** with deprecation rules enabled — catch new deprecations automatically; fail the PHPUnit run on deprecations triggered by your own code through the `DeprecationHandler` extension
3. **Keep contrib current** — modules that track Drupal minor releases are always ready for the next major
4. **Track dependency lifecycles** — know when Symfony, PHP, and your database reach EOL
5. **Run `upgrade_status` quarterly** — even mid-cycle, it shows how close you are to readiness for the next major

---

## Common Post-Upgrade Issues

| Symptom | Likely cause | Fix |
|---|---|---|
| White screen | PHP version mismatch or missing class | Check PHP error log; verify PHP version meets target requirements |
| "Class not found" | Deprecated class removed in new major | Search change records for the class name; replace with successor |
| Config schema errors | Orphaned config from removed module | `drush config:delete module_name.settings` |
| Twig errors | Deprecated syntax in templates | Check for `{% filter %}` (use `{% apply %}`), `spaceless` tag, `sameas` |
| Composer conflicts | Contrib module pinning old core dependency | `composer why-not drupal/core:^NEXT` to diagnose |
| Missing module | Core module moved to contrib | `composer require drupal/module_name` |
| Hook silently stopped firing | Hook lives in an `.inc` file, or `hook_module_implements_alter()` was doing the ordering | Move into a `#[Hook]` class; use `order:` / `#[ReorderHook]` |
| "Class ... does not exist" for a theme function | `.theme` include renamed or hook class namespace wrong | Hook classes must be in `Drupal\THEME\Hook`; includes must be `.theme`/`.inc` (11.x) or converted (12) |
| Fatal in a custom plugin manager | No attribute class passed to `DefaultPluginManager` | Add `src/Attribute/*` and pass it as the fifth constructor argument |
| Test suite runs zero tests or ignores groups | Annotation-only test metadata under PHPUnit 12 | Convert to `#[Group]`, `#[CoversClass]`, `#[DataProvider]` |
| `composer install` fails on a plugin | `symfony/runtime` not in `allow-plugins` | `composer config allow-plugins.symfony/runtime true` |
| Front-end theme is Stark after update | Olivero removed, contrib copy not installed | `composer require drupal/olivero` then re-enable, or switch to a Starterkit theme |
