```markdown
# Contribution Tracker: Content Structure Documentation

This document provides an overview of the content structure used in the "Contribution Tracker" project. Understanding this structure is crucial for developers to effectively create, manage, and display content within the application. This documentation covers node types, taxonomies, views, user roles, and the content approval workflow.

## I. Node Types

Node types define the different types of content that can be created within the system. The following node types are used in the Contribution Tracker:

### 1. Code Contributions

*   **Description:** Captures information about code-related contributions.
*   **Fields:**
    *   `field_code_contrib_project`:  Project associated with the contribution.
    *   `field_code_contrib_issue_link`: Link to the related issue.
    *   `field_code_contrib_link`: Link to the code contribution (e.g., GitHub pull request).
    *   `field_code_contrib_patches_count`: Number of patches included in the contribution.
    *   `field_code_contrib_files_count`: Number of files changed in the contribution.
    *   `field_contribution_author`: Author of the contribution.
    *   `field_contribution_date`: Date of the contribution.
    *   `field_contribution_technology`: Technology used in the contribution.
    *   `field_contrib_moderator_comment`: Moderator's comment on the contribution.
    *   `field_code_contrib_issue_status`: Status of the related issue.

### 2. Non-Code Contributions

*   **Description:** Records details about non-code related contributions.
*   **Fields:**
    *   `field_non_code_contribution_type`: Type of non-code contribution (e.g., blog post, Stack Overflow answer).
    *   `field_non_code_contrib_profile`: Link to the contributor's profile.
    *   `field_non_code_contrib_credit`: Credit given for the contribution.
    *   `field_contribution_author`: Author of the contribution.
    *   `field_contribution_date`: Date of the contribution.
    *   `field_contribution_technology`: Technology related to the contribution.
    *   `field_contrib_moderator_comment`: Moderator's comment on the contribution.

### 3. Event Contributions

*   **Description:**  Captures contributions made during events.
*   **Fields:**
    *   `field_event`:  Reference to the event node.
    *   `field_event_contribution_type`: Type of contribution made at the event.
    *   `field_event_contribution_link`: Link to the event contribution.
    *   `field_contribution_author`: Author of the contribution.
    *   `field_contribution_date`: Date of the contribution.
    *   `field_contribution_technology`: Technology related to the contribution.
    *   `field_contrib_moderator_comment`: Moderator's comment on the contribution.

### 4. Issue

*   **Description:** Represents issues (bugs, tasks, or feature requests) that are often linked to code contributions.
*   **Fields:**
    *   `field_issue_link`: Link to the issue.
    *   `body`: Description of the issue.

### 5. Event

*   **Description:** Represents events that are referenced in Event Contributions.
*   **Fields:**
    *   `field_event_dates`: Date(s) of the event.
    *   `field_event_address`: Address of the event.
    *   `field_event_location`: Location (e.g., city, venue) of the event.
    *   `field_event_additional_links`: Additional links related to the event.
    *   `field_event_contrib_event_type`: Type of event (e.g., DrupalCamp, DrupalCon).

## II. Taxonomies

Taxonomies are used to categorize and classify content within the Contribution Tracker.

*   **Technology:** (`taxonomy.vocabulary.technology`) Used to classify contributions by the relevant technology.
*   **Project:** Used to classify code contributions to specific projects.
*   **Event Type:** Used to classify the type of event (e.g., DrupalCamp, DrupalCon).
*   **Event Contribution Type:** Used to classify the type of contribution made at an event.
*   **Contribution Type:** Used to classify the types of contributions (e.g., submitting a patch, porting a module).
*   **Tags:** Used to group articles on similar topics under categories.

## III. Views

Views are used to create dynamic lists and displays of content.  The following views are defined:

*   **Frontpage:** (`views.view.frontpage`) Displays content promoted to the front page.
*   **Content:** (`views.view.content`) Administrative view to find and manage content.
*   **Recent Content:** (`views.view.content_recent`)  Displays recently created content.
*   **Files:** (`views.view.files`) Administrative view to find and manage files.
*   **People:** (`views.view.user_admin_people`) Administrative view to find and manage users.
*   **Patches:** (`views.view.patches`) Provides a listing of patches.
*   **Glossary:** (`views.view.glossary`)  Displays all content, organized alphabetically.
*   **All Contributions:** (`views.view.all_contributions`) Displays all contribution node types.
*   **Code Contributions:** (`views.view.code_contributions`) Displays code contributions.
*   **Non Code Contributions:** (`views.view.non_code_contributions`) Displays non-code contributions.
*   **Event Contributions:** (`views.view.event_contributions`) Displays event contributions.
*   **Who's online:** (`views.view.who_s_online`) Displays the most recently active users.
*   **Who's new:** (`views.view.who_s_new`) Displays the newest user accounts.
*   **Archive:** (`views.view.archive`) Displays all content, grouped by month.
*   **Taxonomy term:** (`views.view.taxonomy_term`) Displays content belonging to a specific taxonomy term.
*   **Content blocks:** (`views.view.block_content`) Administrative view to find and manage custom blocks.
*   **Patches on issues:** (`views.view.patches_on_issues`) Shows related patches on issue pages.

## IV. User Roles

User roles manage permissions and access control within the system.

*   **Administrator:** (`user.role.administrator`) Full access to the system.
*   **Authenticated User:** (`user.role.authenticated`) Can access content and create certain types of contributions.
*   **Contribution Moderator:** (`user.role.contribution_moderator`) Can moderate contributions.
*   **Anonymous User:** (`user.role.anonymous`) Can access content.

## V. Content Approval Workflow and Moderation

The Contribution Tracker utilizes a content approval workflow to ensure the quality of contributions.

*   **Contribution Approval Flag:** (`flag.flag.contribution_approval`)  Contributions can be flagged for approval, triggering the moderation workflow.
*   **Moderation Comments:** (`field.field.node.*.field_contrib_moderator_comment`) Contribution moderators can add comments on contributions, providing feedback or justification for approval/rejection. This field is present on all contribution node types.

## VI. Menus

Menus provide site navigation.

*   **Main navigation:** (`system.menu.main`) Site section links.
*   **Footer:** (`system.menu.footer`) Site information links.
*   **Tools:** (`system.menu.tools`) User tool links.
```