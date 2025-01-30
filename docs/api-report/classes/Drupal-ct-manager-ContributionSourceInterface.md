

- [Drupal](../namespaces/drupal.md)
- [ct_manager](../namespaces/drupal-ct-manager.md)


### 
## ContributionSourceInterface


- **In**:
    - [Application](../packages/Application.md)
  


[ContributionSourceInterface.php](../files/web-modules-custom-ct-manager-src-contributionsourceinterface.md) : Line 13

*An interface for all Contribution type plugins.*











### Table of Contents










#### Methods

- **[getNotificationMessage()](../classes/Drupal-ct-manager-ContributionSourceInterface.md#method_getNotificationMessage)**
           : `string`
*Get message for notification.*


- **[getUserCodeContributions()](../classes/Drupal-ct-manager-ContributionSourceInterface.md#method_getUserCodeContributions)**
           : `mixed`
*Get comments from the total contribution data.*


- **[getUserIssues()](../classes/Drupal-ct-manager-ContributionSourceInterface.md#method_getUserIssues)**
           : `mixed`
*Get issues from the total contribution data.*


- **[getUsers()](../classes/Drupal-ct-manager-ContributionSourceInterface.md#method_getUsers)**
           : `mixed`
*Get users which can be processed by this plugin.*


- **[isUserValid()](../classes/Drupal-ct-manager-ContributionSourceInterface.md#method_isUserValid)**
           : `bool`
*Get user contributions from the platform.*








### Methods

#### getNotificationMessage()


[ContributionSourceInterface.php](../files/web-modules-custom-ct-manager-src-contributionsourceinterface.md) : Line 38

*Get message for notification.*

```php
getNotificationMessage(<a href="classes/Drupal-ct-manager-Data-CodeContribution.html"><abbr title="\Drupal\ct_manager\Data\CodeContribution">CodeContribution</abbr></a>  $contribution, <abbr title="\Drupal\user\Entity\User">User</abbr>  $user) :string
```





#### Parameters

- **$contribution**: &lt;a href=&quot;classes/Drupal-ct-manager-Data-CodeContribution.html&quot;&gt;&lt;abbr title=&quot;\Drupal\ct_manager\Data\CodeContribution&quot;&gt;CodeContribution&lt;/abbr&gt;&lt;/a&gt;
    
- **$user**: &lt;abbr title=&quot;\Drupal\user\Entity\User&quot;&gt;User&lt;/abbr&gt;
    







#### Return Values

string



#### getUserCodeContributions()


[ContributionSourceInterface.php](../files/web-modules-custom-ct-manager-src-contributionsourceinterface.md) : Line 33

*Get comments from the total contribution data.*

```php
getUserCodeContributions(<abbr title="\Drupal\user\Entity\User">User</abbr>  $user) :mixed
```





#### Parameters

- **$user**: &lt;abbr title=&quot;\Drupal\user\Entity\User&quot;&gt;User&lt;/abbr&gt;
    









#### getUserIssues()


[ContributionSourceInterface.php](../files/web-modules-custom-ct-manager-src-contributionsourceinterface.md) : Line 28

*Get issues from the total contribution data.*

```php
getUserIssues(<abbr title="\Drupal\user\Entity\User">User</abbr>  $user) :mixed
```





#### Parameters

- **$user**: &lt;abbr title=&quot;\Drupal\user\Entity\User&quot;&gt;User&lt;/abbr&gt;
    









#### getUsers()


[ContributionSourceInterface.php](../files/web-modules-custom-ct-manager-src-contributionsourceinterface.md) : Line 18

*Get users which can be processed by this plugin.*

```php
getUsers() :mixed
```














#### isUserValid()


[ContributionSourceInterface.php](../files/web-modules-custom-ct-manager-src-contributionsourceinterface.md) : Line 23

*Get user contributions from the platform.*

```php
isUserValid(<abbr title="\Drupal\user\Entity\User">User</abbr>  $user) :bool
```





#### Parameters

- **$user**: &lt;abbr title=&quot;\Drupal\user\Entity\User&quot;&gt;User&lt;/abbr&gt;
    







#### Return Values

bool




