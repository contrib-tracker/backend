# Contribution Tracker Project Documentation

This document outlines the development practices and setup for the Contribution Tracker project, a Drupal application designed to manage community contributions, including code, events, and non-code contributions.

## Project Overview

The Contribution Tracker is a Drupal 8 application designed for managing community contributions. It tracks various types of contributions, including:

-   Code contributions
-   Event contributions
-   Non-code contributions

## Getting Started

### Prerequisites

Before you begin, ensure that you have the following:

-   The latest versions (or at least the minimum required versions) of necessary development tools (e.g., PHP, Node.js, Composer, DDEV).
-   An SSH key added to your GitHub account settings. The link to configure this is available in the original README file.

### Local Development Setup using DDEV

The project is configured for local development using DDEV. The `cypress-tests.yml` GitHub workflow uses `ddev/github-action-setup-ddev@v1` to set up and configure DDEV.

## Automated Tasks and Code Quality

The project uses GitHub Actions for automated tasks, ensuring code quality, performing visual regression testing, and managing environments.

### Code Quality Checks

The `ci.yml` workflow defines continuous integration checks. It uses `hussainweb/drupalqa-action@v2` to perform Drupal code quality checks, including:

-   phplint
-   yamllint
-   jsonlint
-   phpcs
-   phpmd
-   twigcs

Frontend code quality checks are also implemented using the `node:18` container, ensuring adherence to coding standards.

### Visual Regression Testing

The `vr.yml` workflow runs visual regression tests using Percy. It is triggered on:

-   Push to tags
-   Workflow dispatch
-   Scheduled cron jobs

The workflow sets up the following environment variables:

-   `CYPRESS_ADMIN_USERNAME`
-   `CYPRESS_ADMIN_PASSWORD`
-   `PERCY_TOKEN`

These variables are essential for authenticating and running the visual regression tests correctly.

### Cypress Tests

The `cypress-tests.yml` workflow executes Cypress tests on a schedule (daily at midnight on Sundays). Key steps include:

1.  Setting up the Drupal environment using DDEV.
2.  Installing dependencies via Composer.
3.  Running the Cypress tests.

The `PLATFORMSH_CLI_TOKEN` secret is configured as a global DDEV configuration variable using `ddev config global`. This token is necessary for authenticating with Platform.sh.

### Platform.sh Environment Management

The `pr-close.yml` workflow cleans up Platform.sh environments when a pull request is closed. It uses the `axelerant/platformsh-action@v1` action for environment cleanup.

-   **Authentication:** Requires the `PLATFORMSH_CLI_TOKEN` secret to authenticate with Platform.sh. The secret needs to be set up in the GitHub repository settings.