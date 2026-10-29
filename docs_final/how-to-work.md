```markdown
# Contribution Tracker Project Documentation

This document provides a comprehensive guide for developers contributing to the Contribution Tracker project. It outlines the development environment setup, contribution workflow, code quality standards, and relevant tools.

## Prerequisites

Before you begin, ensure you have the following:

*   **Tools:**
    *   [Composer](https://getcomposer.org/) (Latest Version): Used for managing PHP dependencies.
*   **SSH Key:**  An SSH key added to your [GitHub account settings](https://github.com/settings/keys). This is required for secure access to repositories.

## Development Setup

You can set up the project using either of the following methods:

*   **Gitpod:** A cloud-based development environment.  (Details on Gitpod setup not provided but this is the first recommended approach.)
*   **Local Setup:**  Using the tools described in the prerequisites.

## Contribution Workflow

The project utilizes both GitLab CI and GitHub Actions for automated tasks, ensuring code quality and streamlined deployments.

### GitLab CI (`.gitlab-ci.yml`)

GitLab CI automates build, linting, testing, and deployment processes.

*   **Stages:** The pipeline is divided into the following stages: `build`, `lint`, `test`, `deploy`.
*   **Code Quality Checks:** Employs the `hussainweb/drupalqa:php7.4` Docker image for code quality analysis:
    *   `composer validate`:  Validates the `composer.json` file.
    *   `phplint`:  Checks for PHP syntax errors.
    *   `phpcs`:  Enforces coding standards using PHP CodeSniffer.
    *   `phpmd`:  Performs static analysis of PHP code using PHP Mess Detector.
*   **Triggers:** The pipeline is triggered on pushes to the `master`, `theme`, `tags`, and `merge_requests` branches.

### GitHub Actions (`.github/workflows/`)

GitHub Actions are used for CI/CD, automated tasks, and integrations.

*   **VR (`.github/workflows/vr.yml`):**
    *   **Purpose:** Executes visual regression tests.
    *   **Triggers:** Tag pushes, manual workflow dispatch, and scheduled cron jobs.
    *   **Secrets:** Requires the `PERCY_TOKEN` secret for Percy integration.
*   **PR Close (`.github/workflows/pr-close.yml`):**
    *   **Purpose:** Cleans up Platform.sh environments when a pull request is closed.
    *   **Action:** Uses the `axelerant/platformsh-action@v1` action to interact with Platform.sh.
    *   **Secrets:** Requires the `PLATFORMSH_CLI_TOKEN` secret for authenticating with Platform.sh.
    *   **Project ID:** `brbqplxd7ycq6` (This is the Platform.sh project ID).
*   **Cypress Tests (`.github/workflows/cypress-tests.yml`):**
    *   **Purpose:** Runs Cypress end-to-end tests.
    *   **Schedule:** Executes tests on a weekly basis.
    *   **Local Development:** Leverages `ddev` for setting up a local development environment.
    *   **Configuration:** Sets `PLATFORMSH_CLI_TOKEN` as a global ddev configuration.
*   **CI (`.github/workflows/ci.yml`):**
    *   **Purpose:** Performs continuous integration tasks.
    *   **Triggers:** Pushes to the `main` branch or tags, and pull requests.
    *   **Drupal Code Quality:**  Utilizes the `hussainweb/drupalqa-action@v2` action for Drupal-specific code quality checks (which includes GrumPHP tasks).
    *   **Frontend Code Quality:**  Uses a Node.js (version 20) container for frontend code quality analysis.

## Code Quality

The project enforces strict code quality standards to maintain consistency and prevent errors.

*   **GitLab CI:** Performs linting and static analysis using `phplint`, `phpcs`, and `phpmd`. Refer to the `.gitlab-ci.yml` file for configuration details.
*   **GitHub Actions:** Employs the `hussainweb/drupalqa-action` which runs GrumPHP tasks including: `phplint`, `yamllint`, `jsonlint`, `phpcs`, `phpmd`, and `twigcs`.

## Dependencies

*   **PHP Dependencies:** Managed using Composer. The `composer.json` file (not included in this documentation, but it should be present in the repository root) defines the project's PHP dependencies.  Use `composer install` to install them.
*   **Node.js Dependencies:** Managed using npm or yarn. The `package.json` file (not included in this documentation, but it should be present if any front end code exists in the repository root) defines the project's Node.js dependencies.  Use `npm install` or `yarn install` to install them.

## Local Development Environment

[DDEV](https://ddev.readthedocs.io/en/stable/) is used to create and manage a local development environment.

*   **Setup:** `ddev` is configured and started during the Cypress tests workflow. Refer to the `.github/workflows/cypress-tests.yml` file for details.
*   **Dependency Installation:** Install PHP dependencies using `ddev composer install`.  This executes composer inside the DDEV container.
*   **Platform.sh Integration:** Pull the Platform.sh database into your local DDEV environment using the command: `ddev pull platform -y`.  This simplifies local testing with production data.