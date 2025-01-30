

- [Drupal](../namespaces/drupal.md)
- [contrib_tracker](../namespaces/drupal-contrib-tracker.md)
- [EventSubscriber](../namespaces/drupal-contrib-tracker-eventsubscriber.md)


### 
## RavenSubscriber


- **In Package**:
    - [Application](../packages/Application.md)
  
- **Implements**:
    `[EventSubscriberInterface](../\Symfony\Component\EventDispatcher\EventSubscriberInterface)`
  

---


- **Final**: Yes




[RavenSubscriber.php](../files/web-modules-custom-contrib-tracker-src-eventsubscriber-ravensubscriber.md) : Line 14






### Tags

- **todo**
            - Add description for this subscriber.

  





### Table of Contents



#### Interfaces
- **[EventSubscriberInterface](../\Symfony\Component\EventDispatcher\EventSubscriberInterface)**







#### Methods

- **[getSubscribedEvents()](../classes/Drupal-contrib-tracker-EventSubscriber-RavenSubscriber.md#method_getSubscribedEvents)**
           : `array&lt;string|int, mixed&gt;`
*{@inheritdoc}*


- **[onRavenOptionsAlter()](../classes/Drupal-contrib-tracker-EventSubscriber-RavenSubscriber.md#method_onRavenOptionsAlter)**
           : `void`









### Methods

#### getSubscribedEvents()


[RavenSubscriber.php](../files/web-modules-custom-contrib-tracker-src-eventsubscriber-ravensubscriber.md) : Line 28

*{@inheritdoc}*

```php
static getSubscribedEvents() :array&lt;string|int, mixed&gt;
```












#### Return Values

array&lt;string|int, mixed&gt;



#### onRavenOptionsAlter()


[RavenSubscriber.php](../files/web-modules-custom-contrib-tracker-src-eventsubscriber-ravensubscriber.md) : Line 16


```php
onRavenOptionsAlter(<abbr title="\Drupal\raven\Event\OptionsAlter">OptionsAlter</abbr>  $optionsAlter) :void
```





#### Parameters

- **$optionsAlter**: &lt;abbr title=&quot;\Drupal\raven\Event\OptionsAlter&quot;&gt;OptionsAlter&lt;/abbr&gt;
    










