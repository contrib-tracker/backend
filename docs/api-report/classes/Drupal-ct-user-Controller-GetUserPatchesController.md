

- [Drupal](../namespaces/drupal.md)
- [ct_user](../namespaces/drupal-ct-user.md)
- [Controller](../namespaces/drupal-ct-user-controller.md)


### 
## GetUserPatchesController

- **Extends**: `[ControllerBase](../\Drupal\Core\Controller\ControllerBase)`

- **In Package**:
    - [Application](../packages/Application.md)
  


---






[GetUserPatchesController.php](../files/web-modules-custom-ct-user-src-controller-getuserpatchescontroller.md) : Line 14

*A controller to get daily patches count for the last 1 year for each user.*











### Table of Contents









#### Properties

- **[$entityTypeManager](../classes/Drupal-ct-user-Controller-GetUserPatchesController.md#property_entityTypeManager)**
         : `<abbr title="\Drupal\Core\Entity\EntityTypeManagerInterface">EntityTypeManagerInterface</abbr>`  
*The entity type manager.*


#### Methods

- **[__construct()](../classes/Drupal-ct-user-Controller-GetUserPatchesController.md#method___construct)**
           : `mixed`
*Constructs a new GetUserPatchesController object.*


- **[content()](../classes/Drupal-ct-user-Controller-GetUserPatchesController.md#method_content)**
           : `<abbr title="\Symfony\Component\HttpFoundation\JsonResponse">JsonResponse</abbr>`
*Returns a JSON response with daily patches count.*


- **[create()](../classes/Drupal-ct-user-Controller-GetUserPatchesController.md#method_create)**
           : `mixed`
*{@inheritdoc}*







### Properties

#### $entityTypeManager


[GetUserPatchesController.php](../files/web-modules-custom-ct-user-src-controller-getuserpatchescontroller.md) : Line 21

*The entity type manager.*



`protected [](../\Drupal\Core\Entity\EntityTypeManagerInterface)|UTF-8 $entityTypeManager`











### Methods

#### __construct()


[GetUserPatchesController.php](../files/web-modules-custom-ct-user-src-controller-getuserpatchescontroller.md) : Line 29

*Constructs a new GetUserPatchesController object.*

```php
__construct(<abbr title="\Drupal\Core\Entity\EntityTypeManagerInterface">EntityTypeManagerInterface</abbr>  $entity_type_manager) :mixed
```





#### Parameters

- **$entity_type_manager**: &lt;abbr title=&quot;\Drupal\Core\Entity\EntityTypeManagerInterface&quot;&gt;EntityTypeManagerInterface&lt;/abbr&gt;
    
The entity type manager.










#### content()


[GetUserPatchesController.php](../files/web-modules-custom-ct-user-src-controller-getuserpatchescontroller.md) : Line 49

*Returns a JSON response with daily patches count.*

```php
content(int  $current_user_id) :<abbr title="\Symfony\Component\HttpFoundation\JsonResponse">JsonResponse</abbr>
```





#### Parameters

- **$current_user_id**: int
    
The user ID for which you want to retrieve patches.








#### Return Values

<abbr title="\Symfony\Component\HttpFoundation\JsonResponse">JsonResponse</abbr>


The JSON response.



#### create()


[GetUserPatchesController.php](../files/web-modules-custom-ct-user-src-controller-getuserpatchescontroller.md) : Line 36

*{@inheritdoc}*

```php
static create(<abbr title="\Symfony\Component\DependencyInjection\ContainerInterface">ContainerInterface</abbr>  $container) :mixed
```





#### Parameters

- **$container**: &lt;abbr title=&quot;\Symfony\Component\DependencyInjection\ContainerInterface&quot;&gt;ContainerInterface&lt;/abbr&gt;
    










