# Contribution Tracker Project Documentation

Welcome to the Contribution Tracker project documentation!

This documentation provides comprehensive guides for developers and content editors working with the Contribution Tracker, a Drupal application designed to manage community contributions.

## Who this Documentation is For

*   Developers setting up the local environment, contributing code, and managing CI/CD pipelines.
*   Content editors managing and structuring content within the Drupal application.

## Purpose of this Documentation

This documentation aims to provide clear and concise information about the project's setup, architecture, and workflows, enabling efficient development and content management.

## Overview

### Project Purpose, Goals, and High-Level Description

The Contribution Tracker is a Drupal application for managing community contributions including code, events, and non-code contributions. It provides tools for tracking, reporting, and acknowledging various contribution types.

### Target Audience

*   **Developers:** Responsible for setting up the local environment, contributing code, and maintaining the application.
*   **Content Editors:** Manage and create content related to community contributions.

### Tech Stack Overview

*   **Drupal:** Version 10
*   **PHP:** Version 8.2+ (Refer to `composer.json` for specific compatibility)
*   **Database:** MariaDB 11.4 (configured via DDEV)
*   **Dependencies:** Managed by Composer (see `composer.json`) and npm (see `package.json`).

## All Documentation Files

### Developer Onboarding and Setup

*   **Tools and Prerequisites:** [Tools](#tools)
*   **Local Development Setup (DDEV):** [Local Development Environment Setup (DDEV)](#local-development-environment-setup-ddev)
*   **Local Settings Override:** [Local Settings Override (`settings.local.php`)](#local-settings-override-settingslocalphp)
*   **GitHub Actions:** [GitHub Actions](#github-actions)
*   **Automated Testing and CI/CD Workflows:** [Automated Testing and CI/CD Workflows](#automated-testing-and-ci-cd-workflows)
*   **Gitpod:** [Gitpod](#gitpod)

### Project Structure and Guidelines

*   **How To Work:** [How To Work](#how-to-work)
*   **Content Structure:** [Content Structure](#content-structure)
*   **Custom Modules:** [Custom Modules](#custom-modules)
*   **Custom Themes:** [Custom Themes](#custom-themes)
*   **Directory Structure:** [Directory Structure](#directory-structure)
*   **Monitoring and Logging Configuration:** [Monitoring and Logging Configuration](#monitoring-and-logging-configuration)

---

## Tools

### Contribution Tracker - Developer Onboarding Guide 

This document guides developers setting up and contributing to the Contribution Tracker project.

### Tools & Prerequisites

#### Core Requirements

*   **PHP:** 8.2 or higher (check `composer.json`).
*   **Composer:** Install [Composer](https://getcomposer.org/).
*   **DDEV:** Install [DDEV](https://ddev.readthedocs.io/en/stable/#installation). DDEV configuration is in `.ddev/config.yaml`.

#### Development Tools

*   **Git:** Required for version control. Ensure SSH key is added to GitHub.
*   **Node.js:** Version 18 for frontend code quality checks. Install [Node.js](https://nodejs.org/).

#### Dependencies

`composer.json` lists PHP dependencies. Key dependencies:

*   `axelerant/ct_drupal`
*   `axelerant/ct_github`
*   `composer/installers`
*   `cweagans/composer-patches`
*   Various Drupal modules (see `composer.json`).

Install dependencies:

```bash
composer install
```

## Local Development Environment Setup (DDEV)

`.ddev/config.yaml` configures the DDEV environment.

**Key Configuration Aspects:**

*   `name`: `contribtracker` - Project name.
*   `type`: `drupal10` - Drupal version.
*   `php_version`: `8.3` - PHP version.
*   `database`: `mariadb`, version `11.4`.
*   `web_environment`: `PLATFORM_ENVIRONMENT=main`, `PLATFORM_PROJECT=brbqplxd7ycq6` - Environment variables for Platform.sh.

**Setting up DDEV:**

1.  Navigate to the project root.
2.  Start DDEV:

    ```bash
    ddev start
    ```
3.  Follow instructions, including importing the database if needed.

## GitHub Actions

GitHub Actions for continuous integration, visual regression testing, and environment management.

*   **CI (`ci.yml`):** Automated code checks.
    *   Drupal code quality checks using `hussainweb/drupalqa-action@v2`.
    *   Frontend code quality checks using Node.js.
*   **Cypress Tests (`cypress-tests.yml`):** End-to-end tests.
    *   Uses DDEV.
    *   `PLATFORMSH_CLI_TOKEN` secret for Platform.sh interaction.
*   **Clean Platform.sh env on PR Close (`pr-close.yml`):** Cleans up Platform.sh environments.
    *   Uses `axelerant/platformsh-action@v1`.
*   **VR (`vr.yml`):** Visual Regression testing.
    *   Triggered on tag pushes, manual dispatch, and weekly schedule.
    *   Uses `PERCY_TOKEN` secret for Percy access.

## Gitpod

Gitpod-ready for cloud-based development. Click the Gitpod badge in `README.md`.

## Notes

*   Add SSH key to your GitHub account.
*   See workflow files (`.github/workflows/*.yml`) for details.
*   `README.md` contains more information.

## Local Setup

### Contribution Tracker: Local Development Environment Setup

Details for local environment setup using DDEV.

### Prerequisites

*   DDEV (latest recommended)
*   Docker (required by DDEV)
*   PHP (8.3+ recommended, managed by DDEV)
*   Node.js (18, managed by DDEV)
*   Git (latest recommended)
*   SSH Key (added to GitHub: [GitHub documentation](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-)).

### DDEV Configuration

`.ddev/config.yaml` details:

```yaml
name: contribtracker
type: drupal10
docroot: web
php_version: "8.3"
webserver_type: nginx-fpm
router_http_port: "80"
router_https_port: "443"
mariadb_version: "11.4"
additional_hostnames: []
additional_fqdns: []
upload_dir: sites/default/files
xdebug_enabled: false
web_environment:
  - PLATFORM_ENVIRONMENT=main
  - PLATFORM_PROJECT=brbqplxd7ycq6
nodejs_version: "18"
```

**Explanation:**

*   `name`: `contribtracker` - DDEV project name.
*   `type`: `drupal10` - Drupal 10 project.
*   `docroot`: `web` - Document root.
*   `php_version`: `"8.3"` - PHP version.
*   `webserver_type`: `nginx-fpm` - Web server type.
*   `router_http_port`: `"80"` - HTTP port.
*   `router_https_port`: `"443"` - HTTPS port.
*   `mariadb_version`: `"11.4"` - MariaDB version.
*   `web_environment`: Platform.sh environment variables.
*   `nodejs_version`: `"18"` - Node.js version

**Starting the Environment:**

```bash
ddev start
```

## Local Settings Override (`settings.local.php`)

Customize settings for local development.

### Steps:

1.  **Copy the template:**

    ```bash
    cp web/sites/example.settings.local.php web/sites/default/settings.local.php
    ```

    or

     ```bash
    cp web/sites/example.settings.local.php web/sites/example.com/settings.local.php
    ```

2.  **Enable the include:** Uncomment the include lines in `web/sites/default/settings.php`.

    ```php
    if (file_exists(__DIR__ . '/settings.local.php')) {
      include __DIR__ . '/settings.local.php';
    }
    ```

### Purpose

*   Override default settings for local development.
*   Specify local database credentials.
*   Enable development modules (e.g., Devel).
*   Configure assertions.

## How To Work

### Contribution Tracker Project Documentation

Outlines the development practices and setup for the Contribution Tracker project.

### Project Overview

Drupal 8 application for managing community contributions:

*   Code contributions
*   Event contributions
*   Non-code contributions

### Getting Started

#### Prerequisites

*   Latest versions of PHP, Node.js, Composer, DDEV
*   SSH key added to GitHub.

#### Local Development Setup using DDEV

`cypress-tests.yml` uses `ddev/github-action-setup-ddev@v1`.

### Automated Tasks and Code Quality

GitHub Actions for code quality, visual regression testing, and environment management.

#### Code Quality Checks

`ci.yml` uses `hussainweb/drupalqa-action@v2`:

*   phplint
*   yamllint
*   jsonlint
*   phpcs
*   phpmd
*   twigcs

Frontend code quality checks using `node:18`.

#### Visual Regression Testing

`vr.yml` uses Percy.

*   Triggered on tags, workflow dispatch, scheduled jobs.
*   Environment variables: `CYPRESS_ADMIN_USERNAME`, `CYPRESS_ADMIN_PASSWORD`, `PERCY_TOKEN`.

#### Cypress Tests

`cypress-tests.yml` runs daily at midnight on Sundays.

1.  Sets up Drupal with DDEV.
2.  Installs Composer dependencies.
3.  Runs Cypress tests.

`PLATFORMSH_CLI_TOKEN` is configured as a global DDEV variable.

#### Platform.sh Environment Management

`pr-close.yml` cleans up Platform.sh environments.

*   Uses `axelerant/platformsh-action@v1`.
*   Requires `PLATFORMSH_CLI_TOKEN` secret.

## Content Structure

### Content Structure Documentation

Outlines content types and configurations.

### Content Types

1.  **Basic Page**
    *   Purpose: Static content ("About Us").
    *   Configuration Files:
        *   `config/sync/node.type.page.yml`
        *   `config/sync/core.entity_view_display.node.page.default.yml`
        *   `config/sync/core.entity_view_display.node.page.teaser.yml`
        *   `config/sync/