# Contribution Tracker - Technical Documentation

## Welcome

Welcome to the technical documentation for the Contribution Tracker project! This documentation provides comprehensive guidance for setting up, developing, and maintaining the application.

## Introduction

The Contribution Tracker is a Drupal application designed to log and manage contributions from team members, encompassing code, events, and non-code contributions.

## Audience

This documentation is intended for:

*   Developers
*   System Administrators
*   Anyone involved in the development, deployment, or maintenance of the Contribution Tracker application.

## Purpose

This documentation aims to provide a clear and concise guide to:

*   Understanding the project's architecture and dependencies.
*   Setting up a local development environment.
*   Contributing to the project.
*   Understanding the CI/CD pipelines.
*   Troubleshooting common issues.

## Overview

### Project Purpose and Goals
The project aims to provide a platform for tracking and managing various types of contributions (code, event participation, documentation, etc.) from community members. This supports recognition, reporting, and community engagement.

### Target Audience
This project targets developers, content editors, and community managers involved in tracking and recognizing contributions.

### Tech Stack
*   **Drupal:** 10
*   **PHP:** 8.2+ (8.3 in local DDEV setup)
*   **Database:** MariaDB 11.4
*   **DDEV:** Docker-based local development environment
*   **Node.js:** v20 for frontend tooling
*   **CI/CD:** GitHub Actions

## Documentation Files

*   [Tools & Prerequisites](#tools)
*   [Local Setup](#local-setup)
*   [Developer Onboarding](#how-to-work)
*   [Content Structure](#content-structure)
*   [Custom Modules](#custom-modules)
*   [Custom Themes](#custom-themes)
*   [Testing and CI](#functional-testing)
*   [Monitoring and Logging](#monitoring)
*   [CI/CD Configuration](#ci-cd)

---

## Tools

This section outlines the tools and their configurations required for setting up the Contribution Tracker Drupal application.

### Core Requirements

*   **PHP:** Version 8.2 or higher (8.3 recommended for local development).
*   **Composer:** PHP dependency management tool ([https://getcomposer.org/](https://getcomposer.org/)).
*   **Node.js:** Version 20 ([https://nodejs.org/](https://nodejs.org/)).

### Development Environment

*   **DDEV:** Docker-based local development environment managed via `.ddev/config.yaml`.
    *   `name`: `contribtracker`
    *   `type`: `drupal10`
    *   `database`: `mariadb:11.4`
    *   `webserver_type`: `nginx-fpm`

    ```bash
    ddev start
    ```

    Refer to the DDEV documentation ([https://ddev.readthedocs.io/](https://ddev.readthedocs.io/)).
*   **Gitpod:** Cloud-based development environment ([https://www.gitpod.io/](https://www.gitpod.io/)).

### Dependencies

Dependencies are managed using Composer and defined in `composer.json`.

```bash
composer install
```

Key dependencies include:

*   `drupal/address`: "^2.0"
*   `drupal/admin_toolbar`: "^3.0.0"
*   `drupal/better_exposed_filters`: "^7.0"
*   `drupal/ckeditor`: "^1.0"
*   `cweagans/composer-patches`: "^1.7.0"
*   `composer/installers`: "^2.1"
*   `axelerant/ct_drupal`: (Custom Module)
*   `axelerant/ct_github`: (Custom Module)

### GitHub Actions

GitHub Actions are used for CI/CD. Workflow definitions are located in `.github/workflows/`.

*   **CI (`ci.yml`):** Performs code quality checks.
    *   Uses `hussainweb/drupalqa-action@v2`:
        *   `phplint`
        *   `yamllint`
        *   `jsonlint`
        *   `phpcs`
        *   `phpmd`
        *   `twigcs`
*   **Cypress Tests (`cypress-tests.yml`):** Runs end-to-end tests.
    *   Requires `CYPRESS_ADMIN_USERNAME` and `CYPRESS_ADMIN_PASSWORD` environment variables.
*   **Clean Platform.sh env on PR Close (`pr-close.yml`):** Deletes Platform.sh environments on PR close.
    *   Uses `axelerant/platformsh-action@v1`.
    *   Requires `PLATFORMSH_CLI_TOKEN` secret.
*   **Visual Regression Tests (`vr.yml`):** Executes visual regression tests. Uses Percy.io.
    *   Requires `PERCY_TOKEN` secret.

---

## Local Setup

This section outlines the steps required to set up a local development environment for the Contribution Tracker Drupal application.

### Prerequisites

*   **Required Tools:** Ensure you have the latest versions of Git, Composer, and Node.js.
*   **GitHub SSH Key:** Add your SSH key to your GitHub account settings ([https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-)).

### DDEV Configuration

The DDEV configuration is defined in `.ddev/config.yaml`:

*   **Project Name:** `contribtracker`
*   **Drupal Version:** `drupal10`
*   **Document Root:** `web`
*   **PHP Version:** `8.3`
*   **Web Server:** `nginx-fpm`
*   **Router Ports:** HTTP: `80`, HTTPS: `443`
*   **Database:** `mariadb` version `11.4`
*   **Environment Variables:**
    *   `PLATFORM_ENVIRONMENT=main`
    *   `PLATFORM_PROJECT=brbqplxd7ycq6`
*   **Node.js Version:** `20`

**Initialize DDEV:**

1.  Navigate to the project root directory.
2.  Run `ddev start`.

### Local Settings Configuration

The `web/sites/example.settings.local.php` file is used for local development overrides.

**Configuration Steps:**

1.  **Copy and Rename:**
    *   Single-site: `web/sites/default/settings.local.php`
    *   Multi-site: `web/sites/example.com/settings.local.php`
2.  **Enable:** Uncomment the `settings.local.php` include in the main `settings.php` file:

    ```php
    if (file_exists(__DIR__ . '/settings.local.php')) {
      include __DIR__ . '/settings.local.php';
    }
    ```
3.  **Customize:** Edit `settings.local.php` to configure:

    *   Assertions
    *   Database credentials (`ddev describe`)
    *   Caching (disable)
    *   Mail handling

**Example Usage:**

```php
$settings['container_yamls'][] = DRUPAL_ROOT . '/sites/development.services.yml';
$config['system.logging']['error_level'] = 'verbose';
$config['system.performance']['cache']['max_age'] = 0;
$config['system.performance']['css']['preprocess'] = FALSE;
$config['system.performance']['js']['preprocess'] = FALSE;
$settings['cache']['bins']['render'] = 'cache.backend.null';
$settings['cache']['bins']['dynamic_page_cache'] = 'cache.backend.null';
```

---

## How To Work

This document provides a comprehensive guide to setting up and developing the Contribution Tracker Drupal application.

### Prerequisites

*   **GitHub Account:** With SSH key added.
*   **Development Tools:**
    *   Composer
    *   DDEV
    *   Node.js (version 20 recommended)

### Development Setup

1.  **Clone Repository:**

    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```
2.  **Install Dependencies with DDEV:**

    ```bash
    ddev start
    ddev composer install
    ```

    Refer to `.github/workflows/cypress-tests.yml` for configuration details.
3.  **Environment Variables:** Set `CYPRESS_ADMIN_USERNAME` and `CYPRESS_ADMIN_PASSWORD` in `.ddev/config.yaml`.

### Contribution Guidelines

The Contribution Tracker application intends to log and manage contributions from team members.

**Contributions:**

*   Code contributions (commits, and pull requests)
*   Event contributions
*   Non-code contributions (documentation, design)

Consult the project's contribution guidelines for detailed information.

### Automated Testing

*   **Cypress Tests:** End-to-end tests defined in `cypress-tests.yml`. Requires configured environment variables.
*   **Visual Regression Tests:** Configured with Percy.io via `vr.yml`, using the `PERCY_TOKEN` secret.
*   **CI Code Quality Checks:** `ci.yml` uses `hussainweb/drupalqa-action@v2`:
    *   PHP code style checking
    *   YAML linting
    *   JSON linting
    *   Twig linting
    *   Frontend code quality checks using Node.js version 20

### Continuous Integration (CI)

GitHub Actions workflows:

*   `ci.yml`: Code quality checks on `main` and pull requests.
*   `cypress-tests.yml`: Cypress end-to-end tests (scheduled).
*   `vr.yml`: Visual regression tests on tags and scheduled basis.
*   `pr-close.yml`: Cleans up Platform.sh environments using `axelerant/platformsh-action@v1` with `PLATFORMSH_CLI_TOKEN`.

### Platform.sh Integration

*   **Environment Management:** `pr-close.yml` cleans up environments.
*   **Token:** `cypress-tests.yml` sets up a Platform.sh token within DDEV for testing.
*   **Project ID** Platform.sh project ID is `brbqplxd7ycq6`.

---

## Content Structure

This document details the content structure of the Drupal project. Content types, taxonomies, views, user roles, and module dependencies are covered, providing a comprehensive overview for developers.

### Node Types (Content Types)

*   **Basic page:** (`node.type.page.yml`): Static, informational content.
*   **Non Code Contributions:** (`node.type.non_code_contribution.yml`): Captures contributions that don't involve direct code changes. Key fields are the "Non Code Contribution Type" and the credit given.
*   **Issue:** (`node.type.issue.