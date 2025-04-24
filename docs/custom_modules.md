# Contrib Tracker Project - Custom Modules Documentation

This document provides a comprehensive overview of the custom modules developed for the Contrib Tracker project. It aims to facilitate onboarding for new developers and serve as a reference for existing team members.

## Module Overview

The Contrib Tracker project utilizes several custom modules to manage and track contributions within the Drupal ecosystem. These modules are designed to work together to provide a cohesive and efficient contribution tracking system.

## Module Details

### 1. Contrib Tracker Module (`contrib_tracker`)

*   **Description:** This module serves as the foundation for the Contrib Tracker project, providing core functionality related to contribution tracking.  See [`contrib_tracker.info.yml`](/tmp/d00dc975-a6f4-4ecb-a34e-7a8986489f59/repo-dir/web/modules/custom/contrib_tracker/contrib_tracker.info.yml).

*   **Functionality:**

    *   **Email Management:**  Disables email sending in non-production Platform.sh environments using `hook_mail_alter()`. This prevents accidental email delivery during development and testing. See [`contrib_tracker.module`](/tmp/d00dc975-a6f4-4ecb-a34e-7a8986489f59/repo-dir/web/modules/custom/contrib_tracker/contrib_tracker.module).

*   **Services:**

    *   `logger.channel.contrib_tracker`:  Provides a dedicated logger channel for the module. This allows for easy filtering and monitoring of module-specific log messages.  See [`contrib_tracker.services.yml`](/tmp/d00dc975-a6f4-4ecb-a34e-7a8986489f59/repo-dir/web/modules/custom/contrib_tracker/contrib_tracker.services.yml).
    *   `contrib_tracker.event_subscriber`: Registers the `Drupal\contrib_tracker\EventSubscriber\RavenSubscriber` event subscriber. Event subscribers allow the module to react to specific system events. See [`contrib_tracker.services.yml`](/tmp/d00dc975-a6f4-4ecb-a34e-7a8986489f59/repo-dir/web/modules/custom/contrib_tracker/contrib_tracker.services.yml).

*   **Drush Command:**

    *   `contrib_tracker.contrib_tracker_issues_sanitise`:  A Drush command for sanitizing issues data. This command likely performs data cleaning or formatting tasks on issue records. See [`console.services.yml`](/tmp/d00dc975-a6f4-4ecb-a34e-7a8986489f59/repo-dir/web/modules/custom/contrib_tracker/console.services.yml).

### 2. Contrib Tracker Users Module (`ct_user`)

*   **Description:** Manages user-related processes within the Contrib Tracker system.  See [`ct_user.info.yml`](/tmp/d00dc975-a6f4-4ecb-a34e-7a8986489f59/repo-dir/web/modules/custom/ct_user/ct_user.info.yml).

*   **Dependencies:** `social_auth` - This module relies on the `social_auth` module, suggesting integration with social login providers.

*   **Functionality:**

    *   **Theme:** Provides the `contrib_graph` theme, likely used for visualizing contribution data.  See [`ct_user.module`](/tmp/d00dc975-a6f4-4ecb-a34e-7a8986489f59/repo-dir/web/modules/custom/ct_user/ct_user.module).
    *   **Help Text:** Implements `hook_help` to provide context-sensitive help text within the Drupal administration interface. Checks for the route `help.page.ct_user`.  See [`ct_user.module`](/tmp/d00dc975-a6f4-4ecb-a34e-7a8986489f59/repo-dir/web/modules/custom/ct_user/ct_user.module).
    *   **Form Alterations:** Implements `hook_form_alter` to modify forms, specifically targeting the `user_login_form`. This allows for customization of the login process. See [`ct_user.module`](/tmp/d00dc975-a6f4-4ecb-a34e-7a8986489f59/repo-dir/web/modules/custom/ct_user/ct_user.module).

*   **Routing:**

    *   `ct_user.graph`: Defines a route `/user/{current_user_id}/graph` that displays a "Contribution Count" graph for the current user. The controller `\Drupal\ct_user\Controller\GetUserPatchesController::content` handles the request, and users must have the "access content" permission to view it.  See [`ct_user.routing.yml`](/tmp/d00dc975-a6f4-4ecb-a34e-7a8986489f59/repo-dir/web/modules/custom/ct_user/ct_user.routing.yml).

*   **Services:**

    *   `ct_user.ct_user_social_event_listener`: Registers an event subscriber, `Drupal\ct_user\EventSubscriber\ContribTrackerEventListener`. This subscriber likely listens for social authentication events and performs actions related to contribution tracking. It depends on the `@logger.factory` service. See [`ct_user.services.yml`](/tmp/d00dc975-a6f4-4ecb-a34e-7a8986489f59/repo-dir/web/modules/custom/ct_user/ct_user.services.yml)

### 3. Contrib Tracker Reports Module (`ct_reports`)

*   **Description:** Generates reports based on the contribution data collected by the system.  See [`ct_reports.info.yml`](/tmp/d00dc975-a6f4-4ecb-a34e-7a8986489f59/repo-dir/web/modules/custom/ct_reports/ct_reports.info.yml).

*   **Functionality:**

    *   **Theme:** Provides the `ct_reports_contribution_count` theme, presumably for rendering contribution count reports.  See [`ct_reports.module`](/tmp/d00dc975-a6f4-4ecb-a34e-7a8986489f59/repo-dir/web/modules/custom/ct_reports/ct_reports.module).

*   **Routing:**

    *   `ct_reports.count`: Defines a route `/contribution-count` that displays a general "Contribution Count" report. The controller `\Drupal\ct_reports\Controller\ContributionCountController::content` handles the request, and users must have the "access content" permission.  See [`ct_reports.routing.yml`](/tmp/d00dc975-a6f4-4ecb-a34e-7a8986489f59/repo-dir/web/modules/custom/ct_reports/ct_reports.routing.yml).

*   **Services:**

    *   `ct_reports.statistics`: Defines a service `Drupal\ct_reports\ContributionStatistics` responsible for calculating contribution statistics. It utilizes the `@entity_type.manager` and `@database` services. See [`ct_reports.services.yml`](/tmp/d00dc975-a6f4-4ecb-a34e-7a8986489f59/repo-dir/web/modules/custom/ct_reports/ct_reports.services.yml).

*   **Libraries:**

    *   `ct-style`: Defines a library containing the `css/ct-style.css` stylesheet. This library likely provides the visual styling for the contribution reports. See [`ct_reports.libraries.yml`](/tmp/d00dc975-a6f4-4ecb-a34e-7a8986489f59/repo-dir/web/modules/custom/ct_reports/ct_reports.libraries.yml).

### 4. Contribution Tracker Manager Module (`ct_manager`)

*   **Description:** Provides the underlying framework for managing contributions from various sources.  See [`ct_manager.info.yml`](/tmp/d00dc975-a6f4-4ecb-a34e-7a8986489f59/repo-dir/web/modules/custom/ct_manager/ct_manager.info.yml).

*   **Functionality:**

    *   **ContributionSource Plugin Type:** Defines the `ContributionSource` plugin type, allowing for the creation of plugins that fetch contribution data from different sources (e.g., GitHub, Drupal.org).  See [`README.md`](/tmp/d00dc975-a6f4-4ecb-a34e-7a8986489f59/repo-dir/web/modules/custom/ct_manager/README.md).
    *   **Cron Processing:**  Processes users on cron runs to track and store contributions from configured sources.  See [`README.md`](/tmp/d00dc975-a6f4-4ecb-a34e-7a8986489f59/repo-dir/web/modules/custom/ct_manager/README.md).
    *   **Cron Hook:** Implements `hook_cron()` to queue users for contribution processing for each plugin implementation.  See [`ct_manager.module`](/tmp/d00dc975-a6f4-4ecb-a34e-7a8986489f59/repo-dir/web/modules/custom/ct_manager/ct_manager.module).

*   **Services:**

    *   `logger.channel.ct_manager`: Creates a dedicated logger channel for the module.  See [`ct_manager.services.yml`](/tmp/d00dc975-a6f4-4ecb-a34e-7a8986489f59/repo-dir/web/modules/custom/ct_manager/ct_manager.services.yml).
    *   `plugin.manager.contribution_plugin_manager`: Defines a plugin manager for `ContributionSource` plugins. This service handles the discovery and instantiation of available contribution source plugins. See [`ct_manager.services.yml`](/tmp/d00dc975-a6f4-4ecb-a34e-7a8986489f59/repo-dir/web/modules/custom/ct_manager/ct_manager.services.yml).
    *   `ct_manager.contribution_storage`: Defines a service `Drupal\ct_manager\ContributionTrackerStorage` for managing the storage of contribution data. It uses `@entity_type.manager` and `@logger.channel.ct_manager` services. See [`ct_manager.services.yml`](/tmp/d00dc975-a6f4-4ecb-a34e-7a8986489f59/repo-dir/web/modules/custom/ct_manager/ct_manager.services.yml).

### 5. Github Contribution Tracker Module (`ct_github`)

*   **Description:** Tracks contributions of users from GitHub. See [`ct_github.info.yml`](/tmp/d00dc975-a6f4-4ecb-a34e-7a8986489f59/repo-dir/web/modules/custom/ct_github/ct_github.info.yml).

*   **Dependencies:** `ct_manager` - This module relies on the `ct_manager` module to handle the overall contribution tracking framework.

*   **Functionality:**

    *   **GitHub ContributionSource Plugin:** Provides a `ContributionSource` plugin that uses the GitHub GraphQL API to track contributions.  It also provides functionality for storing users' GitHub usernames. See [`README.md`](/tmp/d00dc975-a6f4-4ecb-a34e-7a8986489f59/repo-dir/web/modules/custom/ct_github/README.md).
    *   **User Processing on Cron:** Fetches users with the "Github Username" field set and tracks their latest contributions during cron runs. See [`README.md`](/tmp/d00dc975-a6f4-4ecb-a34e-7a8986489f59/repo-dir/web/modules/custom/ct_github/README.md).

*   **Composer Dependencies:** `knplabs/github-api` - This module requires the `knplabs/github-api` library for interacting with the GitHub API. See [`composer.json`](/tmp/d00dc975-a6f4-4ecb-a34e-7a8986489f59/repo-dir/web/modules/custom/ct_github/composer.json).

*   **Services:**

    *   `ct_github.query`: Defines a service `Drupal\ct_github\GithubQuery` for querying the GitHub API. It utilizes the `@config.factory` and `@cache.data` services for configuration and caching. See [`ct_github.services.yml`](/tmp/d00dc975-a6f4-4ecb-a34e-7a8986489f59/repo-dir/web/modules/custom/ct_github/ct_github.services.yml).
    *   `ct_github.loggerChannel`: Creates a dedicated logger channel for the module. See [`ct_github.services.yml`](/tmp/d00dc975-a6f4-4ecb-a34e-7a8986489f59/repo-dir/web/modules/custom/ct_github/ct_github.services.yml).

### 6. Drupal.org Contribution Tracker Module (`ct_drupal`)

*   **Description:** Tracks contributions of users from Drupal.org. See [`ct_drupal.info.yml`](/tmp/d00dc975-a6f4-4ecb-a34e-7a8986489f59/repo-dir/web/modules/custom/ct_drupal/ct_drupal.info.yml).

*   **Dependencies:** `ct_manager`, `do_username` -  This module depends on `ct_manager` for the contribution tracking