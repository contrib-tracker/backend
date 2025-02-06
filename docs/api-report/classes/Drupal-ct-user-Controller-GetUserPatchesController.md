
[Drupal](../namespaces/drupal.md) | [ct_user](../namespaces/drupal-ct-user.md) | [Controller](../namespaces/drupal-ct-user-controller.md)

## GetUserPatchesController

- **extends**: [ControllerBase](# &quot;\Drupal\Core\Controller\ControllerBase&quot;)

- **In Package**:
    - [Application](../packages/Application.md)
  


---





<small>[GetUserPatchesController.php](../files/web-modules-custom-ct-user-src-controller-getuserpatchescontroller.md) : Line 14</small>

*A controller to get daily patches count for the last 1 year for each user.*









### Table of Contents









#### Properties
- **[$entityTypeManager](../classes/Drupal-ct-user-Controller-GetUserPatchesController.md#entitytypemanager)**
         : [EntityTypeManagerInterface](# "\Drupal\Core\Entity\EntityTypeManagerInterface")  

  *The entity type manager.*


#### Methods
- **[__construct()](../classes/Drupal-ct-user-Controller-GetUserPatchesController.md#__construct)**
           : mixed

  *Constructs a new GetUserPatchesController object.*

- **[content()](../classes/Drupal-ct-user-Controller-GetUserPatchesController.md#content)**
           : [JsonResponse](# "\Symfony\Component\HttpFoundation\JsonResponse")

  *Returns a JSON response with daily patches count.*

- **[create()](../classes/Drupal-ct-user-Controller-GetUserPatchesController.md#create)**
           : mixed

  *{@inheritdoc}*







### Properties

#### $entityTypeManager

<small>[GetUserPatchesController.php](../files/web-modules-custom-ct-user-src-controller-getuserpatchescontroller.md) : Line 21</small>

*The entity type manager.*


protected [EntityTypeManagerInterface](# "\Drupal\Core\Entity\EntityTypeManagerInterface") $entityTypeManager









### Methods

#### __construct()

<small>[GetUserPatchesController.php](../files/web-modules-custom-ct-user-src-controller-getuserpatchescontroller.md) : Line 29</small>

*Constructs a new GetUserPatchesController object.*

!!! note ""
    __construct([EntityTypeManagerInterface](# "\Drupal\Core\Entity\EntityTypeManagerInterface") $entity_type_manager) :mixed




**Parameters**

- **$entity_type_manager**: [EntityTypeManagerInterface](# "\Drupal\Core\Entity\EntityTypeManagerInterface")
  
  *The entity type manager.*








#### content()

<small>[GetUserPatchesController.php](../files/web-modules-custom-ct-user-src-controller-getuserpatchescontroller.md) : Line 49</small>

*Returns a JSON response with daily patches count.*

!!! note ""
    content(int $current_user_id) :[JsonResponse](# "\Symfony\Component\HttpFoundation\JsonResponse")




**Parameters**

- **$current_user_id**: int
  
  *The user ID for which you want to retrieve patches.*






**Return Values**

- [JsonResponse](# "\Symfony\Component\HttpFoundation\JsonResponse")

  *The JSON response.*


#### create()

<small>[GetUserPatchesController.php](../files/web-modules-custom-ct-user-src-controller-getuserpatchescontroller.md) : Line 36</small>

*{@inheritdoc}*

!!! note ""
    static create([ContainerInterface](# "\Symfony\Component\DependencyInjection\ContainerInterface") $container) :mixed




**Parameters**

- **$container**: [ContainerInterface](# "\Symfony\Component\DependencyInjection\ContainerInterface")
  
  **









