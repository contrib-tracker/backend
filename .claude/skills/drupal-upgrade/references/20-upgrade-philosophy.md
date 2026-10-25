# Major Version Upgrade Philosophy

## How Drupal Major Versions Work

Since Drupal 8, Drupal follows a **continuous upgrade path** philosophy built on three principles:

1. **Deprecate in minor, remove in major.** APIs are deprecated with `@trigger_error()` in minor releases (e.g., 10.1, 10.2, 10.3) and removed in the next major (11.0). The `@deprecated` docblock always names the replacement.

2. **The last minor is the bridge.** The last minor of the old major (10.3.x, 11.5.x) and the first release of the new major (11.0.0, 12.0.0) are functionally identical — 12.0 is 11.5 with deprecated code removed, dependencies bumped and platform requirements raised. Upgrading on the last minor means you are already running the new codebase; you just need to stop calling removed APIs. Drupal 12 goes one step further: it also drops the database updates added before 11.4.0, so a site must be on 11.4+ before it can update at all.

3. **No content migration.** Unlike Drupal 7→8, every upgrade from 8+ onward is an in-place update: `composer update` + `drush updatedb`. There is no content migration step.

## What Changes in a Major Version

| Always changes | Sometimes changes | Never changes |
|---|---|---|
| Deprecated APIs removed | Default themes replaced | Content model |
| PHP minimum version raised | Core modules moved to contrib | Config management workflow |
| Symfony components upgraded | Twig version bumped | Composer-based install |
| Database minimum versions raised | JavaScript libraries replaced | Entity API fundamentals |
| Drush major version required | Hook system evolution | Plugin system fundamentals |

## Semantic Versioning in Drupal

```
MAJOR.MINOR.PATCH
  │      │     └── Bug fixes, security patches. Safe to apply immediately.
  │      └──────── New features, deprecations added. BC guaranteed.
  └─────────────── Deprecated code removed. BC breaks allowed.
```

- **Minor releases** (~every 6 months): add features, add deprecations, but never break existing public APIs.
- **Major releases** (~every 2-3 years): remove all code deprecated in the previous major's lifecycle. Upgrade Symfony and PHP requirements.

## Dependencies Drive Major Releases

Drupal's major release cadence is tied to its dependencies, particularly Symfony:

- Drupal 8: Symfony 3 → Drupal 9: Symfony 4/5 → Drupal 10: Symfony 6 → Drupal 11: Symfony 7 → Drupal 12: Symfony 8.1
- When Symfony reaches end-of-life, Drupal must release a new major to adopt the next Symfony LTS.
- PHP version requirements follow a policy of requiring the newest stable PHP at the first beta: Drupal 11 needs PHP 8.3, Drupal 12 needs PHP 8.5.
- PHPUnit majors ride along (Drupal 11: PHPUnit 11, Drupal 12: PHPUnit 12.5), which is why test suites need attention at every major.

Plan ahead by tracking the end-of-life dates of Drupal, Symfony, and PHP. When Symfony's current LTS is nearing EOL, expect a new Drupal major within 6-12 months. The current schedule: Drupal 12.0.0 in the week of 7 December 2026 (alongside 11.5.0), Drupal 10 end of life on 9 December 2026, Drupal 11 supported until Drupal 13.

## The Upgrade Mindset

> "Remediate deprecations when they become known in minor versions, not when they get delivered by major releases."
> — *Drupal 10 Masterclass*

The cost of upgrading is proportional to how long you wait. Teams that fix deprecations as part of regular maintenance during minor upgrades have almost zero cost at major version boundaries. Teams that defer all deprecation work to major upgrade time face a large, risky batch of changes.

**Rule:** Treat deprecation warnings as bugs. Fix them in the same sprint they appear, not in a future "upgrade project."

## Key Concepts

### Schema Versions

Drupal tracks each module's database state via a **schema version** number stored in `key_value`. The base schema version follows the major version (8000 for D8, 9000 for D9, 10000 for D10, 11000 for D11, 12000 for D12). Update hooks increment this number. Each major also removes old update hooks and raises `hook_update_last_removed()`; a site whose schema versions are older than that marker cannot update and must go through an intermediate release first (11.4.0 for Drupal 12).

### Update Hooks vs. Post-Update Hooks

| | `hook_update_N()` | `hook_post_update_NAME()` |
|---|---|---|
| File | `*.install` | `*.post_update.php` |
| Purpose | Schema changes (add/drop columns, tables) | Data migrations, config updates |
| Ordering | Numeric order (10001, 10002, ...) | Declaration order in file |
| Runs | Once per schema version | Once per function name |
| Batch support | `$sandbox` parameter | `$sandbox` parameter |

Both are triggered by `drush updatedb` or `/update.php`.

### core_version_requirement

Every module and theme declares which Drupal major versions it supports in its `*.info.yml`:

```yaml
# Compatible with current and next major:
core_version_requirement: ^11.5 || ^12

# Only the new major:
core_version_requirement: ^12
```

During the upgrade window, support both versions (`^N.last || ^N+1`) so the module works on either. Pin the minor on the old side when the code uses APIs that only exist there (OOP theme hooks need 11.3, `#[Route]` attributes need 11.4, `#[HookDependsOnModule]` needs 11.5).

## Tools for Major Upgrades

| Tool | What it does |
|---|---|
| **Upgrade Status** (`drupal/upgrade_status`) | Scans custom and contrib code for deprecations, missing compatibility declarations, and environment issues. The primary pre-upgrade audit tool. |
| **Drupal Rector** (`drupal/rector`, 1.1+) | Automated code rewriting — replaces deprecated API calls with their successors. Has rule sets per target version, including Drupal 12, plus the core-provided hook-to-OOP converter (linked from the `.module` deprecation change record). |
| **PHPStan + drupal rules** (`mglaman/phpstan-drupal` 2.x + `phpstan/phpstan-deprecation-rules`) | Static analysis that catches deprecated function calls, class usage, and method signature issues. Integrates into CI. Add core's `TestClassClassMetadata` / `TestClassMethodMetadata` rules to catch PHPUnit annotations and core's disallowed-calls config to catch weak hashes. |
| **drupal-check** (`mglaman/drupal-check`) | Lightweight CLI tool that flags deprecated API usage. Predecessor to the PHPStan approach. |
| **Change records** (`drupal.org/list-changes/drupal`) | Official database of API and usage changes per release. The authoritative reference when a deprecation replacement is unclear. Filter by `to_branch=12.0.x` and `11.5.x`. |
| **Deprecated and obsolete extensions** (`drupal.org/docs/core-modules-and-themes/deprecated-and-obsolete`) | The official table of core modules and themes that moved to contrib, with the contrib project for each. |
