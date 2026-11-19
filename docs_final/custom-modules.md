```markdown
# Custom Modules Documentation

This document provides a comprehensive overview of the custom modules within the project. It outlines each module's functionality, dependencies, and configurations to facilitate efficient onboarding for software engineers.

## Module Overview

| Module Name      | Description                                                  | Dependencies                                   |
| :--------------- | :----------------------------------------------------------- | :--------------------------------------------- |
| `ct_user`        | Handles user-related processing in Contrib Tracker.         | `social_auth:social_auth`                       |
| `ct_reports`     | Generates reports based on contribution data.              | None                                             |
| `ct_manager`     | Provides support for tracking contributions from various sources. | None                                             |
| `ct_github`      | Tracks user contributions from GitHub.                       | `ct_manager:ct_manager`                        |
| `ct_drupal`      | Tracks user contributions from Drupal.org.                   | `ct_manager:ct_manager`, `do_username:do_username` |
| `contrib_tracker` | Tracks contributions from Drupal.org.                       | None                                             |

## Module Details

### 1. `ct_user` Module

*   **Description:** Handles user-related processing in Contrib Tracker.
*   **Type:** Module
*   **Dependencies:** `social_auth:social_auth`

    This module requires the `social_auth` module to be enabled and configured.
*   **Routing:**

    Defines a route `/user/{current_user_id}/graph` to display contribution counts.

    *   **Controller:** `\Drupal\ct_user\Controller\GetUserPatchesController::content`
    *   **Permissions:** Requires "access content" permission.
*   **Services:**
    *   `ct_user.ct_user_social_event_listener`:
        *   **Class:** `Drupal\ct_user\EventSubscriber\ContribTrackerEventListener`
        *   **Description:** An event subscriber that listens for events related to social authentication.
        *   **Arguments:** `@logger.factory`
*   **Theme:**

    Defines a theme function `contrib_graph` for rendering contribution graphs.  Implementations should expect to receive appropriate variables to build dynamic graphs.
*   **Help:**

    Implements `hook_help()` to provide help text within the Drupal UI for this module. Navigate to `/admin/help/ct_user` to view the help contents.
*   **Form Alter:**

    Implements `hook_form_alter()` to modify forms, potentially including the user login form. Check the module file `ct_user.module`, for details on the altered form ID.

### 2. `ct_reports` Module

*   **Description:** Generates reports based on contribution data.
*   **Type:** Module
*   **Routing:**

    Defines a route `/contribution-count`.

    *   **Controller:** `\Drupal\ct_reports\Controller\ContributionCountController::content`
    *   **Permissions:** Requires "access content" permission.
*   **Services:**
    *   `ct_reports.statistics`:
        *   **Class:** `Drupal\ct_reports\ContributionStatistics`
        *   **Description:**  A service for generating contribution statistics.
        *   **Arguments:** `@entity_type.manager`, `@database`
*   **Theme:**

    Defines a theme function `ct_reports_contribution_count`.

    *   **Variables:**
        *   `totalContributions`: Total number of contributions.
        *   `codeContributions`: Number of code contributions.
        *   `totalContributors`: Total number of contributors.

*   **Libraries:**

    Defines a library `ct-style`.
    *   CSS file `css/ct-style.css`. This CSS file is responsible for styling the `ct_reports` output.

### 3. `ct_manager` Module

*   **Description:** Provides support for tracking contributions from various sources.
*   **Type:** Module
*   **Services:**
    *   `logger.channel.ct_manager`:
        *   **Description:** Defines a logger channel named `ct_manager`. Use this channel for logging events specific to the `ct_manager` module.  Example: `$this->logger->get('ct_manager')->info('Log message');`
    *   `plugin.manager.contribution_plugin_manager`:
        *   **Class:** `Drupal\ct_manager\ContributionSourcePluginManager`
        *   **Description:** A plugin manager for contribution sources.  This allows for extensible contribution tracking.
    *   `ct_manager.contribution_storage`:
        *   **Class:** `Drupal\ct_manager\ContributionTrackerStorage`
        *   **Description:** A service for managing contribution data.
        *   **Arguments:** `@entity_type.manager`, `@logger.channel.ct_manager`
*   **Cron:**
    *   Implements `hook_cron()` to process users for each contribution plugin and create queue items. This is likely used to regularly update contribution data.

### 4. `ct_github` Module

*   **Description:** Tracks user contributions from GitHub.
*   **Type:** Module
*   **Package:** Contrib Tracker
*   **Dependencies:** `ct_manager:ct_manager`

    This module requires the `ct_manager` module to be enabled.
*   **Services:**
    *   `ct_github.query`:
        *   **Class:** `Drupal\ct_github\GithubQuery`
        *   **Description:** A service for querying GitHub's API.
        *   **Arguments:** `@config.factory`, `@cache.data`
    *   `ct_github.loggerChannel`:
        *   **Description:** Defines a logger channel named `ct_github`.  Use this channel for logging events specific to the `ct_github` module.
*   **Composer Dependencies:** `knplabs/github-api: ^3.0`

    This module relies on the `knplabs/github-api` library.  Ensure it is installed via Composer: `composer require knplabs/github-api:^3.0`

### 5. `ct_drupal` Module

*   **Description:** Tracks user contributions from Drupal.org.
*   **Type:** Module
*   **Package:** Contrib Tracker
*   **Dependencies:** `ct_manager:ct_manager`, `do_username:do_username`

    This module requires the `ct_manager` and `do_username` modules to be enabled.
*   **Services:**
    *   `logger.channel.ct_drupal`:
        *   **Description:** Defines a logger channel named `ct_drupal`.  Use this channel for logging events specific to the `ct_drupal` module.
    *   `ct_drupal.client`:
        *   **Class:** `Drupal\ct_drupal\Client`
        *   **Description:** A service for interacting with Drupal.org.
        *   **Arguments:** `@ct_drupal.http_adapter`
    *   `ct_drupal.http_adapter`:
        *   **Class:** `Http\Adapter\Guzzle7\Client`
        *   **Description:** An HTTP adapter for making requests.
        *   **Arguments:** `@http_client`
    *   `ct_drupal.retriever`:
        *   **Class:** `Drupal\ct_drupal\DrupalOrgRetriever`
        *   **Description:** A service for retrieving Drupal.org data.
        *   **Arguments:** `@ct_drupal.client`, `@cache.data`
*   **Composer Dependencies:** `hussainweb/drupal-api-client: ^2.0`, `drupal/do_username: ^2.0@alpha`, `drupal/slack: 1.x-dev`

    This module relies on the following libraries. Ensure they are installed via Composer:

    *   `composer require hussainweb/drupal-api-client:^2.0`
    *   `composer require drupal/do_username:^2.0@alpha`
    *   `composer require drupal/slack:1.x-dev`

### 6. `contrib_tracker` Module

*   **Description:** Tracks contributions from Drupal.org.
*   **Type:** Module
*   **Services:**
    *   `logger.channel.contrib_tracker`:
        *   **Description:** Defines a logger channel named `contrib_tracker`. Use this channel for logging events specific to the `contrib_tracker` module.
    *   `contrib_tracker.event_subscriber`:
        *   **Class:** `Drupal\contrib_tracker\EventSubscriber\RavenSubscriber`
        *   **Description:** An event subscriber related to Raven (likely for error tracking).
*   **Mail Alter:**

    Implements `hook_mail_alter()` to disable email sending in non-production Platform.sh environments. This prevents accidental emails from being sent in development or staging environments.
*   **Console Commands:**
    *   `contrib_tracker.contrib_tracker_issues_sanitise`:
        *   **Class:** `Drupal\contrib_tracker\Command\IssuesSanitiseCommand`
        *   **Description:** A console command for sanitizing issues. Use drush to execute `drush contrib-tracker-issues-sanitise`.
        *   **Arguments:** `@contrib_tracker_storage`, `@entity_type.manager`, `@database`
```