
[Drupal](../namespaces/drupal.md) | [contrib_tracker](../namespaces/drupal-contrib-tracker.md) | [EventSubscriber](../namespaces/drupal-contrib-tracker-eventsubscriber.md)

## RavenSubscriber


- **In Package**:
    - [Application](../packages/Application.md)
  
- **Implements**:
    [EventSubscriberInterface](# &quot;\Symfony\Component\EventDispatcher\EventSubscriberInterface&quot;)  

---


- **Final**: Yes



<small>[RavenSubscriber.php](../files/web-modules-custom-contrib-tracker-src-eventsubscriber-ravensubscriber.md) : Line 14</small>





### Tags

- **todo**
  - Add description for this subscriber.





### Table of Contents



#### Interfaces
- **[EventSubscriberInterface](# &quot;\Symfony\Component\EventDispatcher\EventSubscriberInterface&quot;)**







#### Methods
- **[getSubscribedEvents()](../classes/Drupal-contrib-tracker-EventSubscriber-RavenSubscriber.md#getsubscribedevents)**
           : array&lt;string|int, mixed&gt;

  *{@inheritdoc}*

- **[onRavenOptionsAlter()](../classes/Drupal-contrib-tracker-EventSubscriber-RavenSubscriber.md#onravenoptionsalter)**
           : void









### Methods

#### getSubscribedEvents()

<small>[RavenSubscriber.php](../files/web-modules-custom-contrib-tracker-src-eventsubscriber-ravensubscriber.md) : Line 28</small>

*{@inheritdoc}*

!!! note ""
    static getSubscribedEvents() :array&lt;string|int, mixed&gt;









**Return Values**

- array&lt;string|int, mixed&gt;



#### onRavenOptionsAlter()

<small>[RavenSubscriber.php](../files/web-modules-custom-contrib-tracker-src-eventsubscriber-ravensubscriber.md) : Line 16</small>


!!! note ""
    onRavenOptionsAlter([OptionsAlter](# "\Drupal\raven\Event\OptionsAlter") $optionsAlter) :void




**Parameters**

- **$optionsAlter**: [OptionsAlter](# "\Drupal\raven\Event\OptionsAlter")










