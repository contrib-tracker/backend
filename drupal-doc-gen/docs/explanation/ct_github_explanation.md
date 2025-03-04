# ct_github

Category: Explanation
Summary: This document describes the Github Contribution Tracker module, which allows tracking issue and PR contributions on GitHub using the GraphQL API and storing GitHub usernames on user entities. It details the module's structure, dependencies, configuration, and key files.
Overview: This module provides a `ContributionSource` plugin which tracks contributions on GitHub using its GraphQL API. It also provides a field on user entity to store each user's GitHub username.
Usage: After installation, edit user profiles to include the "Github Username". A cron job then fetches users with a GitHub username and tracks their contributions. The module's `composer.json` must be included in the site's `composer.json` file.
Dependencies: Uses a PHP package for the GitHub API, requiring its `composer.json` to be included in the site's `composer.json`. Requires a GitHub personal access token.
Examples: No examples are present in the provided content.

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

**Original README Content:**

# Github Contribution Tracker

This module provides functionality for tracking issue and PR contributions on Github

## Table of Contents

[[_TOC_]]

## Introduction

This module provides a `ContributionSource` plugin which tracks contributions on
GitHub using its GraphQL API. It also provides a field on user entity to store
each user's GitHub username.

## Usage

Once Github Contribution Tracker module is installed, you need to edit the users
and fill the github username in the field "Github Username" for whom you need to
track contribution.

On the next cron run, the system will fetch all the users with this field set.
For each user, it will use track all their latest contribution on Github on
contrib-tracker.

### Composer dependencies

Since this module depends on a PHP package to use GitHub API, this module's
composer.json must be included in the site's composer.json file. The recommended
way to do this is by using a [path repository](https://www.drupal.org/docs/develop/using-composer/managing-dependencies-for-a-custom-project).

## Requirements

You need to obtain a [GitHub personal access token](https://github.com/settings/tokens)
to use this module. The recommended approach is to set the token securely in
an environment variable or by other means and load it in settings.php. As of
this writing, the site is on platform.sh and uses the variables feature to load
this in Drupal configuration. For more info regarding platform variable [check here](https://docs.platform.sh/development/variables.html)

## About Github Tracker

These are the main areas of interest in the `ct_github` module.

1. [GithubContribution.php](web/modules/custom/ct_github/src/Plugin/ContributionSource/GithubContribution.php) is the main plugin. This implements a [ContributionSource](web/modules/custom/ct_manager/src/ContributionSourceInterface.php) plugin which is discovered by a plugin manager in `ct_manager`.
2. [GithubQuery.php](web/modules/custom/ct_github/src/GithubQuery.php) is the class responsible for querying GitHub API.
3. [GithubRetriever.php](web/modules/custom/ct_github/src/GithubRetriever.php) is responsible for transforming the results of a query into objects which are understood by the rest of the system.

## Processing logic for contributions

The plugin manager in `ct_manager` would invoke the [plugin](web/modules/custom/ct_github/src/Plugin/ContributionSource/GithubContribution.php) in `ct_github`. This would invoke the API to return the latest 100 code contributions and 100 issues (with some caveats). All of this data is passed back to `ct_manager` which decides on how to store it. For more information, see the [README](web/modules/custom/ct_manager/README.md) in `ct_manager`.
