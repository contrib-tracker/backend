
- [Drupal](../namespaces/drupal.md)
- [ct_manager](../namespaces/drupal-ct-manager.md)


## ContributionSourcePluginManager

- **extends**: `[DefaultPluginManager](# \Drupal\Core\Plugin\DefaultPluginManager)`

- **In Package**:
    - [Application](../packages/Application.md)
  


---





[ContributionSourcePluginManager.php](../files/web-modules-custom-ct-manager-src-contributionsourcepluginmanager.md) : Line 14

*A plugin manager for contribution tracking plugins.*









### Table of Contents










#### Methods
- **[__construct()](../classes/Drupal-ct-manager-ContributionSourcePluginManager.md#__construct)**
           : `mixed`
*Creates the discovery object.*









### Methods

#### __construct()

[ContributionSourcePluginManager.php](../files/web-modules-custom-ct-manager-src-contributionsourcepluginmanager.md) : Line 27

*Creates the discovery object.*

```php
__construct([Traversable](# \Traversable) $namespaces, [CacheBackendInterface](# \Drupal\Core\Cache\CacheBackendInterface) $cache_backend, [ModuleHandlerInterface](# \Drupal\Core\Extension\ModuleHandlerInterface) $module_handler) :mixed
```




**Parameters**

- **$namespaces**: [Traversable](# \Traversable)
    
An object that implements \Traversable which contains the root paths
keyed by the corresponding namespace to look for plugin implementations.

- **$cache_backend**: [CacheBackendInterface](# \Drupal\Core\Cache\CacheBackendInterface)
    
Cache backend instance to use.

- **$module_handler**: [ModuleHandlerInterface](# \Drupal\Core\Extension\ModuleHandlerInterface)
    
The module handler to invoke the alter hook with.









