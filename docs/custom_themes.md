# ContribTracker Theme Documentation

This document provides a comprehensive guide to the `contribtracker` custom theme, detailing its purpose, file structure, key configurations, and theming mechanisms within the Drupal environment.  This guide is intended for developers and themers who need to understand, maintain, or extend the `contribtracker` theme.

## Overview

The `contribtracker` theme is a Drupal theme specifically designed for managing and showcasing community contributions. It offers a structured way to log and display contributions, including code, events, and other non-code related activities made by team members.

## File Structure

The `contribtracker` theme comprises several key files, each playing a specific role in defining the theme's behavior and appearance.

*   `contribtracker.info.yml`:  Defines the theme's metadata and Drupal integration settings.
*   `contribtracker.libraries.yml`: Specifies CSS and JavaScript libraries required by the theme.
*   `contribtracker.breakpoints.yml`: Defines breakpoints for responsive design implementation.
*   `contribtracker.theme`: Implements Drupal hook functions to modify theme suggestions.
*   `package.json`: Manages Node.js dependencies and build/test scripts.
*   `README.md`: Provides general theme information and links to functional testing documentation.

## Key Configuration Files

### `contribtracker.info.yml`

This YAML file is the cornerstone of the theme, defining its core attributes and integration with Drupal.

```yaml
name: contribtracker
description: 'A Drupal theme for managing community contributions.'
type: theme
core_version_requirement: ^10.3 || ^11.0
base_theme: stable
regions:
  header: 'Header'
  navigation: 'Navigation'
  content: 'Content'
  sidebar: 'Sidebar'
  footer: 'Footer'
libraries:
  - core/normalize
  - contribtracker/global
```

**Key elements:**

*   **`name`**: The human-readable name of the theme.
*   **`description`**:  A concise description of the theme's purpose.
*   **`type`**:  Indicates that this is a `theme`.
*   **`core_version_requirement`**: Specifies the Drupal core versions the theme is compatible with (Drupal 10.3 and 11.0 and later).
*   **`base_theme`**: Sets `stable` as the base theme.  This is a minimal theme that provides a stable rendering environment for creating custom themes.
*   **`regions`**: Defines the named regions where blocks can be placed within the theme's layout.
*   **`libraries`**: Declares the CSS and JavaScript libraries to be included on every page where the theme is active. `core/normalize` provides CSS normalization, and `contribtracker/global` refers to the custom library defined in `contribtracker.libraries.yml`.

### `contribtracker.libraries.yml`

This file defines the CSS and JavaScript assets used by the theme.

```yaml
global:
  css:
    theme:
      https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Roboto:wght@400;700&display=swap: { type: external, minified: true }
      dist/css/global.css: {}
  js:
    dist/js/navigation.js: {}
    dist/js/select2.js: {}
  dependencies:
    - core/jquery
    - contribtracker/select2

select2:
  css:
    component:
      assets/select2/select2.min.css: {}
  js:
    assets/select2/select2.min.js: {}
contrib-graph:
  css:
    component:
      dist/css/components/blocks/graph/contrib-graph.css: {}
```

**Key elements:**

*   **`global` library:**
    *   **`css`**: Includes CSS files. External CSS files, such as Google Fonts, are defined with the `type: external` property. `dist/css/global.css` is the theme's main stylesheet.
    *   **`js`**:  Includes JavaScript files like `dist/js/navigation.js` (likely for handling navigation behavior) and `dist/js/select2.js`.
    *   **`dependencies`**: Lists dependencies required by the library, such as `core/jquery` and the custom `contribtracker/select2` library.

*   **`select2` library:** This library encapsulates the CSS and JavaScript files required for the Select2 JavaScript library, a jQuery-based replacement for select boxes.

*   **`contrib-graph` library:**  Includes custom CSS for the contribution graph component.

### `contribtracker.breakpoints.yml`

This file defines the breakpoints used for responsive design, allowing the theme to adapt to different screen sizes.

```yaml
contribtracker.mobile:
  label: mobile
  mediaQuery: '(max-width: 767px)'
  weight: 0
  multipliers:
    - 1x
contribtracker.tablet:
  label: tablet
  mediaQuery: '(min-width: 768px) and (max-width: 1023px)'
  weight: 1
  multipliers:
    - 1x
contribtracker.desktop:
  label: desktop
  mediaQuery: '(min-width: 1024px)'
  weight: 2
  multipliers:
    - 1x

```

**Key Elements:**

*   Each breakpoint (`mobile`, `tablet`, `desktop`) is defined with:
    *   **`label`**: A human-readable name for the breakpoint.
    *   **`mediaQuery`**: The CSS media query that defines the breakpoint.
    *   **`weight`**:  The order in which the breakpoints are applied (lower weights are applied first).
    *   **`multipliers`**: Defines the supported pixel densities (1x for standard resolution).

## Theme Alter Hooks (`contribtracker.theme`)

The `contribtracker.theme` file utilizes Drupal's hook system to modify theme suggestions for blocks, forms, and tables, allowing for more granular control over theming.

```php
<?php

use Drupal\block\Entity\Block;

/**
 * Implements hook_theme_suggestions_block_alter().
 */
function contribtracker_theme_suggestions_block_alter(array &$suggestions, array $variables) {
  $block = $variables['elements']['content']['#block_content'] ?? NULL;
  if ($block instanceof Block) {
    $region = $variables['elements']['#configuration']['region'];
    $suggestions[] = 'block__' . $region;
  }
}

/**
 * Implements hook_theme_suggestions_form_alter().
 */
function contribtracker_theme_suggestions_form_alter(array &$suggestions, array $variables) {
  $form_id = $variables['element']['#form_id'] ?? NULL;
  if ($form_id) {
    $suggestions[] = 'form__' . str_replace('_', '--', $form_id);
  }
}

/**
 * Implements hook_theme_suggestions_table_alter().
 */
function contribtracker_theme_suggestions_table_alter(array &$suggestions, array $variables) {
  // Implementation here.
}
```

**Hook Implementations:**

*   **`contribtracker_theme_suggestions_block_alter()`**:
    *   Retrieves the block entity and region from the `$variables` array.
    *   Adds a theme suggestion in the format `block--[region].html.twig`, allowing for region-specific block theming.

*   **`contribtracker_theme_suggestions_form_alter()`**:
    *   Retrieves the form ID from the `$variables` array.
    *   Adds a theme suggestion in the format `form--[form_id].html.twig`, where the underscores in the form ID are replaced with hyphens. This allows for form-specific theming based on the form ID.

*   **`contribtracker_theme_suggestions_table_alter()`**:  This hook is intended to alter theme suggestions for tables but currently contains an incomplete implementation.  Custom logic would be added here to suggest specific table templates based on table properties (e.g., ID, class).

## Package Management (`package.json`)

The `package.json` file manages the theme's Node.js dependencies and defines scripts for automating build, linting, and testing processes.

```json
{
  "name": "contribtracker",
  "version": "1.0.0",
  "description": "A Drupal theme for managing community contributions.",
  "main": "index.js",
  "scripts": {
    "build": "gulp",
    "lint": "eslint .",
    "vr": "percy exec -- cypress run --spec cypress/e2e/visualRegression.cy.js",
    "cypress:open": "cypress open",
    "cypress:run": "cypress run"
  },
  "dependencies": {
    "cypress": "^13.0.0"
  },
  "devDependencies": {
    "@cypress/grep": "^4.0.0",
    "@eslint/eslintrc": "^2.1.1",
    "@percy/cli": "^1.0.0",
    "@ronilaukkarinen/gulp-stylelint": "^10.0.0",
    "@types/gulp": "^4.0.9",
    "@types/gulp-sass": "^5.0.0",
    "browser-sync": "^2.27.7",
    "cross-env": "^7.0.3",
    "cssnano": "^5.0.15",
    "del": "^6.0.0",
    "eslint": "^8.4.1",
    "eslint-config-prettier": "^8.3.0",
    "gulp": "^4.0.2",
    "gulp-autoprefixer": "^8.0.0",
    "gulp-concat": "^2.6.1",
    "gulp-cssnano": "^2.1.3",
    "gulp-imagemin": "^8.0.0",
    "gulp-plumber": "^1.2.1",
    "gulp-rename": "^2.0.0",
    "gulp-sass": "^5.0.0",
    "gulp-sourcemaps": "^3.0.0",
    "gulp-uglify": "^3.0.2",
    "prettier": "2.5.1",
    "sass": "^1.45.0",
    "stylelint": "^14.1.0",
    "stylelint-config-prettier": "^9.0.3"
  },
  "keywords": [
    "drupal",
    "theme",
    "contribtracker"
  ],
  "author": "Acquia",
  "license": "MIT"
}
```

**Key Elements:**

*   **`scripts`**: Defines command-line scripts for common tasks:
    *   `build`: Runs the Gulp build process (likely defined in `gulpfile.js`).
    *   `lint`: Executes ESLint for code linting.
    *   `vr`: Runs visual regression tests using Percy and Cypress.
    *   `cypress:open`: Opens the Cypress test runner.
    *   `cypress:run`: Runs Cypress end-to-end tests in headless mode.

*   **`devDependencies`**: Lists development-time dependencies, including:
    *   `@cypress/grep`: For filtering Cypress tests.
    *   `@eslint/eslintrc`, `eslint`, `eslint-config-prettier`: For JavaScript linting.
    *   `@percy/cli`: For visual regression testing.
    *   `@ronilaukkarinen/gulp-stylelint`: For linting CSS/SCSS files within the Gulp build process.
    *   `gulp`, `gulp-*`: A suite of Gulp plugins for automating tasks such as SASS compilation, CSS minification, and JavaScript uglification.
    *   `prettier`: For code formatting.
    *   `sass`:  For compiling SCSS to CSS.
    *   `stylelint`, `stylelint-config-prettier`: For CSS/SCSS linting.

## Functional Testing

The `README.md` file provides a pointer to functional tests. The theme utilizes Cypress for end-to-end testing.  Refer to the `README.md` file for detailed instructions on running and interpreting the Cypress tests. These tests are essential for ensuring the theme's functionality and stability.