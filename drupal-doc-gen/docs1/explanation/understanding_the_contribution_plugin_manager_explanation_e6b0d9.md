# Understanding the Contribution Plugin Manager

**Introduction**

The Contribution Plugin Manager module (ct_manager) provides a flexible way to track and manage user contributions from various sources within a Drupal environment. It allows you to create custom plugins, each responsible for fetching contribution data from a specific origin (e.g., GitHub, GitLab, internal systems). It then processes this data, stores relevant information, and optionally sends notifications about recent contributions, for example, via Slack.

**Core Functionality**

At its heart, ct_manager automates the process of gathering, storing, and reporting on user contributions by performing the following steps during a cron run:

1.  **Plugin Discovery:** The module identifies all installed plugins of the `ContributionSource` type. These plugins define how to interact with specific contribution sources.
2.  **Plugin Instantiation:**  It creates an instance of each discovered `ContributionSource` plugin.
3.  **User Processing:**  It then adds users to a queue, which it processes in order to track and store contributions for each user from all configured sources.
4.  **Contribution Tracking:** For each user, the module uses the `ContributionSource` plugins to retrieve contribution data.
5.  **Storage:** Contribution data is stored within the Drupal system (the exact storage mechanism is not specified, but could involve entities, custom tables, etc.).
6.  **Notification (Optional):** Optionally, ct\_manager can send notifications (e.g., to a Slack channel) about contributions made within a recent time period (e.g., the last hour).

**Plugin Architecture**

The extensibility of ct\_manager comes from its plugin-based architecture. New contribution sources can be added without modifying the core module code.

*   **`ContributionSource` Plugin Type:** The module uses Drupal's Plugin API to define a specific plugin type called `ContributionSource`.
*   **Plugin Implementation:** To create a new contribution source, a plugin must:
    *   Reside in the `src/Plugin/ContributionSource` directory of your module.
    *   Be annotated with `@ContributionSource`.
    *   Implement the `ContributionSourceInterface`. This interface defines the methods that the core ct\_manager module will use to interact with the plugin.
    *   Follow patterns demonstrated in the `ct_github` module example for creating plugins.

**Key Components**

*   **`ct_manager.module`:** This file executes the main logic during cron runs. It discovers plugins, creates instances of them, and enqueues users for processing.
*   **`ContributionSourceInterface.php`:** This interface defines the contract that all `ContributionSource` plugins must adhere to. It specifies the methods that the ct\_manager module will call on each plugin.
*   **`ProcessUsers.php`:** This file implements a Drupal QueueWorker plugin that processes the queue of users. For each user, it retrieves contribution data using the configured `ContributionSource` plugins.

**In Summary**

The Contribution Plugin Manager is designed to streamline the process of gathering, storing, and reporting user contributions across multiple platforms within a Drupal environment. Its plugin-based architecture enables extensibility and customization to support diverse contribution sources. Understanding its core functionality, plugin architecture, and key components will help developers effectively leverage and extend its capabilities.

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

**Original Source:** ct_manager