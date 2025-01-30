

- [Drupal](../namespaces/drupal.md)
- [ct_manager](../namespaces/drupal-ct-manager.md)
- [Plugin](../namespaces/drupal-ct-manager-plugin.md)
- [QueueWorker](../namespaces/drupal-ct-manager-plugin-queueworker.md)


### 
## ProcessUsers

- **Extends**: `[QueueWorkerBase](../\Drupal\Core\Queue\QueueWorkerBase)`

- **In Package**:
    - [Application](../packages/Application.md)
  
- **Implements**:
    `[ContainerFactoryPluginInterface](../\Drupal\Core\Plugin\ContainerFactoryPluginInterface)`
  

---






[ProcessUsers.php](../files/web-modules-custom-ct-manager-src-plugin-queueworker-processusers.md) : Line 25

*Processes users for individual plugin implementations.*





### Tags

- **QueueWorker**
            - (
  id = "ct_manager_process_users",
  title = @Translation("Process users for each plugin implementation of
  ct_manager"), cron = {"time" = 600}
)

  





### Table of Contents



#### Interfaces
- **[ContainerFactoryPluginInterface](../\Drupal\Core\Plugin\ContainerFactoryPluginInterface)**






#### Properties

- **[$contribStorage](../classes/Drupal-ct-manager-Plugin-QueueWorker-ProcessUsers.md#property_contribStorage)**
         : `<a href="classes/Drupal-ct-manager-ContributionTrackerStorage.html"><abbr title="\Drupal\ct_manager\ContributionTrackerStorage">ContributionTrackerStorage</abbr></a>`  
*Contribution manager service.*


- **[$logger](../classes/Drupal-ct-manager-Plugin-QueueWorker-ProcessUsers.md#property_logger)**
         : `<abbr title="\Drupal\Core\Logger\LoggerChannelInterface">LoggerChannelInterface</abbr>`  
*The logger interface.*


- **[$pluginManager](../classes/Drupal-ct-manager-Plugin-QueueWorker-ProcessUsers.md#property_pluginManager)**
         : `<a href="classes/Drupal-ct-manager-ContributionSourcePluginManager.html"><abbr title="\Drupal\ct_manager\ContributionSourcePluginManager">ContributionSourcePluginManager</abbr></a>`  
*Contribution plugin manager.*


- **[$slackService](../classes/Drupal-ct-manager-Plugin-QueueWorker-ProcessUsers.md#property_slackService)**
         : `<abbr title="\Drupal\slack\Slack">Slack</abbr>`  
*Slack service.*


#### Methods

- **[__construct()](../classes/Drupal-ct-manager-Plugin-QueueWorker-ProcessUsers.md#method___construct)**
           : `mixed`
*{@inheritdoc}*


- **[create()](../classes/Drupal-ct-manager-Plugin-QueueWorker-ProcessUsers.md#method_create)**
           : `mixed`
*{@inheritdoc}*


- **[processItem()](../classes/Drupal-ct-manager-Plugin-QueueWorker-ProcessUsers.md#method_processItem)**
           : `mixed`
*Collects user contribution and stores it.*







### Properties

#### $contribStorage


[ProcessUsers.php](../files/web-modules-custom-ct-manager-src-plugin-queueworker-processusers.md) : Line 39

*Contribution manager service.*



`protected [](../classes/Drupal-ct-manager-ContributionTrackerStorage.md)|UTF-8 $contribStorage`









#### $logger


[ProcessUsers.php](../files/web-modules-custom-ct-manager-src-plugin-queueworker-processusers.md) : Line 46

*The logger interface.*



`protected [](../\Drupal\Core\Logger\LoggerChannelInterface)|UTF-8 $logger`









#### $pluginManager


[ProcessUsers.php](../files/web-modules-custom-ct-manager-src-plugin-queueworker-processusers.md) : Line 32

*Contribution plugin manager.*



`protected [](../classes/Drupal-ct-manager-ContributionSourcePluginManager.md)|UTF-8 $pluginManager`









#### $slackService


[ProcessUsers.php](../files/web-modules-custom-ct-manager-src-plugin-queueworker-processusers.md) : Line 53

*Slack service.*



`protected [](../\Drupal\slack\Slack)|UTF-8 $slackService`











### Methods

#### __construct()


[ProcessUsers.php](../files/web-modules-custom-ct-manager-src-plugin-queueworker-processusers.md) : Line 58

*{@inheritdoc}*

```php
__construct(array&lt;string|int, mixed&gt;  $configuration, mixed  $pluginId, mixed  $pluginDefinition, <a href="classes/Drupal-ct-manager-ContributionSourcePluginManager.html"><abbr title="\Drupal\ct_manager\ContributionSourcePluginManager">ContributionSourcePluginManager</abbr></a>  $pluginManager, <a href="classes/Drupal-ct-manager-ContributionTrackerStorage.html"><abbr title="\Drupal\ct_manager\ContributionTrackerStorage">ContributionTrackerStorage</abbr></a>  $contribStorage, <abbr title="\Drupal\Core\Logger\LoggerChannelInterface">LoggerChannelInterface</abbr>  $logger, <abbr title="\Drupal\slack\Slack">Slack</abbr>  $slackService) :mixed
```





#### Parameters

- **$configuration**: array&amp;lt;string|int, mixed&amp;gt;
    
- **$pluginId**: mixed
    
- **$pluginDefinition**: mixed
    
- **$pluginManager**: &lt;a href=&quot;classes/Drupal-ct-manager-ContributionSourcePluginManager.html&quot;&gt;&lt;abbr title=&quot;\Drupal\ct_manager\ContributionSourcePluginManager&quot;&gt;ContributionSourcePluginManager&lt;/abbr&gt;&lt;/a&gt;
    
- **$contribStorage**: &lt;a href=&quot;classes/Drupal-ct-manager-ContributionTrackerStorage.html&quot;&gt;&lt;abbr title=&quot;\Drupal\ct_manager\ContributionTrackerStorage&quot;&gt;ContributionTrackerStorage&lt;/abbr&gt;&lt;/a&gt;
    
- **$logger**: &lt;abbr title=&quot;\Drupal\Core\Logger\LoggerChannelInterface&quot;&gt;LoggerChannelInterface&lt;/abbr&gt;
    
- **$slackService**: &lt;abbr title=&quot;\Drupal\slack\Slack&quot;&gt;Slack&lt;/abbr&gt;
    









#### create()


[ProcessUsers.php](../files/web-modules-custom-ct-manager-src-plugin-queueworker-processusers.md) : Line 70

*{@inheritdoc}*

```php
static create(<abbr title="\Symfony\Component\DependencyInjection\ContainerInterface">ContainerInterface</abbr>  $container, array&lt;string|int, mixed&gt;  $configuration, mixed  $pluginId, mixed  $pluginDefinition) :mixed
```





#### Parameters

- **$container**: &lt;abbr title=&quot;\Symfony\Component\DependencyInjection\ContainerInterface&quot;&gt;ContainerInterface&lt;/abbr&gt;
    
- **$configuration**: array&amp;lt;string|int, mixed&amp;gt;
    
- **$pluginId**: mixed
    
- **$pluginDefinition**: mixed
    









#### processItem()


[ProcessUsers.php](../files/web-modules-custom-ct-manager-src-plugin-queueworker-processusers.md) : Line 85

*Collects user contribution and stores it.*

```php
processItem(mixed  $data) :mixed
```





#### Parameters

- **$data**: mixed
    










