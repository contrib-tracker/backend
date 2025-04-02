# Contribution Tracker: Local Development Environment Setup

This document outlines the steps required to set up a local development environment for the Contribution Tracker Drupal application. Following these instructions will allow you to develop and test changes locally before deploying to a staging or production environment.

## Prerequisites

Before you begin, ensure you have the following tools installed and configured:

*   **Required Tools:** Verify that you are using the latest versions of all development tools, or at least the minimum versions specified in the project's primary documentation. Typically, this includes tools like Git, Composer, and Node.js.
*   **GitHub SSH Key:**  Ensure your SSH key is added to your GitHub account settings. This is necessary for cloning the repository and contributing changes. Refer to the official [GitHub documentation](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-) for detailed instructions.

## DDEV Configuration

This project leverages DDEV, a Docker-based local development environment tool, to simplify setup and ensure consistency across development environments. The DDEV configuration is defined in the `.ddev/config.yaml` file.  This file contains the following settings:

*   **Project Name:** `contribtracker`
*   **Drupal Version:** `drupal10`
*   **Document Root:** `web`
*   **PHP Version:** `8.3`
*   **Web Server:** `nginx-fpm`
*   **Router Ports:**
    *   HTTP: `80`
    *   HTTPS: `443`
*   **Database:** `mariadb` version `11.4`
*   **Environment Variables:**
    *   `PLATFORM_ENVIRONMENT=main`  (Specifies the Platform.sh environment)
    *   `PLATFORM_PROJECT=brbqplxd7ycq6` (Specifies the Platform.sh project ID)
*   **Node.js Version:** `20`

**To initialize your DDEV environment:**

1.  Navigate to the project root directory (where the `.ddev` folder is located) in your terminal.
2.  Run the command `ddev start`. This will build and start the Docker containers defined in the `.ddev/config.yaml` file.

## Local Settings Configuration

The `web/sites/example.settings.local.php` file provides the foundation for local development override configurations.  It allows you to customize settings specific to your local environment, such as database credentials, debugging options, and disabling caching.

**Configuration Steps:**

1.  **Copy and Rename:** Duplicate the `web/sites/example.settings.local.php` file and rename it to either:
    *   `web/sites/default/settings.local.php`  (for single-site Drupal installations)
    *   `web/sites/example.com/settings.local.php` (where `example.com` matches your site's folder name in the `web/sites` directory for multi-site installations)

2.  **Enable the Local Settings File:** Open the main `settings.php` file for your site (e.g., `web/sites/default/settings.php` or `web/sites/example.com/settings.php`).  Locate the lines that include `settings.local.php` and uncomment them:

    ```php
    if (file_exists(__DIR__ . '/settings.local.php')) {
      include __DIR__ . '/settings.local.php';
    }
    ```

3.  **Customize Settings:** Edit the `settings.local.php` file to configure settings relevant to your local development environment.  This file often includes configurations for:

    *   Enabling assertions (which enforce API expectations during development and help catch errors early).
    *   Configuring database credentials.  You can typically obtain these details by running `ddev describe` in your terminal within the project directory. Look for the `database` section to get the host, port, username, and password.
    *   Disabling caching for easier debugging and development.
    *   Configuring mail handling (e.g., using a mail catcher like MailHog or Mailtrap).

**Example Usage in `settings.local.php`:**

```php
$settings['container_yamls'][] = DRUPAL_ROOT . '/sites/development.services.yml';
$config['system.logging']['error_level'] = 'verbose';
$config['system.performance']['cache']['max_age'] = 0;
$config['system.performance']['css']['preprocess'] = FALSE;
$config['system.performance']['js']['preprocess'] = FALSE;
$settings['cache']['bins']['render'] = 'cache.backend.null';
$settings['cache']['bins']['dynamic_page_cache'] = 'cache.backend.null';
```

By following these steps, you will have a functional local development environment for the Contribution Tracker Drupal application, enabling you to contribute to the project effectively.