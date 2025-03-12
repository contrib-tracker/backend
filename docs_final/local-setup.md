# Contribution Tracker - Local Development Environment Setup

This document outlines the steps to set up a local development environment for the Contribution Tracker project. Following these instructions will allow you to contribute effectively and efficiently.

## Prerequisites

Before you begin, ensure you have the following tools installed and configured:

*   **Composer:**  The latest version is recommended for dependency management.  Download and install from [https://getcomposer.org/](https://getcomposer.org/).
*   **Git:**  Required for version control and accessing the project repository.  Ensure you have an SSH key configured for GitHub access.  See [https://docs.github.com/en/authentication/connecting-to-github-with-ssh](https://docs.github.com/en/authentication/connecting-to-github-with-ssh) for guidance.
*   **DDEV:**  DDEV is used to containerize the local development environment. Instructions available here [https://ddev.readthedocs.io/en/stable/](https://ddev.readthedocs.io/en/stable/)

## DDEV Configuration

This project utilizes DDEV for a simplified and consistent local development experience. The project includes a `.ddev/config.yaml` file containing predefined configurations.

```yaml
{
  "name": "contribtracker",
  "type": "drupal10",
  "docroot": "web",
  "php_version": "8.3",
  "webserver_type": "nginx-fpm",
  "router_http_port": "80",
  "router_https_port": "443",
  "xdebug_enabled": false,
  "additional_hostnames": [],
  "additional_fqdns": [],
  "database": {
    "type": "mariadb",
    "version": "11.4"
  },
  "use_dns_when_possible": true,
  "composer_version": "",
  "web_environment": [
    "PLATFORM_ENVIRONMENT=main",
    "PLATFORM_PROJECT=brbqplxd7ycq6"
  ],
  "corepack_enable": false,
  "ddev_version_constraint": ">= 1.23.3",
  "nodejs_version": "20"
}
```

### Key DDEV Configuration Details

*   **name:** `contribtracker` -  The name of the DDEV project.  This will be used in DDEV commands.
*   **type:** `drupal10` - Specifies that this is a Drupal 10 project, configuring DDEV with Drupal-specific settings.
*   **docroot:** `web` -  The web root directory for the Drupal installation.  All publicly accessible files are located here.
*   **php\_version:** `8.3` -  The PHP version used by the DDEV container.  Ensure your development environment is using a compatible version.
*   **webserver\_type:** `nginx-fpm` -  Specifies Nginx with PHP-FPM as the web server.
*   **database:**  Configured to use `mariadb` version `11.4`.
*   **web\_environment:** These environment variables are set within the web container.  `PLATFORM_ENVIRONMENT` and `PLATFORM_PROJECT` may be important for integration with Platform.sh.
*   **nodejs\_version:** `20` - The Node.js version used within the DDEV container.

### Starting the DDEV Environment

1.  Navigate to the project root directory in your terminal.
2.  Run `ddev start`.  This will build and start the DDEV containers based on the `.ddev/config.yaml` file.
3.  Once DDEV is running, you can access the site at the URLs displayed in the `ddev start` output (typically something like `https://contribtracker.ddev.site` and `http://contribtracker.ddev.site`).

## Local Settings Configuration

To enable local development-specific settings (such as debugging and disabling caching), follow these steps:

1.  **Copy the example settings file:**
    ```bash
    cp web/sites/example.settings.local.php web/sites/default/settings.local.php
    ```

2.  **Enable the local settings file:** Edit `web/sites/default/settings.php`. Find the section that includes `settings.local.php` and uncomment the lines, typically:

    ```php
    if (file_exists(__DIR__ . '/settings.local.php')) {
      include __DIR__ . '/settings.local.php';
    }
    ```

The `settings.local.php` file is now active.  You can modify this file to override default settings for local development, such as enabling assertions, development modules, or disabling caching.  **Important:**  Do not commit changes to `web/sites/default/settings.php` with the include statement commented out.