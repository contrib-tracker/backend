# CI/CD Configuration

This document outlines the Continuous Integration and Continuous Delivery (CI/CD) workflows implemented in this project using GitHub Actions. These workflows automate essential tasks such as code quality checks, visual regression testing, end-to-end testing, and environment cleanup, ensuring a consistent and reliable development process.

## Workflow Overview

The project leverages several GitHub Actions workflows to automate the following stages of the CI/CD pipeline:

*   **Code Quality Checks:**  Ensures code meets defined style and quality standards.
*   **Visual Regression Testing:**  Detects unintended UI changes.
*   **End-to-End (E2E) Testing:**  Verifies the application's functionality.
*   **Environment Cleanup:**  Removes temporary environments after use.

## Workflow Details

### 1. CI Workflow (`/.github/workflows/ci.yml`)

*   **Name:** CI
*   **Purpose:** Performs continuous integration tasks, including code quality checks for both Drupal (backend) and frontend code.
*   **Triggers:**
    *   `push` events on the `main` branch and tags.
    *   `pull_request` events.
*   **Concurrency:**  Ensures that only one CI workflow runs per branch at a time. If a new workflow is triggered while another is in progress, the in-progress run is canceled. This prevents resource contention and ensures the latest code is being tested.
*   **Jobs:**
    *   `drupal_codequality`:
        *   **Description:** Runs Drupal-specific code quality checks.
        *   **Action:** Uses the [`hussainweb/drupalqa-action@v2`](https://github.com/hussainweb/drupalqa-action) action.
        *   **Linting Tools:** Includes: `phplint`, `yamllint`, `jsonlint`, `phpcs`, `phpmd`, and `twigcs`.
        *   **PHP Version:**  Uses PHP 8.2.
    *   `frontend_codequality`:
        *   **Description:**  Runs frontend code quality checks using ESLint.
        *   **Node.js Version:** Uses Node.js version 20 within a container.

### 2. Visual Regression (VR) Workflow (`/.github/workflows/vr.yml`)

*   **Name:** VR
*   **Purpose:** Executes visual regression tests to catch unintended UI changes.
*   **Triggers:**
    *   `push` events on tags.
    *   Manual `workflow_dispatch` events (allows triggering the workflow on demand).
    *   Scheduled execution via cron (`0 0 * * MON`). This runs the tests every Monday at midnight.
*   **Concurrency:**  Manages concurrent VR tests based on the Git ref (branch or tag). Cancels in-progress runs when a new VR workflow is triggered for the same ref.
*   **Jobs:**
    *   `vr_test`:
        *   **Description:** Executes the visual regression tests.
        *   **Operating System:** Uses Ubuntu.
        *   **Environment Variables:**
            *   `CYPRESS_ADMIN_USERNAME`: Username for the admin user in the Cypress test environment.
            *   `CYPRESS_ADMIN_PASSWORD`: Password for the admin user in the Cypress test environment.
            *   `PERCY_TOKEN`:  API token for Percy, the visual regression testing platform.
        *   **Caching:** Caches `composer` and `npm` dependencies to speed up subsequent runs.

### 3. Cypress Tests Workflow (`/.github/workflows/cypress-tests.yml`)

*   **Name:** Cypress Tests
*   **Purpose:**  Runs Cypress end-to-end (E2E) tests to verify application functionality.
*   **Triggers:** Scheduled execution via cron (`0 0 * * 0`). This runs the tests every Sunday at midnight.
*   **Jobs:**
    *   `cypress_tests`:
        *   **Description:** Executes the Cypress E2E tests.
        *   **Operating System:** Uses Ubuntu.
        *   **Environment Variables:**
            *   `CYPRESS_ADMIN_USERNAME`: Username for the admin user in the Cypress test environment.
            *   `CYPRESS_ADMIN_PASSWORD`: Password for the admin user in the Cypress test environment.
        *   **Setup:**
            *   Sets up DDEV for the test environment.
            *   Configures the Platform.sh token for interacting with the Platform.sh environment.
            *   Installs dependencies using Composer.
            *   Performs additional configuration steps as required by the tests.

### 4. PR Close Workflow (`/.github/workflows/pr-close.yml`)

*   **Name:** Clean Platform.sh env on PR Close
*   **Purpose:**  Automatically cleans up Platform.sh environments associated with closed pull requests, preventing resource exhaustion and unnecessary costs.
*   **Triggers:** `pull_request` events of type `closed`.
*   **Jobs:**
    *   `on-pr-close`:
        *   **Description:** Deletes the Platform.sh environment associated with the closed pull request.
        *   **Action:** Uses the [`axelerant/platformsh-action@v1`](https://github.com/axelerant/platformsh-action) with the `clean-pr-env` action.
        *   **Required Parameters:**
            *   `project-id`:  The Platform.sh project ID.
            *   `cli-token`:  A Platform.sh CLI token with appropriate permissions.  This should be stored as a GitHub secret.

## Dependencies and Secrets

The workflows rely on the following actions, secrets, and environment variables:

*   **GitHub Actions:**
    *   [`actions/checkout@v4`](https://github.com/actions/checkout):  Used to checkout the repository code.
    *   [`hussainweb/drupalqa-action@v2`](https://github.com/hussainweb/drupalqa-action):  Used for Drupal code quality checks.
    *   [`ddev/github-action-setup-ddev@v1`](https://github.com/ddev/github-action-setup-ddev): Used to setup a `ddev` environment.
    *   [`axelerant/platformsh-action@v1`](https://github.com/axelerant/platformsh-action):  Used for interacting with Platform.sh, specifically for cleaning up PR environments.
*   **GitHub Secrets:**
    *   `PERCY_TOKEN`:  API token for Percy visual regression testing.  Stored as a GitHub secret for security.
    *   `PLATFORMSH_CLI_TOKEN`: Platform.sh CLI token.  Stored as a GitHub secret for security.
*   **Environment Variables:**
    *   `CYPRESS_ADMIN_USERNAME`: Username for the admin user in the Cypress test environment.
    *   `CYPRESS_ADMIN_PASSWORD`: Password for the admin user in the Cypress test environment.

## Workflow Interactions

*   **CI Workflow:**  Provides immediate feedback to developers on code quality issues by running checks on every push to the `main` branch, tags, and pull requests.
*   **VR Workflow:**  Ensures UI consistency across deployments to different environments (dev, staging, production) by running visual regression tests on tags, manual dispatch or a schedule.
*   **Cypress Tests Workflow:** Verifies critical application functionality by running end-to-end tests on a weekly schedule. `ddev` allows to run tests in a local environment similar to production.
*   **PR Close Workflow:** Prevents resource exhaustion on Platform.sh by automatically cleaning up environments associated with closed pull requests.  This is especially important for projects with many contributors and frequent pull requests.