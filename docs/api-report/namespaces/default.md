


## API Documentation



### Table of Contents


#### Namespaces
- **[Drupal](../namespaces/drupal.md)**









#### Functions
- **[contrib_tracker_mail_alter()](../namespaces/default.md#contrib_tracker_mail_alter)**
           : mixed
*Implements hook_mail_alter().*

- **[ct_manager_cron()](../namespaces/default.md#ct_manager_cron)**
           : mixed
*Implements hook_cron().*

- **[ct_reports_theme()](../namespaces/default.md#ct_reports_theme)**
           : mixed
*Implements hook_theme().*

- **[ct_user_theme()](../namespaces/default.md#ct_user_theme)**
           : mixed

- **[ct_user_help()](../namespaces/default.md#ct_user_help)**
           : mixed
*Implements hook_help().*

- **[ct_user_form_alter()](../namespaces/default.md#ct_user_form_alter)**
           : mixed
*Implements hook_form_alter().*

- **[ct_user_user_login_form_validate()](../namespaces/default.md#ct_user_user_login_form_validate)**
           : mixed
*Custom validation function for the user login form.*

- **[contribtracker_theme_suggestions_block_alter()](../namespaces/default.md#contribtracker_theme_suggestions_block_alter)**
           : mixed

- **[contribtracker_theme_suggestions_form_alter()](../namespaces/default.md#contribtracker_theme_suggestions_form_alter)**
           : mixed
*Implements hook_theme_suggestions_form_alter().*

- **[contribtracker_theme_suggestions_table_alter()](../namespaces/default.md#contribtracker_theme_suggestions_table_alter)**
           : mixed
*Implements hook_theme_suggestions_table_alter().*

- **[contribtracker_theme_preprocess_page_alter()](../namespaces/default.md#contribtracker_theme_preprocess_page_alter)**
           : mixed
*Implements hook_theme_preprocess_page_alter().*

- **[contribtracker_theme_suggestions_input_alter()](../namespaces/default.md#contribtracker_theme_suggestions_input_alter)**
           : mixed
*Implements hook_theme_suggestions_input_alter().*






### Functions

#### contrib_tracker_mail_alter()

[contrib_tracker.module](../files/web-modules-custom-contrib-tracker-contrib-tracker.md) : Line 17

*Implements hook_mail_alter().*


!!! Signature
    contrib_tracker_mail_alter(mixed  &$message) :mixed

CONT-36 Disable all mails in non prod environments.

We ALLOW mail sending for non platformsh environments.
We ALLOW mail for platformsh production envrionments.
We DO NOT ALLOW mail sending for non production platformsh environments.

**Parameters**

- **$message**: mixed
    





---
#### ct_manager_cron()

[ct_manager.module](../files/web-modules-custom-ct-manager-ct-manager.md) : Line 20

*Implements hook_cron().*


!!! Signature
    ct_manager_cron() :mixed







---
#### ct_reports_theme()

[ct_reports.module](../files/web-modules-custom-ct-reports-ct-reports.md) : Line 11

*Implements hook_theme().*


!!! Signature
    ct_reports_theme(mixed $existing) :mixed


**Parameters**

- **$existing**: mixed
    





---
#### ct_user_theme()

[ct_user.module](../files/web-modules-custom-ct-user-ct-user.md) : Line 11



!!! Signature
    ct_user_theme() :mixed







---
#### ct_user_help()

[ct_user.module](../files/web-modules-custom-ct-user-ct-user.md) : Line 22

*Implements hook_help().*


!!! Signature
    ct_user_help(mixed $route_name, [RouteMatchInterface](# "\Drupal\Core\Routing\RouteMatchInterface") $route_match) :mixed


**Parameters**

- **$route_name**: mixed
    
- **$route_match**: [RouteMatchInterface](# "\Drupal\Core\Routing\RouteMatchInterface")
    





---
#### ct_user_form_alter()

[ct_user.module](../files/web-modules-custom-ct-user-ct-user.md) : Line 38

*Implements hook_form_alter().*


!!! Signature
    ct_user_form_alter(mixed  &$form, mixed $form_state, mixed $form_id) :mixed


**Parameters**

- **$form**: mixed
    
- **$form_state**: mixed
    
- **$form_id**: mixed
    





---
#### ct_user_user_login_form_validate()

[ct_user.module](../files/web-modules-custom-ct-user-ct-user.md) : Line 49

*Custom validation function for the user login form.*


!!! Signature
    ct_user_user_login_form_validate(mixed  &$form, mixed $form_state) :mixed


**Parameters**

- **$form**: mixed
    
- **$form_state**: mixed
    





---
#### contribtracker_theme_suggestions_block_alter()

[contribtracker.theme](../files/web-themes-custom-contribtracker-contribtracker.md) : Line 10



!!! Signature
    contribtracker_theme_suggestions_block_alter(array&lt;string|int, mixed&gt;  &$suggestions, array&lt;string|int, mixed&gt; $variables) :mixed


**Parameters**

- **$suggestions**: array&lt;string|int, mixed&gt;
    
- **$variables**: array&lt;string|int, mixed&gt;
    





---
#### contribtracker_theme_suggestions_form_alter()

[contribtracker.theme](../files/web-themes-custom-contribtracker-contribtracker.md) : Line 20

*Implements hook_theme_suggestions_form_alter().*


!!! Signature
    contribtracker_theme_suggestions_form_alter(array&lt;string|int, mixed&gt;  &$suggestions, array&lt;string|int, mixed&gt; $variables) :mixed


**Parameters**

- **$suggestions**: array&lt;string|int, mixed&gt;
    
- **$variables**: array&lt;string|int, mixed&gt;
    





---
#### contribtracker_theme_suggestions_table_alter()

[contribtracker.theme](../files/web-themes-custom-contribtracker-contribtracker.md) : Line 29

*Implements hook_theme_suggestions_table_alter().*


!!! Signature
    contribtracker_theme_suggestions_table_alter(array&lt;string|int, mixed&gt;  &$suggestions, array&lt;string|int, mixed&gt; $variables) :mixed


**Parameters**

- **$suggestions**: array&lt;string|int, mixed&gt;
    
- **$variables**: array&lt;string|int, mixed&gt;
    





---
#### contribtracker_theme_preprocess_page_alter()

[contribtracker.theme](../files/web-themes-custom-contribtracker-contribtracker.md) : Line 38

*Implements hook_theme_preprocess_page_alter().*


!!! Signature
    contribtracker_theme_preprocess_page_alter(array&lt;string|int, mixed&gt;  &$suggestions, array&lt;string|int, mixed&gt; $variables) :mixed


**Parameters**

- **$suggestions**: array&lt;string|int, mixed&gt;
    
- **$variables**: array&lt;string|int, mixed&gt;
    





---
#### contribtracker_theme_suggestions_input_alter()

[contribtracker.theme](../files/web-themes-custom-contribtracker-contribtracker.md) : Line 64

*Implements hook_theme_suggestions_input_alter().*


!!! Signature
    contribtracker_theme_suggestions_input_alter(mixed  &$suggestions, array&lt;string|int, mixed&gt; $variables) :mixed


**Parameters**

- **$suggestions**: mixed
    
- **$variables**: array&lt;string|int, mixed&gt;
    





---

