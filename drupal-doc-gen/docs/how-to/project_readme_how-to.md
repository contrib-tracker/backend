# Project README

Category: How-To
Summary: This README provides instructions for setting up a local development environment for the Contribution Tracker Drupal application. It outlines the necessary tools, prerequisites, and commands to clone the repository, start the DDEV environment, install dependencies, and pull the database.

Overview: Contribution tracker is a Drupal application built in Drupal 8 for managing community contributions done by the team members. It allows to log various contributions mentioned below - Code contributions, Event contributions, and Non-code contributions.

Usage: Instructions involve cloning the repository, navigating to the directory, running `ddev start`, installing composer dependencies with `ddev composer install`, and pulling the database using `ddev pull platform`.

Dependencies:
- Composer (optional if used via DDEV)
- Docker or OrbStack
- DDEV - v1.23.3
- Git
- NodeJs

Examples:
- Example git clone command: `git clone git@github.com:contrib-tracker/backend.git`
- Example change directory command: `cd backend`
- Example DDEV start command: `ddev start`
- Example composer install command: `ddev composer install`
- Example ddev pull command: `ddev pull platform`

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

[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://https://github.com/contrib-tracker/backend)

# Contribution Tracker

Contribution tracker is a Drupal application built in Drupal 8 for managing community contributions done by the team members. It allows to log various contributions mentioned below.

- Code contributions
- Event contributions
- Non-code contributions

## Features

- Imports Drupal.org contributions via API
- Supports social login and authentication via google account.

## Development

### Tools & Prerequisites

The following tools are required for setting up the site. Ensure you are using the latest version or at least the minimum version if mentioned below. Also, ensure that you have added [your SSH key to your GitHub account settings](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account).

- [Composer](https://getcomposer.org/download/) (optional if used via DDEV)
- [Docker](https://docs.docker.com/install/) or [OrbStack](https://orbstack.dev/)
- [DDEV](https://ddev.com/get-started/) - v1.23.3
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [NodeJs](https://nodejs.org/en/download)

*Note*: Ensure you have sufficient RAM (ideally 16 GB, minimum 8 GB)

### Local environment setup

Once you have all the tools installed, proceed to run the following to clone the repository.

```bash
git clone git@github.com:contrib-tracker/backend.git
```

Change to the directory of repository and run DDEV to start.

```bash
cd backend
ddev start
```

Once DDEV has been setup successfully, it will display the links in the terminal. Next run the following to fetch all dependencies.

```bash
ddev composer install
```

You can pull the database from platform.sh directly. Make sure that the [PLATFORMSH_CLI_TOKEN is set](https://ddev.readthedocs.io/en/latest/users/providers/platform/).

```bash
ddev pull platform
```

Make sure code changes are updated.

```bash
ddev drush deploy -y
```

### Post Installation

Generate a one time login link and reset the password through it.

```bash
ddev drush uli
```

Clear the cache using drush

```bash
ddev drush cr
```

### Theme Build

```bash
cd web/themes/custom/contribtracker && ddev npm install && ddev npm run build && ddev drush cr
```

You can access the site at: [https://contribtracker.ddev.site/](https://contribtracker.ddev.site/).

### Build and Deployment

Before committing your changes, make sure you are working on the latest codebase by fetching or pulling to make sure you have all the work.

```bash
git checkout main
git pull origin main
```

To initiate a build:

 1. Create a branch specific to the feature.

    ```bash
    git checkout -b <branch-name>
    ```

 2. Make the required changes and commit

    ```bash
    git commit -m "commit-message"
    ```

 3. Push the changes

    ```bash
    git push origin <branch-name>
    ```

For a better understanding of the entire process and standards,  please refer to Axelerant's [Git workflow.](https://axelerant.atlassian.net/wiki/spaces/AH/pages/58982404/Git+Workflow)

N.B. If provided with user account, you can use the management console of [platform.sh](https://platform.sh/) to handle your branch-merge requests. Please refer to the official [documentation](https://docs.platform.sh/frameworks/drupal8/developing-with-drupal.html#merge-code-changes-to-master) for further information.

## Testing

See our [testing docs](./docs/testing.md) for more details.

### PHPUnit tests

```bash
# Unit tests
$ ddev phpunit --testsuite unit

# ExistingSite tests need more flags
$ ddev phpunit --bootstrap=./vendor/weitzman/drupal-test-traits/src/bootstrap-fast.php --configuration ./phpunit.xml --testsuite existing-site
```

### Cypress tests

This needs additional setup. See our [testing docs](./docs/testing.md) for more details.

```bash
# Run tests
$ ddev cypress-run

# Interactive mode
$ ddev cypress-open
```

## About Contribution Retriever

Contrib Tracker supports automatically retrieving and saving contributions from drupal.org and Github. This is a broad outline of the logic involved in the overall retrieval of contributions from drupal.org.

Each user on contrib tracker may set their Drupal.org username in a field in their user profile. A cron job reads all such active users and queues them every 20 mins. This means that comments from drupal.org are retrieved for all users every 20 mins.

This is the flow of a queued process for each user. [*Outdated*]

1. Try to read more information about the user from drupal.org (especially the user ID). If it fails, throw an exception and leave. See [ProcessUser::processItem](web/modules/custom/contrib_tracker/src/Plugin/QueueWorker/ProcessUser.php).
2. Retrieve all the comments by the user ([ContributionManager::storeCommentsByDrupalOrgUser](web/modules/custom/contrib_tracker/src/ContributionManager.php)). If the comments span multiple pages, they are read only if required ([ContributionRetriever::getDrupalOrgCommentsByAuthor](web/modules/custom/contrib_tracker/src/DrupalOrg/ContributionRetriever.php)).
3. For each comment ([ContributionManager::storeCommentsByDrupalOrgUser](web/modules/custom/contrib_tracker/src/ContributionManager.php)),
   1. If the comment is already present in the system, leave.
   2. Get the comment's parent issue. Store the issue if it's not already present.
   3. Determine the information about the comment such as the project and number of patches and files, if any.
   4. Store all this information as a "Code contribution" content type.
