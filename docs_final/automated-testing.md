```markdown
# Testing and Code Quality

This document outlines the testing strategy and code quality checks integrated into the project. It details the configuration of Continuous Integration (CI), Visual Regression (VR) testing, and other automated processes.

## Continuous Integration (CI)

The project utilizes GitLab CI/CD and GitHub Actions for Continuous Integration. Configuration details are found in `.gitlab-ci.yml` and `.github/workflows/ci.yml`.

### GitLab CI/CD (`.gitlab-ci.yml`)

This file configures the GitLab CI/CD pipeline.

*   **Stages:** The pipeline is structured into the following stages: `build`, `lint`, `test`, `deploy`.
*   **Includes:**  The configuration includes platform-specific settings from `.gitlab/platform.yml`.
*   **Cache:**  To optimize pipeline execution time, npm modules are cached.
*   **Code Quality Checks (`drupal_codequality`):** The `drupal_codequality` job performs static analysis on custom Drupal modules.
    *   Uses the `hussainweb/drupalqa:php7.4` Docker image.
    *   Executes the following checks on files within the `web/modules/custom/` directory:
        *   `composer validate`: Validates the `composer.json` file.
        *   `phplint`: Checks for PHP syntax errors.
        *   `phpcs`: Enforces Drupal coding standards using PHP CodeSniffer.
        *   `phpmd`: Analyzes code for potential bugs and performance issues using PHP Mess Detector.
*   **PHPUnit Tests (`drupal_tests`):**
    *   This section details how PHPUnit tests are executed.  *This section contains an incomplete excerpt from the original documentation*.

### GitHub Actions CI Workflow (`.github/workflows/ci.yml`)

This workflow defines the Continuous Integration process using GitHub Actions.

*   **Triggers:** The workflow is triggered on:
    *   Pushes to the `main` branch and tags.
    *   Pull requests.
*   **Concurrency:** Concurrent CI runs are prevented for the same branch/ref.
*   **Drupal Code Quality Checks (`drupal_codequality`):**
    *   Uses the `hussainweb/drupalqa-action@v2` action to perform Drupal-specific code quality checks.
    *   Specifies PHP version 8.2.
    *   Leverages GrumPHP to execute a suite of code quality tools:
        *   `phplint`: Checks for PHP syntax errors.
        *   `yamllint`: Validates YAML syntax.
        *   `jsonlint`: Validates JSON syntax.
        *   `phpcs`: Enforces Drupal coding standards using PHP CodeSniffer.
        *   `phpmd`: Analyzes code for potential bugs and performance issues using PHP Mess Detector.
        *   `twigcs`: Checks Twig templates for coding standards compliance.
*   **Frontend Code Quality Checks (`frontend_codequality`):**
    *   Executes frontend code quality checks within a `node:20` container. Specific tools and configurations are likely defined within the job's steps.

## Visual Regression Testing (VR)

Visual Regression tests are configured using GitHub Actions and Percy. The workflow definition is located in `.github/workflows/vr.yml`.

### GitHub Actions VR Workflow (`.github/workflows/vr.yml`)

*   **Triggers:** The workflow is triggered on:
    *   Push to tags.
    *   Manual workflow dispatch.
    *   A cron schedule (every Monday at 00:00).
*   **Concurrency:** Ensures that only one VR test runs at a time for a given ref, preventing conflicts and ensuring accurate results.
*   **Environment Variables:** The following environment variables are defined:
    *   `CYPRESS_ADMIN_USERNAME`: Username for the administrative user for Cypress tests.
    *   `CYPRESS_ADMIN_PASSWORD`: Password for the administrative user for Cypress tests.
    *   `PERCY_TOKEN`: API token for Percy, obtained securely from a GitHub secret to authorize visual regression tests.
*   **Steps:** The workflow performs the following steps:
    *   Checks out the repository code.
    *   Retrieves cached directories for Composer and npm to improve workflow speed.
    *   Utilizes `actions/cache` to implement caching properly.

## Pull Request Cleanup

### GitHub Actions PR Close Workflow (`.github/workflows/pr-close.yml`)

This workflow automates the cleanup of Platform.sh environments associated with closed pull requests.

*   **Trigger:** The workflow runs when a pull request is closed.
*   **Jobs:** Contains a job `on-pr-close`.
*   **Steps:**
    *   Uses the `axelerant/platformsh-action@v1` action to remove the Platform.sh environment linked to the closed PR.
    *   Configured with:
        *   `project-id`: The Platform.sh project ID (obtained from a GitHub secret).
        *   `cli-token`: A Platform.sh CLI token (obtained from a GitHub secret).

## Cypress End-to-End Tests

### GitHub Actions Cypress Workflow (`.github/workflows/cypress-tests.yml`)

This workflow configures and executes Cypress end-to-end tests.

*   **Trigger:**  The workflow runs on a schedule (every Sunday at 00:00).
*   **Environment Variables:** The following environment variables are defined:
    *   `CYPRESS_ADMIN_USERNAME`: Username for the administrative user for Cypress tests.
    *   `CYPRESS_ADMIN_PASSWORD`: Password for the administrative user for Cypress tests.
*   **Steps:** The workflow performs the following steps:
    *   Checks out the repository code.
    *   Sets up DDEV using `ddev/github-action-setup-ddev@v1`.
    *   Configures and starts DDEV, pulling the database and files from Platform.sh.  The Platform.sh CLI token is set as `PLATFORMSH_CLI_TOKEN`.
    *   Installs composer dependencies.
```