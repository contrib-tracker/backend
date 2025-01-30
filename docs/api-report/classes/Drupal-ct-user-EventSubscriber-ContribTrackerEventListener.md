

- [Drupal](../namespaces/drupal.md)
- [ct_user](../namespaces/drupal-ct-user.md)
- [EventSubscriber](../namespaces/drupal-ct-user-eventsubscriber.md)


### 
## ContribTrackerEventListener


- **In Package**:
    - [Application](../packages/Application.md)
  
- **Implements**:
    `[EventSubscriberInterface](../\Symfony\Component\EventDispatcher\EventSubscriberInterface)`
  

---






[ContribTrackerEventListener.php](../files/web-modules-custom-ct-user-src-eventsubscriber-contribtrackereventlistener.md) : Line 13

*Event subscriptions for events dispatched by Social Auth.*











### Table of Contents



#### Interfaces
- **[EventSubscriberInterface](../\Symfony\Component\EventDispatcher\EventSubscriberInterface)**






#### Properties

- **[$loggerFactory](../classes/Drupal-ct-user-EventSubscriber-ContribTrackerEventListener.md#property_loggerFactory)**
         : `<abbr title="\Drupal\Core\Logger\LoggerChannelInterface">LoggerChannelInterface</abbr>`  
*The logger Channel Factory.*


#### Methods

- **[__construct()](../classes/Drupal-ct-user-EventSubscriber-ContribTrackerEventListener.md#method___construct)**
           : `mixed`
*ContribTrackerEventListener constructor.*


- **[getSubscribedEvents()](../classes/Drupal-ct-user-EventSubscriber-ContribTrackerEventListener.md#method_getSubscribedEvents)**
           : `mixed`
*Returns an array of event names this subscriber wants to listen to.*


- **[onSocialAuthUserFieldEvent()](../classes/Drupal-ct-user-EventSubscriber-ContribTrackerEventListener.md#method_onSocialAuthUserFieldEvent)**
           : `mixed`
*Reacts to the event when users fields are being gathered via Social Auth.*







### Properties

#### $loggerFactory


[ContribTrackerEventListener.php](../files/web-modules-custom-ct-user-src-eventsubscriber-contribtrackereventlistener.md) : Line 21

*The logger Channel Factory.*



`protected [](../\Drupal\Core\Logger\LoggerChannelInterface)|UTF-8 $loggerFactory`



The loggerFactory interface alias.









### Methods

#### __construct()


[ContribTrackerEventListener.php](../files/web-modules-custom-ct-user-src-eventsubscriber-contribtrackereventlistener.md) : Line 63

*ContribTrackerEventListener constructor.*

```php
__construct(<abbr title="\Drupal\Core\Logger\LoggerChannelFactoryInterface">LoggerChannelFactoryInterface</abbr>  $loggerChannelFactory) :mixed
```





#### Parameters

- **$loggerChannelFactory**: &lt;abbr title=&quot;\Drupal\Core\Logger\LoggerChannelFactoryInterface&quot;&gt;LoggerChannelFactoryInterface&lt;/abbr&gt;
    
Logger Channel Factory interface.










#### getSubscribedEvents()


[ContribTrackerEventListener.php](../files/web-modules-custom-ct-user-src-eventsubscriber-contribtrackereventlistener.md) : Line 51

*Returns an array of event names this subscriber wants to listen to.*

```php
static getSubscribedEvents() :mixed
```














#### onSocialAuthUserFieldEvent()


[ContribTrackerEventListener.php](../files/web-modules-custom-ct-user-src-eventsubscriber-contribtrackereventlistener.md) : Line 31

*Reacts to the event when users fields are being gathered via Social Auth.*

```php
onSocialAuthUserFieldEvent(<abbr title="\Drupal\social_auth\Event\UserFieldsEvent">UserFieldsEvent</abbr>  $event) :mixed
```





#### Parameters

- **$event**: &lt;abbr title=&quot;\Drupal\social_auth\Event\UserFieldsEvent&quot;&gt;UserFieldsEvent&lt;/abbr&gt;
    
Object returned by UserEvent.




### Tags

- **throws**
      - Type: `[](../\Drupal\Core\Entity\EntityStorageException)|UTF-8`
          - 
  






