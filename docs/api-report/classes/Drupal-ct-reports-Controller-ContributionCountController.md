
[Drupal](../namespaces/drupal.md) | [ct_reports](../namespaces/drupal-ct-reports.md) | [Controller](../namespaces/drupal-ct-reports-controller.md)

## ContributionCountController

- **extends**: [ControllerBase](# &quot;\Drupal\Core\Controller\ControllerBase&quot;)

- **In Package**:
    - [Application](../packages/Application.md)
  


---





<small>[ContributionCountController.php](../files/web-modules-custom-ct-reports-src-controller-contributioncountcontroller.md) : Line 12</small>

*A controller to display contribution statistics.*









### Table of Contents









#### Properties
- **[$contribStats](../classes/Drupal-ct-reports-Controller-ContributionCountController.md#contribstats)**
         : [ContributionStatistics](# "\Drupal\contrib_tracker\ContributionStatistics")  

  *Contribution statistics instance.*


#### Methods
- **[__construct()](../classes/Drupal-ct-reports-Controller-ContributionCountController.md#__construct)**
           : mixed

  *Constructs a new GeofieldMapGeocoder object.*

- **[content()](../classes/Drupal-ct-reports-Controller-ContributionCountController.md#content)**
           : mixed

  *Returns a render-able array with contribution statistics.*

- **[create()](../classes/Drupal-ct-reports-Controller-ContributionCountController.md#create)**
           : mixed

  *{@inheritdoc}*







### Properties

#### $contribStats

<small>[ContributionCountController.php](../files/web-modules-custom-ct-reports-src-controller-contributioncountcontroller.md) : Line 19</small>

*Contribution statistics instance.*


protected [ContributionStatistics](# "\Drupal\contrib_tracker\ContributionStatistics") $contribStats









### Methods

#### __construct()

<small>[ContributionCountController.php](../files/web-modules-custom-ct-reports-src-controller-contributioncountcontroller.md) : Line 26</small>

*Constructs a new GeofieldMapGeocoder object.*

!!! note ""
    __construct([ContributionStatistics](# "\Drupal\contrib_tracker\ContributionStatistics") $contrib_stats) :mixed




**Parameters**

- **$contrib_stats**: [ContributionStatistics](# "\Drupal\contrib_tracker\ContributionStatistics")
  
  **








#### content()

<small>[ContributionCountController.php](../files/web-modules-custom-ct-reports-src-controller-contributioncountcontroller.md) : Line 42</small>

*Returns a render-able array with contribution statistics.*

!!! note ""
    content() :mixed











#### create()

<small>[ContributionCountController.php](../files/web-modules-custom-ct-reports-src-controller-contributioncountcontroller.md) : Line 33</small>

*{@inheritdoc}*

!!! note ""
    static create([ContainerInterface](# "\Symfony\Component\DependencyInjection\ContainerInterface") $container) :mixed




**Parameters**

- **$container**: [ContainerInterface](# "\Symfony\Component\DependencyInjection\ContainerInterface")
  
  **









