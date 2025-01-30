



### ## contrib_tracker.module







### Tags

- **file**
            - Custom contribution tracker module.

  





### Table of Contents











#### Functions

- **[contrib_tracker_mail_alter()](../namespaces/default.md#function_contrib_tracker_mail_alter)**
           : `mixed`
*Implements hook_mail_alter().*







### Functions

#### contrib_tracker_mail_alter()


[contrib_tracker.module](../files/web-modules-custom-contrib-tracker-contrib-tracker.md) : Line 17

*Implements hook_mail_alter().*


```php
contrib_tracker_mail_alter(mixed  & $message) :mixed
```
CONT-36 Disable all mails in non prod environments.

We ALLOW mail sending for non platformsh environments.
We ALLOW mail for platformsh production envrionments.
We DO NOT ALLOW mail sending for non production platformsh environments.


#### Parameters

- **$message**: mixed
    








