# Automated Testing and CI/CD Workflows

This document outlines the automated testing and continuous integration workflows used in this project. These workflows are defined as GitHub Actions and are triggered by various events, ensuring code quality and consistent deployments.

## Visual Regression Tests

### Purpose

The visual regression (VR) tests compare screenshots of the application against baseline images to detect unintended visual changes. This ensures the user interface remains consistent across updates.

### Workflow File

*   [vr.yml](/.github/workflows/vr.yml)

### Triggers

*   `push` on any tag.
*   Manual workflow dispatch.
*   Scheduled cron job (runs every Monday at 00:00 UTC).

### Concurrency

To prevent conflicts and ensure reliable results, only one VR test runs at a time for a given Git ref. Any in-progress runs are cancelled when a new run is triggered.

### Jobs

*   `vr_test`:
    *   Runs on Ubuntu.
    *   **Environment Variables:**
        *   `CYPRESS_ADMIN_USERNAME`:  Admin username for Cypress tests (defined as a GitHub secret).
        *   `CYPRESS_ADMIN_PASSWORD`: Admin password for Cypress tests (defined as a GitHub secret).
        *   `PERCY_TOKEN`: API token for Percy, used for visual regression testing (defined as a GitHub secret).
    *   **Steps:**
        1.  Checks out the code: `uses: actions/checkout@v3`.
        2.  Obtains cache directories for Composer and npm.
        3.  *The rest of the steps related to setting up Cypress, DDEV etc and running Percy validation were cutoff in the provided file.*  Developers should refer to the `vr.yml` file for complete details.

### Dependencies

*   Requires the `PERCY_TOKEN`, `CYPRESS_ADMIN_USERNAME`, and `CYPRESS_ADMIN_PASSWORD` secrets to be defined in the GitHub repository settings.

## Cypress Tests

### Purpose

Cypress end-to-end tests automate user interactions with the application, verifying functionality and ensuring a consistent user experience.

### Workflow File

*   [cypress-tests.yml](/.github/workflows/cypress-tests.yml)

### Triggers

*   Scheduled cron job (runs every Sunday at 00:00 UTC).

### Jobs

*   `cypress_tests`:
    *   Runs on Ubuntu.
    *   **Environment Variables:**
        *   `CYPRESS_ADMIN_USERNAME`: Admin username for Cypress tests (defined as a GitHub secret).
        *   `CYPRESS_ADMIN_PASSWORD`: Admin password for Cypress tests (defined as a GitHub secret).
    *   **Steps:**
        1.  Checks out the repository: `uses: actions/checkout@v3`.
        2.  Sets up DDEV: `name: Setup DDEV (configured not to autostart)`. DDEV is configured in the project but will not start automatically.
        3.  Sets the Platform.sh token using `ddev config global`: `name: Set platform.sh token`.
        4.  Starts DDEV.
        5.  Installs Composer dependencies: `ddev composer install`.
        6.  *The actual Cypress test execution steps were cutoff in the provided file.* Developers should refer to the `cypress-tests.yml` file for complete details.

### Dependencies

*   Relies on DDEV for local development environment setup.
*   Requires the `PLATFORMSH_CLI_TOKEN`, `CYPRESS_ADMIN_USERNAME`, and `CYPRESS_ADMIN_PASSWORD` secrets to be defined in the GitHub repository settings.

## Continuous Integration (CI) Code Quality Checks

### Purpose

These checks automatically analyze the codebase for potential issues, enforcing code style guidelines and improving code quality.

### Workflow File

*   [ci.yml](/.github/workflows/ci.yml)

### Triggers

*   `push` on the `main` branch and any tag.
*   `pull_request` events.

### Concurrency

To prevent conflicts and ensure reliable results, only one CI run at a time for a given Git ref. Any in-progress runs are cancelled when a new run is triggered.

### Jobs

*   `drupal_codequality`:
    *   Runs Drupal-specific code quality checks.
    *   Uses `hussainweb/drupalqa-action@v2`.
    *   Uses PHP 8.2.
    *   Performs checks via GrumPHP including: `phplint`, `yamllint`, `jsonlint`, `phpcs`, `phpmd`, and `twigcs`.
*   `frontend_codequality`:
    *   Runs frontend-specific code quality checks.
    *   Runs within a `node:18` container.
    *   *The content of steps are cutoff from the provided file.* Developers should refer to the `ci.yml` file for complete details.

## Platform.sh Environment Management

### Purpose

This workflow automates the cleanup of Platform.sh environments when a pull request is closed, preventing resource waste and ensuring environment hygiene.

### Workflow File

*   [pr-close.yml](/.github/workflows/pr-close.yml)

### Triggers

*   `pull_request` events, specifically when a PR is `closed`.

### Jobs

*   `on-pr-close`:
    *   Runs on Ubuntu.
    *   Uses the `axelerant/platformsh-action@v1` action to clean the Platform.sh environment.
    *   Requires `project-id` and `cli-token` to be configured.

### Dependencies

*   Requires the `PLATFORMSH_CLI_TOKEN` secret and the `project-id` to be correctly configured in the workflow using GitHub secrets.  The `project-id` is the Platform.sh project ID.

## Summary

These workflows automate various aspects of the software development lifecycle, from code quality checks to visual regression and end-to-end tests. They rely on tools like Cypress, Percy, Drupal QA tools, and Platform.sh, using GitHub Actions for orchestration. Understanding these workflows is crucial for contributing to the project and maintaining its quality. Developers should consult the individual workflow files for complete details of all steps involved.