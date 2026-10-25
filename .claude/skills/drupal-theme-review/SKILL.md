---
name: drupal-theme-review
description: Review Drupal theme code - Twig templates, libraries, OOP theme hooks and preprocess, JavaScript behaviors, Single Directory Components (SDC), accessibility, and responsive images - against Drupal 12 (and 11.5) best practices. Use this skill whenever someone asks to review a Drupal theme, check a .theme file or a theme's src/Hook classes, audit Twig templates, look at a libraries.yml, or validate SDC components.
allowed-tools: Read, Grep, Glob
argument-hint: "<theme-file-or-directory ...>"
---

# Drupal Theme Review

You are reviewing Drupal theme code against established Drupal 12 theming standards. Theming bugs are often subtle — a misused `|raw`, a missing cache context in a preprocess hook, a `$(document).ready()` instead of `Drupal.behaviors`, a missing `once()` call, or a hook function left in a file Drupal 12 no longer scans — and they can cause XSS vulnerabilities, stale content, broken AJAX flows, or hooks that silently never run.

Target: Drupal 12 (released December 2026) with 11.5 as the bridge. Themes implement hooks in `THEME/src/Hook/` classes; `.theme` and `theme-settings.php` are deprecated. Olivero, Claro and Stable 9 are contrib themes now; core ships Default Admin and Starterkit.

**References library:** `references/`

| Code contains… | Read this reference file |
|---|---|
| Twig templates (`*.html.twig`) | `references/01-twig.md` |
| `src/Hook/*.php`, `*.theme`, preprocess, template suggestions | `references/02-preprocess.md` |
| `*.libraries.yml`, CSS/JS asset definitions | `references/03-libraries.md` |
| JavaScript behaviors, `Drupal.behaviors`, `once()` | `references/04-javascript.md` |
| `components/`, `*.component.yml`, SDC | `references/05-sdc.md` |
| `*.info.yml`, `theme-settings.php`, `*.tokens.yml`, breakpoints | `references/06-theme-config.md` |
| ARIA roles, skip links, `Drupal.announce`, color contrast | `references/07-accessibility.md` |
| `*.breakpoints.yml`, responsive image styles, `<picture>` | `references/08-responsive-images.md` |

Load only the reference files relevant to what you are reviewing — don't load all eight if the user only showed you a Twig template.

## Step 1: Understand what to review

If `$ARGUMENTS` contains file paths, read those files. If the user pasted code inline, work with that. If neither, ask: "Which theme file or directory should I review?"

Scan quickly: identify file types present to decide which reference files to load.

## Step 2: Load relevant references, then review

Read only the references you need. Then produce the review using the structure below.

## Step 3: Output format

---
## Drupal Theme Review: `[filename or theme name]`

### Critical Issues
*XSS via `|raw` on user input, `$(document).ready()` instead of `Drupal.behaviors`, missing `once()` (causes duplicate event listeners after AJAX), broken cache metadata that causes stale content, hook functions in `.inc`/`includes/` files (ignored in Drupal 12), base theme or library overrides pointing at Olivero/Claro/Stable 9 without the contrib project. Must fix before merge.*

### Standards Violations
*Deviations from Drupal 12 theming patterns — hooks in a `.theme` file or `theme-settings.php` instead of `src/Hook/`, `\Drupal::service()` inside hook classes, wrong CSS SMACSS weight, per-file `weight:` instead of `before`/`after`, `hide()`/`show()`, missing library dependency declarations, stale SDC `$schema` URL, template naming convention errors. Should fix.*

### Recommendations
*Best-practice improvements — using SDC instead of inline components, `html_classes()`/`html_cva()` instead of string-built class lists, design tokens for tunable values, responsive images, lazy builders for per-user content, accessibility enhancements.*

### Confirmed Good Practices
*Patterns done correctly — briefly acknowledge so the developer knows what to keep.*

---

For each finding:
- Cite the reference file and principle (e.g., "→ `01-twig.md`: Never use `|raw` on user-supplied content")
- Show the problematic snippet
- Show a corrected version

If there are no issues in a section, write "None found." — don't omit the section.

## High-value checks (run on every theme review)

These are the most common Drupal theming mistakes — check them before reading the full reference files:

**Twig / Security**
- No `|raw` on user-supplied variables — Twig auto-escapes by default; `|raw` disables that protection
- `{{ content|without('field_x') }}` used instead of manually listing fields — `|without` preserves cache metadata; manual field listing silently drops it
- No `{% set %}` blocks used to build markup strings that are then output with `|raw`

**Theme PHP**
- Hooks are `#[Hook]` methods in `src/Hook/` (11.3+); a `.theme` file with functions is deprecated (11.5), and any hook in another file does not run on Drupal 12
- Hook classes inject services instead of calling `\Drupal::service()`; theme hook attributes do not use `order:`/`module:` (unsupported in themes)
- `theme-settings.php` replaced by `#[Hook('form_system_theme_settings_alter')]`
- `core_version_requirement` is at least `^11.3` when `src/Hook/` exists (`^11.5 || ^12` for new themes)

**Caching**
- Preprocess hooks that add custom variables also bubble up the correct `#cache` metadata
- Block preprocess: `getCacheContexts()`, `getCacheTags()`, `getCacheMaxAge()` overridden when block content varies
- No `max-age: 0` components embedded directly — lazy builders used instead

**JavaScript**
- `Drupal.behaviors` used instead of `$(document).ready()` or `DOMContentLoaded`
- `once()` wraps every `attach()` handler — without it, AJAX and htmx requests re-attach listeners and cause duplicates
- `core/once` and `core/drupal` declared as library dependencies

**Libraries**
- Every JS file that uses `$` declares `core/jquery` as a dependency — don't assume jQuery is global
- CSS files placed under the correct SMACSS weight key (`base`, `layout`, `component`, `state`, `theme`)
- Ordering done with `before:`/`after:` (11.5+), not per-file `weight:` or fake dependencies
- `libraries-override`/`libraries-extend` do not reference `olivero/*`, `claro/*`, `bartik/*` unless that contrib theme is installed

**Template naming**
- Underscores in PHP hook names become single hyphens in filenames; `__` (double underscore in hook) → `--` (double hyphen in filename)
- Templates placed in a logically organized subdirectory under `templates/`

**SDC**
- `$schema` points at `core/assets/schemas/v1/metadata.schema.json`, not the removed `core/modules/sdc/...` path
- `with_context = false` on includes; `{{ attributes }}` used; heading level is a prop
