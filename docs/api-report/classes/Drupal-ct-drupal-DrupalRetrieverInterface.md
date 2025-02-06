
[Drupal](../namespaces/drupal.md) | [ct_drupal](../namespaces/drupal-ct-drupal.md)

### ## DrupalRetrieverInterface


- **In**:
    - [Application](../packages/Application.md)
  

<small>[DrupalRetrieverInterface.php](../files/web-modules-custom-ct-drupal-src-drupalretrieverinterface.md) : Line 11</small>

*Interface for Drupal Retriever service.*









### Table of Contents










#### Methods
- **[getCommentsByAuthor()](../classes/Drupal-ct-drupal-DrupalRetrieverInterface.md#getcommentsbyauthor)**
           : [CommentCollection](# "\Hussainweb\DrupalApi\Entity\Collection\CommentCollection")

  *Get comments by an user on drupal.org.*

- **[getDrupalOrgNode()](../classes/Drupal-ct-drupal-DrupalRetrieverInterface.md#getdrupalorgnode)**
           : [Node](# "\Hussainweb\DrupalApi\Entity\Node")

  *Get node data from drupal.org.*

- **[getDrupalOrgNodeFromApi()](../classes/Drupal-ct-drupal-DrupalRetrieverInterface.md#getdrupalorgnodefromapi)**
           : [Node](# "\Hussainweb\DrupalApi\Entity\Node")

  *Get node data from drupal.org.*

- **[getFile()](../classes/Drupal-ct-drupal-DrupalRetrieverInterface.md#getfile)**
           : [File](# "\Hussainweb\DrupalApi\Entity\File")

  *Get file data from drupal.org.*








### Methods

#### getCommentsByAuthor()

<small>[DrupalRetrieverInterface.php](../files/web-modules-custom-ct-drupal-src-drupalretrieverinterface.md) : Line 46</small>

*Get comments by an user on drupal.org.*

!!! note ""
    getCommentsByAuthor(int $uid) :[CommentCollection](# "\Hussainweb\DrupalApi\Entity\Collection\CommentCollection")




**Parameters**

- **$uid**: int
      *The user ID of the author.*
  




**Return Values**

- [CommentCollection](# "\Hussainweb\DrupalApi\Entity\Collection\CommentCollection")

  *List of comments from drupal.org.*


#### getDrupalOrgNode()

<small>[DrupalRetrieverInterface.php](../files/web-modules-custom-ct-drupal-src-drupalretrieverinterface.md) : Line 24</small>

*Get node data from drupal.org.*

!!! note ""
    getDrupalOrgNode(int $nid, int $cacheExpiry = Cache::PERMANENT) :[Node](# "\Hussainweb\DrupalApi\Entity\Node")




**Parameters**

- **$nid**: int
      *The nid of the node on drupal.org.*
  - **$cacheExpiry**: int
    **Default:** `Cache::PERMANENT`
      *The cache expiry for the item.*
  




**Return Values**

- [Node](# "\Hussainweb\DrupalApi\Entity\Node")

  *The node data from drupal.org.*


#### getDrupalOrgNodeFromApi()

<small>[DrupalRetrieverInterface.php](../files/web-modules-custom-ct-drupal-src-drupalretrieverinterface.md) : Line 35</small>

*Get node data from drupal.org.*

!!! note ""
    getDrupalOrgNodeFromApi(int $nid) :[Node](# "\Hussainweb\DrupalApi\Entity\Node")




**Parameters**

- **$nid**: int
      *The nid of the node on drupal.org.*
  




**Return Values**

- [Node](# "\Hussainweb\DrupalApi\Entity\Node")

  *The node data from drupal.org.*


#### getFile()

<small>[DrupalRetrieverInterface.php](../files/web-modules-custom-ct-drupal-src-drupalretrieverinterface.md) : Line 57</small>

*Get file data from drupal.org.*

!!! note ""
    getFile(int $fid) :[File](# "\Hussainweb\DrupalApi\Entity\File")




**Parameters**

- **$fid**: int
      *The fid of the file on drupal.org.*
  




**Return Values**

- [File](# "\Hussainweb\DrupalApi\Entity\File")

  *The file data from drupal.org.*



