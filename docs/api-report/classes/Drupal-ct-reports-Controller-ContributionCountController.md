
- [Drupal](../namespaces/drupal.md)
- [ct_reports](../namespaces/drupal-ct-reports.md)
- [Controller](../namespaces/drupal-ct-reports-controller.md)


## ContributionCountController

- **extends**: [ControllerBase](# &quot;\Drupal\Core\Controller\ControllerBase&quot;)

- **In Package**:
    - [Application](../packages/Application.md)
  


---





[ContributionCountController.php](../files/web-modules-custom-ct-reports-src-controller-contributioncountcontroller.md) : Line 12

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

[ContributionCountController.php](../files/web-modules-custom-ct-reports-src-controller-contributioncountcontroller.md) : Line 19

*Contribution statistics instance.*


protected [ContributionStatistics](# "\Drupal\contrib_tracker\ContributionStatistics") $contribStats









### Methods

#### __construct()

[ContributionCountController.php](../files/web-modules-custom-ct-reports-src-controller-contributioncountcontroller.md) : Line 26

*Constructs a new GeofieldMapGeocoder object.*

!!! Signature
    __construct([ContributionStatistics](# "\Drupal\contrib_tracker\ContributionStatistics") $contrib_stats) :mixed




**Parameters**

- **$contrib_stats**: [ContributionStatistics](# "\Drupal\contrib_tracker\ContributionStatistics")
    







#### content()

[ContributionCountController.php](../files/web-modules-custom-ct-reports-src-controller-contributioncountcontroller.md) : Line 42

*Returns a render-able array with contribution statistics.*

!!! Signature
    content() :mixed











#### create()

[ContributionCountController.php](../files/web-modules-custom-ct-reports-src-controller-contributioncountcontroller.md) : Line 33

*{@inheritdoc}*

!!! Signature
    static create([ContainerInterface](# "\Symfony\Component\DependencyInjection\ContainerInterface") $container) :mixed




**Parameters**

- **$container**: [ContainerInterface](# "\Symfony\Component\DependencyInjection\ContainerInterface")
    








