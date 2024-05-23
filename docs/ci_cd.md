# Continuous Integration and Deployment

This GitHub Actions workflow automates testing, code quality checks, and deployment to platform.sh.

## Trigger

The CI workflow is triggered by:

- Push events to the `main` branch.
- Push events creating new tags.
- Pull request events.

## Concurrency Control

The workflow ensures concurrency control, allowing only one workflow run per branch/tag. It cancels in-progress runs if a new run is triggered.

## Jobs

Each job checks out the repository code using [actions/checkout](https://github.com/actions/checkout) and performs caching with [actions/cache](https://github.com/actions/cache) to optimize subsequent runs.

### 1. Drupal Code Quality (`drupal_codequality`)

**Intent:** Ensure Drupal code quality.

**Description:** Uses GrumPHP to perform code quality checks on the Drupal codebase, ensuring adherence to our predefined standards. We use [axelerant/drupal-quality-checker](https://github.com/axelerant/drupal-quality-checker) for local checks, so we apply the same configuration in CI to maintain consistency.

### 2. Frontend Code Quality (`frontend_codequality`)

**Intent:** Ensure frontend code quality.

**Description:** This job runs linting checks on JavaScript and other frontend code to maintain code quality and consistency.

### 3. Drupal Test (`drupal_test`)

**Intent:** Run comprehensive tests on the Drupal site.

**Description:** This job sets up the ddev environment in CI to replicate the local development environment. It performs the following tests:
- **Unit Tests with DTT:** Ensures individual units of code work as expected.
- **PHPStan Checks:** Static analysis to find errors in code without running it.
- **Cypress Tests:** End-to-end testing to ensure functionalities work. Integrated with Percy for Visual Testing.

**Note:**
- We spin up ddev in CI to ensure a consistent environment with our local development setup. This is necessary because we need a site running for Cypress tests and Drupal test traits.
- PHPStan checks are included in this job and not part of the `drupal_codequality` job because it requires all dependencies to be present.

### 4. Deploy (`deploy`)

**Intent:** Deploy code to platform.sh.

**Description:** This job deploys code to platform.sh based on the branch (`main` for production, others for feature environments). It ensures that only code passing the `drupal_codequality` and `drupal_test` jobs is deployed. Dependabot PRs are excluded from deployment.

## References

- [Events that trigger workflows](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows)
- [Caching dependencies](https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows)
- [Drupal Quality Checker](https://github.com/axelerant/drupal-quality-checker)
- [Defining outputs for jobs](https://docs.github.com/en/actions/using-jobs/defining-outputs-for-jobs)
- [Storing workflow data as artifacts](https://docs.github.com/en/actions/using-workflows/storing-workflow-data-as-artifacts)
- [Using Secrets in GitHub Actions](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions)
- [Example Workflows](https://github.com/actions/starter-workflows)
