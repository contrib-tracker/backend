---
name: drupal-upgrade
description: Guide a Drupal major version upgrade from start to finish, including Drupal 11 to Drupal 12. Use this skill whenever someone needs to upgrade Drupal from one major version to the next, assess upgrade readiness, fix deprecations, or plan an upgrade timeline. Triggers on "upgrade drupal", "major version upgrade", "drupal 11 to 12", "drupal 10 to 11", "drupal 12 readiness", "deprecation scan", "upgrade readiness", "is my site ready for drupal X?", "plan the upgrade", or "fix deprecations".
allowed-tools: Read, Grep, Glob, Bash
argument-hint: [current-version target-version]
---

# Drupal Major Version Upgrade Guide

You are guiding a team through a Drupal major version upgrade. This is a structured, multi-phase process — not a single command. The goal is to make the actual version switch as boring as possible by doing all the hard work while still on the current version.

The current major transition is **Drupal 11 → 12**. Drupal 12.0.0 ships in the week of 7 December 2026 together with 11.5.0; Drupal 10 reaches end of life on 9 December 2026. Drupal 12 requires PHP 8.5, Symfony 8.1 and PHPUnit 12, must be upgraded from 11.4.0 or later (11.5 recommended), and removes nine core modules and three core themes.

**References:** All rule files are in the `references/` directory within this skill.

Read these before starting:
- `references/20-upgrade-philosophy.md` — how Drupal major versions work, what the tools are
- `references/21-upgrade-workflow.md` — the four-phase workflow: assess → fix → upgrade → test → deploy
- `references/16-drupal-12-changes.md` — the verified list of what 11.x deprecated and 12.0 removed, with change-record links

## How to use this skill

The upgrade workflow has four phases. Figure out where the user is in the process and jump in at the right point. Don't start from scratch if they're already mid-upgrade.

### If the user hasn't started yet

Help them assess readiness:
1. Identify the current and target Drupal versions
2. Walk through Phase 1 (Assess) from `21-upgrade-workflow.md`
3. Help interpret Upgrade Status results and prioritize the work

### If they have a deprecation report or error list

Help them fix issues:
1. Categorize issues by type (deprecated API calls, removed modules, hook system, tests, theme changes, contrib gaps)
2. For deprecated API calls: suggest the replacement (check the `@deprecated` docblock, `16-drupal-12-changes.md`, or the change record)
3. For removed modules: advise on contrib replacement or uninstall, done *before* the upgrade
4. For hooks: read `references/14-oop-hooks.md`; `.module` files are deprecated, `hook_module_implements_alter()` and `hook_hook_info()` are gone in 12, hooks in `.inc` files are silently ignored
5. For tests: PHPUnit 12 ignores annotations; every Kernel/Functional test needs `#[RunTestsInSeparateProcesses]`
6. For theme issues: read `references/11-theming.md` for Starterkit, OOP theme hooks and the Olivero/Claro removal

### If they're ready to run the Composer upgrade

Walk through Phase 3 (Upgrade) step by step:
1. Verify backups are in place
2. Provide the exact Composer commands for their situation
3. Help troubleshoot dependency conflicts (`composer why-not`)
4. Guide through `drush updatedb` and post-upgrade smoke testing

### If they need help with a specific deprecation

1. Read the error message or code in question
2. Load the relevant reference file (e.g., `references/03-plugins.md` for annotation→attribute migration, `references/14-oop-hooks.md` for procedural→OOP hook migration, `references/13-deployment.md` for Drush/`dr` commands)
3. Show the old pattern and the new replacement
4. If the deprecation is about a pattern covered in `references/15-modern-php.md` (constructor promotion, readonly, enums, attributes), read that file

## Key principles

**Do the work on the current major.** Fixing deprecations while the old APIs still function is safe. Fixing them after the upgrade (when the old APIs are removed) means debugging blind. For 11 → 12 that means: get to 11.5, convert hooks, tests and plugin managers there, then flip.

**Upgrade Status is the source of truth for *this* site.** `16-drupal-12-changes.md` tells you what core changed; the `upgrade_status` module tells you which of those changes apply to this codebase and which contrib modules lack a compatible release. Don't guess at a site's blockers from the generic list; run the scan.

**Contrib readiness is the #1 blocker.** The most common reason an upgrade stalls is a contrib module without a compatible release. Help the user check drupal.org project pages, issue queues, and consider alternatives. For 11 → 12 also check that the contrib copies of removed core extensions (`search`, `toolbar`, `claro`, `olivero`, ...) are required *before* the core update.

**Drupal Rector does the bulk of mechanical work.** For deprecated API calls, always try Rector first (`drupal/rector` 1.1+ has Drupal 12 sets and the hook-to-OOP converter). Manual fixes are for what Rector can't handle (Twig templates, config schemas, test environment changes, architectural decisions).

## Output format

When producing an upgrade plan or assessment, structure it as:

---
## Upgrade Assessment: Drupal [current] → [target]

### Infrastructure
- PHP: [current] → [required minimum]
- Database: [current] → [required minimum]
- Composer / Drush: [current] → [required minimum]

### Blockers
*Issues that must be resolved before the upgrade can proceed*

### Deprecations to Fix
*Deprecated API calls in custom code — fix with Rector or manually*

### Contrib Updates Needed
*Modules that need new versions for target compatibility, and core extensions that moved to contrib*

### Theme Changes
*Base theme migration, OOP theme hooks, template syntax updates, removed themes*

### Tests
*PHPUnit attribute conversion, process isolation, deprecation handler configuration*

### Recommended Sequence
*Ordered list of steps for this specific site*

---

For individual deprecation fixes, show the old and new patterns side-by-side with a brief explanation of why the change is needed.
