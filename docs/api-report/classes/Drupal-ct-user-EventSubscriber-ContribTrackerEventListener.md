
[Drupal](../namespaces/drupal.md) | [ct_user](../namespaces/drupal-ct-user.md) | [EventSubscriber](../namespaces/drupal-ct-user-eventsubscriber.md)

## ContribTrackerEventListener


- **In Package**:
    - [Application](../packages/Application.md)
  
- **Implements**:
    [EventSubscriberInterface](# &quot;\Symfony\Component\EventDispatcher\EventSubscriberInterface&quot;)  

---





<small>[ContribTrackerEventListener.php](../files/web-modules-custom-ct-user-src-eventsubscriber-contribtrackereventlistener.md) : Line 13</small>

*Event subscriptions for events dispatched by Social Auth.*









### Table of Contents



#### Interfaces
- **[EventSubscriberInterface](# &quot;\Symfony\Component\EventDispatcher\EventSubscriberInterface&quot;)**






#### Properties
- **[$loggerFactory](../classes/Drupal-ct-user-EventSubscriber-ContribTrackerEventListener.md#loggerfactory)**
         : [LoggerChannelInterface](# "\Drupal\Core\Logger\LoggerChannelInterface")  

  *The logger Channel Factory.*


#### Methods
- **[__construct()](../classes/Drupal-ct-user-EventSubscriber-ContribTrackerEventListener.md#__construct)**
           : mixed

  *ContribTrackerEventListener constructor.*

- **[getSubscribedEvents()](../classes/Drupal-ct-user-EventSubscriber-ContribTrackerEventListener.md#getsubscribedevents)**
           : mixed

  *Returns an array of event names this subscriber wants to listen to.*

- **[onSocialAuthUserFieldEvent()](../classes/Drupal-ct-user-EventSubscriber-ContribTrackerEventListener.md#onsocialauthuserfieldevent)**
           : mixed

  *Reacts to the event when users fields are being gathered via Social Auth.*







### Properties

#### $loggerFactory

<small>[ContribTrackerEventListener.php](../files/web-modules-custom-ct-user-src-eventsubscriber-contribtrackereventlistener.md) : Line 21</small>

*The logger Channel Factory.*


protected [LoggerChannelInterface](# "\Drupal\Core\Logger\LoggerChannelInterface") $loggerFactory

The loggerFactory interface alias.







### Methods

#### __construct()

<small>[ContribTrackerEventListener.php](../files/web-modules-custom-ct-user-src-eventsubscriber-contribtrackereventlistener.md) : Line 63</small>

*ContribTrackerEventListener constructor.*

!!! note ""
    __construct([LoggerChannelFactoryInterface](# "\Drupal\Core\Logger\LoggerChannelFactoryInterface") $loggerChannelFactory) :mixed




**Parameters**

- **$loggerChannelFactory**: [LoggerChannelFactoryInterface](# "\Drupal\Core\Logger\LoggerChannelFactoryInterface")
    Logger Channel Factory interface.







#### getSubscribedEvents()

<small>[ContribTrackerEventListener.php](../files/web-modules-custom-ct-user-src-eventsubscriber-contribtrackereventlistener.md) : Line 51</small>

*Returns an array of event names this subscriber wants to listen to.*

!!! note ""
    static getSubscribedEvents() :mixed











#### onSocialAuthUserFieldEvent()

<small>[ContribTrackerEventListener.php](../files/web-modules-custom-ct-user-src-eventsubscriber-contribtrackereventlistener.md) : Line 31</small>

*Reacts to the event when users fields are being gathered via Social Auth.*

!!! note ""
    onSocialAuthUserFieldEvent([UserFieldsEvent](# "\Drupal\social_auth\Event\UserFieldsEvent") $event) :mixed




**Parameters**

- **$event**: [UserFieldsEvent](# "\Drupal\social_auth\Event\UserFieldsEvent")
    Object returned by UserEvent.


### Tags

- **throws**
  - Type: [EntityStorageException](# "\Drupal\Core\Entity\EntityStorageException")
  - 






