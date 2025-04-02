# Contrib Tracker Project - Custom Modules Documentation

This document provides detailed information about the custom modules developed for the Contrib Tracker project. It serves as a guide for developers looking to understand, maintain, or extend the functionality of these modules.

## Module Overview

The Contrib Tracker project includes the following custom modules:

1.  [Contrib Tracker Module (`contrib_tracker`)](#1-contrib-tracker-module-contrib_tracker)
2.  [Contrib Tracker Users Module (`ct_user`)](#2-contrib-tracker-users-module-ct_user)
3.  [Contrib Tracker Reports Module (`ct_reports`)](#3-contrib-tracker-reports-module-ct_reports)
4.  [Contribution Tracker Manager Module (`ct_manager`)](#4-contribution-tracker-manager-module-ct_manager)
5.  [Github Contribution Tracker Module (`ct_github`)](#5-github-contribution-tracker-module-ct_github)
6.  [Drupal.org Contribution Tracker Module (`ct_drupal`)](#6-drupalorg-contribution-tracker-module-ct_drupal)

---

## 1. Contrib Tracker Module (`contrib_tracker`)

### Description

This module provides core functionality for tracking contributions within the Contrib Tracker project.

### Functionality

*   **Email Management:** In non-production Platform.sh environments, this module disables email sending using `hook_mail_alter()`. Refer to [`contrib_tracker.module`](/tmp/241d7549-58bf-4e39-a985-b28fa7448747/repo-dir/web/modules/custom/contrib_tracker/contrib_tracker.module) for implementation details.

### Services

The following services are defined by this module:

*   **`logger.channel.contrib_tracker`**: Provides a dedicated logging channel for events related to the `contrib_tracker` module.
*   **`contrib_tracker.event_subscriber`**: Registers `Drupal\contrib_tracker\EventSubscriber\RavenSubscriber` as an event subscriber, likely for error tracking and reporting purposes (e.g., using Sentry/Raven).

### Drush Commands

*   **`contrib_tracker.contrib_tracker_issues_sanitise`**:  Implements a Drush command (`Drupal\contrib_tracker\Command\IssuesSanitiseCommand`) for sanitizing issues. This command leverages the following services via dependency injection:
    *   `contrib_tracker_storage`
    *   `entity_type.manager`
    *   `database`

### Configuration

The module utilizes the following configuration files:

*   **[`contrib_tracker.info.yml`](/tmp/241d7549-58bf-4e39-a985-b28fa7448747/repo-dir/web/modules/custom/contrib_tracker/contrib_tracker.info.yml)**: Defines the module's metadata, including its name, type, description, core version requirement, and package.
*   **[`contrib_tracker.services.yml`](/tmp/241d7549-58bf-4e39-a985-b28fa7448747/repo-dir/web/modules/custom/contrib_tracker/contrib_tracker.services.yml)**: Declares the services utilized by the module.
*   **[`console.services.yml`](/tmp/241d7549-58bf-4e39-a985-b28fa7448747/repo-dir/web/modules/custom/contrib_tracker/console.services.yml)**: Defines the service for the Drush command.

---

## 2. Contrib Tracker Users Module (`ct_user`)

### Description

This module handles user-related functionalities within the Contrib Tracker system.

### Functionality

*   **User Contribution Graph Route:** Defines a route (`/user/{current_user_id}/graph`) to display the contribution count for a specific user. See [`ct_user.routing.yml`](/tmp/241d7549-58bf-4e39-a985-b28fa7448747/repo-dir/web/modules/custom/ct_user/ct_user.routing.yml) for details.
*   **Theming:** Implements `hook_theme()` to define the `contrib_graph` theme, used for rendering the contribution graph.
*   **Help Text:** Implements `hook_help()` to provide help text for the module within the Drupal administration interface.
*   **User Login Form Alter:** Implements `hook_form_alter()` to add custom validation to the user login form, enhancing security or enforcing specific login requirements.  See [`ct_user.module`](/tmp/241d7549-58bf-4e39-a985-b28fa7448747/repo-dir/web/modules/custom/ct_user/ct_user.module) for details.

### Dependencies

*   `social_auth`:  This module is dependent on the `social_auth` module, suggesting integration with social login providers.

### Services

*   **`ct_user.ct_user_social_event_listener`**: Registers `Drupal\ct_user\EventSubscriber\ContribTrackerEventListener` as an event subscriber.  This subscriber likely reacts to social authentication events. It injects the `logger.factory` service for logging.

### Configuration

*   **[`ct_user.info.yml`](/tmp/241d7549-58bf-4e39-a985-b28fa7448747/repo-dir/web/modules/custom/ct_user/ct_user.info.yml)**: Defines the module's metadata and lists `social_auth` as a dependency.
*   **[`ct_user.routing.yml`](/tmp/241d7549-58bf-4e39-a985-b28fa7448747/repo-dir/web/modules/custom/ct_user/ct_user.routing.yml)**: Defines the route for displaying the user contribution graph.
*   **[`ct_user.services.yml`](/tmp/241d7549-58bf-4e39-a985-b28fa7448747/repo-dir/web/modules/custom/ct_user/ct_user.services.yml)**: Defines the services provided by the module.

---

## 3. Contrib Tracker Reports Module (`ct_reports`)

### Description

This module is responsible for generating reports based on contribution data.

### Functionality

*   **Contribution Count Route:** Defines a route (`/contribution-count`) to display contribution counts.  See [`ct_reports.routing.yml`](/tmp/241d7549-58bf-4e39-a985-b28fa7448747/repo-dir/web/modules/custom/ct_reports/ct_reports.routing.yml) for details.
*   **Theming:** implements `hook_theme()` for the `ct_reports_contribution_count` theme. See [`ct_reports.module`](/tmp/241d7549-58bf-4e39-a985-b28fa7448747/repo-dir/web/modules/custom/ct_reports/ct_reports.module) for details.

### Services

*   **`ct_reports.statistics`**: Provides the `Drupal\ct_reports\ContributionStatistics` service for calculating contribution statistics.  This service injects the `entity_type.manager` and `database` services to access and process data.

### Configuration

*   **[`ct_reports.info.yml`](/tmp/241d7549-58bf-4e39-a985-b28fa7448747/repo-dir/web/modules/custom/ct_reports/ct_reports.info.yml)**: Defines the module's metadata.
*   **[`ct_reports.routing.yml`](/tmp/241d7549-58bf-4e39-a985-b28fa7448747/repo-dir/web/modules/custom/ct_reports/ct_reports.routing.yml)**: Defines the route for contribution count reports.
*   **[`ct_reports.services.yml`](/tmp/241d7549-58bf-4e39-a985-b28fa7448747/repo-dir/web/modules/custom/ct_reports/ct_reports.services.yml)**: Defines the module's services.
*   **[`ct_reports.libraries.yml`](/tmp/241d7549-58bf-4e39-a985-b28fa7448747/repo-dir/web/modules/custom/ct_reports/ct_reports.libraries.yml)**: Defines the `ct-style` library, which contains `css/ct-style.css` for styling.

---

## 4. Contribution Tracker Manager Module (`ct_manager`)

### Description

This module acts as a central manager for tracking contributions from various external sources by using a plugin system.

### Functionality

*   **Contribution Source Plugin System:** Provides a plugin system allowing the integration of different contribution sources.
*   **Cron Processing:** Implements `hook_cron()` to process users for each registered contribution source plugin and queue them for further processing. See [`ct_manager.module`](/tmp/241d7549-58bf-4e39-a985-b28fa7448747/repo-dir/web/modules/custom/ct_manager/ct_manager.module) for the cron implementation.

### Services

*   **`logger.channel.ct_manager`**: Provides a dedicated logging channel for events related to the `ct_manager` module.
*   **`plugin.manager.contribution_plugin_manager`**: Manages the available contribution source plugins, enabling discovery and instantiation.
*   **`ct_manager.contribution_storage`**: Provides storage for contributions. It injects `entity_type.manager` and `logger.channel.ct_manager` services.

### Configuration

*   **[`ct_manager.info.yml`](/tmp/241d7549-58bf-4e39-a985-b28fa7448747/repo-dir/web/modules/custom/ct_manager/ct_manager.info.yml)**: Defines the module's metadata.
*   **[`ct_manager.services.yml`](/tmp/241d7549-58bf-4e39-a985-b28fa7448747/repo-dir/web/modules/custom/ct_manager/ct_manager.services.yml)**: Defines the services provided by the module.

### README

*   **[`README.md`](/tmp/241d7549-58bf-4e39-a985-b28fa7448747/repo-dir/web/modules/custom/ct_manager/README.md)**: Explains how to create and implement a `ContributionSource` plugin to enable integration with new contribution platforms.  This is crucial for extending the system.

---

## 5. Github Contribution Tracker Module (`ct_github`)

### Description

This module tracks issue and pull request contributions on GitHub, leveraging the GitHub GraphQL API.

### Dependencies

*   `ct_manager`:  This module depends on `ct_manager` to leverage the plugin system for contribution source management.

### Functionality

*   **GitHub Contribution Source Plugin:** implements a `ContributionSource` plugin for tracking contributions on GitHub.
*   **GitHub Username Storage:** Stores users' GitHub usernames on their user entities, enabling the association of contributions with Drupal user accounts.  This requires users to populate their GitHub usernames.

### Services

*   **`ct_github.query`**: Provides the `Drupal\ct_github\GithubQuery` service for interacting with the GitHub GraphQL API. It injects the `config.factory` and `cache.data` services for configuration and caching.
*   **`ct_github.loggerChannel`**: Provides a dedicated logging channel for events related to the `ct_github` module.

### Configuration

*   **[`ct_github.info.yml`](/tmp/241d7549-58bf-4e39-a985-b28fa7448747/repo-dir/web/modules/custom/ct_github/ct_github.info.yml)**: Defines the module's metadata and declares its dependency on `ct_manager`.
*   **[`ct_github.services.yml`](/tmp/241d7549-58bf-4e39-a985-b28fa7448747/repo-dir/web/modules/custom/ct_github/ct_github.services.yml)**: Defines the services used by the module.
*   **[`composer.json`](/tmp/241d7549-58bf-4e39-a985-b28fa7448747/repo-dir/web/modules/custom/ct_github/composer.json)**: Declares a dependency to `knplabs/github-api` PHP library, which facilitates interaction with the GitHub API.

### README

*   **[`README.md`](/tmp/241d7549-58bf-4e39-a985-b28fa7448747/repo-dir/web/modules/custom/ct_github/README.md)**: Explains the module's functionality and how to use it.

---

## 6. Drupal.org Contribution Tracker Module (`ct_drupal`)

### Description

This module tracks contributions on Drupal.org.

### Dependencies

*   `ct_manager`: This module relies on the `ct_manager` module for the contribution source plugin system.
*   `do_username`: This module depends on the `do_username` module.

### Functionality

*   **Drupal.org Contribution Source Plugin:** Implements a `ContributionSource` plugin for tracking contributions on Drupal.org using the Drupal.org API.
*   **Drupal.org Username Storage:** Stores Drupal.org usernames on user entities, leveraging the `do_username` module.  This requires users to provide their Drupal.org usernames.

### Services

*   **`logger.channel.ct_drupal`**: Provides a dedicated logging channel for the `ct_drupal` module.
*   **`ct_drupal.client`**: Provides a custom client service (`Drupal\ct_drupal\Client`) to communicate with Drupal.org.
*   **`ct_drupal.http_adapter`**: Defines the HTTP adapter (`Http\Adapter\Guzzle