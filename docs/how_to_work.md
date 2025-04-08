# Contribution Tracker: Developer Onboarding Guide

This document provides a comprehensive guide to setting up and developing the Contribution Tracker Drupal application. It outlines the necessary prerequisites, development environment setup, contribution guidelines, automated testing, continuous integration, and Platform.sh integration.

## Prerequisites

Before you begin, ensure the following prerequisites are met:

*   **GitHub Account:** You must have a GitHub account and have added your SSH key to your account settings. This is required for cloning the repository and contributing to the project.
*   **Development Tools:** The following tools are essential for developing the Contribution Tracker:
    *   **Composer:**  PHP dependency manager.
    *   **DDEV:**  Docker-based local development environment.
    *   **Node.js:** JavaScript runtime environment (version 20 recommended).

    *Note:* It is highly recommended to check the project's Continuous Integration (CI) configurations (specifically, the `.github/workflows` directory) for any specific version requirements for these tools.

## Development Setup

Follow these steps to set up the development environment:

1.  **Clone the Repository:**  Clone the Contribution Tracker repository to your local machine using Git:

    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

2.  **Install Dependencies with DDEV:**  Use DDEV to configure the Drupal environment and install project dependencies:

    ```bash
    ddev start
    ddev composer install
    ```

    Refer to the `.github/workflows/cypress-tests.yml` workflow file for detailed instructions on configuring DDEV and setting the Platform.sh token for installation.

3.  **Environment Variables:** The `CYPRESS_ADMIN_USERNAME` and `CYPRESS_ADMIN_PASSWORD` environment variables are required for running Cypress tests. These variables are defined in the `.github/workflows/cypress-tests.yml` workflow. You can set the same in your `.ddev/config.yaml` file.

## Contribution Guidelines

The Contribution Tracker application is to log and manage contributions from team members. These contributions can include:

*   Code contributions (e.g. commits, pull requests)
*   Event contributions
*   Non-code contributions (e.g. documentation, design)

Consult the project's contribution guidelines for detailed information on how to contribute effectively.

## Automated Testing

The Contribution Tracker project utilizes comprehensive automated tests to ensure code quality and prevent regressions.

*   **Cypress Tests:**  End-to-end tests are implemented using Cypress. The `cypress-tests.yml` workflow defines the Cypress test execution.  The necessary environment variables, including `CYPRESS_ADMIN_USERNAME` and `CYPRESS_ADMIN_PASSWORD`, must be configured for Cypress to run correctly. Cypress tests run on a schedule.

*   **Visual Regression Tests:**  Visual Regression tests are implemented via the GitHub workflow `vr.yml`. Percy.io is used. The relevant `PERCY_TOKEN` is stored as a secret and configured in GitHub. Visual regression tests run on tags and on a schedule.

*   **CI Code Quality Checks:**  The `ci.yml` workflow performs automated code quality checks to enforce coding standards and identify potential issues. These checks are performed using `hussainweb/drupalqa-action@v2`, which includes:
    *   PHP code style checking
    *   YAML linting
    *   JSON linting
    *   Twig linting

    Frontend code quality checks are also performed using Node.js version 20. The CI workflow runs on pushes to the `main` branch and on all pull requests.

## Continuous Integration (CI)

The project leverages GitHub Actions workflows for continuous integration:

*   **CI (`ci.yml`):** Executes code quality checks on every push to the `main` branch and on each pull request.
*   **Cypress Tests (`cypress-tests.yml`):** Runs Cypress end-to-end tests on a scheduled basis.
*   **VR (`vr.yml`):** Executes visual regression tests on tags and on a scheduled basis.
*   **PR Close (`pr-close.yml`):**  This workflow is triggered when a pull request is closed ("types" includes "closed"). It uses the `axelerant/platformsh-action@v1` action with the `PLATFORMSH_CLI_TOKEN` to clean up Platform.sh environments associated with completed pull requests.

## Platform.sh Integration

The Contribution Tracker is integrated with Platform.sh. This integration likely includes hosting and deployment automation.

*   **Platform.sh Environment Management:** The `pr-close.yml` workflow demonstrates how Platform.sh environments are cleaned up when pull requests are closed, ensuring efficient resource usage. The `axelerant/platformsh-action@v1` GitHub Action is used for this purpose, authenticating with the `PLATFORMSH_CLI_TOKEN`.

*   **Platform.sh Token:** The `cypress-tests.yml` workflow shows how to set the Platform.sh token within the DDEV environment for testing purposes.

*   **Project ID** The Platform.sh project ID is `brbqplxd7ycq6`.