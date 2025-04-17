# Contribution Tracker - Technical Documentation

This documentation provides a comprehensive guide to setting up and working with the Contribution Tracker Drupal application. It covers core requirements, development environment setup, dependencies, and Continuous Integration/Continuous Deployment (CI/CD) pipelines.

## Tools & Prerequisites

This section outlines the tools and their configurations required for setting up the Contribution Tracker Drupal application.

### Core Requirements

*   **PHP:** Version 8.2 or higher, as specified in `composer.json`. For local development, PHP version 8.3 is configured within the `.ddev/config.yaml` file.
*   **Composer:**  PHP dependency management tool.  Install the latest version from [https://getcomposer.org/](https://getcomposer.org/).
*   **Node.js:** Version 20, as defined in `.ddev/config.yaml`.  Used for front-end asset management and tooling.  Installation instructions can be found at [https://nodejs.org/](https://nodejs.org/).

### Development Environment

*   **DDEV:** A Docker-based local development environment. The configuration is managed via the `.ddev/config.yaml` file.

    Key DDEV configuration parameters:
    *   `name`: `contribtracker` (Project name)
    *   `type`: `drupal10` (Drupal version)
    *   `database`: `mariadb:11.4` (MariaDB version)
    *   `webserver_type`: `nginx-fpm` (Webserver)

    To start the DDEV environment:

    ```bash
    ddev start
    ```
    Refer to the DDEV documentation for detailed setup instructions: [https://ddev.readthedocs.io/](https://ddev.readthedocs.io/)

*   **Gitpod:** A cloud-based development environment.  The presence of a Gitpod badge in the `README.md` indicates that the project is configured for Gitpod.  Access Gitpod via the badge or directly through the Gitpod website: [https://www.gitpod.io/](https://www.gitpod.io/)

## Dependencies

The project's dependencies are managed using Composer and defined in the `composer.json` file.  Run the following command to install all dependencies:

```bash
composer install
```

Key dependencies include:

*   `drupal/address`: "^2.0" - Provides address field and address format handling.
*   `drupal/admin_toolbar`: "^3.0.0" - Improves the Drupal administration experience.
*   `drupal/better_exposed_filters`: "^7.0" - Enhances Views exposed filters.
*   `drupal/ckeditor`: "^1.0" - Drupal's built-in WYSIWYG editor module.
*   `cweagans/composer-patches`: "^1.7.0" -  Allows applying patches to dependencies via Composer.
*   `composer/installers`: "^2.1" -  Custom installers for Composer.
*   `axelerant/ct_drupal`: (Custom Module) -  Project-specific Drupal module.
*   `axelerant/ct_github`: (Custom Module) -  Project-specific GitHub integration module.

## GitHub Actions

The project utilizes GitHub Actions for Continuous Integration and Continuous Deployment (CI/CD).  The workflow definitions are located in the `.github/workflows/` directory.

*   **CI (`ci.yml`):** Performs code quality checks on each push and pull request.  It uses the `hussainweb/drupalqa-action@v2` action, which includes the following checks:

    *   `phplint`: PHP syntax checker.
    *   `yamllint`: YAML linter.
    *   `jsonlint`: JSON linter.
    *   `phpcs`: PHP Code Sniffer (follows Drupal coding standards).
    *   `phpmd`: PHP Mess Detector.
    *   `twigcs`: Twig code sniffer.

*   **Cypress Tests (`cypress-tests.yml`):** Runs end-to-end tests using Cypress.  The workflow:

    1.  Sets up the DDEV environment.
    2.  Installs project dependencies.
    3.  Executes the Cypress tests.

    Environment variables `CYPRESS_ADMIN_USERNAME` and `CYPRESS_ADMIN_PASSWORD` are required for authentication within the Cypress tests.  These variables should be configured in the GitHub repository settings.

*   **Clean Platform.sh env on PR Close (`pr-close.yml`):** Deletes the Platform.sh environment associated with a pull request when the pull request is closed. It utilizes the `axelerant/platformsh-action@v1` action.

    Requires the `PLATFORMSH_CLI_TOKEN` secret to be configured in the GitHub repository settings.

*   **Visual Regression Tests (`vr.yml`):** Executes visual regression tests.  Likely utilizes Percy.io to compare visual renderings of the application.

    Requires the `PERCY_TOKEN` secret to be configured in the GitHub repository settings. This token is used to authenticate with Percy.