# Content Structure Documentation

This documentation outlines the content structure of the Drupal project, focusing on content types and their configurations, to help manage and display content effectively.

## Content Types

The project utilizes several content types to represent different kinds of contributions and site content. Each content type definition includes a description of its purpose and a list of Drupal configuration files that define its structure and behavior.

### 1. Basic Page

*   **Purpose:** For static content such as "About Us" pages.
*   **Description:** This content type is designed for creating standard informational pages that are not dynamically updated.
*   **Configuration Files:**
    *   `config/sync/node.type.page.yml`: Defines the content type itself.
    *   `config/sync/core.entity_view_display.node.page.default.yml`: Defines the default view display of the content type.
    *   `config/sync/core.entity_view_display.node.page.teaser.yml`: Defines the teaser view display of the content type.
    *   `config/sync/core.entity_form_display.node.page.default.yml`: Defines the default form display for creating/editing content of this type.
    *   `config/sync/core.base_field_override.node.page.promote.yml`: Overrides the base field settings for the 'promote to front page' option.

### 2. Non-Code Contributions

*   **Purpose:** Captures contributions not involving code.
*   **Description:** This content type is designed for tracking contributions to the project that do not involve writing code, such as writing blog posts, answering questions on Stack Overflow, or contributing to localization efforts.
*   **Fields:**
    *   Contribution Type (blog, Stack Overflow, localization)
    *   Author
    *   Technology
    *   Date
    *   Comments
    *   Profile Link
    *   Credit
*   **Configuration Files:**
    *   `config/sync/node.type.non_code_contribution.yml`: Defines the content type itself.
    *   `config/sync/field.storage.node.field_non_code_contribution_type.yml`: Defines the storage for the Contribution Type field.
    *   `config/sync/field.storage.node.field_non_code_contrib_profile.yml`: Defines the storage for the Profile Link field.
    *   `config/sync/field.storage.node.field_non_code_contrib_credit.yml`: Defines the storage for the Credit field.
    *   `config/sync/field.field.node.non_code_contribution.field_non_code_contribution_type.yml`: Defines the field settings for the Contribution Type field.
    *   `config/sync/field.field.node.non_code_contribution.field_non_code_contrib_profile.yml`: Defines the field settings for the Profile Link field.
    *   `config/sync/field.field.node.non_code_contribution.field_non_code_contrib_credit.yml`: Defines the field settings for the Credit field.
    *   `config/sync/core.entity_view_display.node.non_code_contribution.default.yml`: Defines the default view display.
    *   `config/sync/core.entity_view_display.node.non_code_contribution.teaser.yml`: Defines the teaser view display.
    *   `config/sync/core.entity_form_display.node.non_code_contribution.default.yml`: Defines the default form display.
    *   `config/sync/core.base_field_override.node.non_code_contribution.promote.yml`: Overrides the base field settings for the 'promote to front page' option.

### 3. Issue

*   **Purpose:** Represents bugs, tasks, or feature requests, mainly for linking to code contributions.
*   **Description:** This content type is designed to track and manage issues related to the project, and is often linked to specific code contributions that address these issues.
*   **Fields:**
    *   Link to the issue
    *   Description
*   **Configuration Files:**
    *   `config/sync/node.type.issue.yml`: Defines the content type itself.
    *   `config/sync/field.storage.node.field_issue_link.yml`: Defines the storage for the Issue Link field.
    *   `config/sync/field.field.node.issue.field_issue_link.yml`: Defines the field settings for the Issue Link field.
    *   `config/sync/field.field.node.issue.body.yml`: Defines the field settings for the body (description) field.
    *   `config/sync/core.entity_view_display.node.issue.default.yml`: Defines the default view display.
    *   `config/sync/core.entity_view_display.node.issue.teaser.yml`: Defines the teaser view display.
    *   `config/sync/core.entity_form_display.node.issue.default.yml`: Defines the default form display.
    *   `config/sync/core.base_field_override.node.issue.promote.yml`: Overrides the base field settings for the 'promote to front page' option.
	*   `config/sync/core.entity_form_mode.node.inline_issue_create.yml`: Defines the form mode for inline issue creation.
	*	`config/sync/core.entity_form_display.node.issue.inline_issue_create.yml`: Defines the form display for the inline issue creation form mode.

### 4. Event Contributions

*   **Purpose:** Captures contributions made during events.
*   **Description:** Used to document contributions, such as code sprints or documentation sessions, that occur at specific events.
*   **Fields:**
    *   Contribution Type
    *   Author
    *   Technology
    *   Event
    *   Event Contribution Link
    *   Date
*   **Configuration Files:**
    *   `config/sync/node.type.event_contribution.yml`: Defines the content type itself.
    *   `config/sync/field.storage.node.field_event_contribution_type.yml`: Defines the storage for the Contribution Type field.
    *   `config/sync/field.storage.node.field_event_contribution_link.yml`: Defines the storage for the Event Contribution Link field.
    *   `config/sync/field.field.node.event_contribution.field_event_contribution_type.yml`: Defines the field settings for the Contribution Type field.
    *   `config/sync/field.field.node.event_contribution.field_event_contribution_link.yml`: Defines the field settings for the Event Contribution Link field.
	*   `config/sync/field.field.node.event_contribution.field_event.yml`: Defines the field settings for the Event reference field.
    *   `config/sync/core.entity_view_display.node.event_contribution.default.yml`: Defines the default view display.
    *   `config/sync/core.entity_view_display.node.event_contribution.teaser.yml`: Defines the teaser view display.
    *   `config/sync/core.entity_form_display.node.event_contribution.default.yml`: Defines the default form display.
    *   `config/sync/core.base_field_override.node.event_contribution.title.yml`: Overrides the base field settings for the title field.
    *   `config/sync/core.base_field_override.node.event_contribution.promote.yml`: Overrides the base field settings for the 'promote to front page' option.
	*   `config/sync/field.field.node.event_contribution.field_contrib_moderator_comment.yml`: Defines the field for moderator comments.
	*   `config/sync/field.field.node.event_contribution.field_contribution_author.yml`: Defines the field for the contribution author.
	*   `config/sync/field.field.node.event_contribution.field_contribution_comments.yml`: Defines the field for contribution comments.
	*   `config/sync/field.field.node.event_contribution.field_contribution_date.yml`: Defines the field for the contribution date.
	*   `config/sync/field.field.node.event_contribution.field_contribution_technology.yml`: Defines the field for the contribution technology.


### 5. Event

*   **Purpose:** Represents events that can be referenced by Event Contributions.
*   **Description:** Used to store information about events, such as conferences, workshops, or meetups. This allows Event Contribution nodes to easily link and refer to specific events.
*   **Fields:**
    *   Event Dates
    *   Address
    *   Link
	*   Event Type
    *   Active Status
*   **Configuration Files:**
    *   `config/sync/node.type.event.yml`: Defines the content type itself.
    *   `config/sync/field.storage.node.field_event_dates.yml`: Defines the storage for the Event Dates field.
    *   `config/sync/field.storage.node.field_event_address.yml`: Defines the storage for the Event Address field.
    *   `config/sync/field.field.node.event.field_event_dates.yml`: Defines the field settings for the Event Dates field.
    *   `config/sync/field.field.node.event.field_event_address.yml`: Defines the field settings for the Event Address field.
    *   `config/sync/core.entity_view_display.node.event.default.yml`: Defines the default view display.
    *   `config/sync/core.entity_view_display.node.event.teaser.yml`: Defines the teaser view display.
    *   `config/sync/core.entity_form_display.node.event.default.yml`: Defines the default form display.
    *   `config/sync/core.base_field_override.node.event.promote.yml`: Overrides the base field settings for the 'promote to front page' option.
	*    `config/sync/field.storage.node.field_event_link.yml`: Defines the storage for the Event Link field.
	*    `config/sync/field.storage.node.field_event_contrib_event_type.yml`: Defines the storage for the Event Type field.
	*    `config/sync/field.storage.node.field_event_additional_links.yml`: Defines the storage for additional links related to the event.
	*    `config/sync/field.storage.node.field_event_location.yml`: Defines the storage for the Event Location field.
	*    `config/sync/field.field.node.event.field_event_link.yml`: Defines the field settings for the Event Link field.
	*    `config/sync/field.field.node.event.field_event_contrib_event_type.yml`: Defines the field settings for the Event Type field.
	*    `config/sync/field.field.node.event.field_event_additional_links.yml`: Defines the field settings for the Additional Event Links field.
	*    `config/sync/field.field.node.event.field_event_location.yml`: Defines the field settings for the Event Location field.
	*    `config/sync/field.storage.node.field_event_active.yml`: Defines the storage for the active status of the event.
	*    `config/sync/field.field.node.event.field_event_active.yml`: Defines the field settings for the Event Active field.
	*    `config/sync/field.field.node.event.body.yml`: Defines the field settings for the body (description) field.

### 6. Code Contributions

*   **Purpose:** For capturing code contributions.
*   **Description:**  Designed to record and manage contributions specifically related to code development, such as patches, modules, or themes.
*   **Fields:**
    *   Contribution Link
    *   Issue Link
    *   Project
    *   Technology
    *   Patches/Files Count
    *   Issue Status
    *   Description
*   **Configuration Files:**
    *   `config/sync/node.type.code_contribution.yml`: Defines the content type itself.
    *   `config/sync/field.storage.node.field_code_contrib_link.yml`: Defines the storage for the Contribution Link field.
    *   `config/sync/field.field.node.code_contribution.field_code_contrib_link.yml`: Defines the field settings for the Contribution Link field.
    *   `config/sync/core.entity_view_display.node.code_contribution.default.yml`: Defines the default view display.
    *   `config/sync/core.entity_view_display.node.code_contribution.teaser.yml`: Defines the teaser view display.
    *   `config/sync/core.entity_form_display.node.code_contribution.default.yml`: Defines the default form display.
    *   `config/sync/core.base_field_override.node.code_contribution.promote.yml`: Overrides the base field settings for the 'promote to front page' option.
	*   `config/sync/field.storage.node.field_code_contrib_issue_link.yml`: Defines the storage for the Issue Link field.
	*   `config/sync/field.field.node.code_contribution.field_code_contrib_issue_link.yml`: Defines the field settings for the Issue Link field.
	*   `config/sync/core.entity_form_mode.node.inline_issue_create.yml`: Defines the form mode for inline issue creation.