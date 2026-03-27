```markdown
# Contribution Tracker - Developer Onboarding Guide

This document provides a comprehensive guide for developers to quickly onboard with the Contribution Tracker Drupal application. It outlines the necessary tools, prerequisites, and configurations required for both local development and continuous integration/continuous deployment (CI/CD).

## 1. Core Requirements

Before you begin, ensure you have the following core tools installed:

*   **Composer:**  Essential for managing project dependencies. Download and install the [latest version of Composer](https://getcomposer.org/).
*   **PHP:**  Version **8.2 or higher** is required. Verify your PHP version by running `php -v` in your terminal.

## 2. Local Development Environment Setup (DDEV)

This project utilizes DDEV for local development. DDEV provides a containerized environment that mirrors production settings, ensuring consistency throughout the development lifecycle.

### 2.1 DDEV Configuration

The DDEV configuration is located in the `.ddev/config.yaml` file.  Here's a breakdown of the settings:

```yaml
name: contribtracker
type: drupal10
docroot: web
php_version: "8.3"
webserver_type: nginx-fpm
router_http_port: "80"
router_https_port: "443"
database:
  type: mariadb
  version: "11.4"
nodejs_version: "20"
```

**Explanation:**

*   `name`: The name of the DDEV project (contribtracker).
*   `type`: Specifies the Drupal version (drupal10).
*   `docroot`:  The root directory for the Drupal installation (web).
*   `php_version`: The PHP version to use within the DDEV container (8.3).
*   `webserver_type`:  The web server type (nginx-fpm).
*   `router_http_port`: The HTTP port for the router (80).
*   `router_https_port`: The HTTPS port for the router (443).
*   `database.type`: The database type (mariadb).
*   `database.version`:  The MariaDB version (11.4).
*   `nodejs_version`:  The Node.js version to use (20).

### 2.2 Starting the DDEV Environment

1.  Navigate to the project root directory in your terminal.
2.  Run `ddev start`.  This command will build and start the DDEV containers based on the configuration in `.ddev/config.yaml`.

### 2.3 Accessing the Site

Once DDEV is running, you can access the site in your browser using the URLs provided by DDEV (e.g., `https://contribtracker.ddev.site`, `http://contribtracker.ddev.site`).  You can also find these URLs by running `ddev describe`.

## 3. Dependencies

The project's dependencies are managed using Composer.

### 3.1 Installing Dependencies

1.  Navigate to the project root directory in your terminal.
2.  Run `composer install`. This command will install all dependencies listed in the `composer.json` file.

### 3.2 Key Dependencies

The `composer.json` file includes the following key dependencies:

```json
{
  "require": {
    "php": ">=8.2",
    "axelerant/ct_drupal": "*",
    "axelerant/ct_github": "*",
    "composer/installers": "^2.1",
    "cweagans/composer-patches": "^1.7.0",
    "drupal/address": "^2.0",
    "drupal/admin_toolbar": "^3.0.0",
    "drupal/better_exposed_filters": "^7.0",
    "drupal/ckeditor": "^1.0",
    "drupal/cookies": "^1.2",
    "drupal/core": "^10.1"
  }
}
```

**Explanation:**

*   `axelerant/ct_drupal`:  Custom Drupal module specific to the Contribution Tracker.
*   `axelerant/ct_github`:  Custom module for integrating with GitHub.
*   `drupal/address`: Provides address field functionality.
*   `drupal/admin_toolbar`: Enhances the Drupal admin interface.
*   `drupal/better_exposed_filters`: Improves exposed filters in Drupal views.
*   `drupal/ckeditor`:  Provides a WYSIWYG editor.
*   `drupal/cookies`: Provides cookie management functionality
*   `drupal/core`: The Drupal core framework.

## 4. Git Prerequisites

### 4.1 SSH Key

An SSH key is required for secure access to the Git repository.

1.  If you don't have an SSH key, generate one.  See GitHub's documentation on [generating a new SSH key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent).
2.  Add your SSH key to your GitHub account settings as described in the GitHub documentation.

## 5. CI/CD Pipeline (GitLab CI)

The project uses GitLab CI for automated testing and deployment. The pipeline configuration is defined in `.gitlab-ci.yml`.

### 5.1 GitLab CI Configuration (`.gitlab-ci.yml`)

The `.gitlab-ci.yml` file defines the CI/CD pipeline stages, including `build`, `lint`, `test`, and `deploy`.  Consult the file for specific details regarding each stage.

### 5.2 Platform Configuration (`.gitlab/platform.yml`)

The `.gitlab/platform.yml` file contains platform-specific configurations that are used during the CI/CD process.

## 6. GitHub Actions

The project leverages GitHub Actions for various automated tasks.  The workflows are defined in the `.github/workflows/` directory.

*   **`.github/workflows/vr.yml` (Visual Regression Tests):**
    *   Runs visual regression tests using Percy.
    *   Scheduled to run every Monday at 00:00.
*   **`.github/workflows/pr-close.yml` (Platform.sh Environment Cleanup):**
    *   Cleans up Platform.sh environments when a pull request is closed.
    *   Requires the `PLATFORMSH_CLI_TOKEN` secret to authenticate with Platform.sh.
*   **`.github/workflows/cypress-tests.yml` (Cypress Tests):**
    *   Runs Cypress end-to-end tests.
    *   Uses DDEV for setting up the testing environment.
    *   Requires the `PLATFORMSH_CLI_TOKEN` secret.
*   **`.github/workflows/ci.yml` (Continuous Integration):**
    *   Performs Drupal code quality checks using the `hussainweb/drupalqa-action@v2` action.
    *   Runs frontend code quality checks within a Node.js container.

## 7. Code Quality Tools

The project uses the following tools to ensure code quality and adherence to coding standards:

*   **drupalqa-action:**  Used within GitHub Actions for Drupal-specific code quality checks.
*   **phpcs:** PHP Code Sniffer, used for enforcing coding standards.
*   **phplint:** Used for checking PHP syntax.
*   **phpmd:** PHP Mess Detector, used for detecting potential code issues.
```