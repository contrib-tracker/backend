---
name: drupal-review
description: Review Drupal code against team standards for Drupal 12 (and 11.5), PHP 8.5, and modern best practices - OOP hooks, attributes, Drupal 12 deprecations and removals. Use this skill whenever someone asks to review a Drupal module, check a PR, audit Drupal architecture, check Drupal 12 readiness, or validate that code follows standards.
allowed-tools: Read, Grep, Glob
argument-hint: "<file-or-directory-path ...>"
---

# Drupal Code Review

You are reviewing Drupal code against this team's established coding standards. The goal is to catch issues before they reach production — security holes, stale cache metadata, outdated PHP patterns, APIs that no longer exist in Drupal 12, and architectural problems are all fair game.

Target: Drupal 12 (released December 2026) with Drupal 11.5 as the bridge, PHP 8.5, PHPUnit 12. Treat anything deprecated in 11.x as a violation, and anything removed in 12.0 as critical.

**References library:** `references/`

Start by reading `README.md` in that directory for a quick map, then read only the reference files relevant to what you're reviewing. Don't load all 16 files — be surgical.

## Step 1: Understand what to review

If `$ARGUMENTS` contains file paths, read those files. If the user pasted code inline, work with that. If neither, ask: "What file or directory should I review?"

Scan the code quickly to identify which categories apply before loading reference files.

## Step 2: Load relevant references

| Code contains... | Read this reference file |
|---|---|
| `*.info.yml`, module structure | `01-module-architecture.md` |
| Services, `*.services.yml`, `create()` factory, `#[Autowire]` | `02-services-dependency-injection.md` |
| `#[Block]`, `#[FieldType]`, `#[QueueWorker]`, plugin classes, plugin managers | `03-plugins.md` |
| Entity classes, base field definitions, bundle classes | `04-entities.md` |
| `*.routing.yml`, `#[Route]`, controllers, `AccessResult` | `05-routing-access.md` |
| `FormBase`, `ConfigFormBase`, `#ajax`, `#upload_validators` | `06-forms.md` |
| `$this->database->`, `hook_schema`, `hook_update_N`, transactions | `07-database.md` |
| `ConfigFactoryInterface`, `StateInterface`, `TempStoreFactory`, roles/permissions | `08-configuration.md` |
| `#cache`, render arrays, `CacheableMetadata`, `drupal_static()` | `09-caching.md` |
| User input, permissions, CSRF tokens, file uploads, hashing | `10-security.md` |
| Twig templates, `*.theme`, `*.libraries.yml`, SDC, theme hooks | `11-theming.md` |
| Test classes, `UnitTestCase`, `KernelTestBase`, `phpunit.xml` | `12-testing.md` |
| `DrushCommands`, `#[AsCommand]`, `composer.json`, `drush.services.yml` | `13-deployment.md` |
| `#[Hook]`, `*.module` hook functions, `src/Hook/`, `hook_requirements` | `14-oop-hooks.md` |
| Any function or module you are not sure still exists in Drupal 12 | `16-drupal-12-changes.md` |

Always read `15-modern-php.md` when reviewing any PHP code — PHP 8.5 patterns apply everywhere.
Always read `10-security.md` when there is user input, file handling, or permission checks.

## Step 3: Produce the review

Structure your output exactly like this:

---
## Drupal Code Review: `[filename or module name]`

### Critical Issues
*Security vulnerabilities, broken access control, data loss risks, and code that fatals or silently stops working on Drupal 12 (removed APIs, hooks in `.inc` files, `hook_module_implements_alter()`, annotation-only plugin managers, test classes with annotation-only metadata). Must fix before merge.*

### Standards Violations
*Deviations from Drupal 12 / PHP 8.5 coding standards, including anything deprecated in 11.x. Should fix.*

### Recommendations
*Improvements that follow best practices but aren't blocking.*

### Confirmed Good Practices
*Patterns done correctly — acknowledge briefly so the developer knows what to keep.*

---

For each finding:
- Cite the reference (e.g., "→ `10-security.md`: Never concatenate user input into SQL")
- Show the problematic snippet
- Show a corrected version

If there are no issues in a section, write "None found." — don't omit the section.

## High-value checks to run on every review

These catch the most common mistakes — worth checking even before reading the full reference files:

**PHP / OOP patterns**
- No `\Drupal::` static calls inside classes (hook classes, services, controllers, forms, plugins all use constructor injection; the only exceptions are `.install` files, `InstallRequirementsInterface`, static plugin methods and theme helper classes)
- PHP native attributes used, not Doctrine annotations: `#[Block(...)]` not `/** @Block(...) */`; custom plugin managers pass an attribute class (mandatory in 12.0)
- Constructor property promotion: `public function __construct(private readonly FooService $foo)` — the verbose property-then-assign pattern is outdated
- All parameters, return types, and properties have type declarations; `declare(strict_types=1);` at the top of each file

**Hooks**
- Hooks implemented as `#[Hook]` methods in `src/Hook/`, not as procedural functions. A `.module` file with hook functions is a standards violation (deprecated 11.5); hook functions in `.inc` files are critical (ignored in 12)
- No `hook_module_implements_alter()` or `hook_hook_info()` (removed in 12); ordering uses `order:`, `#[ReorderHook]`, `#[RemoveHook]`
- No `hook_requirements()` or `REQUIREMENT_*` constants; use `InstallRequirementsInterface`, `runtime_requirements`, `update_requirements`, `RequirementSeverity`
- `hooks_converted:` in `info.yml` is wrong (never a valid key); the parameter is `MODULE.skip_procedural_hook_scan` in `services.yml` and is pointless once the `.module` file is gone
- Hook classes are not registered or tagged in `services.yml` (auto-discovered); `#[LegacyHook]` shims only in contrib that supports Drupal < 11.1

**Removed or deprecated functions**
- `drupal_static()`, `check_markup()`, `hide()`/`show()`, `watchdog_exception()`, `user_role_grant_permissions()`, `node_access_rebuild()`, `file_validate_*` upload validators
- `md5()`, `sha1()`, `crc32()`, `uniqid()` for anything security-relevant or flagged by PHPStan
- Transactions without an explicit `commitOrRelease()`
- Dependencies on modules that left core in 12.0 (`search`, `toolbar`, `shortcut`, `contact`, `ban`, `telephone`, `history`, `field_layout`, `settings_tray`) or themes (`olivero`, `claro`, `stable9`) without the contrib project in `composer.json`

**Caching**
- Every render array has `#cache` with `tags` and `contexts` — missing cache metadata causes stale content for users
- Cache context is `user.roles` not `user` for role-based variations (the `user` context disables page caching)

**Security**
- No user input concatenated into SQL (use DB API placeholders)
- No `|raw` in Twig on user-supplied content (Twig auto-escapes; `|raw` bypasses it entirely)
- Routes have explicit `requirements:` keys, whether defined in YAML or `#[Route]`
- Forms do not rely on HTML5 client-side validation (disabled by default in 12); every rule is in `validateForm()` or a constraint

**Tests**
- `#[Group]`, `#[CoversClass]`, `#[DataProvider]` attributes, not `@group`/`@covers`/`@dataProvider` (PHPUnit 12 ignores annotations)
- `#[RunTestsInSeparateProcesses]` on every concrete Kernel/Functional/FunctionalJavascript test class
- Functional tests create the content types they use (`testing` profile has none)

**Config**
- Config schemas defined in `config/schema/` for every key the module introduces
- `core_version_requirement` matches the APIs used (`^11.5 || ^12` for new code; `^10 || ^11` on code using `src/Hook/` is a bug)
