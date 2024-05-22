# Continuous Integration and Deployment

This GitHub Actions workflow runs tests, code quality checks, and deploys code to platform.sh.

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

#### Let's break down each step

  - **Check out repository code:**
    - Checks out the repository's code to the runner using action [actions/checkout](https://github.com/actions/checkout).

  - **Drupal Code Quality:**
    - It uses GrumPHP to check Drupal Code Quality.
    - You can change php version using `php-version`
    - You can add/remove tasks as per project needs.
    - Any tasks added here must be present in `grumphp.yml`
    - Please refer [hussainweb/drupalqa-action](https://github.com/hussainweb/drupalqa-action) for more details

### 2. Frontend Code Quality (`frontend_codequality`)

- **Runs on:** `ubuntu-latest` with `node:lts` container
- **Steps:**
  - **Check out repository code:**
    - Checks out the repository's code to the runner using action [actions/checkout](https://github.com/actions/checkout).

  - **Get Cache Directories:**
    - This step uses action [actions/cache](https://github.com/actions/cache)
    - It caches npm cache dir and node_modules directory to speed up build times.
    - Restores the cache if exists based on key
    - Please refer how [$GITHUB_OUTPUT](https://docs.github.com/en/actions/using-jobs/defining-outputs-for-jobs) works for more details

  - **Frontend Code Quality:**
    - Installs npm dependencies and runs linting checks for the frontend code.
