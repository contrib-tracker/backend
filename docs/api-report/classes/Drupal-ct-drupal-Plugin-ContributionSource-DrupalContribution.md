
[Drupal](../namespaces/drupal.md) | [ct_drupal](../namespaces/drupal-ct-drupal.md) | [Plugin](../namespaces/drupal-ct-drupal-plugin.md) | [ContributionSource](../namespaces/drupal-ct-drupal-plugin-contributionsource.md)

## DrupalContribution

- **extends**: [PluginBase](# &quot;\Drupal\Component\Plugin\PluginBase&quot;)

- **In Package**:
    - [Application](../packages/Application.md)
  
- **Implements**:
    [ContributionSourceInterface](../classes/Drupal-ct-manager-ContributionSourceInterface.md),     [ContainerFactoryPluginInterface](# &quot;\Drupal\Core\Plugin\ContainerFactoryPluginInterface&quot;)  

---





<small>[DrupalContribution.php](../files/web-modules-custom-ct-drupal-src-plugin-contributionsource-drupalcontribution.md) : Line 30</small>

*Retrieve and Store contributions from drupal.org.*




### Tags

- **ContributionSource**
  - (
  id = "drupal",
  description = @Translation("Retrieve and store contribution data from drupal.org."),
)





### Table of Contents



#### Interfaces
- **[ContributionSourceInterface](../classes/Drupal-ct-manager-ContributionSourceInterface.md)**
  An interface for all Contribution type plugins.
- **[ContainerFactoryPluginInterface](# &quot;\Drupal\Core\Plugin\ContainerFactoryPluginInterface&quot;)**






#### Properties
- **[$contributionStorage](../classes/Drupal-ct-drupal-Plugin-ContributionSource-DrupalContribution.md#contributionstorage)**
         : [ContributionTrackerStorage](../classes/Drupal-ct-manager-ContributionTrackerStorage.md)  

  *Contribution Storage service.*

- **[$doRetriever](../classes/Drupal-ct-drupal-Plugin-ContributionSource-DrupalContribution.md#doretriever)**
         : [DrupalOrgRetriever](../classes/Drupal-ct-drupal-DrupalOrgRetriever.md)  

  *Retrievers for each user.*

- **[$doUserInfoRetriever](../classes/Drupal-ct-drupal-Plugin-ContributionSource-DrupalContribution.md#douserinforetriever)**
         : [DOUserInfoRetriever](# "\Drupal\do_username\DOUserInfoRetriever")  

  *do_username service.*

- **[$entityTypeManager](../classes/Drupal-ct-drupal-Plugin-ContributionSource-DrupalContribution.md#entitytypemanager)**
         : [EntityTypeManagerInterface](# "\Drupal\Core\Entity\EntityTypeManagerInterface")  

  *Entity type manager.*

- **[$logger](../classes/Drupal-ct-drupal-Plugin-ContributionSource-DrupalContribution.md#logger)**
         : [LoggerChannelInterface](# "\Drupal\Core\Logger\LoggerChannelInterface")  

  *Logger.*

- **[$timeService](../classes/Drupal-ct-drupal-Plugin-ContributionSource-DrupalContribution.md#timeservice)**
         : [TimeInterface](# "\Drupal\Component\Datetime\TimeInterface")  

  *datetime.time service.*


#### Methods
- **[__construct()](../classes/Drupal-ct-drupal-Plugin-ContributionSource-DrupalContribution.md#__construct)**
           : mixed

  *Constructs a Drupal\rest\Plugin\ResourceBase object.*

- **[create()](../classes/Drupal-ct-drupal-Plugin-ContributionSource-DrupalContribution.md#create)**
           : mixed

  *{@inheritdoc}*

- **[getNotificationMessage()](../classes/Drupal-ct-drupal-Plugin-ContributionSource-DrupalContribution.md#getnotificationmessage)**
           : string

  *Get message for notification.*

- **[getUserCodeContributions()](../classes/Drupal-ct-drupal-Plugin-ContributionSource-DrupalContribution.md#getusercodecontributions)**
           : mixed

  *Get comments from the total contribution data.*

- **[getUserIssues()](../classes/Drupal-ct-drupal-Plugin-ContributionSource-DrupalContribution.md#getuserissues)**
           : mixed

  *Get issues from the total contribution data.*

- **[getUsers()](../classes/Drupal-ct-drupal-Plugin-ContributionSource-DrupalContribution.md#getusers)**
           : mixed

  *Get all users with drupal.org username.*

- **[isUserValid()](../classes/Drupal-ct-drupal-Plugin-ContributionSource-DrupalContribution.md#isuservalid)**
           : bool

  *Get user contributions from the platform.*







### Properties

#### $contributionStorage

<small>[DrupalContribution.php](../files/web-modules-custom-ct-drupal-src-plugin-contributionsource-drupalcontribution.md) : Line 58</small>

*Contribution Storage service.*


protected [ContributionTrackerStorage](../classes/Drupal-ct-manager-ContributionTrackerStorage.md) $contributionStorage







#### $doRetriever

<small>[DrupalContribution.php](../files/web-modules-custom-ct-drupal-src-plugin-contributionsource-drupalcontribution.md) : Line 44</small>

*Retrievers for each user.*


protected [DrupalOrgRetriever](../classes/Drupal-ct-drupal-DrupalOrgRetriever.md) $doRetriever







#### $doUserInfoRetriever

<small>[DrupalContribution.php](../files/web-modules-custom-ct-drupal-src-plugin-contributionsource-drupalcontribution.md) : Line 51</small>

*do_username service.*


protected [DOUserInfoRetriever](# "\Drupal\do_username\DOUserInfoRetriever") $doUserInfoRetriever







#### $entityTypeManager

<small>[DrupalContribution.php](../files/web-modules-custom-ct-drupal-src-plugin-contributionsource-drupalcontribution.md) : Line 37</small>

*Entity type manager.*


protected [EntityTypeManagerInterface](# "\Drupal\Core\Entity\EntityTypeManagerInterface") $entityTypeManager







#### $logger

<small>[DrupalContribution.php](../files/web-modules-custom-ct-drupal-src-plugin-contributionsource-drupalcontribution.md) : Line 65</small>

*Logger.*


protected [LoggerChannelInterface](# "\Drupal\Core\Logger\LoggerChannelInterface") $logger







#### $timeService

<small>[DrupalContribution.php](../files/web-modules-custom-ct-drupal-src-plugin-contributionsource-drupalcontribution.md) : Line 72</small>

*datetime.time service.*


protected [TimeInterface](# "\Drupal\Component\Datetime\TimeInterface") $timeService









### Methods

#### __construct()

<small>[DrupalContribution.php](../files/web-modules-custom-ct-drupal-src-plugin-contributionsource-drupalcontribution.md) : Line 96</small>

*Constructs a Drupal\rest\Plugin\ResourceBase object.*

!!! note ""
    __construct(array&lt;string|int, mixed&gt; $configuration, string $plugin_id, mixed $plugin_definition, [EntityTypeManagerInterface](# "\Drupal\Core\Entity\EntityTypeManagerInterface") $entityTypeManager, [DrupalOrgRetriever](../classes/Drupal-ct-drupal-DrupalOrgRetriever.md) $doRetriever, [DOUserInfoRetriever](# "\Drupal\do_username\DOUserInfoRetriever") $doUserInfoRetriever, [ContributionTrackerStorage](../classes/Drupal-ct-manager-ContributionTrackerStorage.md) $contributionStorage, [LoggerChannelInterface](# "\Drupal\Core\Logger\LoggerChannelInterface") $loggerChannel, [TimeInterface](# "\Drupal\Component\Datetime\TimeInterface") $timeService) :mixed




**Parameters**

- **$configuration**: array&lt;string|int, mixed&gt;
  
  *A configuration array containing information about the plugin instance.*

- **$plugin_id**: string
  
  *The plugin_id for the plugin instance.*

- **$plugin_definition**: mixed
  
  *The plugin_definition for the plugin instance.*

- **$entityTypeManager**: [EntityTypeManagerInterface](# "\Drupal\Core\Entity\EntityTypeManagerInterface")
  
  *The injected entity type manager service.*

- **$doRetriever**: [DrupalOrgRetriever](../classes/Drupal-ct-drupal-DrupalOrgRetriever.md)
  
  *Wrapper for Drupal.org API.*

- **$doUserInfoRetriever**: [DOUserInfoRetriever](# "\Drupal\do_username\DOUserInfoRetriever")
  
  *The injected DO UserInfoRetriever service.*

- **$contributionStorage**: [ContributionTrackerStorage](../classes/Drupal-ct-manager-ContributionTrackerStorage.md)
  
  *The contribution storage service.*

- **$loggerChannel**: [LoggerChannelInterface](# "\Drupal\Core\Logger\LoggerChannelInterface")
  
  *The logger service.*

- **$timeService**: [TimeInterface](# "\Drupal\Component\Datetime\TimeInterface")
  
  *The datetime.time service.*








#### create()

<small>[DrupalContribution.php](../files/web-modules-custom-ct-drupal-src-plugin-contributionsource-drupalcontribution.md) : Line 109</small>

*{@inheritdoc}*

!!! note ""
    static create([ContainerInterface](# "\Symfony\Component\DependencyInjection\ContainerInterface") $container, array&lt;string|int, mixed&gt; $configuration, mixed $plugin_id, mixed $plugin_definition) :mixed




**Parameters**

- **$container**: [ContainerInterface](# "\Symfony\Component\DependencyInjection\ContainerInterface")
  
  **

- **$configuration**: array&lt;string|int, mixed&gt;
  
  **

- **$plugin_id**: mixed
  
  **

- **$plugin_definition**: mixed
  
  **








#### getNotificationMessage()

<small>[DrupalContribution.php](../files/web-modules-custom-ct-drupal-src-plugin-contributionsource-drupalcontribution.md) : Line 224</small>

*Get message for notification.*

!!! note ""
    getNotificationMessage([CodeContribution](../classes/Drupal-ct-manager-Data-CodeContribution.md) $contribution, [User](# "\Drupal\user\Entity\User") $user) :string




**Parameters**

- **$contribution**: [CodeContribution](../classes/Drupal-ct-manager-Data-CodeContribution.md)
  
  **

- **$user**: [User](# "\Drupal\user\Entity\User")
  
  **






**Return Values**

- string



#### getUserCodeContributions()

<small>[DrupalContribution.php](../files/web-modules-custom-ct-drupal-src-plugin-contributionsource-drupalcontribution.md) : Line 157</small>

*Get comments from the total contribution data.*

!!! note ""
    getUserCodeContributions([User](# "\Drupal\user\Entity\User") $user) :mixed




**Parameters**

- **$user**: [User](# "\Drupal\user\Entity\User")
  
  **








#### getUserIssues()

<small>[DrupalContribution.php](../files/web-modules-custom-ct-drupal-src-plugin-contributionsource-drupalcontribution.md) : Line 150</small>

*Get issues from the total contribution data.*

!!! note ""
    getUserIssues([User](# "\Drupal\user\Entity\User") $user) :mixed




**Parameters**

- **$user**: [User](# "\Drupal\user\Entity\User")
  
  **



### Tags

- **SuppressWarnings**
  - (PHPMD.UnusedFormalParameter)





#### getUsers()

<small>[DrupalContribution.php](../files/web-modules-custom-ct-drupal-src-plugin-contributionsource-drupalcontribution.md) : Line 126</small>

*Get all users with drupal.org username.*

!!! note ""
    getUsers() :mixed











#### isUserValid()

<small>[DrupalContribution.php](../files/web-modules-custom-ct-drupal-src-plugin-contributionsource-drupalcontribution.md) : Line 139</small>

*Get user contributions from the platform.*

!!! note ""
    isUserValid([User](# "\Drupal\user\Entity\User") $user) :bool




**Parameters**

- **$user**: [User](# "\Drupal\user\Entity\User")
  
  **






**Return Values**

- bool




