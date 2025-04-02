```md
# Contribtracker Custom Theme Documentation

This document provides a comprehensive overview of the `contribtracker` custom theme for the Drupal project, designed for managing community contributions. It details the theme's structure, key components, configuration, and development process.

## Overview

The `contribtracker` theme provides a specific visual experience for the contribution tracking application. It defines regions, stylesheets, scripts, and other assets to create a user-friendly interface.

## Files and Structure

The `contribtracker` theme consists of the following files:

*   **`contribtracker.info.yml`**: Defines the theme's metadata, including its name, description, type, core version requirement, base theme, regions, and libraries.
*   **`contribtracker.libraries.yml`**: Declares the theme's CSS and JavaScript libraries, along with their dependencies. Includes external libraries like `select2` and defines global styles and scripts.
*   **`contribtracker.breakpoints.yml`**: Defines breakpoints for responsive design, targeting mobile, tablet, and desktop devices.
*   **`contribtracker.theme`**: Contains theme-specific preprocess functions and hook implementations, such as `hook_theme_suggestions_block_alter`, `hook_theme_suggestions_form_alter`, and `hook_theme_suggestions_table_alter`.
*   **`README.md`**: Provides a brief description of the theme and links to functional testing documentation using Cypress.
*   **`package.json`**: Defines the Node.js dependencies and scripts for building and linting the theme, including commands for Cypress-based visual regression testing.

## Configuration

### Theme Information (`contribtracker.info.yml`)

This file defines the core metadata for the theme:

```yaml
name: Contribtracker
description: Contribution tracker for managing community contributions.
type: theme
core_version_requirement: ^10.3 || ^11.0
base_theme: stable
regions:
  header: Header
  navigation: Navigation
  precontent: Pre-content
  content: Content
  footer_primary: Footer Primary
  footer_secondary: Footer Secondary
libraries:
  - core/normalize
  - contribtracker/global
```

*   **Name:** `contribtracker`
*   **Description:** Contribution tracker for managing community contributions.
*   **Type:** `theme`
*   **Core Version Requirement:** `^10.3 || ^11.0` (Drupal 10.3 or 11.x)
*   **Base Theme:** `stable`
*   **Regions:** Defines the theme regions as documented above. Used for placing blocks in the Drupal admin UI.
*   **Libraries:** Specifies the CSS and JavaScript libraries to be included.

### Libraries (`contribtracker.libraries.yml`)

This file defines the CSS and JavaScript libraries used by the theme:

```yaml
global:
  css:
    theme:
      dist/css/global.css: {}
      https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap: { type: external, attributes: { 'rel': 'stylesheet' } }
  js:
    dist/js/navigation.js: {}
    dist/js/select2.js: {}
  dependencies:
    - core/jquery
    - contribtracker/select2

select2:
  css:
    theme:
      dist/css/select2.css: {}
  js:
    dist/js/select2.min.js: {}
  dependencies:
    - core/jquery

contrib-graph:
  css:
    theme:
      dist/css/contrib-graph.css: {}
```

*   **`global`**: Includes global CSS (referencing Google Fonts and `global.css`) and JavaScript (`navigation.js`, `select2.js`).  Depends on `core/jquery` and `contribtracker/select2`.
*   **`select2`**:  Includes CSS and JavaScript for the `select2` library. Depends on `core/jQuery`.
*   **`contrib-graph`**: Includes CSS specific to the contribution graph block: `contrib-graph.css`.

### Breakpoints (`contribtracker.breakpoints.yml`)

This file defines the breakpoints for responsive design:

```yaml
contribtracker.mobile:
  label: mobile
  mediaQuery: 'all and (max-width: 767px)'
  weight: 0
  multipliers:
    - 1x
    - 2x

contribtracker.tablet:
  label: tablet
  mediaQuery: 'all and (min-width: 768px) and (max-width: 1024px)'
  weight: 1
  multipliers:
    - 1x
    - 2x

contribtracker.desktop:
  label: desktop
  mediaQuery: 'all and (min-width: 1025px)'
  weight: 2
  multipliers:
    - 1x
    - 2x
```

The theme defines breakpoints for:

*   **Mobile:** 0-767px
*   **Tablet:** 768-1024px
*   **Desktop:** 1025px and up

Each breakpoint supports 1x and 2x multipliers for responsive images.

## Theme Functions (`contribtracker.theme`)

The `contribtracker.theme` file implements hook functions to alter theme suggestions:

```php
<?php

use Drupal\Core\Template\Attribute;

/**
 * Implements hook_theme_suggestions_block_alter().
 */
function contribtracker_theme_suggestions_block_alter(array &$suggestions, array $variables) {
  $block = $variables['elements']['content']['#block'];
  $region = $block->getRegion();
  if ($region) {
    $suggestions[] = 'block__' . str_replace('-', '__', $region);
  }
}

/**
 * Implements hook_theme_suggestions_form_alter().
 */
function contribtracker_theme_suggestions_form_alter(array &$suggestions, array $variables) {
  $form_id = $variables['element']['#form_id'];
  $suggestions[] = 'form__' . $form_id;
}

/**
 * Implements hook_theme_suggestions_table_alter().
 */
function contribtracker_theme_suggestions_table_alter(array &$suggestions, array $variables) {
  $suggestions[] = 'table';
}
```

These functions allow for more granular control over theming based on block region, form ID, and tables.

## Dependencies

*   **Drupal Core:** Requires Drupal core version 10.3 or 11.0.
*   **Libraries:** jQuery, select2. These are managed via `contribtracker.libraries.yml`.
*   **Node.js Packages:**  Uses various development dependencies defined in `package.json` such as `@cypress/grep`, `@percy/cli`, `@percy/cypress`, `@ronilaukkarinen/gulp-stylelint`, `@types/gulp`, `@types/gulp-sass`, `@types/jquery`, `@types/jqueryui`, `@types/node`. Managed via `npm`.
*   **Gulp:** Used for asset building.

## Integrating with the Theme

1.  **Enable the Theme:**  Navigate to `Appearance` in the Drupal administration interface (`/admin/appearance`) and enable the `contribtracker` theme.  Set it as the default theme, if desired.
2.  **Configure Block Layout:** Navigate to `Structure > Block layout` in the Drupal admin UI (`/admin/structure/block`). Place blocks in the regions defined in `contribtracker.info.yml` (header, navigation, precontent, content, footer\_primary, footer\_secondary).
3.  **Customize the Look and Feel:** Modify the CSS files located in `dist/css/`.
4.  **Manage Theme Assets:**  Use the `package.json` file and `gulp` to manage and build the theme's assets.

## Development

### Setting up the Development Environment

1.  **Install Node.js and npm:** Ensure that Node.js and npm are installed on your development machine.
2.  **Install Dependencies:** Navigate to the theme directory in your terminal and run `npm install` to install the required Node.js packages defined in `package.json`.

### Available Scripts

The `package.json` file includes the following scripts:

*   **`build`**: Runs the gulp task to build the theme assets (compiles Sass, bundles JavaScript, etc.). Execute with: `npm run build`.
*   **`lint`**:  Lints the theme to enforce code style. Execute with: `npm run lint`.
*   **`vr`**: Executes visual regression tests using Percy and Cypress. Execute with: `npm run vr`.
*   **`cypress:*`**: Various Cypress commands for running tests, including tagged tests for critical paths, security, and expensive tests. Refer to `package.json` for specific Cypress commands. Example: `npm run cypress:run`.

### Asset Building (Gulp)

The theme uses Gulp for building assets.  The Gulp configuration (typically in `gulpfile.js` or similar) defines tasks for:

*   Compiling Sass/SCSS files to CSS.
*   Minifying CSS and JavaScript.
*   Optimizing images.
*   Other asset-related tasks.

Consult the Gulp configuration file for details on how assets are processed.

### Visual Regression Testing (Cypress and Percy)

The theme implements visual regression testing using Cypress and Percy.

*   **Cypress:**  A JavaScript end-to-end testing framework.
*   **Percy:** A visual review platform that captures screenshots of your application and compares them against baseline images to detect visual changes.

Refer to the `README.md` and the `cypress` directory (if present) for more details on the visual regression testing setup and usage.

### Code Style

Adhere to the coding standards and best practices outlined in the Drupal documentation and relevant style guides.  Use the `lint` script to automatically check for code style violations.