

- [Drupal](../namespaces/drupal.md)
- [ct_drupal](../namespaces/drupal-ct-drupal.md)


### 
## DrupalRetrieverInterface


- **In**:
    - [Application](../packages/Application.md)
  


[DrupalRetrieverInterface.php](../files/web-modules-custom-ct-drupal-src-drupalretrieverinterface.md) : Line 11

*Interface for Drupal Retriever service.*











### Table of Contents










#### Methods

- **[getCommentsByAuthor()](../classes/Drupal-ct-drupal-DrupalRetrieverInterface.md#method_getCommentsByAuthor)**
           : `<abbr title="\Hussainweb\DrupalApi\Entity\Collection\CommentCollection">CommentCollection</abbr>`
*Get comments by an user on drupal.org.*


- **[getDrupalOrgNode()](../classes/Drupal-ct-drupal-DrupalRetrieverInterface.md#method_getDrupalOrgNode)**
           : `<abbr title="\Hussainweb\DrupalApi\Entity\Node">Node</abbr>`
*Get node data from drupal.org.*


- **[getDrupalOrgNodeFromApi()](../classes/Drupal-ct-drupal-DrupalRetrieverInterface.md#method_getDrupalOrgNodeFromApi)**
           : `<abbr title="\Hussainweb\DrupalApi\Entity\Node">Node</abbr>`
*Get node data from drupal.org.*


- **[getFile()](../classes/Drupal-ct-drupal-DrupalRetrieverInterface.md#method_getFile)**
           : `<abbr title="\Hussainweb\DrupalApi\Entity\File">File</abbr>`
*Get file data from drupal.org.*








### Methods

#### getCommentsByAuthor()


[DrupalRetrieverInterface.php](../files/web-modules-custom-ct-drupal-src-drupalretrieverinterface.md) : Line 46

*Get comments by an user on drupal.org.*

```php
getCommentsByAuthor(int  $uid) :<abbr title="\Hussainweb\DrupalApi\Entity\Collection\CommentCollection">CommentCollection</abbr>
```





#### Parameters

- **$uid**: int
    
The user ID of the author.








#### Return Values

<abbr title="\Hussainweb\DrupalApi\Entity\Collection\CommentCollection">CommentCollection</abbr>


List of comments from drupal.org.



#### getDrupalOrgNode()


[DrupalRetrieverInterface.php](../files/web-modules-custom-ct-drupal-src-drupalretrieverinterface.md) : Line 24

*Get node data from drupal.org.*

```php
getDrupalOrgNode(int  $nid, int  $cacheExpiry = Cache::PERMANENT) :<abbr title="\Hussainweb\DrupalApi\Entity\Node">Node</abbr>
```





#### Parameters

- **$nid**: int
    
The nid of the node on drupal.org.

- **$cacheExpiry**: int
    - Default: `Cache::PERMANENT`
    
The cache expiry for the item.








#### Return Values

<abbr title="\Hussainweb\DrupalApi\Entity\Node">Node</abbr>


The node data from drupal.org.



#### getDrupalOrgNodeFromApi()


[DrupalRetrieverInterface.php](../files/web-modules-custom-ct-drupal-src-drupalretrieverinterface.md) : Line 35

*Get node data from drupal.org.*

```php
getDrupalOrgNodeFromApi(int  $nid) :<abbr title="\Hussainweb\DrupalApi\Entity\Node">Node</abbr>
```





#### Parameters

- **$nid**: int
    
The nid of the node on drupal.org.








#### Return Values

<abbr title="\Hussainweb\DrupalApi\Entity\Node">Node</abbr>


The node data from drupal.org.



#### getFile()


[DrupalRetrieverInterface.php](../files/web-modules-custom-ct-drupal-src-drupalretrieverinterface.md) : Line 57

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




