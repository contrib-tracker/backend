

- [Drupal](../namespaces/drupal.md)
- [ct_manager](../namespaces/drupal-ct-manager.md)


### 
## ContributionTrackerStorage


- **In Package**:
    - [Application](../packages/Application.md)
  


---






[ContributionTrackerStorage.php](../files/web-modules-custom-ct-manager-src-contributiontrackerstorage.md) : Line 18

*Class implementation of the storage utility.*











### Table of Contents









#### Properties

- **[$logger](../classes/Drupal-ct-manager-ContributionTrackerStorage.md#property_logger)**
         : `<abbr title="\Drupal\taxonomy\TermStorageInterface">TermStorageInterface</abbr>`  
*Logger.*


- **[$nodeStorage](../classes/Drupal-ct-manager-ContributionTrackerStorage.md#property_nodeStorage)**
         : `<abbr title="\Drupal\node\NodeStorageInterface">NodeStorageInterface</abbr>`  
*Node storage controller.*


- **[$termStorage](../classes/Drupal-ct-manager-ContributionTrackerStorage.md#property_termStorage)**
         : `<abbr title="\Drupal\taxonomy\TermStorageInterface">TermStorageInterface</abbr>`  
*Term storage controller.*


#### Methods

- **[__construct()](../classes/Drupal-ct-manager-ContributionTrackerStorage.md#method___construct)**
           : `mixed`
*Contribution storage constructor.*


- **[getNodeForCodeContribution()](../classes/Drupal-ct-manager-ContributionTrackerStorage.md#method_getNodeForCodeContribution)**
           : `<abbr title="\Drupal\node\Entity\Node">Node</abbr>|null`
*Get node of type code_contribution.*


- **[getNodeForIssue()](../classes/Drupal-ct-manager-ContributionTrackerStorage.md#method_getNodeForIssue)**
           : `<abbr title="\Drupal\node\Entity\Node">Node</abbr>|null`
*Get issue of type issue.*


- **[getOrCreateIssueNode()](../classes/Drupal-ct-manager-ContributionTrackerStorage.md#method_getOrCreateIssueNode)**
           : `<abbr title="\Drupal\node\Entity\Node">Node</abbr>`
*Retrieves the node detail for issues.*


- **[saveCodeContribution()](../classes/Drupal-ct-manager-ContributionTrackerStorage.md#method_saveCodeContribution)**
           : `<abbr title="\Drupal\node\Entity\Node">Node</abbr>`
*Save code contributions.*


- **[saveIssue()](../classes/Drupal-ct-manager-ContributionTrackerStorage.md#method_saveIssue)**
           : `<abbr title="\Drupal\node\Entity\Node">Node</abbr>`
*Save Issues.*


- **[getOrCreateTerm()](../classes/Drupal-ct-manager-ContributionTrackerStorage.md#method_getOrCreateTerm)**
           : `<abbr title="\Drupal\taxonomy\TermInterface">TermInterface</abbr>`
*Get (or create) a term in a specified vocabulary.*







### Properties

#### $logger


[ContributionTrackerStorage.php](../files/web-modules-custom-ct-manager-src-contributiontrackerstorage.md) : Line 38

*Logger.*



`protected [](../\Drupal\taxonomy\TermStorageInterface)|UTF-8 $logger`









#### $nodeStorage


[ContributionTrackerStorage.php](../files/web-modules-custom-ct-manager-src-contributiontrackerstorage.md) : Line 24

*Node storage controller.*



`protected [](../\Drupal\node\NodeStorageInterface)|UTF-8 $nodeStorage`









#### $termStorage


[ContributionTrackerStorage.php](../files/web-modules-custom-ct-manager-src-contributiontrackerstorage.md) : Line 31

*Term storage controller.*



`protected [](../\Drupal\taxonomy\TermStorageInterface)|UTF-8 $termStorage`











### Methods

#### __construct()


[ContributionTrackerStorage.php](../files/web-modules-custom-ct-manager-src-contributiontrackerstorage.md) : Line 43

*Contribution storage constructor.*

```php
__construct(<abbr title="\Drupal\Core\Entity\EntityTypeManagerInterface">EntityTypeManagerInterface</abbr>  $entityTypeManager, <abbr title="\Drupal\Core\Logger\LoggerChannelInterface">LoggerChannelInterface</abbr>  $loggerChannel) :mixed
```





#### Parameters

- **$entityTypeManager**: &lt;abbr title=&quot;\Drupal\Core\Entity\EntityTypeManagerInterface&quot;&gt;EntityTypeManagerInterface&lt;/abbr&gt;
    
- **$loggerChannel**: &lt;abbr title=&quot;\Drupal\Core\Logger\LoggerChannelInterface&quot;&gt;LoggerChannelInterface&lt;/abbr&gt;
    









#### getNodeForCodeContribution()


[ContributionTrackerStorage.php](../files/web-modules-custom-ct-manager-src-contributiontrackerstorage.md) : Line 122

*Get node of type code_contribution.*

```php
getNodeForCodeContribution(string  $commentLink) :<abbr title="\Drupal\node\Entity\Node">Node</abbr>|null
```





#### Parameters

- **$commentLink**: string
    







#### Return Values

<abbr title="\Drupal\node\Entity\Node">Node</abbr>|null



#### getNodeForIssue()


[ContributionTrackerStorage.php](../files/web-modules-custom-ct-manager-src-contributiontrackerstorage.md) : Line 109

*Get issue of type issue.*

```php
getNodeForIssue(string  $issueLink) :<abbr title="\Drupal\node\Entity\Node">Node</abbr>|null
```





#### Parameters

- **$issueLink**: string
    







#### Return Values

<abbr title="\Drupal\node\Entity\Node">Node</abbr>|null



#### getOrCreateIssueNode()


[ContributionTrackerStorage.php](../files/web-modules-custom-ct-manager-src-contributiontrackerstorage.md) : Line 135

*Retrieves the node detail for issues.*

```php
getOrCreateIssueNode(<a href="classes/Drupal-ct-manager-Data-Issue.html"><abbr title="\Drupal\ct_manager\Data\Issue">Issue</abbr></a>  $issue) :<abbr title="\Drupal\node\Entity\Node">Node</abbr>
```





#### Parameters

- **$issue**: &lt;a href=&quot;classes/Drupal-ct-manager-Data-Issue.html&quot;&gt;&lt;abbr title=&quot;\Drupal\ct_manager\Data\Issue&quot;&gt;Issue&lt;/abbr&gt;&lt;/a&gt;
    







#### Return Values

<abbr title="\Drupal\node\Entity\Node">Node</abbr>



#### saveCodeContribution()


[ContributionTrackerStorage.php](../files/web-modules-custom-ct-manager-src-contributiontrackerstorage.md) : Line 70

*Save code contributions.*

```php
saveCodeContribution(<a href="classes/Drupal-ct-manager-Data-CodeContribution.html"><abbr title="\Drupal\ct_manager\Data\CodeContribution">CodeContribution</abbr></a>  $comment, <abbr title="\Drupal\node\Entity\Node">Node</abbr>  $issueNode, <abbr title="\Drupal\user\Entity\User">User</abbr>  $user) :<abbr title="\Drupal\node\Entity\Node">Node</abbr>
```





#### Parameters

- **$comment**: &lt;a href=&quot;classes/Drupal-ct-manager-Data-CodeContribution.html&quot;&gt;&lt;abbr title=&quot;\Drupal\ct_manager\Data\CodeContribution&quot;&gt;CodeContribution&lt;/abbr&gt;&lt;/a&gt;
    
- **$issueNode**: &lt;abbr title=&quot;\Drupal\node\Entity\Node&quot;&gt;Node&lt;/abbr&gt;
    
- **$user**: &lt;abbr title=&quot;\Drupal\user\Entity\User&quot;&gt;User&lt;/abbr&gt;
    







#### Return Values

<abbr title="\Drupal\node\Entity\Node">Node</abbr>



#### saveIssue()


[ContributionTrackerStorage.php](../files/web-modules-custom-ct-manager-src-contributiontrackerstorage.md) : Line 52

*Save Issues.*

```php
saveIssue(<a href="classes/Drupal-ct-manager-Data-Issue.html"><abbr title="\Drupal\ct_manager\Data\Issue">Issue</abbr></a>  $issue) :<abbr title="\Drupal\node\Entity\Node">Node</abbr>
```





#### Parameters

- **$issue**: &lt;a href=&quot;classes/Drupal-ct-manager-Data-Issue.html&quot;&gt;&lt;abbr title=&quot;\Drupal\ct_manager\Data\Issue&quot;&gt;Issue&lt;/abbr&gt;&lt;/a&gt;
    







#### Return Values

<abbr title="\Drupal\node\Entity\Node">Node</abbr>



#### getOrCreateTerm()


[ContributionTrackerStorage.php](../files/web-modules-custom-ct-manager-src-contributiontrackerstorage.md) : Line 154

*Get (or create) a term in a specified vocabulary.*

```php
getOrCreateTerm(string  $termName, string  $vocabulary) :<abbr title="\Drupal\taxonomy\TermInterface">TermInterface</abbr>
```





#### Parameters

- **$termName**: string
    
Name of the term to be retrieved or created.

- **$vocabulary**: string
    
Machine name of the vocabulary.








#### Return Values

<abbr title="\Drupal\taxonomy\TermInterface">TermInterface</abbr>


The term with the given name in the given vocabulary.




