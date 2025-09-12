# CI/CD Documentation

This document outlines the Continuous Integration and Continuous Delivery (CI/CD) workflows implemented in this project. These workflows are designed to automate testing, code quality checks, and environment management, facilitating a robust and efficient development lifecycle.

## Workflow Overview

This project leverages GitHub Actions for CI/CD.  Workflow definitions are located in the `.github/workflows` directory within the repository. Each workflow addresses a specific aspect of the software development lifecycle, from code quality assurance to environment cleanup.

## Workflow Details

### 1. Visual Regression Testing (VR) Workflow

*   **File:** `.github/workflows/vr.yml`
*   **Purpose:**  Executes visual regression tests to detect unintended visual changes in the application. This helps ensure a consistent user interface across deployments.
*   **Triggers:**
    *   `push` events on tags (`*`):  Triggers when a new tag is pushed to the repository, typically indicating a release.
    *   `workflow_dispatch`: Allows manual triggering of the workflow from the GitHub Actions UI. This is useful for on-demand testing.
    *   `schedule` (cron: `0 0 * * MON`):  Runs the workflow every Monday at midnight (UTC). This provides regular visual regression testing.
*   **Concurrency:**  Prevents concurrent VR test runs using `vr-${{ github.ref }}`. This ensures that tests are executed in isolation and avoids potential conflicts.
*   **Job:** `vr_test`
    *   **Runs On:** `ubuntu-latest` (latest version of Ubuntu runner).
    *   **Environment Variables:** Configures environment variables required for the test execution.
        *   `CYPRESS_ADMIN_USERNAME`:  Username for the administrative user in the Cypress testing environment.
        *   `CYPRESS_ADMIN_PASSWORD`: Password for the administrative user in the Cypress testing environment.
        *   `PERCY_TOKEN`:  API token for authenticating with the Percy visual regression testing platform.  This is retrieved from GitHub secrets for security.
    *   **Steps:**
        1.  **Checkout Code:**  Checkouts the repository code using `actions/checkout@v4`, making the project code available to the workflow.
        2.  **Determine Cache Directories:** This step identifies cache directories for Composer and npm, optimizing dependency management for subsequent runs by storing and retrieving cached dependencies.

### 2. Pull Request Close Workflow

*   **File:** `.github/workflows/pr-close.yml`
*   **Purpose:** Cleans up Platform.sh environments that were provisioned for pull request testing.  This helps to minimize resource usage and avoid unnecessary costs.
*   **Triggers:** `pull_request` events with `types: [closed]`:  Triggers when a pull request is closed (either merged or closed without merging).
*   **Job:** `on-pr-close`
    *   **Runs On:** `ubuntu-latest`
    *   **Steps:**
        1.  **Clean PR Environment:** Utilizes the `axelerant/platformsh-action@v1` action with the `clean-pr-env` parameter. This action automatically removes the Platform.sh environment associated with the closed pull request.  The workflow requires the following parameters:
            *   `project-id`: The Platform.sh project ID.  Often configured within the repository settings or workflow file (refer to Axelerant's documentation for specifics)
            *   `cli-token`:  A Platform.sh CLI token with appropriate permissions. This token is securely stored as a GitHub secret (`secrets.PLATFORMSH_CLI_TOKEN`).

### 3. Cypress Tests Workflow

*   **File:** `.github/workflows/cypress-tests.yml`
*   **Purpose:**  Executes end-to-end (E2E) tests using Cypress. These tests simulate user interactions with the application, verifying its functionality and behavior.
*   **Triggers:** `schedule` (cron: `0 0 * * 0`):  Runs the workflow every Sunday at midnight (UTC). This ensures that E2E tests are performed regularly.
*   **Job:** `cypress_tests`
    *   **Runs On:** `ubuntu-latest`
    *   **Environment Variables:**
        *   `CYPRESS_ADMIN_USERNAME`:  Username for the administrative user in the Cypress testing environment.
        *   `CYPRESS_ADMIN_PASSWORD`: Password for the administrative user in the Cypress testing environment.
    *   **Steps:**
        1.  **Checkout Code:**  Checkouts the repository code.
        2.  **Setup DDEV:**  Sets up DDEV (a local development environment tool) using the `ddev/github-action-setup-ddev@v1` action.
        3.  **Configure DDEV:** Configures DDEV to include the Platform.sh token using `ddev config global`. This allows DDEV to interact with Platform.sh during testing.
        4.  **Install Dependencies and Start DDEV:** Installs Composer dependencies using `ddev composer install` and starts the DDEV environment using `ddev`.

### 4. Continuous Integration (CI) Workflow

*   **File:** `.github/workflows/ci.yml`
*   **Purpose:** Performs code quality checks to ensure that the codebase adheres to defined coding standards and best practices.
*   **Triggers:**
    *   `push` events on the `main` branch and tags (`*`): Triggers when changes are pushed to the main branch or when a tag is created.
    *   `pull_request`: Triggers when a pull request is opened, updated, or synchronized.
*   **Concurrency:** Prevents concurrent CI runs using `${{ github.ref }}`.
*   **Jobs:**
    *   `drupal_codequality`: Performs Drupal-specific code quality checks.
        *   **Uses:** `hussainweb/drupalqa-action@v2` (a GitHub Action designed for Drupal code quality).
        *   **PHP Version:** Specifies PHP version 8.2 for the code analysis.
        *   **GrumPHP Configuration:** Configures code quality checks using GrumPHP, including:
            *   `phplint`: Checks for PHP syntax errors.
            *   `yamllint`: Checks for YAML syntax errors and formatting issues.
            *   `jsonlint`: Checks for JSON syntax errors and formatting issues.
            *   `phpcs`:  Checks for PHP coding standard violations using PHP_CodeSniffer.
            *   `phpmd`:  Performs static analysis of PHP code using PHP Mess Detector.
            *   `twigcs`: Checks for coding standards violations in Twig templates.
    *   `frontend_codequality`:  Performs frontend code quality checks.
        *   **Container:** Uses a `node:18` container to provide a Node.js environment for the checks.
        *   **Steps:**
            1.  `npm install`: Installs Node.js dependencies.
            2.  Runs linting processes (details of specific linting tools and configurations should be found within the `package.json` file or related configuration files in the project repository, for example: ESLint, stylelint).

## Secrets

The workflows utilize GitHub secrets for storing sensitive information, enhancing security:

*   `PERCY_TOKEN`:  API token for authenticating with the Percy visual regression testing platform.
*   `PLATFORMSH_CLI_TOKEN`:  A Platform.sh CLI token used for interacting with the Platform.sh API. This secret should have the necessary permissions to manage environments.

## Dependencies

The CI/CD workflows rely on several key dependencies:

*   **GitHub Actions:** The underlying platform for workflow execution.
*   **Community Actions:**  Reusable actions from the GitHub Marketplace that simplify common tasks (e.g., `actions/checkout@v4`, `axelerant/platformsh-action@v1`, `hussainweb/drupalqa-action@v2`, `ddev/github-action-setup-ddev@v1`).
*   **DDEV:**  A local development environment tool used to configure and manage the testing environment within the CI workflows.
*   **Platform.sh:**  A cloud hosting platform used for environment management, particularly for pull request environments.
*   **GrumPHP:** A PHP task runner used for automating code quality checks in Drupal projects.
*   **Node.js/npm:** A javascript runtime environment and package manager, both of which are used for Frontend Code Quality Checks.
*   **Composer:** A dependency manager for PHP used to managing project dependencies.

## Interactions

The workflows interact with the following services and tools:

*   **GitHub:** Provides source code management, workflow execution, and secure secret storage.
*   **Platform.sh:** Provides cloud hosting and environment management.
*   **Percy:** A visual regression testing platform.
*   **DDEV:**  A local development environment platform.