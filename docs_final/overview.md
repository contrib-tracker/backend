```markdown
# Contribution Tracker: Project Overview

## Project Purpose, Goals, and High-Level Description

The Contribution Tracker is a Drupal-based application designed to track and manage contributions from individuals to various projects and technologies. It supports tracking code contributions, non-code contributions, and event contributions. The project automates code quality checks and testing via GitLab CI/CD and GitHub Actions.

## Target Audience

This documentation is primarily intended for:

*   **Developers:** Setting up local environments, understanding dependencies, and contributing code.
*   **Content Editors/Moderators:** Creating and managing content related to contributions (using Node Types, Taxonomies, and moderating content).

## Tech Stack Overview

*   **Drupal Version:** 10
*   **PHP:** 8.2+ (DDEV config uses 8.3)
*   **Database:** MariaDB 11.4 (via DDEV)
*   **Dependencies:**
    *   Composer-managed PHP dependencies (see `composer.json` for a complete list, including `drupal/core`, `axelerant/ct_drupal`, `axelerant/ct_github`).
    *   Node.js dependencies (managed via npm or yarn, if front-end code exists).
    *   DDEV for local development.

Key custom modules include: `ct_user`, `ct_reports`, `ct_manager`, `ct_github`, `ct_drupal`, and `contrib_tracker`, each with dedicated functions and dependencies as documented in the Custom Modules section.
```