

- [Drupal](../namespaces/drupal.md)
- [ct_manager](../namespaces/drupal-ct-manager.md)


### 
## ContributionProcessQueueItem


- **In Package**:
    - [Application](../packages/Application.md)
  


---






[ContributionProcessQueueItem.php](../files/web-modules-custom-ct-manager-src-contributionprocessqueueitem.md) : Line 12

*Creates a value object with user and plugin id.*











### Table of Contents









#### Properties

- **[$plugin_id](../classes/Drupal-ct-manager-ContributionProcessQueueItem.md#property_plugin_id)**
         : `string`  


- **[$user](../classes/Drupal-ct-manager-ContributionProcessQueueItem.md#property_user)**
         : `<abbr title="\Drupal\user\Entity\User">User</abbr>`  


#### Methods

- **[__construct()](../classes/Drupal-ct-manager-ContributionProcessQueueItem.md#method___construct)**
           : `mixed`
*User value object constructor.*


- **[getPluginId()](../classes/Drupal-ct-manager-ContributionProcessQueueItem.md#method_getPluginId)**
           : `string`


- **[getUser()](../classes/Drupal-ct-manager-ContributionProcessQueueItem.md#method_getUser)**
           : `<abbr title="\Drupal\user\Entity\User">User</abbr>`







### Properties

#### $plugin_id


[ContributionProcessQueueItem.php](../files/web-modules-custom-ct-manager-src-contributionprocessqueueitem.md) : Line 17




`protected [](../string)|UTF-8 $plugin_id`


Plugin ID.







#### $user


[ContributionProcessQueueItem.php](../files/web-modules-custom-ct-manager-src-contributionprocessqueueitem.md) : Line 22




`protected [](../\Drupal\user\Entity\User)|UTF-8 $user`


User to be processed.









### Methods

#### __construct()


[ContributionProcessQueueItem.php](../files/web-modules-custom-ct-manager-src-contributionprocessqueueitem.md) : Line 32

*User value object constructor.*

```php
__construct(string  $plugin_id, <abbr title="\Drupal\user\Entity\User">User</abbr>  $user) :mixed
```





#### Parameters

- **$plugin_id**: string
    
The plugin id.

- **$user**: &lt;abbr title=&quot;\Drupal\user\Entity\User&quot;&gt;User&lt;/abbr&gt;
    
The user object.










#### getPluginId()


[ContributionProcessQueueItem.php](../files/web-modules-custom-ct-manager-src-contributionprocessqueueitem.md) : Line 37


```php
getPluginId() :string
```












#### Return Values

string



#### getUser()


[ContributionProcessQueueItem.php](../files/web-modules-custom-ct-manager-src-contributionprocessqueueitem.md) : Line 41


```php
getUser() :<abbr title="\Drupal\user\Entity\User">User</abbr>
```












#### Return Values

<abbr title="\Drupal\user\Entity\User">User</abbr>




