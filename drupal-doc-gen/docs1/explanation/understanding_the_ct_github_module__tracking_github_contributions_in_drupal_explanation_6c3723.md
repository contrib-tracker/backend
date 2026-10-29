# Understanding the ct_github Module: Tracking GitHub Contributions in Drupal

**Introduction:**

The `ct_github` module is a custom Drupal module designed to track contributions (specifically issues and pull requests) made by users on GitHub. It leverages the GitHub GraphQL API to collect this data and integrates it into a Drupal-based contribution tracking system.

**Key Concepts:**

*   **ContributionSource Plugin:** The core of the module is implemented as a `ContributionSource` plugin.  This plugin conforms to the `ContributionSourceInterface` defined by the `ct_manager` module.  This design allows the system to be extended with other contribution sources beyond just GitHub.

*   **GitHub GraphQL API:** The module uses GitHub's GraphQL API for efficient data retrieval. This API allows for precise requests, minimizing the amount of data transferred compared to traditional REST APIs.

*   **User Field:** A custom field is added to the Drupal user entity. This field is used to store the associated GitHub username for each user being tracked.

*   **Cron Integration:** The contribution tracking process is triggered by Drupal's cron system.  During a cron run, the module gathers GitHub usernames from users with the custom field populated and queries the GitHub API for their contributions.

**Module Structure:**

The module comprises several key files, including:

*   `GithubContribution.php`:  (located in `web/modules/custom/ct_github/src/Plugin/ContributionSource/`) This file implements the `ContributionSource` plugin. It contains the logic for connecting to the GitHub API, querying for a user's contributions, and formatting the data for storage within Drupal.  It relies on the functionality provided by the `GithubQuery` class.

*   `GithubQuery.php`: (located in `web/modules/custom/ct_github/src/GithubQuery.php`) This handles the specifics of constructing and executing GraphQL queries to the GitHub API.  It encapsulates the API interaction logic and simplifies the plugin.  This class likely handles authentication and error handling related to communicating with the GitHub API.

**How it Works:**

1.  **User Configuration:** An administrator configures the Drupal site by adding GitHub usernames to the "Github Username" field for relevant user accounts.

2.  **Cron Trigger:** The Drupal cron system executes the `ct_github` module's update process.

3.  **Data Retrieval:** The module iterates through users who have a GitHub username configured.  For each user, it uses the `GithubQuery` class to construct and execute a GraphQL query to the GitHub API.

4.  **Data Processing:** The GitHub API returns data about the user's contributions (issues and pull requests).  The `GithubContribution` plugin processes this data, potentially filtering, formatting, and transforming it.

5.  **Storage:** The processed contribution data is stored, likely within the `ct_manager` module's data structure, linking the contribution to the corresponding Drupal user.

**Requirements and Dependencies:**

*   **GitHub Personal Access Token:** A GitHub personal access token is required to authenticate with the GitHub API.  This token should be stored securely, ideally using environment variables or Drupal's configuration management features.

*   **Composer Dependency:** The module likely relies on a PHP package for interacting with the GitHub GraphQL API.  This package is managed using Composer.  The module needs to ensure its dependencies are properly included and updated by adding the module's composer file as a path repository in the project's composer.json.

*   **ct_manager module:** The module is dependent on the `ct_manager` module, which provides the API and data structures for managing contributions.

**In summary,** the `ct_github` module provides a streamlined approach to tracking GitHub contributions within a Drupal environment. By leveraging the GitHub GraphQL API and integrating with Drupal's user and cron systems, it enables administrators to monitor and manage user contributions effectively. Understanding the role of the `GithubContribution` plugin, the `GithubQuery` class, and the module's dependencies is crucial for maintaining and extending this functionality.

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

**Original Source:** ct_github