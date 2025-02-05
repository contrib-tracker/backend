
- [Drupal](../namespaces/drupal.md)
- [ct_manager](../namespaces/drupal-ct-manager.md)
- [Plugin](../namespaces/drupal-ct-manager-plugin.md)
- [QueueWorker](../namespaces/drupal-ct-manager-plugin-queueworker.md)


## ProcessUsers

- **extends**: [QueueWorkerBase](# \Drupal\Core\Queue\QueueWorkerBase)

- **In Package**:
    - [Application](../packages/Application.md)
  
- **Implements**:
    [ContainerFactoryPluginInterface](# \Drupal\Core\Plugin\ContainerFactoryPluginInterface)  

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
- **[ContainerFactoryPluginInterface](# \Drupal\Core\Plugin\ContainerFactoryPluginInterface)**






#### Properties
- **[$contribStorage](../classes/Drupal-ct-manager-Plugin-QueueWorker-ProcessUsers.md#contribstorage)**
         : [ContributionTrackerStorage](../classes/Drupal-ct-manager-ContributionTrackerStorage.md)  
*Contribution manager service.*

- **[$logger](../classes/Drupal-ct-manager-Plugin-QueueWorker-ProcessUsers.md#logger)**
         : [LoggerChannelInterface](# \Drupal\Core\Logger\LoggerChannelInterface)  
*The logger interface.*

- **[$pluginManager](../classes/Drupal-ct-manager-Plugin-QueueWorker-ProcessUsers.md#pluginmanager)**
         : [ContributionSourcePluginManager](../classes/Drupal-ct-manager-ContributionSourcePluginManager.md)  
*Contribution plugin manager.*

- **[$slackService](../classes/Drupal-ct-manager-Plugin-QueueWorker-ProcessUsers.md#slackservice)**
         : [Slack](# \Drupal\slack\Slack)  
*Slack service.*


#### Methods
- **[__construct()](../classes/Drupal-ct-manager-Plugin-QueueWorker-ProcessUsers.md#__construct)**
           : mixed
*{@inheritdoc}*

- **[create()](../classes/Drupal-ct-manager-Plugin-QueueWorker-ProcessUsers.md#create)**
           : mixed
*{@inheritdoc}*

- **[processItem()](../classes/Drupal-ct-manager-Plugin-QueueWorker-ProcessUsers.md#processitem)**
           : mixed
*Collects user contribution and stores it.*







### Properties

#### $contribStorage

[ProcessUsers.php](../files/web-modules-custom-ct-manager-src-plugin-queueworker-processusers.md) : Line 39

*Contribution manager service.*


protected [ContributionTrackerStorage](../classes/Drupal-ct-manager-ContributionTrackerStorage.md) $contribStorage







#### $logger

[ProcessUsers.php](../files/web-modules-custom-ct-manager-src-plugin-queueworker-processusers.md) : Line 46

*The logger interface.*


protected [LoggerChannelInterface](# \Drupal\Core\Logger\LoggerChannelInterface) $logger







#### $pluginManager

[ProcessUsers.php](../files/web-modules-custom-ct-manager-src-plugin-queueworker-processusers.md) : Line 32

*Contribution plugin manager.*


protected [ContributionSourcePluginManager](../classes/Drupal-ct-manager-ContributionSourcePluginManager.md) $pluginManager







#### $slackService

[ProcessUsers.php](../files/web-modules-custom-ct-manager-src-plugin-queueworker-processusers.md) : Line 53

*Slack service.*


protected [Slack](# \Drupal\slack\Slack) $slackService









### Methods

#### __construct()

[ProcessUsers.php](../files/web-modules-custom-ct-manager-src-plugin-queueworker-processusers.md) : Line 58

*{@inheritdoc}*

!!! Signature
    __construct(array&lt;string|int, mixed&gt; $configuration, mixed $pluginId, mixed $pluginDefinition, [ContributionSourcePluginManager](../classes/Drupal-ct-manager-ContributionSourcePluginManager.md) $pluginManager, [ContributionTrackerStorage](../classes/Drupal-ct-manager-ContributionTrackerStorage.md) $contribStorage, [LoggerChannelInterface](# \Drupal\Core\Logger\LoggerChannelInterface) $logger, [Slack](# \Drupal\slack\Slack) $slackService) :mixed




**Parameters**

- **$configuration**: array&lt;string|int, mixed&gt;
    
- **$pluginId**: mixed
    
- **$pluginDefinition**: mixed
    
- **$pluginManager**: [ContributionSourcePluginManager](../classes/Drupal-ct-manager-ContributionSourcePluginManager.md)
    
- **$contribStorage**: [ContributionTrackerStorage](../classes/Drupal-ct-manager-ContributionTrackerStorage.md)
    
- **$logger**: [LoggerChannelInterface](# \Drupal\Core\Logger\LoggerChannelInterface)
    
- **$slackService**: [Slack](# \Drupal\slack\Slack)
    







#### create()

[ProcessUsers.php](../files/web-modules-custom-ct-manager-src-plugin-queueworker-processusers.md) : Line 70

*{@inheritdoc}*

!!! Signature
    static create([ContainerInterface](# \Symfony\Component\DependencyInjection\ContainerInterface) $container, array&lt;string|int, mixed&gt; $configuration, mixed $pluginId, mixed $pluginDefinition) :mixed




**Parameters**

- **$container**: [ContainerInterface](# \Symfony\Component\DependencyInjection\ContainerInterface)
    
- **$configuration**: array&lt;string|int, mixed&gt;
    
- **$pluginId**: mixed
    
- **$pluginDefinition**: mixed
    







#### processItem()

[ProcessUsers.php](../files/web-modules-custom-ct-manager-src-plugin-queueworker-processusers.md) : Line 85

*Collects user contribution and stores it.*

!!! Signature
    processItem(mixed $data) :mixed




**Parameters**

- **$data**: mixed
    








