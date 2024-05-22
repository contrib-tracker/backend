# Continuous Integration and Deployment

This GitHub Actions workflow runs tests, code quality checks, and deploys code to platform.sh.

## Trigger
The CI workflow is triggered on:
- Push events to the `main` branch.
- Push events that create new tags.
- Pull request events.

## Concurrency Control

The workflow enforces concurrency, ensuring that only one workflow run is active for a given branch or tag at a time, canceling any in-progress runs if a new run is triggered.



