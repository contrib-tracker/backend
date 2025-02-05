
- [Drupal](../namespaces/drupal.md)
- [ct_manager](../namespaces/drupal-ct-manager.md)


### ## ContributionSourceInterface


- **In**:
    - [Application](../packages/Application.md)
  

[ContributionSourceInterface.php](../files/web-modules-custom-ct-manager-src-contributionsourceinterface.md) : Line 13

*An interface for all Contribution type plugins.*









### Table of Contents










#### Methods
- **[getNotificationMessage()](../classes/Drupal-ct-manager-ContributionSourceInterface.md#getnotificationmessage)**
           : string
*Get message for notification.*

- **[getUserCodeContributions()](../classes/Drupal-ct-manager-ContributionSourceInterface.md#getusercodecontributions)**
           : mixed
*Get comments from the total contribution data.*

- **[getUserIssues()](../classes/Drupal-ct-manager-ContributionSourceInterface.md#getuserissues)**
           : mixed
*Get issues from the total contribution data.*

- **[getUsers()](../classes/Drupal-ct-manager-ContributionSourceInterface.md#getusers)**
           : mixed
*Get users which can be processed by this plugin.*

- **[isUserValid()](../classes/Drupal-ct-manager-ContributionSourceInterface.md#isuservalid)**
           : bool
*Get user contributions from the platform.*








### Methods

#### getNotificationMessage()

[ContributionSourceInterface.php](../files/web-modules-custom-ct-manager-src-contributionsourceinterface.md) : Line 38

*Get message for notification.*

!!! Signature
    getNotificationMessage([CodeContribution](../classes/Drupal-ct-manager-Data-CodeContribution.md) $contribution, [User](# "\Drupal\user\Entity\User") $user) :string




**Parameters**

- **$contribution**: [CodeContribution](../classes/Drupal-ct-manager-Data-CodeContribution.md)
    
- **$user**: [User](# "\Drupal\user\Entity\User")
    





**Return Values**

string



#### getUserCodeContributions()

[ContributionSourceInterface.php](../files/web-modules-custom-ct-manager-src-contributionsourceinterface.md) : Line 33

*Get comments from the total contribution data.*

!!! Signature
    getUserCodeContributions([User](# "\Drupal\user\Entity\User") $user) :mixed




**Parameters**

- **$user**: [User](# "\Drupal\user\Entity\User")
    







#### getUserIssues()

[ContributionSourceInterface.php](../files/web-modules-custom-ct-manager-src-contributionsourceinterface.md) : Line 28

*Get issues from the total contribution data.*

!!! Signature
    getUserIssues([User](# "\Drupal\user\Entity\User") $user) :mixed




**Parameters**

- **$user**: [User](# "\Drupal\user\Entity\User")
    







#### getUsers()

[ContributionSourceInterface.php](../files/web-modules-custom-ct-manager-src-contributionsourceinterface.md) : Line 18

*Get users which can be processed by this plugin.*

!!! Signature
    getUsers() :mixed











#### isUserValid()

[ContributionSourceInterface.php](../files/web-modules-custom-ct-manager-src-contributionsourceinterface.md) : Line 23

*Get user contributions from the platform.*

!!! Signature
    isUserValid([User](# "\Drupal\user\Entity\User") $user) :bool




**Parameters**

- **$user**: [User](# "\Drupal\user\Entity\User")
    





**Return Values**

bool




