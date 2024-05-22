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

