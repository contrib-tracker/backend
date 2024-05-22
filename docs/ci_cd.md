# Continuous Integration and Deployment

This GitHub Actions workflow runs tests, performs code quality checks, and deploys code to platform.sh.

## Trigger

The CI workflow is triggered on:
- Push events to the `main` branch.
- Push events that create new tags.
- Pull request events.
- Please refer to [Workflow triggers](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows) for more details.

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

This job runs tests for the Drupal site using various tools including Cypress and PHPUnit using DDEV.

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
  - Uses the [ddev/github-action-setup-ddev](https://github.com/ddev/github-action-setup-ddev) action to install DDEV.
  - Starts DDEV after setting the environment.

- **Get DDEV version:**
  - Gets the current DDEV version.

- **Cache Docker images:**
  - Uses the [ScribeMD/docker-cache](https://github.com/ScribeMD/docker-cache) action to cache Docker images. It caches all DDEV Docker images.
  - Lists out all `docker-compose-*.yaml` or `Dockerfile` files to `hashFile` for generating the key, so cache can be invalidated if any of these files change.

- **Set the platform.sh token:**
  - Configures the platform.sh token for DDEV and starts DDEV.

- **Install the site:**
  - Installs Composer dependencies.
  - Pulls the database and files from platform.sh.
  - Deploys the site using Drush.

- **Build front-end:**
  - Installs npm dependencies and builds the frontend assets.

- **Run phpstan:**
  - Runs phpstan check.

- **Test:**
  - Runs PHPUnit tests.

- **Change admin password for Cypress tests:**
  - Changes the admin password so that Cypress can log in to the site and facilitate Cypress tests.

- **Cypress Test with Percy Integration:**
  - Runs Cypress tests with Percy integration.
  - Refer to [Percy Documentation](https://www.browserstack.com/docs/percy/overview/basics).
  - If `PERCY_TOKEN` is not present, it logs an error message and continues with the Cypress run.
  - If you don't want Percy integration, you can use `cypress run` for Cypress tests:
    ```yaml
      - name: Cypress Test
        run: ddev cypress-run
    ```

- **Save Cypress recordings:**
  - Uploads Cypress test recordings (videos and screenshots) as artifacts. You can download artifacts from the action detail page at the bottom on GitHub.

### 4. Deploy (`deploy`)

This job deploys the code to platform.sh.

#### Environment:

- The environment name is determined based on the branch (`main` for production, others for feature environments).

#### Needs:

- Depends on the successful completion of the `drupal_codequality` and `drupal_test` jobs.

#### Runs on:

- `ubuntu-latest`

#### Conditions:

- This job will not run for Dependabot PRs as they can't access secrets.

#### Steps:

- **Deploy to platform.sh:**
  - Uses the [axelerant/platformsh-deploy-action](https://github.com/axelerant/platformsh-deploy-action) action to deploy the code.
  - Requires the `project-id` and `cli-token` inputs.
