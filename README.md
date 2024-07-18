ocs[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://https://github.com/contrib-tracker/backend)

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
