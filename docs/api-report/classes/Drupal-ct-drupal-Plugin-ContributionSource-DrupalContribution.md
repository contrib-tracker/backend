
- [Drupal](../namespaces/drupal.md)
- [ct_drupal](../namespaces/drupal-ct-drupal.md)
- [Plugin](../namespaces/drupal-ct-drupal-plugin.md)
- [ContributionSource](../namespaces/drupal-ct-drupal-plugin-contributionsource.md)


## DrupalContribution

- **extends**: [PluginBase](# \Drupal\Component\Plugin\PluginBase)

- **In Package**:
    - [Application](../packages/Application.md)
  
- **Implements**:
    [ContributionSourceInterface](../classes/Drupal-ct-manager-ContributionSourceInterface.md),     [ContainerFactoryPluginInterface](# \Drupal\Core\Plugin\ContainerFactoryPluginInterface)  

---





[DrupalContribution.php](../files/web-modules-custom-ct-drupal-src-plugin-contributionsource-drupalcontribution.md) : Line 30

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
- **[ContainerFactoryPluginInterface](# \Drupal\Core\Plugin\ContainerFactoryPluginInterface)**






#### Properties
- **[$contributionStorage](../classes/Drupal-ct-drupal-Plugin-ContributionSource-DrupalContribution.md#contributionstorage)**
         : [ContributionTrackerStorage](../classes/Drupal-ct-manager-ContributionTrackerStorage.md)  
*Contribution Storage service.*

- **[$doRetriever](../classes/Drupal-ct-drupal-Plugin-ContributionSource-DrupalContribution.md#doretriever)**
         : [DrupalOrgRetriever](../classes/Drupal-ct-drupal-DrupalOrgRetriever.md)  
*Retrievers for each user.*

- **[$doUserInfoRetriever](../classes/Drupal-ct-drupal-Plugin-ContributionSource-DrupalContribution.md#douserinforetriever)**
         : [DOUserInfoRetriever](# \Drupal\do_username\DOUserInfoRetriever)  
*do_username service.*

- **[$entityTypeManager](../classes/Drupal-ct-drupal-Plugin-ContributionSource-DrupalContribution.md#entitytypemanager)**
         : [EntityTypeManagerInterface](# \Drupal\Core\Entity\EntityTypeManagerInterface)  
*Entity type manager.*

- **[$logger](../classes/Drupal-ct-drupal-Plugin-ContributionSource-DrupalContribution.md#logger)**
         : [LoggerChannelInterface](# \Drupal\Core\Logger\LoggerChannelInterface)  
*Logger.*

- **[$timeService](../classes/Drupal-ct-drupal-Plugin-ContributionSource-DrupalContribution.md#timeservice)**
         : [TimeInterface](# \Drupal\Component\Datetime\TimeInterface)  
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

[DrupalContribution.php](../files/web-modules-custom-ct-drupal-src-plugin-contributionsource-drupalcontribution.md) : Line 58

*Contribution Storage service.*


protected [ContributionTrackerStorage](../classes/Drupal-ct-manager-ContributionTrackerStorage.md) $contributionStorage







#### $doRetriever

[DrupalContribution.php](../files/web-modules-custom-ct-drupal-src-plugin-contributionsource-drupalcontribution.md) : Line 44

*Retrievers for each user.*


protected [DrupalOrgRetriever](../classes/Drupal-ct-drupal-DrupalOrgRetriever.md) $doRetriever







#### $doUserInfoRetriever

[DrupalContribution.php](../files/web-modules-custom-ct-drupal-src-plugin-contributionsource-drupalcontribution.md) : Line 51

*do_username service.*


protected [DOUserInfoRetriever](# \Drupal\do_username\DOUserInfoRetriever) $doUserInfoRetriever







#### $entityTypeManager

[DrupalContribution.php](../files/web-modules-custom-ct-drupal-src-plugin-contributionsource-drupalcontribution.md) : Line 37

*Entity type manager.*


protected [EntityTypeManagerInterface](# \Drupal\Core\Entity\EntityTypeManagerInterface) $entityTypeManager







#### $logger

[DrupalContribution.php](../files/web-modules-custom-ct-drupal-src-plugin-contributionsource-drupalcontribution.md) : Line 65

*Logger.*


protected [LoggerChannelInterface](# \Drupal\Core\Logger\LoggerChannelInterface) $logger







#### $timeService

[DrupalContribution.php](../files/web-modules-custom-ct-drupal-src-plugin-contributionsource-drupalcontribution.md) : Line 72

*datetime.time service.*


protected [TimeInterface](# \Drupal\Component\Datetime\TimeInterface) $timeService









### Methods

#### __construct()

[DrupalContribution.php](../files/web-modules-custom-ct-drupal-src-plugin-contributionsource-drupalcontribution.md) : Line 96

*Constructs a Drupal\rest\Plugin\ResourceBase object.*

!!! Signature
    __construct(array&lt;string|int, mixed&gt; $configuration, string $plugin_id, mixed $plugin_definition, [EntityTypeManagerInterface](# \Drupal\Core\Entity\EntityTypeManagerInterface) $entityTypeManager, [DrupalOrgRetriever](../classes/Drupal-ct-drupal-DrupalOrgRetriever.md) $doRetriever, [DOUserInfoRetriever](# \Drupal\do_username\DOUserInfoRetriever) $doUserInfoRetriever, [ContributionTrackerStorage](../classes/Drupal-ct-manager-ContributionTrackerStorage.md) $contributionStorage, [LoggerChannelInterface](# \Drupal\Core\Logger\LoggerChannelInterface) $loggerChannel, [TimeInterface](# \Drupal\Component\Datetime\TimeInterface) $timeService) :mixed




**Parameters**

- **$configuration**: array&lt;string|int, mixed&gt;
    
A configuration array containing information about the plugin instance.

- **$plugin_id**: string
    
The plugin_id for the plugin instance.

- **$plugin_definition**: mixed
    
The plugin_definition for the plugin instance.

- **$entityTypeManager**: [EntityTypeManagerInterface](# \Drupal\Core\Entity\EntityTypeManagerInterface)
    
The injected entity type manager service.

- **$doRetriever**: [DrupalOrgRetriever](../classes/Drupal-ct-drupal-DrupalOrgRetriever.md)
    
Wrapper for Drupal.org API.

- **$doUserInfoRetriever**: [DOUserInfoRetriever](# \Drupal\do_username\DOUserInfoRetriever)
    
The injected DO UserInfoRetriever service.

- **$contributionStorage**: [ContributionTrackerStorage](../classes/Drupal-ct-manager-ContributionTrackerStorage.md)
    
The contribution storage service.

- **$loggerChannel**: [LoggerChannelInterface](# \Drupal\Core\Logger\LoggerChannelInterface)
    
The logger service.

- **$timeService**: [TimeInterface](# \Drupal\Component\Datetime\TimeInterface)
    
The datetime.time service.








#### create()

[DrupalContribution.php](../files/web-modules-custom-ct-drupal-src-plugin-contributionsource-drupalcontribution.md) : Line 109

*{@inheritdoc}*

!!! Signature
    static create([ContainerInterface](# \Symfony\Component\DependencyInjection\ContainerInterface) $container, array&lt;string|int, mixed&gt; $configuration, mixed $plugin_id, mixed $plugin_definition) :mixed




**Parameters**

- **$container**: [ContainerInterface](# \Symfony\Component\DependencyInjection\ContainerInterface)
    
- **$configuration**: array&lt;string|int, mixed&gt;
    
- **$plugin_id**: mixed
    
- **$plugin_definition**: mixed
    







#### getNotificationMessage()

[DrupalContribution.php](../files/web-modules-custom-ct-drupal-src-plugin-contributionsource-drupalcontribution.md) : Line 224

*Get message for notification.*

!!! Signature
    getNotificationMessage([CodeContribution](../classes/Drupal-ct-manager-Data-CodeContribution.md) $contribution, [User](# \Drupal\user\Entity\User) $user) :string




**Parameters**

- **$contribution**: [CodeContribution](../classes/Drupal-ct-manager-Data-CodeContribution.md)
    
- **$user**: [User](# \Drupal\user\Entity\User)
    





**Return Values**

string



#### getUserCodeContributions()

[DrupalContribution.php](../files/web-modules-custom-ct-drupal-src-plugin-contributionsource-drupalcontribution.md) : Line 157

*Get comments from the total contribution data.*

!!! Signature
    getUserCodeContributions([User](# \Drupal\user\Entity\User) $user) :mixed




**Parameters**

- **$user**: [User](# \Drupal\user\Entity\User)
    







#### getUserIssues()

[DrupalContribution.php](../files/web-modules-custom-ct-drupal-src-plugin-contributionsource-drupalcontribution.md) : Line 150

*Get issues from the total contribution data.*

!!! Signature
    getUserIssues([User](# \Drupal\user\Entity\User) $user) :mixed




**Parameters**

- **$user**: [User](# \Drupal\user\Entity\User)
    


### Tags

- **SuppressWarnings**
  - (PHPMD.UnusedFormalParameter)






#### getUsers()

[DrupalContribution.php](../files/web-modules-custom-ct-drupal-src-plugin-contributionsource-drupalcontribution.md) : Line 126

*Get all users with drupal.org username.*

!!! Signature
    getUsers() :mixed











#### isUserValid()

[DrupalContribution.php](../files/web-modules-custom-ct-drupal-src-plugin-contributionsource-drupalcontribution.md) : Line 139

*Get user contributions from the platform.*

!!! Signature
    isUserValid([User](# \Drupal\user\Entity\User) $user) :bool




**Parameters**

- **$user**: [User](# \Drupal\user\Entity\User)
    





**Return Values**

bool




