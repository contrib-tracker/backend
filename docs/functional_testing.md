# Project Documentation: Testing and CI Workflows

This document outlines the automated testing and code quality checks implemented in this project. These processes ensure code reliability, security, and adherence to defined coding standards.

## Visual Regression Tests

The `VR` workflow (`vr.yml`) handles visual regression testing. This workflow compares the visual output of UI components against established baselines to detect unintended changes.

### Workflow Details

*   **Trigger:**
    *   Pushes to any tag.
    *   Manual trigger via `workflow_dispatch`.
    *   Scheduled execution every Monday.
*   **Concurrency:** Employs a concurrency group to prevent job conflicts and cancel in-progress jobs if a new run is triggered.
*   **Environment Variables:**
    *   `CYPRESS_ADMIN_USERNAME`: Username for the admin user during Cypress tests.
    *   `CYPRESS_ADMIN_PASSWORD`: Password for the admin user during Cypress tests.
    *   `PERCY_TOKEN`: API token for Percy, the visual regression testing service.
*   **Steps:**
    1.  **Checkout Code:** Checks out the repository code.
    2.  **Determine Cache Directories:** Determines cache directories for both Composer (PHP dependencies) and npm (Node.js dependencies).

## Pull Request Environment Cleanup

The `Clean Platform.sh env on PR Close` workflow (`pr-close.yml`) automatically cleans up Platform.sh environments associated with closed pull requests.

### Workflow Details

*   **Trigger:** Triggered when a pull request is closed.
*   **Job:** The `on-pr-close` job executes on an Ubuntu environment.
*   **Steps:**
    1.  **Platform.sh Environment Cleanup:** Uses the `axelerant/platformsh-action` to delete the Platform.sh environment associated with the closed pull request. This helps conserve resources and maintain a clean environment.

## Cypress Tests

The `Cypress Tests` workflow (`cypress-tests.yml`) executes end-to-end tests using Cypress.  These tests simulate user interactions to verify the functionality and behavior of the application.

### Workflow Details

*   **Trigger:** Scheduled to run every Sunday.
*   **Environment Variables:**
    *   `CYPRESS_ADMIN_USERNAME`: Username for the admin user during Cypress tests.
    *   `CYPRESS_ADMIN_PASSWORD`: Password for the admin user during Cypress tests.
*   **Steps:**
    1.  **Checkout Code:** Checks out the repository code.
    2.  **Setup DDEV:** Sets up DDEV (local development environment) using the `ddev/github-action-setup-ddev` action.  This ensures a consistent testing environment.
    3.  **Configure Platform.sh CLI Token:** Configures the `PLATFORMSH_CLI_TOKEN` so that DDEV can interact with the Platform.sh environment.
    4.  **Install Dependencies:** Installs PHP and Node.js dependencies required for running the tests.

## Continuous Integration (CI)

The `CI` workflow (`ci.yml`) performs automated code quality checks to maintain code standards and identify potential issues early in the development process.

### Workflow Details

*   **Trigger:**
    *   Pushes to the `main` branch.
    *   Pushes to tags (releases).
    *   Pull requests (any branch).
*   **Concurrency:** Employs a concurrency group to prevent job conflicts.
*   **Jobs:**

    *   **`drupal_codequality`**:  Runs Drupal-specific code quality checks using the `hussainweb/drupalqa-action`. This job helps enforce Drupal coding standards and best practices.
        *   **Checks Included**:
            *   `phplint`: Checks for PHP syntax errors.
            *   `yamllint`: Validates YAML file syntax.
            *   `jsonlint`: Validates JSON file syntax.
            *   `phpcs`: Checks PHP code against coding standards.
            *   `phpmd`: Performs static analysis of PHP code to identify potential issues.
            *   `twigcs`: Checks Twig templates against coding standards.
    *   **`frontend_codequality`**: Performs frontend code quality checks within a `node:20` container. This job ensures adherence to frontend coding standards and identifies potential issues in JavaScript, CSS, and HTML code.