

- [Drupal](../namespaces/drupal.md)
- [ct_drupal](../namespaces/drupal-ct-drupal.md)
- [Plugin](../namespaces/drupal-ct-drupal-plugin.md)
- [ContributionSource](../namespaces/drupal-ct-drupal-plugin-contributionsource.md)


### 
## DrupalContribution

- **Extends**: `[PluginBase](../\Drupal\Component\Plugin\PluginBase)`

- **In Package**:
    - [Application](../packages/Application.md)
  
- **Implements**:
    `[ContributionSourceInterface](../classes/Drupal-ct-manager-ContributionSourceInterface.md), `
    `[ContainerFactoryPluginInterface](../\Drupal\Core\Plugin\ContainerFactoryPluginInterface)`
  

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
- **[ContainerFactoryPluginInterface](../\Drupal\Core\Plugin\ContainerFactoryPluginInterface)**






#### Properties

- **[$contributionStorage](../classes/Drupal-ct-drupal-Plugin-ContributionSource-DrupalContribution.md#property_contributionStorage)**
         : `<a href="classes/Drupal-ct-manager-ContributionTrackerStorage.html"><abbr title="\Drupal\ct_manager\ContributionTrackerStorage">ContributionTrackerStorage</abbr></a>`  
*Contribution Storage service.*


- **[$doRetriever](../classes/Drupal-ct-drupal-Plugin-ContributionSource-DrupalContribution.md#property_doRetriever)**
         : `<a href="classes/Drupal-ct-drupal-DrupalOrgRetriever.html"><abbr title="\Drupal\ct_drupal\DrupalOrgRetriever">DrupalOrgRetriever</abbr></a>`  
*Retrievers for each user.*


- **[$doUserInfoRetriever](../classes/Drupal-ct-drupal-Plugin-ContributionSource-DrupalContribution.md#property_doUserInfoRetriever)**
         : `<abbr title="\Drupal\do_username\DOUserInfoRetriever">DOUserInfoRetriever</abbr>`  
*do_username service.*


- **[$entityTypeManager](../classes/Drupal-ct-drupal-Plugin-ContributionSource-DrupalContribution.md#property_entityTypeManager)**
         : `<abbr title="\Drupal\Core\Entity\EntityTypeManagerInterface">EntityTypeManagerInterface</abbr>`  
*Entity type manager.*


- **[$logger](../classes/Drupal-ct-drupal-Plugin-ContributionSource-DrupalContribution.md#property_logger)**
         : `<abbr title="\Drupal\Core\Logger\LoggerChannelInterface">LoggerChannelInterface</abbr>`  
*Logger.*


- **[$timeService](../classes/Drupal-ct-drupal-Plugin-ContributionSource-DrupalContribution.md#property_timeService)**
         : `<abbr title="\Drupal\Component\Datetime\TimeInterface">TimeInterface</abbr>`  
*datetime.time service.*


#### Methods

- **[__construct()](../classes/Drupal-ct-drupal-Plugin-ContributionSource-DrupalContribution.md#method___construct)**
           : `mixed`
*Constructs a Drupal\rest\Plugin\ResourceBase object.*


- **[create()](../classes/Drupal-ct-drupal-Plugin-ContributionSource-DrupalContribution.md#method_create)**
           : `mixed`
*{@inheritdoc}*


- **[getNotificationMessage()](../classes/Drupal-ct-drupal-Plugin-ContributionSource-DrupalContribution.md#method_getNotificationMessage)**
           : `string`
*Get message for notification.*


- **[getUserCodeContributions()](../classes/Drupal-ct-drupal-Plugin-ContributionSource-DrupalContribution.md#method_getUserCodeContributions)**
           : `mixed`
*Get comments from the total contribution data.*


- **[getUserIssues()](../classes/Drupal-ct-drupal-Plugin-ContributionSource-DrupalContribution.md#method_getUserIssues)**
           : `mixed`
*Get issues from the total contribution data.*


- **[getUsers()](../classes/Drupal-ct-drupal-Plugin-ContributionSource-DrupalContribution.md#method_getUsers)**
           : `mixed`
*Get all users with drupal.org username.*


- **[isUserValid()](../classes/Drupal-ct-drupal-Plugin-ContributionSource-DrupalContribution.md#method_isUserValid)**
           : `bool`
*Get user contributions from the platform.*







### Properties

#### $contributionStorage


[DrupalContribution.php](../files/web-modules-custom-ct-drupal-src-plugin-contributionsource-drupalcontribution.md) : Line 58

*Contribution Storage service.*



`protected [](../classes/Drupal-ct-manager-ContributionTrackerStorage.md)|UTF-8 $contributionStorage`









#### $doRetriever


[DrupalContribution.php](../files/web-modules-custom-ct-drupal-src-plugin-contributionsource-drupalcontribution.md) : Line 44

*Retrievers for each user.*



`protected [](../classes/Drupal-ct-drupal-DrupalOrgRetriever.md)|UTF-8 $doRetriever`









#### $doUserInfoRetriever


[DrupalContribution.php](../files/web-modules-custom-ct-drupal-src-plugin-contributionsource-drupalcontribution.md) : Line 51

*do_username service.*



`protected [](../\Drupal\do_username\DOUserInfoRetriever)|UTF-8 $doUserInfoRetriever`









#### $entityTypeManager


[DrupalContribution.php](../files/web-modules-custom-ct-drupal-src-plugin-contributionsource-drupalcontribution.md) : Line 37

*Entity type manager.*



`protected [](../\Drupal\Core\Entity\EntityTypeManagerInterface)|UTF-8 $entityTypeManager`









#### $logger


[DrupalContribution.php](../files/web-modules-custom-ct-drupal-src-plugin-contributionsource-drupalcontribution.md) : Line 65

*Logger.*



`protected [](../\Drupal\Core\Logger\LoggerChannelInterface)|UTF-8 $logger`









#### $timeService


[DrupalContribution.php](../files/web-modules-custom-ct-drupal-src-plugin-contributionsource-drupalcontribution.md) : Line 72

*datetime.time service.*



`protected [](../\Drupal\Component\Datetime\TimeInterface)|UTF-8 $timeService`











### Methods

#### __construct()


[DrupalContribution.php](../files/web-modules-custom-ct-drupal-src-plugin-contributionsource-drupalcontribution.md) : Line 96

*Constructs a Drupal\rest\Plugin\ResourceBase object.*

```php
__construct(array&lt;string|int, mixed&gt;  $configuration, string  $plugin_id, mixed  $plugin_definition, <abbr title="\Drupal\Core\Entity\EntityTypeManagerInterface">EntityTypeManagerInterface</abbr>  $entityTypeManager, <a href="classes/Drupal-ct-drupal-DrupalOrgRetriever.html"><abbr title="\Drupal\ct_drupal\DrupalOrgRetriever">DrupalOrgRetriever</abbr></a>  $doRetriever, <abbr title="\Drupal\do_username\DOUserInfoRetriever">DOUserInfoRetriever</abbr>  $doUserInfoRetriever, <a href="classes/Drupal-ct-manager-ContributionTrackerStorage.html"><abbr title="\Drupal\ct_manager\ContributionTrackerStorage">ContributionTrackerStorage</abbr></a>  $contributionStorage, <abbr title="\Drupal\Core\Logger\LoggerChannelInterface">LoggerChannelInterface</abbr>  $loggerChannel, <abbr title="\Drupal\Component\Datetime\TimeInterface">TimeInterface</abbr>  $timeService) :mixed
```





#### Parameters

- **$configuration**: array&amp;lt;string|int, mixed&amp;gt;
    
A configuration array containing information about the plugin instance.

- **$plugin_id**: string
    
The plugin_id for the plugin instance.

- **$plugin_definition**: mixed
    
The plugin_definition for the plugin instance.

- **$entityTypeManager**: &lt;abbr title=&quot;\Drupal\Core\Entity\EntityTypeManagerInterface&quot;&gt;EntityTypeManagerInterface&lt;/abbr&gt;
    
The injected entity type manager service.

- **$doRetriever**: &lt;a href=&quot;classes/Drupal-ct-drupal-DrupalOrgRetriever.html&quot;&gt;&lt;abbr title=&quot;\Drupal\ct_drupal\DrupalOrgRetriever&quot;&gt;DrupalOrgRetriever&lt;/abbr&gt;&lt;/a&gt;
    
Wrapper for Drupal.org API.

- **$doUserInfoRetriever**: &lt;abbr title=&quot;\Drupal\do_username\DOUserInfoRetriever&quot;&gt;DOUserInfoRetriever&lt;/abbr&gt;
    
The injected DO UserInfoRetriever service.

- **$contributionStorage**: &lt;a href=&quot;classes/Drupal-ct-manager-ContributionTrackerStorage.html&quot;&gt;&lt;abbr title=&quot;\Drupal\ct_manager\ContributionTrackerStorage&quot;&gt;ContributionTrackerStorage&lt;/abbr&gt;&lt;/a&gt;
    
The contribution storage service.

- **$loggerChannel**: &lt;abbr title=&quot;\Drupal\Core\Logger\LoggerChannelInterface&quot;&gt;LoggerChannelInterface&lt;/abbr&gt;
    
The logger service.

- **$timeService**: &lt;abbr title=&quot;\Drupal\Component\Datetime\TimeInterface&quot;&gt;TimeInterface&lt;/abbr&gt;
    
The datetime.time service.










#### create()


[DrupalContribution.php](../files/web-modules-custom-ct-drupal-src-plugin-contributionsource-drupalcontribution.md) : Line 109

*{@inheritdoc}*

```php
static create(<abbr title="\Symfony\Component\DependencyInjection\ContainerInterface">ContainerInterface</abbr>  $container, array&lt;string|int, mixed&gt;  $configuration, mixed  $plugin_id, mixed  $plugin_definition) :mixed
```





#### Parameters

- **$container**: &lt;abbr title=&quot;\Symfony\Component\DependencyInjection\ContainerInterface&quot;&gt;ContainerInterface&lt;/abbr&gt;
    
- **$configuration**: array&amp;lt;string|int, mixed&amp;gt;
    
- **$plugin_id**: mixed
    
- **$plugin_definition**: mixed
    









#### getNotificationMessage()


[DrupalContribution.php](../files/web-modules-custom-ct-drupal-src-plugin-contributionsource-drupalcontribution.md) : Line 224

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


[DrupalContribution.php](../files/web-modules-custom-ct-drupal-src-plugin-contributionsource-drupalcontribution.md) : Line 157

*Get comments from the total contribution data.*

```php
getUserCodeContributions(<abbr title="\Drupal\user\Entity\User">User</abbr>  $user) :mixed
```





#### Parameters

- **$user**: &lt;abbr title=&quot;\Drupal\user\Entity\User&quot;&gt;User&lt;/abbr&gt;
    









#### getUserIssues()


[DrupalContribution.php](../files/web-modules-custom-ct-drupal-src-plugin-contributionsource-drupalcontribution.md) : Line 150

*Get issues from the total contribution data.*

```php
getUserIssues(<abbr title="\Drupal\user\Entity\User">User</abbr>  $user) :mixed
```





#### Parameters

- **$user**: &lt;abbr title=&quot;\Drupal\user\Entity\User&quot;&gt;User&lt;/abbr&gt;
    



### Tags

- **SuppressWarnings**
            - (PHPMD.UnusedFormalParameter)

  





#### getUsers()


[DrupalContribution.php](../files/web-modules-custom-ct-drupal-src-plugin-contributionsource-drupalcontribution.md) : Line 126

*Get all users with drupal.org username.*

```php
getUsers() :mixed
```














#### isUserValid()


[DrupalContribution.php](../files/web-modules-custom-ct-drupal-src-plugin-contributionsource-drupalcontribution.md) : Line 139

*Get user contributions from the platform.*

```php
isUserValid(<abbr title="\Drupal\user\Entity\User">User</abbr>  $user) :bool
```





#### Parameters

- **$user**: &lt;abbr title=&quot;\Drupal\user\Entity\User&quot;&gt;User&lt;/abbr&gt;
    







#### Return Values

bool




