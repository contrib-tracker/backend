

- [Drupal](../namespaces/drupal.md)
- [ct_manager](../namespaces/drupal-ct-manager.md)


### 
## ContributionSourcePluginManager

- **Extends**: `[DefaultPluginManager](../\Drupal\Core\Plugin\DefaultPluginManager)`

- **In Package**:
    - [Application](../packages/Application.md)
  


---






[ContributionSourcePluginManager.php](../files/web-modules-custom-ct-manager-src-contributionsourcepluginmanager.md) : Line 14

*A plugin manager for contribution tracking plugins.*











### Table of Contents










#### Methods

- **[__construct()](../classes/Drupal-ct-manager-ContributionSourcePluginManager.md#method___construct)**
           : `mixed`
*Creates the discovery object.*









### Methods

#### __construct()


[ContributionSourcePluginManager.php](../files/web-modules-custom-ct-manager-src-contributionsourcepluginmanager.md) : Line 27

*Creates the discovery object.*

```php
__construct(<abbr title="\Traversable">Traversable</abbr>  $namespaces, <abbr title="\Drupal\Core\Cache\CacheBackendInterface">CacheBackendInterface</abbr>  $cache_backend, <abbr title="\Drupal\Core\Extension\ModuleHandlerInterface">ModuleHandlerInterface</abbr>  $module_handler) :mixed
```





#### Parameters

- **$namespaces**: &lt;abbr title=&quot;\Traversable&quot;&gt;Traversable&lt;/abbr&gt;
    
An object that implements \Traversable which contains the root paths
keyed by the corresponding namespace to look for plugin implementations.

- **$cache_backend**: &lt;abbr title=&quot;\Drupal\Core\Cache\CacheBackendInterface&quot;&gt;CacheBackendInterface&lt;/abbr&gt;
    
Cache backend instance to use.

- **$module_handler**: &lt;abbr title=&quot;\Drupal\Core\Extension\ModuleHandlerInterface&quot;&gt;ModuleHandlerInterface&lt;/abbr&gt;
    
The module handler to invoke the alter hook with.











