# Drupal 12 Changes Checklist

Everything a reviewer, module author or upgrade engineer needs to know about what Drupal 11.x deprecated and Drupal 12.0 removed or changed. Verified against the 12.0.x branch and drupal.org change records as of October 2026 (12.0.0-beta1). Links are to the change records; confirm against `drupal.org/list-changes/drupal` if anything looks stale.

## Timeline

| Date | Event |
|---|---|
| 17 Dec 2025 | 11.3.0: OOP theme hooks, `hook_requirements()` deprecated, native HTMX, Navigation stable |
| Jun 2026 | 11.4.0: `dr` CLI, `#[Route]` attributes, `symfony/runtime`, `check_markup()` deprecated |
| Sep 2026 | 11.5.0-beta1 and 12.0.0-beta1: `.module`/`.theme`/`.profile` deprecated |
| Week of 9 Nov 2026 | 12.0.0-rc1 and 11.5.0-rc1 |
| Week of 7 Dec 2026 | **12.0.0 and 11.5.0 release**; Drupal 10 end of life on 9 Dec 2026 |
| until Drupal 13 | Drupal 11 remains supported |

## Platform

| | Drupal 11.x | Drupal 12 |
|---|---|---|
| PHP | 8.3+ | **8.5.0+** |
| Symfony | 7.x | **8.1** |
| Twig | 3.x | 3.28+ (still Twig 3) |
| PHPUnit | 11 | **12.5** |
| Guzzle | 7 | 8 |
| MySQL / MariaDB | 8.0 / 10.6 | 8.0 / **10.11** |
| PostgreSQL | 16 | **18** |
| SQLite | 3.45 | 3.45 |
| Minimum source version | | **11.4.0** (11.5 recommended); updates added before 11.4.0 are removed |
| Windows | | production hosting deprecated |

## Extensions Removed in 12.0

| Extension | Deprecated in | Where it went |
|---|---|---|
| Ban | 11.3 | `drupal/ban` |
| Migrate Drupal UI | 11.3 | removed, no replacement |
| Migrate Drupal | 11.4 | removed, no replacement (Migrate API stays) |
| Contact | 11.4 | `drupal/contact` |
| Field Layout | 11.4 | `drupal/field_layout` |
| History | 11.4 | `drupal/history` |
| Telephone | 11.4 | `drupal/telephone` |
| Stable 9 theme | 11.4 | `drupal/stable9` |
| Settings Tray | 11.5 | `drupal/settings_tray` |
| Shortcut | 11.5 | `drupal/shortcut` |
| Search | 11.5 | `drupal/search` (search plugins already moved to sub-modules in 11.4) |
| Toolbar | 11.5 | `drupal/toolbar`; core uses Navigation |
| Claro theme | 11.5 | `drupal/claro`; core uses **Default Admin** (`default_admin`) |
| Olivero theme | 11.5 | `drupal/olivero`; Standard profile defaults to `default_admin` for the front end too |
| Text with summary field type | 11.5 | `drupal/text_with_summary` |

Before upgrading: either uninstall the extension on 11.x, or `composer require` the contrib version while still on 11.x and keep it installed. **Never uninstall after the upgrade**; the config would be lost.

Change records: Migrate Drupal node/3566999, History node/3567647, Search node/3616233, Toolbar node/3616232, Claro node/3623824 (deprecated) and node/3624703 (removed), Olivero node/3623805 and node/3624702, Shortcut node/3578141, Settings Tray node/3616220, Text with summary node/3568381. The meta issue tracking all of them is drupal.org/project/drupal/issues/3466088. Full table with contrib links: drupal.org/docs/core-modules-and-themes/deprecated-and-obsolete.

## Hooks and Extension Files

| Change | Version | Record |
|---|---|---|
| `#[Hook]` attribute, auto-registered `src/Hook/` services, `#[LegacyHook]` | 11.1 | node/3442349 |
| `order:` parameter, `#[ReorderHook]`, `#[RemoveHook]`; `hook_module_implements_alter()` needs `#[LegacyModuleImplementsAlter]` | 11.2 | node/3496788, node/3496786 |
| `hooks_converted` → `skip_procedural_hook_scan`; `StopProceduralHookScan` → `ProceduralHookScanStop` | 11.2 | node/3498595 |
| OOP `hook_preprocess`/`hook_preprocess_HOOK` in modules; `initial preprocess` replaces `template_preprocess_HOOK()` | 11.2 | node/3496491, node/3504125 |
| `hook_requirements()` deprecated → `InstallRequirementsInterface`, `hook_runtime_requirements()`, `hook_update_requirements()`, `RequirementSeverity` enum | 11.2 / 11.3 | node/3549685, node/3492429, node/3490851, node/3490852 |
| Themes support `#[Hook]` in `THEME/src/Hook/` | 11.3 | node/3551652 |
| `ModuleHandler::loadAllIncludes()` deprecated (removed in 13) | 11.3 | node/3536432 |
| `#[HookDependsOnModule]` | 11.5 | node/3548805 |
| **`.module` file extension deprecated** (autoload removed in 13), `#[ExtensionFileIsConverted]` | 11.5 | node/3619765 |
| **`.theme` file extension deprecated** | 11.5 | node/3581222 |
| **`.profile` file extension deprecated** | 11.5 | node/3624829 |
| `theme-settings.php` deprecated → `#[Hook('form_system_theme_settings_alter')]` | 11.5 | node/3587273 |
| **`hook_hook_info()` removed**; include-file autoloading gone | 12.0 | node/3489765 |
| **`hook_module_implements_alter()` removed** | 12.0 | api docs, node/3496788 |
| **Procedural hooks only collected from the main `.module`/`.theme` file**; hooks in `.inc` files are silently ignored | 12.0 | node/3613767 |
| `ModuleHandler::getHookInfo()`, `::writeCache()` removed | 12.0 | node/3442349 |

## Plugins and Discovery

| Change | Version | Record |
|---|---|---|
| Plugin types without an attribute class are deprecated | 11.2 | node/3522776 |
| `doctrine/annotations` abandoned upstream; parts forked into core | 11.3 | release notes 11.3.0 |
| **Attribute class mandatory for every plugin manager** (annotation class may still be passed alongside) | 12.0 | node/3522776 |
| Annotation-based plugin definitions removed | 13.0 (planned) | node/3265945 |

## Routing, Forms, Controllers

| Change | Version | Record |
|---|---|---|
| `#[Route]` attributes on controller classes/methods in the `Controller` namespace | 11.4 | node/3324758 |
| `Drupal\Core\Routing\Attribute\Route` adds `title:` (string, `TranslatableMarkup`, or static closure on PHP 8.5) | 11.5 | node/3614321 |
| `#[Route]` on form classes in the `Form` namespace | 11.5 | node/3585342 |
| `RouteSubscriberBase` can define routes, not only alter them | 11.5 | node/3613489 |
| 404s are `CacheableNotFoundHttpException` | 11.4 | listed in 11.4.x change records |
| CSRF token validation with the `rest` key deprecated (removed 12.0) | 11.4 | node/3591939 |
| `check_markup()` deprecated → `#type => 'processed_text'` render array | 11.4 | node/3588040 |
| `hide()` / `show()` deprecated → `$element['#printed'] = TRUE/FALSE` | 11.4 | node/3261271 |
| **HTML5 form validation disabled by default** (`$settings['enable_html5_validation']`, setting removed in 13) | 12.0 | node/3537128 |
| `symfony/runtime` bootstrap; custom front controllers keep working until at least 12 | 11.4 | node/3553275 |

## Database, Config, Caching

| Change | Version | Record |
|---|---|---|
| Schema definition objects (`Schema`, `Table`, `Column`, `PrimaryKey`, `Index`, ...) replace nested arrays in `hook_schema()` and storage handlers | 11.5 | node/3557405 |
| `Transaction::commitOrRelease()`; implicit commit on destruct deprecated (removed 13); `commitAll()` deprecated | 11.5 | node/3524461 |
| Integer keys/targets for database connections deprecated | 11.5 | 11.5.x change records |
| `drupal_static()` / `drupal_static_reset()` deprecated → `memory` cache bin | 11.5 | node/2661204 |
| `!php/const` for PHP constants and enum cases in YAML (routing, services, config) | 11.5 | node/3403883 |
| `FileStorageFactory::getSync()` → `::get()`; `\Drupal\Core\Config\FileStorageFactory` deprecated | 11.5 | 11.5.x change records |
| `user_role_grant_permissions()` etc. → `Role::loadOverrideFree()->grantPermissions()` | 11.5 | node/3348027 |
| `user_logout()`, `user_login_finalize()`, `user_pass_rehash()`, `user_cookie_*()`, several locale and update functions deprecated | 11.4–11.5 | 11.4.x / 11.5.x change records |
| `node_access_rebuild()` functions deprecated → `NodeAccessRebuild` service | 11.4 | node/3534610 |
| **Default password hashing is argon2id** (`password.algorithm: 2y` to keep bcrypt) | 12.0 | node/3530196 |
| **`md5()`, `sha1()`, `crc32()`, weak `hash()` flagged as PHPStan errors** | 12.0 | node/3581605 |
| `allow_authorize_operations` setting deprecated | 12.0 | 12.0.x change records |

## Theming and Front End

| Change | Version | Record |
|---|---|---|
| `html_cva`, `html_attr`, `html_classes` Twig functions (twig/html-extra) | 11.4 | release notes 11.4.0 |
| Block plugin attributes pulled up onto the block wrapper | 11.4 | release notes 11.4.0 |
| Brotli-compressed CSS/JS aggregates | 11.4 | listed in 11.4.x change records |
| SDC `libraryOverrides` supports a `fonts` key | 11.4 | listed in 11.4.x change records |
| Library `before:` / `after:` ordering; per-file `weight` discouraged | 11.5 | node/3467489 |
| Library `aggregate` targets | 11.5 | 11.5.x change records |
| Design Tokens API (`*.tokens.yml`, DTCG format, `design_token` config entity) | 11.5 | node/3622344 |
| Status messages use ARIA live region roles instead of `contentinfo` | 11.5 | node/3614882 |
| `jQuery().resetForm()` removed | 11.5 | 11.5.x change records |
| SDC slots declare `expected`, `minItems`, `maxItems`; components declare `tags` | 12.0 | node/3582722 |
| CKEditor 5 uses UMD builds instead of DLL builds | 12.0 | 12.0.x change records |
| htmx v4 | 12.0 | 12.0.x change records |
| ESLint/CSSLint config no longer scaffolded; Node.js 24 for core development | 12.0 | 12.0.x change records |

## Testing

| Change | Version | Record |
|---|---|---|
| PHPUnit 10 attributes supported | 10.3 / 11.0 | node/3447698 |
| `#[RunTestsInSeparateProcesses]` required on every concrete Kernel/Functional/FunctionalJavascript test class | 11.3 | node/3548485 |
| `TestRequirementsTrait::getDrupalRoot()` deprecated → `$this->root` | 11.4 | node/3574112 |
| `SYMFONY_DEPRECATIONS_HELPER` deprecated → `DeprecationHandler` extension in `phpunit.xml`, `DRUPAL_DEPRECATION_FILTER_CONFIG` | 11.5 | node/3594014 |
| `#[Skip]` attribute; `#[Route]` in kernel tests | 11.5 | node/3615361, node/3605544 |
| **PHPUnit 12: annotations are ignored**; `@group`, `@covers`, `@dataProvider` must be attributes; PHPStan rules `TestClassClassMetadata` / `TestClassMethodMetadata` catch leftovers | 12.0 | node/3581981 |
| **Missing return types on interface implementations reported as deprecations** by the test runner | 12.0 | node/3579056 |
| `#[ShareEnvironment]` for kernel tests (`setUpEnvironment()`, `resetEnvironment()`); default in 13 | 12.0 | node/3623403 |
| `FunctionalTestSetupTrait::installModulesFromClassProperty()` deprecated; testing profile no longer installs page caches | 12.0 | 12.0.x change records |
| Packaged core releases no longer include core's own tests | 12.0 | node/3618953 |
| `run-tests.sh --types` takes PHPUnit suite names | 12.0 | 12.0.x change records |

## CLI, Composer, Site Building

| Change | Version | Record |
|---|---|---|
| `dr` CLI (`vendor/bin/dr`): `cache:rebuild`, `system:cron`, `system:status`, `install`, `recipe:apply`, `recipe:info`, `content:export`, `generate-theme`, `server`, `quick-start`; modules register `#[AsCommand]` classes in `src/Command/`; `core/scripts/drupal` deprecated | 11.4 | node/3584928 |
| `user:login` command added to `dr` | 11.5 | 11.5.x change records |
| `drupal/core-recommended` allows minor dependency updates and no longer pins Guzzle/Twig/polyfills | 11.4 | 11.4.x change records |
| `drupal/legacy-project` template abandoned → `drupal/recommended-project` | 11.4 | release notes 11.4.0 |
| Recipes install extensions in batches (`RecipeRunner::installModules()`); profiles can list recipes | 11.4 / 11.5 | release notes 11.4.0 |
| Standard profile: Article/Page content types removed, commenting off by default, tags vocabulary removed, homepage is `/user`, frontpage view disabled | 11.4 / 11.5 | 11.4.x / 11.5.x change records |
| Installer no longer offers profile selection; Umami hidden; profiles can opt out of install | 12.0 | node/3595589 |
| `robots.txt` blocks `/search?` | 11.4 | release notes 11.4.0 |
| Drush 14 (branch `14.x`) targets Drupal 12; Drush 13.8 is the current release | | drush.org |

## Review Red Flags (Drupal 12 Readiness)

When reviewing or scaffolding code, flag any of these:

- A `.module`, `.theme` or `.profile` file containing anything other than `#[LegacyHook]` shims
- `hooks_converted: true` in `info.yml` (never a valid key) or `hook_module_implements_alter()` / `hook_hook_info()`
- Hooks implemented in `.inc` files
- `hook_requirements()` or `REQUIREMENT_ERROR` constants
- `@Block(...)`-style annotations, or a plugin manager constructed without an attribute class
- `@group` / `@covers` / `@dataProvider` docblock annotations in tests; test classes missing `#[RunTestsInSeparateProcesses]`
- `drupal_static()`, `check_markup()`, `hide()`/`show()`, `watchdog_exception()`, `user_role_grant_permissions()`, `node_access_rebuild()`
- `md5()`, `sha1()`, `crc32()`, `uniqid()` used for identifiers or tokens
- `theme-settings.php`, `core/scripts/drupal`, Olivero/Claro as a base theme without the contrib project in `composer.json`
- `core_version_requirement: ^10 || ^11` on new code (nothing new should target Drupal 10 now that it is at end of life)
- Relying on HTML5 `required`/`pattern` validation for correctness instead of `validateForm()`
- `"php": "8.4.0"` or lower in `composer.json` platform config for a Drupal 12 project
