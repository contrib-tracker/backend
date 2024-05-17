# Content Structure

## Content Types

ContribTracker project contains the following content types:

### Basic page

- **Description**: Use the Basic page content type for static content such as 'About us' pages, providing essential, unchanging information about organization or website purpose.
- **Fields Used**: the most common field body is used.

### Code contributions

- **Description**: Use the Code contributions content type to document various code-related contributions, capturing patches, code updates, and improvements made by contributors.
- **Fields used**:
  - Contribution Author (field_contribution_author): References the user who authored the contribution.
  - Contribution Date (field_contribution_date): The date the contribution was made.
  - Contribution Details (field_contribution_description): A long, formatted text field describing the contribution.
  - Contribution Issue Link (field_code_contrib_issue_link): References the related issue content type for the contribution.
  - Contribution Link (field_code_contrib_link): A URL link associated with the contribution.
  - Contribution Project (field_code_contrib_project): References the project taxonomy term associated with the contribution.
  - Contribution Type (field_contribution_type): References the contribution type from the Contribution Type taxonomy.
  - Files Count (field_code_contrib_files_count): Number of files included in the contribution.
  - Issue Status (field_code_contrib_issue_status): Text list field indicating the current status of the related issue.
  - Moderator Comments (field_contrib_moderator_comment): Formatted text field for comments by the moderator.
  - Patches Count (field_code_contrib_patches_count): Number of patches included in the contribution.
  - Technology (field_contribution_technology): References the technology taxonomy term related to the contribution.

### Event

- **Description**: Use the Event content type to create and manage events, specifying details like date, location, and description for organizational or community activities.
- **Fields used**: It has common event related fields (Active Event, Description, Event Additional Links, Event Address, Event Dates, Event Link, Event Location) and additional field named field_event_contrib_event_type. This field allows content to reference specific event types from the “Event Type” taxonomy vocabulary.

### Event Contribution

- **Description**: Use the Event contributions content type to document contributions made during events, including presentations, workshops, or collaborative efforts.
- **Fields used**:
  - Active Event (field_event_active): Indicates whether the event is currently active or inactive (Boolean).
  - Description (body): A detailed, formatted text field with a summary to describe the event.
  - Event Additional Links (field_event_additional_links): URLs for additional information or resources related to the event.
  - Event Address (field_event_address): The physical address where the event will take place.
  - Event Dates (field_event_dates): The start and end dates (and times) for the event.
  - Event Link (field_event_link): A primary URL link associated with the event.
  - Event Location (field_event_location): Geographical coordinates (latitude and longitude) of the event’s location.
  - Event Type (field_event_contrib_event_type): References the type of event, categorized by terms from the Event Type taxonomy.

### Issue

- **Description**: Use the Issue content type to create and track new issues, including bugs, tasks, and feature requests, facilitating project management and problem resolution.
- **Fields used**:
  - Issue Description (body): A long, formatted text field with a summary for describing the issue.
  - Link (field_issue_link): A URL link associated with the issue.

### Non Code Contributions

- **Description**: Use the Non code contributions content type to capture and recognize contributions that are not code-related, such as documentation, design, or community support.
- **Fields used**:
  - Contribution Author (field_contribution_author): References the user who authored the contribution.
  - Contribution Comments (field_contribution_comments): A long, formatted text field for comments on the contribution.
  - Contribution Date (field_contribution_date): The date the contribution was made.
  - Credit (field_non_code_contrib_credit): Integer field indicating the amount of credit for the contribution.
  - Moderator Comments (field_contrib_moderator_comment): Formatted text field for comments by the moderator.
  - Profile (field_non_code_contrib_profile): A URL link to the contributor's profile.
  - Technology (field_contribution_technology): References the technology taxonomy term related to the contribution.
  - Type (field_non_code_contribution_type): Text list field indicating the type of non-code contribution.

## Taxonomy

ContribTracker project possesses the following taxonomy vocabularies/terms:

- **Contribution Type**: This vocabulary stores various contribution types, such as submitting patches, porting modules, to categorize and manage different forms of contributions efficiently.
- **Event Contribution Type**: This vocabulary stores types of event contributions, like sessions, volunteering, and training, to classify and organize different activities and roles within events.
- **Event Type**: This vocabulary categorizes event types, such as DrupalCamps, DrupalCons, and meetups, to help organize and differentiate between various kinds of events.
- **Project**: Stores projects related to community contributions, allowing for the organization and classification of different community-driven initiatives and development efforts.
- **Tags**: Use tags to categorize articles on similar topics, facilitating easy grouping and retrieval of related content across the site.
- **Technology**: This vocabulary stores various technologies used in contributions, aiding in the classification and organization of contributions by the technology they involve.
