# Contribution Tracker: Local Development Environment Setup

This document details the setup of a local development environment for the Contribution Tracker project using DDEV. Following these steps ensures a consistent and efficient development experience.

## Prerequisites

Before proceeding, ensure the following tools are installed and configured on your system:

*   **DDEV:** (Latest version recommended)
*   **Docker:** (Required by DDEV)
*   **PHP:** (Version 8.3 or higher is recommended, but managed by DDEV)
*   **Node.js:** (Version 18, managed by DDEV) 
*   **Git:** (Latest version recommended)
*   **SSH Key:**  Ensure your SSH key is added to your GitHub account settings (see [GitHub documentation](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-)).

## DDEV Configuration

The project utilizes DDEV for simplified local environment management. The core configuration is defined in the `.ddev/config.yaml` file.

### `.ddev/config.yaml` Details

```yaml
name: contribtracker
type: drupal10
docroot: web
php_version: "8.3"
webserver_type: nginx-fpm
router_http_port: "80"
router_https_port: "443"
mariadb_version: "11.4"
additional_hostnames: []
additional_fqdns: []
upload_dir: sites/default/files
xdebug_enabled: false
web_environment:
  - PLATFORM_ENVIRONMENT=main
  - PLATFORM_PROJECT=brbqplxd7ycq6
nodejs_version: "18"
```

**Explanation:**

*   **name:** `contribtracker` -  The name of the DDEV project.
*   **type:** `drupal10` - Specifies that this is a Drupal 10 project.
*   **docroot:** `web` -  The document root directory for the Drupal installation.
*   **php\_version:** `"8.3"` - The PHP version to use.
*   **webserver\_type:** `nginx-fpm` - The web server type (Nginx with FPM).
*   **router\_http\_port:** `"80"` - The HTTP port for the router.
*   **router\_https\_port:** `"443"` - The HTTPS port for the router.
*   **mariadb\_version:** `"11.4"` - The MariaDB version for the database.
*   **web\_environment:**
    *   `PLATFORM_ENVIRONMENT=main` -  Defines the environment as "main."
    *   `PLATFORM_PROJECT=brbqplxd7ycq6` - Specifies the Platform.sh project ID.
*   **nodejs\_version:** `"18"` -  The Node.js version to use.

### Starting the Environment

To start the local environment, navigate to the project root directory (the directory containing the `.ddev` folder) and run:

```bash
ddev start
```

This command will build and start the necessary Docker containers based on the configuration in `.ddev/config.yaml`.

## Local Settings Override (`settings.local.php`)

To customize settings for local development (e.g., database credentials, enabling development modules), use the `settings.local.php` file.

### Steps:

1.  **Copy the template:** Copy `web/sites/example.settings.local.php` to `web/sites/default/settings.local.php`. If you are using a site name in the path (e.g., a multi-site installation), copy it to `web/sites/example.com/settings.local.php` instead.  Make sure to create the `web/sites/default` directory if it doesn't exist.

    ```bash
    cp web/sites/example.settings.local.php web/sites/default/settings.local.php
    ```

    or

     ```bash
    cp web/sites/example.settings.local.php web/sites/example.com/settings.local.php
    ```

2.  **Enable the include:**  Uncomment the lines that include `settings.local.php` in `web/sites/default/settings.php` (or `web/sites/example.com/settings.php` if using a multi-site).

    ```php
    if (file_exists(__DIR__ . '/settings.local.php')) {
      include __DIR__ . '/settings.local.php';
    }
    ```

### Purpose

The `settings.local.php` file is intended for:

*   Overriding default settings for local development.
*   Specifying database credentials for your local database.
*   Enabling development-focused modules (e.g., Devel).
*   Configuring assertions to catch incorrect API calls during development.