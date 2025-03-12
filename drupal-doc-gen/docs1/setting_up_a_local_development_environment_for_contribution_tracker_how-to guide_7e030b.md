# Setting up a Local Development Environment for Contribution Tracker

This guide walks you through setting up a local development environment for the Contribution Tracker Drupal application.

**Prerequisites:**

Before you begin, ensure you have the following tools installed and configured:

*   **Docker** or **OrbStack**:  Used for containerization.
*   **DDEV** (v1.23.3 or later):  A tool for local PHP development.
*   **Git**: For version control and cloning the repository.
*   **NodeJs**: for frontend asset management.

*Note*: It's recommended to have at least 8GB of RAM, ideally 16GB, for a smooth development experience.

**Steps:**

1.  **Clone the Repository:**

    Use Git to clone the Contribution Tracker repository to your local machine. Open your terminal and run:

    ```bash
    git clone git@github.com:contrib-tracker/backend.git
    ```

2.  **Navigate to the Project Directory:**

    Change your current directory to the cloned repository:

    ```bash
    cd backend
    ```

3.  **Start DDEV:**

    Start the DDEV environment. This will set up the necessary containers for your Drupal application.

    ```bash
    ddev start
    ```

    DDEV will output URLs to access the newly created instance once the setup is complete.

4.  **Install Composer Dependencies:**

    Use DDEV to run Composer and install the project's dependencies.

    ```bash
    ddev composer install
    ```

5.  **Pull the Database (Optional):**

    If you have access to the Platform.sh environment, you can pull a copy of the database:

    *   Ensure you have the `PLATFORMSH_CLI_TOKEN` environment variable set.  Refer to the [DDEV documentation](https://ddev.readthedocs.io/en/latest/users/providers/platform/) for instructions.

    *   Run the following command:

    ```bash
    ddev pull platform
    ```

---

**Dependencies and Tools:**

**NPM Dependencies:**
**Development Dependencies:**
- markdownlint-cli: ^0.44.0
- prettier: ^3.4.2
- remark-cli: ^12.0.1
- remark-preset-lint-markdown-style-guide: ^6.0.1
**Composer Dependencies:**
- php: >=8.2
- axelerant/ct_drupal: *
- axelerant/ct_github: *
- composer/installers: ^2.1
- cweagans/composer-patches: ^1.7.0
- drupal/address: ^2.0
- drupal/admin_toolbar: ^3.0.0
- drupal/better_exposed_filters: ^7.0
- drupal/ckeditor: ^1.0
- drupal/cookies: ^1.2
- drupal/core: ^10.1
- drupal/core-composer-scaffold: ^10.1
- drupal/do_username: ^2.0
- drupal/field_permissions: ^1.0.0
- drupal/fixed_block_content: ^1.1
- drupal/flag: ^4.0
- drupal/geocoder: ^4.0
- drupal/geofield: ^1.0
- drupal/gin: ^4.0.0@alpha
- drupal/google_tag: ^2.0
- drupal/inline_entity_form: ^3.0
- drupal/new_relic_rpm: ^2.0
- drupal/raven: ^6.0
- drupal/redis: ^1.4.0
- drupal/select2: ^1.13
- drupal/slack: ^1.2.0
- drupal/social_auth: ^4.0
- drupal/social_auth_google: ^4.0
- drupal/stable: ^2.0
- drupal/twig_tweak: ^3.1
- drush/drush: ^13.0
- geocoder-php/nominatim-provider: ^5.2
- npm-asset/jquery-ui-touch-punch: ^0.2.3
- oomphinc/composer-installers-extender: ^2.0
- platformsh/config-reader: ^3.0.0
- vlucas/phpdotenv: ^5.2
**Composer Development Dependencies:**
- axelerant/db-docker: ^1.1
- axelerant/drupal-quality-checker: ^1.4
- behat/mink: ^1.10
- behat/mink-browserkit-driver: ^2.1
- phpunit/phpunit: ^9.0
- symfony/browser-kit: ^7.0
- weitzman/drupal-test-traits: ^2.0

---

**Original Source:** Project README