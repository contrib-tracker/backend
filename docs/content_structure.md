# Project Content Structure Documentation

This document details the content structure of the Drupal project. It covers content types, taxonomies, views, user roles, and module dependencies, providing a comprehensive overview for developers.

## Node Types (Content Types)

The project defines the following content types to structure and manage different kinds of content:

*   **Basic page:** (`node.type.page.yml`)
    *   Purpose: For static, informational content, such as "About Us" or "Contact" pages.

*   **Non Code Contributions:** (`node.type.non_code_contribution.yml`)
    *   Purpose: Captures contributions that don't involve direct code changes.
    *   Key fields:
        *   `field_non_code_contribution_type`:  Categorizes the non-code contribution (e.g., Blog Post, Stack Overflow Answer, Localization).
        *   `field_non_code_*`: Other fields related to specific non-code contribution details (e.g., URL to the blog post).
        *   Profile Link: A link to the contributor's profile.
        *   Credit: Details about who should be credited for the contribution.

*   **Issue:** (`node.type.issue.yml`)
    *   Purpose: Represents issues in projects (bugs, tasks, or feature requests). Often linked to code contributions that address these issues.

*   **Event Contributions:** (`node.type.event_contribution.yml`)
    *   Purpose: Records contributions made during specific events.
    *    Key fields:
        * `field_event`: Reference to the event node to which the contribution belongs.
	    * `field_event_contribution_type`: Type of event contribution (e.g., Session Speaker, Volunteer).
        *   `field_contribution_technology`: Technology involved in the contribution.

*   **Event:** (`node.type.event.yml`)
    *   Purpose: Represents events such as DrupalCamps, DrupalCons, and local Meetups.  Stores information related to the event.

*   **Code contributions:** (`node.type.code_contribution.yml`)
    *   Purpose: Documents code contributions to open-source projects.
    *   Key fields:
        *   `field_code_contrib_project`:  The project to which the code contribution was made.
        *   `field_code_contrib_patches_count`: Number of patches included in the contribution.
        *   `field_code_contrib_issue_link`:  Link to the issue the contribution addresses.
        *   *... and more...* Other fields capture details specific to code contributions.

## Taxonomies

Taxonomies provide a way to categorize and organize content within the project:

*   **Technology:** (`taxonomy.vocabulary.technology.yml`)
    *   Purpose:  Lists different technologies used in contributions (e.g., Drupal, PHP, JavaScript).

*   **Tags:** (`taxonomy.vocabulary.tags.yml`)
    *   Purpose: Provides free-form tagging for grouping content by related topics.

*   **Project:** (`taxonomy.vocabulary.project.yml`)
    *   Purpose: Lists the various projects to which community members contribute.

*   **Event Type:** (`taxonomy.vocabulary.event_type.yml`)
    *   Purpose:  Defines the different types of events (e.g., DrupalCamp, DrupalCon, Meetup).

*   **Event Contribution Type:** (`taxonomy.vocabulary.event_contribution_type.yml`)
    *   Purpose:  Categorizes the types of contributions made at an event (e.g., Session Speaking, Volunteering).

*   **Contribution Type:** (`taxonomy.vocabulary.contribution_type.yml`)
    *   Purpose:  Classifies the different methods of contribution (e.g., Submitting a Patch, Porting a Module).

## Views

Views are used to create dynamic listings and displays of content.

*   `views.view.who_s_online.yml`: Shows currently online users.
*   `views.view.who_s_new.yml`: Shows newest user accounts.
*   `views.view.user_admin_people.yml`:  Lists people, facilitating user management.
*   `views.view.taxonomy_term.yml`: Displays content belonging to a specific taxonomy term.
*   `views.view.patches_on_issues.yml`: Lists patches on issues.
*   `views.view.patches.yml`: Lists code patches.
*   `views.view.non_code_contributions.yml`: Lists non-code contributions.
*   `views.view.glossary.yml`: Displays all content in a glossary format.
*   `views.view.frontpage.yml`: Defines the front page content.
*   `views.view.files.yml`: Lists and manages files.
*   `views.view.event_contributions.yml`: Lists event contributions.
*   `views.view.content_recent.yml`: Lists recent content.
*   `views.view.content.yml`: Lists and manages content.
*   `views.view.code_contributions.yml`: Lists code contributions.
*   `views.view.block_content.yml`: Lists content blocks.
*   `views.view.archive.yml`: Creates a monthly archive of content.
*   `views.view.all_contributions.yml`: Lists all contributions.

**Base Tables:** These views primarily use the following base tables to retrieve and display data:

*   `node_field_data`: Main table for node (content) data.
*   `users_field_data`: Main table for user account data.
*   `file_managed`: Main table for managed files.
*   `block_content_field_data`:  Main table for custom blocks.

## User Roles

User roles define the permissions and access levels for different users:

*   **Anonymous user:** (`user.role.anonymous.yml`)
    *   Purpose:  Provides basic access for users who are not logged in.

*   **Authenticated user:** (`user.role.authenticated.yml`)
    *   Purpose: Defines permissions for logged-in users, including content creation and other basic site functionalities.

*   **API basic read:** (`user.role.api_basic_read.yml`)
    *   Purpose: Grants API users read-only access to content.

*   **Contribution Moderator:** (`user.role.contribution_moderator.yml`)
    *   Purpose: Allows users to moderate content associated with contributions (code, events, etc.).

*   **Administrator:** (`user.role.administrator.yml`)
    *   Purpose:  Provides full administrative privileges, including managing users, content, and site configuration.

## Fields

Custom fields extend the base content types to store specific data.  Here are some examples:

*   **`node.type.code_contribution`**:
    *   `field_code_contrib_project`:  Reference to the project the contribution belongs to (Taxonomy Term).
    *   `field_code_contrib_patches_count`: Number of patches included in the contribution.
    *   `field_code_contrib_issue_link`: Link to the related issue.

*   **`node.type.non_code_contribution`**:
    *   `field_non_code_contribution_type`:  Type of non-code contribution (Taxonomy Term).
    *   `field_non_code_*`: Other fields to store specific data about the contribution.

*   **`node.type.event_contribution`**:
    *   `field_event`: Reference to the event.
    *   `field_event_contribution_type`: Type of contribution given to a certain event (Taxonomy Term).
    *   `field_contribution_technology`: Technology used in the event contribution (Taxonomy Term).

**Field Storage and Display:**

Field storage settings are defined in `field.storage.*` configuration files.
Field display settings (how fields are rendered) are defined in `core.entity_view_display.*` configuration files.

## Modules

The project utilizes the following modules:

*   **ct_github:**
    *   Purpose: Tracks GitHub contributions.
    *   Functionality: Uses the `field_github_username` field and the GitHub GraphQL API to fetch contribution data.

*   **ct_drupal:**
    *   Purpose: Tracks Drupal.org contributions.
    *   Dependency: Requires the `do_username` module.
    *   Functionality: Uses the `field_do_username` field to associate users with their Drupal.org profiles and track their contributions.