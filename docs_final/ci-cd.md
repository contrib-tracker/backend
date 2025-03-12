```markdown
# CI/CD Configuration

This document describes the Continuous Integration and Continuous Deployment (CI/CD) workflows configured for this Drupal project using GitHub Actions. These workflows automate tasks such as code quality checks, visual regression testing, end-to-end testing, and environment cleanup, ensuring code quality and efficient deployment processes.

## Workflow Overview

The following workflows are defined:

*   **CI (Continuous Integration):**  Performs code quality analysis on every push and pull request.
*   **VR (Visual Regression):** Executes visual regression tests to detect UI changes.
*   **Cypress Tests:** Runs end-to-end tests using Cypress.
*   **Clean Platform.sh env on PR Close:**  Automatically cleans up Platform.sh environments upon pull request closure.

## Workflow Details

### Workflow: CI (Continuous Integration)

*   **Name:** CI
*   **Purpose:** Performs continuous integration checks, including code quality analysis.
*   **Triggers:**
    *   `push`: Triggered on pushes to the `main` branch and any tag (`tags: ["*"]`).
    *   `pull_request`: Triggered on pull requests.
*   **Concurrency:** Ensures only one CI workflow runs per Git reference, canceling any in-progress runs. This prevents resource contention and ensures consistent results.

#### Jobs

*   **`drupal_codequality`**

    *   **Runs on:** `ubuntu-latest`
    *   **Steps:**

        1.  **Checkout Code:** Checks out the repository code using `actions/checkout@v4`.

        ```yaml
        - uses: actions/checkout@v4
        ```

        2.  **Drupal Code Quality Checks:** Runs Drupal-specific code quality checks using `hussainweb/drupalqa-action@v2`. This step leverages GrumPHP to run linters and code analysis tools.

        ```yaml
        - name: Drupal Code Quality
          uses: hussainweb/drupalqa-action@v2
          with:
            php-version: '8.2'
            checks: phplint,yamllint,jsonlint,phpcs,phpmd,twigcs
        ```

        *   `php-version`: Specifies the PHP version to use for the checks (8.2).
        *   `checks`: Defines the code quality checks to perform, including `phplint`, `yamllint`, `jsonlint`, `phpcs` (PHP CodeSniffer), `phpmd` (PHP Mess Detector), and `twigcs` (Twig Code Sniffer).

*   **`frontend_codequality`**

    *   **Runs on:** `ubuntu-latest`
    *   **Container:** `node:20` - Executes the job within a Docker container based on the `node:20` image. This ensures a consistent environment for frontend tooling.
    *   **Steps:**

        1.  **Checkout Code:** Checks out the repository code using `actions/checkout@v4`.

        ```yaml
        - uses: actions/checkout@v4
        ```

### Workflow: VR (Visual Regression)

*   **Name:** VR
*   **Purpose:** Performs visual regression tests.
*   **Triggers:**
    *   `push`: Triggered on any tag (`tags: ["*"]`). This ensures visual regression tests are run on releases.
    *   `workflow_dispatch`: Allows manual triggering of the workflow. This is useful for on-demand testing or debugging.
    *   `schedule`: Scheduled execution every Monday at 00:00 UTC (`cron: "0 0 * * MON"`). This provides regular visual regression testing.
*   **Concurrency:** Ensures only one VR workflow runs per Git reference, canceling in-progress runs.

#### Jobs

*   **`vr_test`**

    *   **Runs on:** `ubuntu-latest`
    *   **Environment Variables:**

        *   `CYPRESS_ADMIN_USERNAME`: `ct-admin` - Specifies the username for the admin user in Cypress tests.
        *   `CYPRESS_ADMIN_PASSWORD`: `ct-admin` - Specifies the password for the admin user in Cypress tests.
        *   `PERCY_TOKEN`: Retrieved from GitHub secrets (`secrets.PERCY_TOKEN`). This token is required for Percy integration, a visual regression testing platform.  Store this in GitHub secrets for security.
    *   **Steps:**

        1.  **Checkout Code:** Checks out the repository code using `actions/checkout@v4`.

        ```yaml
        - uses: actions/checkout@v4
        ```

        2.  **Cache Dependencies:** Retrieves cache directories for Composer and npm to speed up subsequent workflow runs.

        ```yaml
        - name: Get composer cache directory
          id: composer-cache
          run: echo "dir=$(composer config cache-dir)" >> $GITHUB_OUTPUT
        - uses: actions/cache@v4
          id: composer-cache-cache
          with:
            path: ${{ steps.composer-cache.outputs.dir }}
            key: ${{ runner.os }}-composer-${{ hashFiles('**/composer.lock') }}
            restore-keys: |
              ${{ runner.os }}-composer-
        - name: Get npm cache directory
          id: npm-cache
          shell: bash
          run: |
            echo "::set-output name=npm_cache::$(npm config get cache)"
        - uses: actions/cache@v4
          id: npm-cache-cache
          with:
            path: ${{ steps.npm-cache.outputs.npm_cache }}
            key: ${{ runner.os }}-npm-${{ hashFiles('**/package-lock.json') }}
            restore-keys: |
              ${{ runner.os }}-npm-
        ```

### Workflow: Clean Platform.sh env on PR Close

*   **Name:** Clean Platform.sh env on PR Close
*   **Purpose:** Cleans up Platform.sh environments when a pull request is closed. This helps to prevent the accumulation of unnecessary environments and saves resources.
*   **Triggers:** `pull_request` of type `closed`.  This ensures the workflow is triggered only when a pull request is closed.

#### Jobs

*   **`on-pr-close`**

    *   **Runs on:** `ubuntu-latest`
    *   **Steps:**

        1.  **Clean Platform.sh Environment:** Cleans the Platform.sh environment using `axelerant/platformsh-action@v1`.

        ```yaml
        - name: Clean Platform.sh environment
          uses: axelerant/platformsh-action@v1
          with:
            action: 'clean-pr-env'
            project-id: 'brbqplxd7ycq6'
            cli-token: ${{ secrets.PLATFORMSH_CLI_TOKEN }}
        ```

        *   `action`: `clean-pr-env` - Specifies the action to perform, which is cleaning the Platform.sh environment associated with the pull request.
        *   `project-id`: `brbqplxd7ycq6` - The Platform.sh project ID.
        *   `cli-token`: Retrieved from GitHub secrets (`secrets.PLATFORMSH_CLI_TOKEN`).  This token is required to authenticate with the Platform.sh API.  Store this in GitHub secrets for security.

### Workflow: Cypress Tests

*   **Name:** Cypress Tests
*   **Purpose:** Executes Cypress end-to-end tests. These tests verify the functionality of the application from a user's perspective.
*   **Triggers:** `schedule`: Scheduled execution every Sunday at 00:00 UTC (`cron: "0 0 * * 0"`). This allows for regular end-to-end testing.

#### Jobs

*   **`cypress_tests`**

    *   **Runs on:** `ubuntu-latest`
    *   **Environment Variables:**

        *   `CYPRESS_ADMIN_USERNAME`: `ct-admin` - Specifies the username for the admin user in Cypress tests.
        *   `CYPRESS_ADMIN_PASSWORD`: `ct-admin` - Specifies the password for the admin user in Cypress tests.
    *   **Steps:**

        1.  **Checkout Code:** Checks out the repository code using `actions/checkout@v4`.

        ```yaml
        - uses: actions/checkout@v4
        ```

        2.  **Setup DDEV:** Sets up DDEV using `ddev/github-action-setup-ddev@v1`.

        ```yaml
        - name: Setup DDEV
          uses: ddev/github-action-setup-ddev@v1
          with:
            autostart: false
        ```

        *   `autostart`: `false` - Prevents DDEV from automatically starting, allowing for custom configuration before starting.

        3.  **Configure and Start DDEV:** Configures the Platform.sh token in DDEV, starts DDEV, installs Composer dependencies, and pulls the Platform.sh database.

        4.  **Navigate to Theme Directory:** Navigates to the `contribtrack` theme directory, likely for theme-specific tests.

## Security Considerations

*   **Secrets Management:**  Sensitive information like `PERCY_TOKEN` and `PLATFORMSH_CLI_TOKEN` are stored as GitHub secrets.  Ensure these secrets are properly managed and protected to prevent unauthorized access.
*   **Token Permissions:** Restrict the permissions of the `PLATFORMSH_CLI_TOKEN` to only the necessary actions for cleaning up environments.  Avoid granting overly broad permissions.

## Best Practices

*   **Workflow Documentation:**  Keep this documentation up-to-date as the CI/CD workflows evolve.
*   **Test Coverage:**  Strive for comprehensive test coverage to ensure code quality and prevent regressions.
*   **Monitoring and Logging:**  Monitor the execution of the CI/CD workflows to identify and address any issues promptly.  Review logs for errors and warnings.
*   **Incremental Improvements:** Regularly review and refine the CI/CD workflows to improve efficiency and effectiveness.

This documentation provides a comprehensive overview of the CI/CD configuration for this Drupal project. By following these guidelines, the development team can ensure code quality, automate deployment processes, and maintain a stable and reliable application.
```