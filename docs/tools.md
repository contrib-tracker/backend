# Contribution Tracker - Developer Onboarding Guide

This document provides a guide for developers setting up and contributing to the Contribution Tracker project. It covers the required tools, project dependencies, local development environment setup, and continuous integration workflows.

## Tools & Prerequisites

This section outlines the tools and prerequisites necessary for successful development on the Contribution Tracker application.

### Core Requirements

*   **PHP:** Version 8.2 or higher.  Refer to the `composer.json` file for the specific version compatibility.
*   **Composer:**  A dependency management tool for PHP. The `composer.json` file defines the project's dependencies, including Drupal modules and other libraries.  Install [Composer](https://getcomposer.org/) if you don't have it already.
*   **DDEV:** DDEV is used as the local development environment, configured via the `.ddev/config.yaml` file. This configuration specifies the project's name, Drupal version, PHP version, web server type, database type, and other essential environment settings. Install [DDEV](https://ddev.readthedocs.io/en/stable/#installation) if you don't have it already.

### Development Tools

*   **Git:** Required for version control and collaboration. The project utilizes GitHub Actions workflows, assuming developers can interact with the GitHub repository. If you haven't already, add your SSH key to your GitHub account as described in the `README.md`.
*   **Node.js:** Version 18 is employed for frontend code quality checks within the `ci.yml` workflow. This suggests that Node.js (and likely `npm` or `yarn`) is also used for other front-end related development tasks. Install [Node.js](https://nodejs.org/) if you don't have it already.

### Dependencies

The `composer.json` file lists the PHP dependencies. Here are some key dependencies:

*   `axelerant/ct_drupal`: Custom Drupal module for the Contribution Tracker.
*   `axelerant/ct_github`: Custom Drupal module for GitHub integration.
*   `composer/installers`: Composer plugin for handling different package types.
*   `cweagans/composer-patches`: Composer plugin for applying patches.
*   Various Drupal modules such as `drupal/address`, `drupal/admin_toolbar`, etc. (Refer to `composer.json` for the complete list).

To install all dependencies, run:

```bash
composer install
```

## Local Development Environment Setup (DDEV)

The `.ddev/config.yaml` file configures the DDEV environment.

**Key Configuration Aspects:**

*   **`name`**: `contribtracker` - defines the project name for DDEV. This is how you'll interact with the DDEV environment from the command line.
*   **`type`**: `drupal10` - specifies the Drupal version.
*   **`php_version`**: `8.3` - defines the PHP version.  This should match the version specified in the "Core Requirements" section.
*   **`database`**: `mariadb`, version `11.4`. Defines the database type and version.
*   **`web_environment`**: `PLATFORM_ENVIRONMENT=main`, `PLATFORM_PROJECT=brbqplxd7ycq6` - Sets environment variables. These are likely specific to the project's Platform.sh environment.

**Setting up DDEV:**

1.  **Navigate to the project root directory** in your terminal.
2.  **Start the DDEV environment** with the command:

    ```bash
    ddev start
    ```
3.  Follow the instructions output by the `ddev start` command, including importing the database if required.

## GitHub Actions

The project utilizes GitHub Actions for continuous integration, visual regression testing, and environment management. Understanding these workflows is crucial for contributing effectively.

*   **CI (`ci.yml`):**  This workflow performs automated checks on code changes.
    *   It runs Drupal code quality checks using `hussainweb/drupalqa-action@v2`, including linting and code style validation to ensure code adheres to standards.
    *   It also runs frontend code quality checks using Node.js (likely running linters, style checks, and potentially unit tests for the front-end code).
*   **Cypress Tests (`cypress-tests.yml`):**  Runs Cypress end-to-end tests to verify the application's functionality.
    *   It uses DDEV to set up the testing environment, ensuring tests run in a consistent and reproducible environment.
    *   The `PLATFORMSH_CLI_TOKEN` GitHub secret is used for interacting with Platform.sh, likely for deploying and managing testing environments on Platform.sh.
*   **Clean Platform.sh env on PR Close (`pr-close.yml`):**  This workflow automates the cleanup of Platform.sh environments when pull requests are closed to avoid unnecessary resource consumption.
    *   It uses the `axelerant/platformsh-action@v1` action.
*   **VR (`vr.yml`):**  Likely used for Visual Regression (VR) testing to automatically detect unintended visual changes in the application.
    *   Triggered on tag pushes, manual workflow dispatch, and a weekly schedule.
    *   Uses the `PERCY_TOKEN` GitHub secret to authorize access to the Percy visual testing service.

## Gitpod

The project is Gitpod-ready, offering a convenient cloud-based development environment. You can quickly start a fully configured development environment directly from your web browser; simply click the Gitpod badge in the `README.md` file.

## Notes

*   Ensure your SSH key has been added to your GitHub account.  This is crucial for Git operations and authenticating with Platform.sh.
*   Refer to the individual workflow files (`.github/workflows/*.yml`) for detailed configurations of the GitHub Actions.
*   The `README.md` file contains further information and useful links.