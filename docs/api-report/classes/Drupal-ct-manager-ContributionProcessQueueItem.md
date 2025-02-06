
[Drupal](../namespaces/drupal.md) | [ct_manager](../namespaces/drupal-ct-manager.md)

## ContributionProcessQueueItem


- **In Package**:
    - [Application](../packages/Application.md)
  


---





<small>[ContributionProcessQueueItem.php](../files/web-modules-custom-ct-manager-src-contributionprocessqueueitem.md) : Line 12</small>

*Creates a value object with user and plugin id.*









### Table of Contents









#### Properties
- **[$plugin_id](../classes/Drupal-ct-manager-ContributionProcessQueueItem.md#plugin_id)**
         : string  

- **[$user](../classes/Drupal-ct-manager-ContributionProcessQueueItem.md#user)**
         : [User](# "\Drupal\user\Entity\User")  


#### Methods
- **[__construct()](../classes/Drupal-ct-manager-ContributionProcessQueueItem.md#__construct)**
           : mixed

  *User value object constructor.*

- **[getPluginId()](../classes/Drupal-ct-manager-ContributionProcessQueueItem.md#getpluginid)**
           : string

- **[getUser()](../classes/Drupal-ct-manager-ContributionProcessQueueItem.md#getuser)**
           : [User](# "\Drupal\user\Entity\User")







### Properties

#### $plugin_id

<small>[ContributionProcessQueueItem.php](../files/web-modules-custom-ct-manager-src-contributionprocessqueueitem.md) : Line 17</small>



protected string $plugin_id

Plugin ID.





#### $user

<small>[ContributionProcessQueueItem.php](../files/web-modules-custom-ct-manager-src-contributionprocessqueueitem.md) : Line 22</small>



protected [User](# "\Drupal\user\Entity\User") $user

User to be processed.







### Methods

#### __construct()

<small>[ContributionProcessQueueItem.php](../files/web-modules-custom-ct-manager-src-contributionprocessqueueitem.md) : Line 32</small>

*User value object constructor.*

!!! note ""
    __construct(string $plugin_id, [User](# "\Drupal\user\Entity\User") $user) :mixed




**Parameters**

- **$plugin_id**: string
      *The plugin id.*
  - **$user**: [User](# "\Drupal\user\Entity\User")
      *The user object.*
  






#### getPluginId()

<small>[ContributionProcessQueueItem.php](../files/web-modules-custom-ct-manager-src-contributionprocessqueueitem.md) : Line 37</small>


!!! note ""
    getPluginId() :string









**Return Values**

- string



#### getUser()

<small>[ContributionProcessQueueItem.php](../files/web-modules-custom-ct-manager-src-contributionprocessqueueitem.md) : Line 41</small>


!!! note ""
    getUser() :[User](# "\Drupal\user\Entity\User")









**Return Values**

- [User](# "\Drupal\user\Entity\User")




