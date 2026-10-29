# ct_manager

Category: Explanation
Summary: This document describes the Contribution Plugin Manager module, which allows creating custom plugins for tracking and storing contributions from various sources and sending Slack notifications. It outlines the module's purpose, usage, and plugin implementation details.
Overview: This module provides a feature to create custom plugins to track and store contributions from different sources and send notifications on a Slack Channel. 
Usage: The module runs with a cron job, which looks for plugins of type "ContributionSource" to create instances and process users, tracking and storing contributions and posting Slack notifications for new contributions.
Dependencies: The document references the Drupal Plugin API and mentions the need to implement the ContributionSourceInterface.
Examples: The document points to `ct_github` (`web/modules/custom/ct_github/src/Plugin/ContributionSource/GithubContribution.php`) as an example plugin implementation.

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

# Contribution Plugin Manager

Provides functionality to create custom Plugin of type "ContributionSource".

# Table of Contents

[[_TOC_]]

## Introduction

This module provides feature to create custom Plugin to track and store
contributions from different source and send notification on Slack Channel.

## Usage

When cron runs, this module will look for the plugin of type "ContributionSource" to create Instance of all the plugin and process users. Each user is processed to track and store contributions from different source. Also, notification on Slack channel is posted for contribution which are posted in last 1 hour of cron hit.

## Plugin Implementation

To add a new contribution source to the system create a new plugin of type `ContributionSource`. Read the [documention on Plugin API](https://www.drupal.org/docs/drupal-apis/plugin-api) to understand the general concepts for plugins in Drupal. For ContributionSource plugins, make sure you follow these steps:

- Create the plugin file in `src/Plugin/ContributionSource` directory of your module.
- Annotation for the plugin is `@ContributionSource`.
- The plugin should implement `ContributionSourceInterface`. Implement each of the methods on the interface as per the specific needs.
- Look at the existing implementation in [`ct_github`](web/modules/custom/ct_github/src/Plugin/ContributionSource/GithubContribution.php) for an example.

## About Contribution Tracker Manager

Below mentioned are the main criteria for ct_manager module:
1. [ct_manager.module](web/modules/custom/ct_manager/ct_manager.module) This is used to execute action when cron is hit. It createInstance for each plugin and add users in Queue to process.
2. [ContributionSourceInterface](web/modules/custom/ct_manager/src/ContributionSourceInterface.php) This involves the plugins function definition which will be called during cron run.
3. [ProcessUsers](web/modules/custom/ct_manager/src/Plugin/QueueWorker/ProcessUsers.php) This is used to process each user and track contribution from different source. After fetching contributions these are passed to [ContributionTrackerStorage](web/modules/custom/ct_manager/src/ContributionTrackerStorage.php) to store values in database and notification is sent on Slack Channel for CodeContributions posted in last 1 hour.
