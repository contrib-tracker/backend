# Drupal Development References

These references define the team standards for **Drupal 12 (and Drupal 11.5) + PHP 8.5** development. Use these files as a checklist during code writing, review, and architecture decisions.

> **Target stack:** Drupal 12.x (11.5 as the bridge release) · PHP 8.5 · Symfony 8.1 · Twig 3 · PHPUnit 12.5 · Drush 13 / core `dr` CLI
>
> Drupal 12.0.0 is scheduled for the week of 7 December 2026. Code written today targets `core_version_requirement: ^11.5 || ^12`.

---

## Files

| File | Topics |
|---|---|
| [01-module-architecture.md](01-module-architecture.md) | Module structure, requirements, PSR-4, naming, YAML files, what Drupal 12 removed |
| [02-services-dependency-injection.md](02-services-dependency-injection.md) | Services, DI patterns, autowiring, tagged services |
| [03-plugins.md](03-plugins.md) | Plugin types, attributes, custom plugin managers |
| [04-entities.md](04-entities.md) | Content/config entities, CRUD, access, field definitions, bundle classes |
| [05-routing-access.md](05-routing-access.md) | Routes (YAML and `#[Route]` attributes), controllers, access control, redirects |
| [06-forms.md](06-forms.md) | Form API, AJAX, validation, States API, file uploads |
| [07-database.md](07-database.md) | Database API, schema definition objects, transactions, update hooks |
| [08-configuration.md](08-configuration.md) | Config API, State, UserData, TempStore |
| [09-caching.md](09-caching.md) | Tags, contexts, max-age, lazy builders, memory cache |
| [10-security.md](10-security.md) | XSS, SQL injection, CSRF, access, file safety, hashing |
| [11-theming.md](11-theming.md) | Theme structure, Twig, libraries, JS behaviors, SDC, OOP theme hooks |
| [12-testing.md](12-testing.md) | PHPUnit 12 attributes, Unit, Kernel, Functional, FunctionalJavascript tests |
| [13-deployment.md](13-deployment.md) | Config splits, Drush 13, `dr` CLI, environments, Composer, Recipes |
| [14-oop-hooks.md](14-oop-hooks.md) | OOP `#[Hook]` system, ordering, requirements hooks, `.module` deprecation, themes |
| [15-modern-php.md](15-modern-php.md) | PHP 8.1–8.5 features: readonly, enums, match, property hooks, `#[Deprecated]` |
| [16-drupal-12-changes.md](16-drupal-12-changes.md) | Checklist of everything deprecated in 11.x and removed or changed in 12.0, with change records |

---

## Quick-Reference: The Most Critical Standards

### Architecture
- **Never put business logic in a theme.** If removing the theme breaks a feature, it belongs in a module.
- **Prefer site building over custom code.** Core → contrib → custom, in that order.
- **Custom code only for unique business logic** or third-party integrations that contrib cannot handle.
- **No `.module`, `.theme` or `.profile` files in new code.** They are deprecated in 11.5 and stop loading in 13.

### PHP / OOP
- **Never use `\Drupal::` static calls inside classes.** Hook classes, controllers, forms, plugins and services all get constructor injection.
- **Always provide an interface for entity types.** Enables mocking and documents the contract.
- **Controllers are thin.** They orchestrate services and return render arrays; no business logic.
- **Always define config schemas** in `config/schema/` for every config key you introduce.
- **Use PHP native `#[Attribute]` classes, not Doctrine `@Annotation` docblocks.** Plugins, entities, hooks, routes, commands and tests all use attributes. Drupal 12 requires an attribute class for every plugin type; annotation discovery is removed in 13.
- **Use constructor property promotion with `private readonly`** for all injected services.
- **Implement every hook as an `#[Hook]` method in `src/Hook/`.** Procedural hooks are legacy; `hook_hook_info()` and `hook_module_implements_alter()` no longer exist in 12.
- **Full type declarations everywhere.** Drupal 12's test runner reports missing return types on interface implementations as deprecations.

### Security
- **Never concatenate user input into SQL.** Always use DB API placeholders or the query builder.
- **Never use `|raw` in Twig on user-supplied content.** Twig auto-escapes by default; trust it.
- **Routes must have a `requirements:` key.** Without it access is denied; never use `_access: 'TRUE'` carelessly on sensitive routes.
- **Add `_csrf_token: 'TRUE'` to any state-changing GET route** (callback routes, delete links).
- **No `md5()`, `sha1()`, `crc32()`.** Use `hash('xxh3', ...)` for fingerprints and `Crypt::hashBase64()` / `Crypt::hmacBase64()` for anything security-relevant.

### Caching
- **Every render array needs correct `#cache` metadata.** Missing tags/contexts cause stale content.
- **Use `|without()` instead of omitting fields in Twig.** It preserves cache metadata bubbling.
- **Prefer `user.roles` over `user` as a cache context.** The `user` context is high-cardinality and effectively disables page caching.
- **No `drupal_static()`.** Use the `memory` cache bin or a property on the service.

### Theming
- **Never call `document.ready` or jQuery `$()` directly.** Use `Drupal.behaviors` with `once()`.
- **Theme hooks live in `THEME/src/Hook/`**, including `form_system_theme_settings_alter` (replaces `theme-settings.php`).
- **Use Twig debug mode** (`twig.config.debug: true`) to find template names and suggestion candidates.
- **Pass data from PHP to templates via preprocess**, not via direct template PHP logic.
- **Olivero and Claro are contrib in Drupal 12.** New sites use `default_admin` and a Starterkit-generated theme.

### Config Management
- **Remove `uuid` before placing exported YAML in `config/install/`.** UUIDs are site-specific.
- **Version all config YAML in Git.** Config is code.
- **"Code up, content down."** Promote code to production; pull the production database down to dev.

### Testing
- **PHPUnit 12 only reads attributes.** `#[Group]`, `#[CoversClass]`, `#[DataProvider]`; `@group` docblocks are ignored.
- **Every Kernel, Functional and FunctionalJavascript test class carries `#[RunTestsInSeparateProcesses]`.**

### Deployment
- Standard post-deploy sequence: `drush deploy` (equivalent to `drush updb && drush config:import && drush cr`)
- **Disable on production:** `views_ui`, `devel`, `dblog`. Use `syslog` instead of `dblog`.
- **Always back up the database before any production deployment.**
