# Custom Modules Documentation

This document provides an overview of the custom modules within the project, highlighting their functionality, dependencies, and configurations. This information is intended to help developers quickly understand the purpose and structure of each module.

## Module Details

### 1. `ct_user` Module

*   **Description:** Handles user-related processing in Contrib Tracker.
*   **Type:** Module
*   **Dependencies:** `social_auth:social_auth`
*   **Functionality:**
    *   **Routing:** Defines a route `/user/{current_user_id}/graph` to display contribution counts, handled by `\Drupal\ct_user\Controller\GetUserPatchesController::content`.  This route requires the "access content" permission.
    *   **Services:**
        *   `ct_user.ct_user_social_event_listener`: An event subscriber (`Drupal\ct_user\EventSubscriber\ContribTrackerEventListener`) that listens for events. It is injected with the `@logger.factory` service. This suggests the module responds to specific events within the application.
    *   **Theme:** Defines a theme function `contrib_graph`. This allows for customized rendering of contribution data, likely used in conjunction with the `/user/{current_user_id}/graph` route.
    *   **Help:** Implements `hook_help()` to provide help text for the module within the Drupal UI.
    *   **Form Alter:** Implements `hook_form_alter()` to modify forms, potentially including the user login form. This allows the module to customize form behavior and add/modify form elements.

### 2. `ct_reports` Module

*   **Description:** Generates reports based on contribution data.
*   **Type:** Module
*   **Functionality:**
    *   **Routing:** Defines a route `/contribution-count` handled by `\Drupal\ct_reports\Controller\ContributionCountController::content`. This route requires the "access content" permission.
    *   **Services:**
        *   `ct_reports.statistics`: A service (`Drupal\ct_reports\ContributionStatistics`) for generating contribution statistics. It is injected with `@entity_type.manager` and `@database` services. This service likely retrieves and processes entity data from the Drupal database.
    *   **Theme:** Defines a theme function `ct_reports_contribution_count` with variables `totalContributions`, `codeContributions`, and `totalContributors`. This theming allows for the customized presentation of contribution statistics.
    *   **Libraries:** Defines a library `ct-style` with CSS file `css/ct-style.css`. This handles the visual styling for elements within the module.

### 3. `ct_manager` Module

*   **Description:** Provides support for tracking contributions from various sources. This module likely acts as a central hub for managing contribution data from different platforms.
*   **Type:** Module
*   **Functionality:**
    *   **Services:**
        *   `logger.channel.ct_manager`: Defines a logger channel named `ct_manager`. This allows for focused logging of events specific to the contribution manager.
        *   `plugin.manager.contribution_plugin_manager`: A plugin manager (`Drupal\ct_manager\ContributionSourcePluginManager`) for contribution sources. This indicates a plugin-based architecture for supporting different contribution platforms (e.g., GitHub, Drupal.org).
        *   `ct_manager.contribution_storage`: A service (`Drupal\ct_manager\ContributionTrackerStorage`) for managing contribution data, injected with `@entity_type.manager` and `@logger.channel.ct_manager`. This service handles the persistence and retrieval of contribution information.
    *   **Cron:** Implements `hook_cron()` to process users for each contribution plugin and create queue items. This suggests that the module periodically fetches contribution data from external sources using a cron job.

### 4. `ct_github` Module

*   **Description:** Tracks user contributions from GitHub.
*   **Type:** Module
*   **Package:** Contrib Tracker
*   **Dependencies:** `ct_manager:ct_manager`
*   **Functionality:**
    *   **Services:**
        *   `ct_github.query`: A service (`Drupal\ct_github\GithubQuery`) for querying GitHub, injected with `@config.factory` and `@cache.data`. This service likely handles the communication with the GitHub API.
        *   `ct_github.loggerChannel`: Defines a logger channel named `ct_github`. This provides focused logging for GitHub-related events.
*   **Composer Dependencies:** `knplabs/github-api: ^3.0` This dependency allows the module to interact with the Github API.

### 5. `ct_drupal` Module

*   **Description:** Tracks user contributions from Drupal.org.
*   **Type:** Module
*   **Package:** Contrib Tracker
*   **Dependencies:** `ct_manager:ct_manager`, `do_username:do_username`
*   **Functionality:**
    *   **Services:**
        *   `logger.channel.ct_drupal`: Defines a logger channel named `ct_drupal`. This allows focused logging of Drupal.org-related events.
        *   `ct_drupal.client`: A service (`Drupal\ct_drupal\Client`) for interacting with Drupal.org, injected with `@ct_drupal.http_adapter`.
        *   `ct_drupal.http_adapter`: An HTTP adapter (`Http\Adapter\Guzzle7\Client`), injected with `@http_client`.  This clarifies the HTTP client used for communication with Drupal.org.
        *   `ct_drupal.retriever`: A service (`Drupal\ct_drupal\DrupalOrgRetriever`) for retrieving Drupal.org data, injected with `@ct_drupal.client` and `@cache.data`. This service retrieves data from Drupal.org and caches it.
*   **Composer Dependencies:** `hussainweb/drupal-api-client: ^2.0`, `drupal/do_username: ^2.0@alpha`, `drupal/slack: 1.x-dev` These dependencies allow the module to interact with the Drupal.org API, retrieve usernames from Drupal.org, and interact with Slack.

### 6. `contrib_tracker` Module

*   **Description:** Tracks contributions from Drupal.org. This description seems to overlap with the `ct_drupal` module; further investigation may be needed to clarify the distinct roles of each.
*   **Type:** Module
*   **Functionality:**
    *   **Services:**
        *   `logger.channel.contrib_tracker`: Defines a logger channel named `contrib_tracker`.
        *   `contrib_tracker.event_subscriber`: An event subscriber (`Drupal\contrib_tracker\EventSubscriber\RavenSubscriber`). This subscriber likely reports errors or exceptions to a service like Raven or Sentry.
    *   **Mail Alter:** Implements `hook_mail_alter()` to disable email sending in non-production Platform.sh environments. This prevents test emails from being sent in development environments.
    *   **Console Commands:**
        *   `contrib_tracker.contrib_tracker_issues_sanitise`: A console command (`Drupal\contrib_tracker\Command\IssuesSanitiseCommand`) for sanitizing issues, injected with `@contrib_tracker_storage`, `@entity_type.manager`, and `@database`. This command provides a tool for cleaning and standardizing issue data.