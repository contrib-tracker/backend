# Understanding Drupal.org Contribution Tracking with ct_drupal

**Overview**

The `ct_drupal` module for Drupal is designed to track user contributions on Drupal.org.  It leverages the Drupal.org API to fetch contribution data and store it within the Drupal site, linking contributions to specific user accounts. This explanation delves into the module's core components and how it facilitates contribution tracking.

**Key Features**

*   **Contribution Tracking:** The primary function is to monitor and record contributions made by users on Drupal.org.
*   **User Integration:** It associates Drupal.org usernames with local Drupal user accounts, enabling accurate contribution tracking for each user.
*   **API Integration:** It utilizes the Drupal.org API (wrapped by a Guzzle 6 dependency) to retrieve contribution data.

**Module Components and Their Roles**

1.  **`DrupalContribution.php` (ContributionSource Plugin):**

    *   Located at `web/modules/custom/ct_drupal/src/Plugin/ContributionSource/DrupalContribution.php`.
    *   Implements the `ContributionSourceInterface` from the `ct_manager` module.
    *   Acts as the core plugin responsible for interacting with the Drupal.org API.
    *   It is through this plugin the `ct_manager` module knows how to fetch contribution data from Drupal.org.

2.  **`DrupalRetriever.php`:**

    *   Located at `web/modules/custom/ct_drupal/src/DrupalRetriever.php`.
    *   Transforms the raw data received from the Drupal.org API into a format that can be understood and processed by the rest of the contribution tracking system.
    *   Responsible for data mapping and object creation tailored to local contribution definitions.

**How Contribution Tracking Works**

1.  **User Configuration:**  Administrators must populate the "Drupal.org Username" field on user profiles within the Drupal site. This establishes the link between the Drupal user and their Drupal.org account.
2.  **Cron Processing:** During cron runs, the system identifies users with a Drupal.org username configured.
3.  **Data Retrieval:** For each identified user, the `DrupalContribution` plugin is invoked.  This plugin interacts with the Drupal.org API.
4. **Data Transformation:** The raw API data is then handled by `DrupalRetriever.php` which tranforms the API results into an object that is understood by the system.
5.  **Contribution Storage:** The fetched and transformed contribution data is stored and managed by the `ct_manager` module, allowing for reporting and analysis.

**Dependencies**

The module has external dependencies managed through Composer. Specifically, it relies on a PHP package for interacting with the Drupal.org API.  The module provides a `composer.json` to declare this dependency, and sites that enable the module should declare it's path as a respository.

**Relationship with `ct_manager`**

The `ct_drupal` module functions as a plugin for the `ct_manager` module. The plugin provides a way for the contribution manager module to retrieve contributions from Drupal.org. This is thanks to the plugin implementing `ContributionSourceInterface`. This implies that `ct_manager` offers generic contribution management capabilities, and ct_drupal provides Drupal.org-specific data retrieval within that framework.

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

**Original Source:** ct_drupal