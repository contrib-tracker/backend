# Custom Modules and Themes

## Custom Modules

The custom modules used for this project are:

### [Contribution Plugin Manager](https://github.com/contrib-tracker/backend/tree/main/web/modules/custom/ct_manager)

- The Contribution Plugin Manager module (ct_manager)  is designed to manage and track user contributions from various sources through a plugin-based system. Its primary purpose is to process contributions asynchronously and efficiently using Drupal's queue system and send notifications for recent contributions.

- This module provides functionality to create custom plugins of type `ContributionSource`, which allows for tracking and storing contributions from different sources. When Drupal's cron runs, the module looks for `ContributionSource` plugins, creates instances of each, and processes the associated users. Each user's contributions are tracked, stored in the database, and notifications are sent to a Slack channel for contributions posted within the last hour. The `ContributionSource` plugin is also implemented by `ct_drupal` and `ct_github`.

- To add a new contribution source, we can create a plugin with the ContributionSource annotation, implementing the `ContributionSourceInterface` and its methods as needed. The main components of this module include `ct_manager.module`, which executes actions during cron runs, creating instances of plugins and queuing users for processing; `ContributionSourceInterface`, which defines the functions for the plugins; and `ProcessUsers`, which handles the tracking and storage of contributions and sends Slack notifications.

- To send Slack notifications, it uses the contributed module - [Slack](https://www.drupal.org/slack).

### [Drupal Contribution Tracker](https://github.com/contrib-tracker/backend/tree/main/web/modules/custom/ct_drupal)

The Drupal.org Contribution Tracker module (ct_drupal) integrates with the ct_manager module to automate tracking user contributions made specifically on the Drupal.org platform. ct_manager acts as a central coordinator for various contribution tracking plugins, including ct_drupal.

Here's how `ct_drupal` leverages `ct_manager` for contribution tracking:

- It utilizes a `ContributionSource` plugin named `DrupalContribution.php`. This plugin interacts with the Drupal.org API via a wrapper module built around Guzzle 6 for efficient communication.

- To track contributions, `ct_drupal` relies on the `do_username` dependency, which manages a dedicated field where users enter their Drupal.org usernames.

- During cron runs, the `ct_manager` module triggers the `ct_drupal` plugin's functionality. ct_drupal then fetches contributions for all users with a populated Drupal.org username field, retrieving the latest 100 code contributions and 100 issues for each user. All the fetched data is passed backed to `ct_manager` to decide the storing process.

### [GitHub Contribution Tracker](https://github.com/contrib-tracker/backend/tree/main/web/modules/custom/ct_github)

The GitHub Contribution Tracker module (ct_github) automates tracking user contributions made on Github, specifically issues and code contributions. Here's how it works:

- It utilizes a `ContributionSource` plugin named `GithubContribution.php` to interact with the Github GraphQL API.

- This module requires each user's Github username to be filled in a dedicated field.

- It requires a secure [GitHub personal access token](https://github.com/settings/tokens) stored in an environment variable or through other secure means and load it in `settings.php`.

- During cron runs, the `ct_manager` module triggers the `ct_github` plugin's functionality. `ct_github` then fetches contributions for users with populated Github username fields, retrieving the latest 100 issues and 100 code contributions for each user. All the fetched data is passed backed to `ct_manager` to decide the storing process.

In essence, this module simplifies tracking user activity on Github by offering an automated solution that integrates with existing Drupal functionalities and leverages the `ct_manager` module's infrastructure for processing and storage.

### [Contribution Tracker Reports](https://github.com/contrib-tracker/backend/tree/main/web/modules/custom/ct_reports)

The Contribution Tracker Reports module (ct_reports) provides functionality to generate reports based on contribution data.

- The Contribution Tracker Reports module builds upon the existing Contribution Tracker functionality in Drupal by providing tools to analyze and visualize contribution data. The report can be generated based on multiple parameters such as Contribution Type, Technology, Title, Name and Contribution Date.

- The module offers functionalities to generate reports based on the contribution data collected by the core Contribution Tracker modules (e.g., Drupal.org Contribution Tracker or Github Contribution Tracker).

- It provides a dedicated "Contribution Count" report accessible at the `/contribution-count` path. This report displays key metrics like total contributions, code contributions, and the total number of contributors.

Overall, the Contribution Tracker Reports module empowers users to leverage the contribution data for better insights into user activity and potentially identify trends or areas of focus within their Drupal community.

### [Contrib Tracker Users](https://github.com/contrib-tracker/backend/tree/main/web/modules/custom/ct_user)

The Contribution Tracker User module (ct_user) focuses on managing user login activities within the Contrib Tracker system.

- It leverages the `social_auth` module, suggesting a focus on social login functionalities for Contrib Tracker.

- The module alters the user login form (`user_login_form`) and implements a custom validation function (`ct_user_user_login_form_validate`). This function checks if a logging-in user has an associated social login profile.

- If a user has a social login profile linked to their account, the module redirects them to the social login provider's login page (e.g., `/user/login/google`) instead of allowing a traditional username/password login. This might be to enforce social login for specific users or enforce a specific login flow within Contrib Tracker.

Overall, the Contribution Tracker User module appears to manage user login activities in Contrib Tracker, potentially prioritizing social login methods for certain users.

## Custom Theme

[contribtracker theme](https://github.com/contrib-tracker/backend/tree/main/web/themes/custom/contribtracker): custom theme created specifically for Contrib Tracker.

- Various Drupal Core views are customized by Twig.

- The ContribTracker custom Drupal theme employs several front-end technologies to ensure a robust and maintainable user interface. It utilizes SCSS for modular and advanced CSS styling, JavaScript, and TypeScript for dynamic and type-safe scripting, respectively. Gulp is used as a task runner to automate build processes, while Prettier and ESLint are used for code formatting and linting JavaScript code. Stylelint ensures consistent styling for CSS/Sass. These technologies together create an efficient and cohesive front-end development environment.

[Gin](https://www.drupal.org/project/gin/releases/8.x-3.0-rc8) is a contributed theme used as an administration theme.
