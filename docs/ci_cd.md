# Continuous Integration and Deployment

This GitHub Actions workflow runs tests, performs code quality checks, and deploys code to platform.sh.

## Trigger

The CI workflow is triggered on:
- Push events to the `main` branch.
- Push events that create new tags.
- Pull request events.

## Concurrency Control

The workflow enforces concurrency, ensuring that only one workflow run is active for a given branch or tag at a time, canceling any in-progress runs if a new run is triggered.

## Jobs

### 1. Drupal Code Quality (`drupal_codequality`)

This job performs Drupal code quality checks using GrumPHP.

#### Steps:

- **Check out repository code:**
  - Checks out the repository's code to the runner using the [actions/checkout](https://github.com/actions/checkout) action.

- **Drupal Code Quality:**
  - Uses GrumPHP to check Drupal code quality.
  - You can change the PHP version using the `php-version` input.
  - You can add/remove tasks as per project needs.
  - Any tasks added here must be present in `grumphp.yml`.
  - Refer to the [hussainweb/drupalqa-action](https://github.com/hussainweb/drupalqa-action) for more details.

### 2. Frontend Code Quality (`frontend_codequality`)

This job performs frontend code quality checks.

#### Runs on:

- `ubuntu-latest` with `node:lts` container

#### Steps:

- **Check out repository code:**
  - Checks out the repository's code to the runner using the [actions/checkout](https://github.com/actions/checkout) action.

- **Get Cache Directories:**
  - This step uses the [actions/cache](https://github.com/actions/cache) action.
  - Caches the npm cache directory and node_modules directory to speed up build times.
  - Restores the cache if it exists based on the key.
  - Refer to how [$GITHUB_OUTPUT](https://docs.github.com/en/actions/using-jobs/defining-outputs-for-jobs) works for more details.

- **Frontend Code Quality:**
  - Installs npm dependencies and runs linting checks for the frontend code.

### 3. Drupal Test (`drupal_test`)

This job runs tests for the Drupal site using various tools including Cypress and PHPUnit.

#### Runs on:

- `ubuntu-latest`

#### Environment Variables:

- `CYPRESS_ADMIN_USERNAME`: ct-admin
- `CYPRESS_ADMIN_PASSWORD`: ct-admin
- `PERCY_TOKEN`: `${{ secrets.PERCY_TOKEN }}`

#### Steps:

- **Check out repository code:**
  - Checks out the repository's code to the runner using the [actions/checkout](https://github.com/actions/checkout) action.

- **Get Cache Directories:**
  - This step uses the [actions/cache](https://github.com/actions/cache) action.
  - Caches Composer and npm cache directories to speed up build times.
  - Restores the cache if it exists based on the key.

- **Setup DDEV:**
  - Uses the [ddev/github-action-setup-ddev](https://github.com/ddev/github-action-setup-ddev) action.
  - Starts DDEV after setting the environment.

- **Get DDEV version:**
  - Gets the current DDEV version.

- **Cache Docker images:**
  - Uses the [ScribeMD/docker-cache](https://github.com/ScribeMD/docker-cache) action to cache Docker images.

- **Set the platform.sh token:**
  - Configures the platform.sh token for DDEV and starts DDEV.

- **Install the site:**
  - Installs Composer dependencies, pulls the site from platform.sh, and deploys the site using Drush.

- **Build front-end:**
  - Installs npm dependencies and runs Gulp to build the frontend assets.

- **Run phpstan:**
  - Runs phpstan using GrumPHP.

- **Test:**
  - Runs PHPUnit tests.

- **Change admin password for Cypress tests:**
  - Changes the admin password to facilitate Cypress tests.

- **Cypress Test with Percy Integration:**
  - Runs Cypress tests with Percy integration.

- **Save Cypress recordings:**
  - Uploads Cypress test recordings as artifacts.
