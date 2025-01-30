

- [Drupal](../namespaces/drupal.md)
- [ct_drupal](../namespaces/drupal-ct-drupal.md)


### 
## DrupalOrgRetriever


- **In Package**:
    - [Application](../packages/Application.md)
  
- **Implements**:
    `[DrupalRetrieverInterface](../classes/Drupal-ct-drupal-DrupalRetrieverInterface.md)`
  

---






[DrupalOrgRetriever.php](../files/web-modules-custom-ct-drupal-src-drupalorgretriever.md) : Line 21

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

- **[$cache](../classes/Drupal-ct-drupal-DrupalOrgRetriever.md#property_cache)**
         : `<abbr title="\Drupal\Core\Cache\CacheBackendInterface">CacheBackendInterface</abbr>`  
*Cache backend service.*


- **[$client](../classes/Drupal-ct-drupal-DrupalOrgRetriever.md#property_client)**
         : `<abbr title="\Drupal\ct_drupal\DrupalOrg\Client">Client</abbr>`  
*Drupal.org client service.*


#### Methods

- **[__construct()](../classes/Drupal-ct-drupal-DrupalOrgRetriever.md#method___construct)**
           : `mixed`
*ContributionRetriever constructor.*


- **[getCommentsByAuthor()](../classes/Drupal-ct-drupal-DrupalOrgRetriever.md#method_getCommentsByAuthor)**
           : `<abbr title="\Hussainweb\DrupalApi\Entity\Collection\CommentCollection">CommentCollection</abbr>`
*Get comments by an user on drupal.org.*


- **[getDrupalOrgNode()](../classes/Drupal-ct-drupal-DrupalOrgRetriever.md#method_getDrupalOrgNode)**
           : `<abbr title="\Hussainweb\DrupalApi\Entity\Node">Node</abbr>`
*Get node data from drupal.org.*


- **[getDrupalOrgNodeFromApi()](../classes/Drupal-ct-drupal-DrupalOrgRetriever.md#method_getDrupalOrgNodeFromApi)**
           : `<abbr title="\Hussainweb\DrupalApi\Entity\Node">Node</abbr>`
*Get node data from drupal.org.*


- **[getFile()](../classes/Drupal-ct-drupal-DrupalOrgRetriever.md#method_getFile)**
           : `<abbr title="\Hussainweb\DrupalApi\Entity\File">File</abbr>`
*Get file data from drupal.org.*







### Properties

#### $cache


[DrupalOrgRetriever.php](../files/web-modules-custom-ct-drupal-src-drupalorgretriever.md) : Line 35

*Cache backend service.*



`protected [](../\Drupal\Core\Cache\CacheBackendInterface)|UTF-8 $cache`









#### $client


[DrupalOrgRetriever.php](../files/web-modules-custom-ct-drupal-src-drupalorgretriever.md) : Line 28

*Drupal.org client service.*



`protected [](../\Drupal\ct_drupal\DrupalOrg\Client)|UTF-8 $client`











### Methods

#### __construct()


[DrupalOrgRetriever.php](../files/web-modules-custom-ct-drupal-src-drupalorgretriever.md) : Line 45

*ContributionRetriever constructor.*

```php
__construct(<a href="classes/Drupal-ct-drupal-Client.html"><abbr title="\Drupal\ct_drupal\Client">Client</abbr></a>  $client, <abbr title="\Drupal\Core\Cache\CacheBackendInterface">CacheBackendInterface</abbr>  $cacheBackend) :mixed
```





#### Parameters

- **$client**: &lt;a href=&quot;classes/Drupal-ct-drupal-Client.html&quot;&gt;&lt;abbr title=&quot;\Drupal\ct_drupal\Client&quot;&gt;Client&lt;/abbr&gt;&lt;/a&gt;
    
The injected drupal.org client.

- **$cacheBackend**: &lt;abbr title=&quot;\Drupal\Core\Cache\CacheBackendInterface&quot;&gt;CacheBackendInterface&lt;/abbr&gt;
    
The injected cache backend service.










#### getCommentsByAuthor()


[DrupalOrgRetriever.php](../files/web-modules-custom-ct-drupal-src-drupalorgretriever.md) : Line 78

*Get comments by an user on drupal.org.*

```php
getCommentsByAuthor(mixed  $uid) :<abbr title="\Hussainweb\DrupalApi\Entity\Collection\CommentCollection">CommentCollection</abbr>
```





#### Parameters

- **$uid**: mixed
    
The user ID of the author.








#### Return Values

<abbr title="\Hussainweb\DrupalApi\Entity\Collection\CommentCollection">CommentCollection</abbr>


List of comments from drupal.org.



#### getDrupalOrgNode()


[DrupalOrgRetriever.php](../files/web-modules-custom-ct-drupal-src-drupalorgretriever.md) : Line 53

*Get node data from drupal.org.*

```php
getDrupalOrgNode(mixed  $nid, mixed  $cacheExpiry = Cache::PERMANENT) :<abbr title="\Hussainweb\DrupalApi\Entity\Node">Node</abbr>
```





#### Parameters

- **$nid**: mixed
    
The nid of the node on drupal.org.

- **$cacheExpiry**: mixed
    - Default: `Cache::PERMANENT`
    
The cache expiry for the item.








#### Return Values

<abbr title="\Hussainweb\DrupalApi\Entity\Node">Node</abbr>


The node data from drupal.org.



#### getDrupalOrgNodeFromApi()


[DrupalOrgRetriever.php](../files/web-modules-custom-ct-drupal-src-drupalorgretriever.md) : Line 70

*Get node data from drupal.org.*

```php
getDrupalOrgNodeFromApi(mixed  $nid) :<abbr title="\Hussainweb\DrupalApi\Entity\Node">Node</abbr>
```





#### Parameters

- **$nid**: mixed
    
The nid of the node on drupal.org.








#### Return Values

<abbr title="\Hussainweb\DrupalApi\Entity\Node">Node</abbr>


The node data from drupal.org.



#### getFile()


[DrupalOrgRetriever.php](../files/web-modules-custom-ct-drupal-src-drupalorgretriever.md) : Line 115

*Get file data from drupal.org.*

```php
getFile(int  $fid) :<abbr title="\Hussainweb\DrupalApi\Entity\File">File</abbr>
```





#### Parameters

- **$fid**: int
    
The fid of the file on drupal.org.








#### Return Values

<abbr title="\Hussainweb\DrupalApi\Entity\File">File</abbr>


The file data from drupal.org.




