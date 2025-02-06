
[Drupal](../namespaces/drupal.md) | [ct_manager](../namespaces/drupal-ct-manager.md)

### ## ContributionSourceInterface


- **In**:
    - [Application](../packages/Application.md)
  

<small>[ContributionSourceInterface.php](../files/web-modules-custom-ct-manager-src-contributionsourceinterface.md) : Line 13</small>

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

<small>[ContributionSourceInterface.php](../files/web-modules-custom-ct-manager-src-contributionsourceinterface.md) : Line 38</small>

*Get message for notification.*

!!! note ""
    getNotificationMessage([CodeContribution](../classes/Drupal-ct-manager-Data-CodeContribution.md) $contribution, [User](# "\Drupal\user\Entity\User") $user) :string




**Parameters**

- **$contribution**: [CodeContribution](../classes/Drupal-ct-manager-Data-CodeContribution.md)
    
- **$user**: [User](# "\Drupal\user\Entity\User")
    





**Return Values**

- string



#### getUserCodeContributions()

<small>[ContributionSourceInterface.php](../files/web-modules-custom-ct-manager-src-contributionsourceinterface.md) : Line 33</small>

*Get comments from the total contribution data.*

!!! note ""
    getUserCodeContributions([User](# "\Drupal\user\Entity\User") $user) :mixed




**Parameters**

- **$user**: [User](# "\Drupal\user\Entity\User")
    







#### getUserIssues()

<small>[ContributionSourceInterface.php](../files/web-modules-custom-ct-manager-src-contributionsourceinterface.md) : Line 28</small>

*Get issues from the total contribution data.*

!!! note ""
    getUserIssues([User](# "\Drupal\user\Entity\User") $user) :mixed




**Parameters**

- **$user**: [User](# "\Drupal\user\Entity\User")
    







#### getUsers()

<small>[ContributionSourceInterface.php](../files/web-modules-custom-ct-manager-src-contributionsourceinterface.md) : Line 18</small>

*Get users which can be processed by this plugin.*

!!! note ""
    getUsers() :mixed











#### isUserValid()

<small>[ContributionSourceInterface.php](../files/web-modules-custom-ct-manager-src-contributionsourceinterface.md) : Line 23</small>

*Get user contributions from the platform.*

!!! note ""
    isUserValid([User](# "\Drupal\user\Entity\User") $user) :bool




**Parameters**

- **$user**: [User](# "\Drupal\user\Entity\User")
    





**Return Values**

- bool




