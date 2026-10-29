# ct_drupal

Category: Explanation
Summary: This module tracks Drupal.org contributions by utilizing the Drupal.org API. It provides a contribution source plugin and a user field to store Drupal.org usernames, fetching contribution data upon cron runs.

Overview: This module provides a `ContributionSource` plugin which tracks contributions on Drupal.org using a wrapper module across Guzzle 6 to access and use the API provided by drupal.org. It also provides a field on user entity to store each user's Drupal.org username using do_username contrib module as a dependency.

Usage: Once Drupal.org Contribution Tracker module is installed, you need to edit the users and fill the Drupal.org username in the field "Drupal.org Username" for whom you need to track contribution. On the next cron run, the system will fetch all the users with this field set.

Dependencies: do_username contrib module, Guzzle 6 (via composer)

Examples: None are explicitly shown, but the code refers to specific PHP files: `DrupalContribution.php` and `DrupalRetriever.php`.

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

# Drupal.org Contribution Tracker

This module provides functionality for tracking contributions on Drupal.org


## Introduction

This module provides a `ContributionSource` plugin which tracks contributions on
Drupal.org using a wrapper module across Guzzle 6 to access and use the API provided by drupal.org. It also provides a field on user entity to store
each user's Drupal.org username using do_username contrib module as a dependency.

## Usage

Once Drupal.org Contribution Tracker module is installed, you need to edit the users
and fill the Drupal.org username in the field "Drupal.org Username" for whom you need to
track contribution.

On the next cron run, the system will fetch all the users with this field set.
For each user, it will use track all their latest contribution on Drupal.org on
contrib-tracker.

### Composer dependencies

Since this module depends on a PHP package to use Drupal.org API, this module's
composer.json must be included in the site's composer.json file. The recommended
way to do this is by using a [path repository](https://www.drupal.org/docs/develop/using-composer/managing-dependencies-for-a-custom-project).

## Requirements

## About Drupal Tracker

These are the main areas of interest in the `ct_drupal` module.

1. [DrupalContribution.php](web/modules/custom/ct_drupal/src/Plugin/ContributionSource/DrupalContribution.php) is the main plugin. This implements a [ContributionSource](web/modules/custom/ct_manager/src/ContributionSourceInterface.php) plugin which is discovered by a plugin manager in `ct_manager`.
3. [DrupalRetriever.php](web/modules/custom/ct_drupal/src/DrupalRetriever.php) is responsible for transforming the results of a query into objects which are understood by the rest of the system.

## Processing logic for contributions

The plugin manager in `ct_manager` would invoke the [plugin](web/modules/custom/ct_drupal/src/Plugin/ContributionSource/DrupalContribution.php) in `ct_drupal`. This would invoke the API to return the latest 100 code contributions and 100 issues (with some caveats). All of this data is passed back to `ct_manager` which decides on how to store it. For more information, see the [README](web/modules/custom/ct_manager/README.md) in `ct_manager`.
