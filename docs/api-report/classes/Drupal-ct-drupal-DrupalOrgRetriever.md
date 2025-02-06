
[Drupal](../namespaces/drupal.md) | [ct_drupal](../namespaces/drupal-ct-drupal.md)

## DrupalOrgRetriever


- **In Package**:
    - [Application](../packages/Application.md)
  
- **Implements**:
    [DrupalRetrieverInterface](../classes/Drupal-ct-drupal-DrupalRetrieverInterface.md)  

---





<small>[DrupalOrgRetriever.php](../files/web-modules-custom-ct-drupal-src-drupalorgretriever.md) : Line 21</small>

*DrupalOrg Contribution retriever service class.*


This class is responsible for retrieving data from drupal.org API's using
the drupal.org client service. It provides methods to return information
relevant to the application.

### Tags

- **SuppressWarnings**
  - (PHPMD)





### Table of Contents



#### Interfaces
- **[DrupalRetrieverInterface](../classes/Drupal-ct-drupal-DrupalRetrieverInterface.md)**
  Interface for Drupal Retriever service.






#### Properties
- **[$cache](../classes/Drupal-ct-drupal-DrupalOrgRetriever.md#cache)**
         : [CacheBackendInterface](# "\Drupal\Core\Cache\CacheBackendInterface")  

  *Cache backend service.*

- **[$client](../classes/Drupal-ct-drupal-DrupalOrgRetriever.md#client)**
         : [Client](# "\Drupal\ct_drupal\DrupalOrg\Client")  

  *Drupal.org client service.*


#### Methods
- **[__construct()](../classes/Drupal-ct-drupal-DrupalOrgRetriever.md#__construct)**
           : mixed

  *ContributionRetriever constructor.*

- **[getCommentsByAuthor()](../classes/Drupal-ct-drupal-DrupalOrgRetriever.md#getcommentsbyauthor)**
           : [CommentCollection](# "\Hussainweb\DrupalApi\Entity\Collection\CommentCollection")

  *Get comments by an user on drupal.org.*

- **[getDrupalOrgNode()](../classes/Drupal-ct-drupal-DrupalOrgRetriever.md#getdrupalorgnode)**
           : [Node](# "\Hussainweb\DrupalApi\Entity\Node")

  *Get node data from drupal.org.*

- **[getDrupalOrgNodeFromApi()](../classes/Drupal-ct-drupal-DrupalOrgRetriever.md#getdrupalorgnodefromapi)**
           : [Node](# "\Hussainweb\DrupalApi\Entity\Node")

  *Get node data from drupal.org.*

- **[getFile()](../classes/Drupal-ct-drupal-DrupalOrgRetriever.md#getfile)**
           : [File](# "\Hussainweb\DrupalApi\Entity\File")

  *Get file data from drupal.org.*







### Properties

#### $cache

<small>[DrupalOrgRetriever.php](../files/web-modules-custom-ct-drupal-src-drupalorgretriever.md) : Line 35</small>

*Cache backend service.*


protected [CacheBackendInterface](# "\Drupal\Core\Cache\CacheBackendInterface") $cache







#### $client

<small>[DrupalOrgRetriever.php](../files/web-modules-custom-ct-drupal-src-drupalorgretriever.md) : Line 28</small>

*Drupal.org client service.*


protected [Client](# "\Drupal\ct_drupal\DrupalOrg\Client") $client









### Methods

#### __construct()

<small>[DrupalOrgRetriever.php](../files/web-modules-custom-ct-drupal-src-drupalorgretriever.md) : Line 45</small>

*ContributionRetriever constructor.*

!!! note ""
    __construct([Client](../classes/Drupal-ct-drupal-Client.md) $client, [CacheBackendInterface](# "\Drupal\Core\Cache\CacheBackendInterface") $cacheBackend) :mixed




**Parameters**

- **$client**: [Client](../classes/Drupal-ct-drupal-Client.md)
  
  *The injected drupal.org client.*

- **$cacheBackend**: [CacheBackendInterface](# "\Drupal\Core\Cache\CacheBackendInterface")
  
  *The injected cache backend service.*








#### getCommentsByAuthor()

<small>[DrupalOrgRetriever.php](../files/web-modules-custom-ct-drupal-src-drupalorgretriever.md) : Line 78</small>

*Get comments by an user on drupal.org.*

!!! note ""
    getCommentsByAuthor(mixed $uid) :[CommentCollection](# "\Hussainweb\DrupalApi\Entity\Collection\CommentCollection")




**Parameters**

- **$uid**: mixed
  
  *The user ID of the author.*






**Return Values**

- [CommentCollection](# "\Hussainweb\DrupalApi\Entity\Collection\CommentCollection")

  *List of comments from drupal.org.*


#### getDrupalOrgNode()

<small>[DrupalOrgRetriever.php](../files/web-modules-custom-ct-drupal-src-drupalorgretriever.md) : Line 53</small>

*Get node data from drupal.org.*

!!! note ""
    getDrupalOrgNode(mixed $nid, mixed $cacheExpiry = Cache::PERMANENT) :[Node](# "\Hussainweb\DrupalApi\Entity\Node")




**Parameters**

- **$nid**: mixed
  
  *The nid of the node on drupal.org.*

- **$cacheExpiry**: mixed
    **Default:** `Cache::PERMANENT`
  
  *The cache expiry for the item.*






**Return Values**

- [Node](# "\Hussainweb\DrupalApi\Entity\Node")

  *The node data from drupal.org.*


#### getDrupalOrgNodeFromApi()

<small>[DrupalOrgRetriever.php](../files/web-modules-custom-ct-drupal-src-drupalorgretriever.md) : Line 70</small>

*Get node data from drupal.org.*

!!! note ""
    getDrupalOrgNodeFromApi(mixed $nid) :[Node](# "\Hussainweb\DrupalApi\Entity\Node")




**Parameters**

- **$nid**: mixed
  
  *The nid of the node on drupal.org.*






**Return Values**

- [Node](# "\Hussainweb\DrupalApi\Entity\Node")

  *The node data from drupal.org.*


#### getFile()

<small>[DrupalOrgRetriever.php](../files/web-modules-custom-ct-drupal-src-drupalorgretriever.md) : Line 115</small>

*Get file data from drupal.org.*

!!! note ""
    getFile(int $fid) :[File](# "\Hussainweb\DrupalApi\Entity\File")




**Parameters**

- **$fid**: int
  
  *The fid of the file on drupal.org.*






**Return Values**

- [File](# "\Hussainweb\DrupalApi\Entity\File")

  *The file data from drupal.org.*



