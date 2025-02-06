
[Drupal](../namespaces/drupal.md) | [ct_manager](../namespaces/drupal-ct-manager.md)

## ContributionTrackerStorage


- **In Package**:
    - [Application](../packages/Application.md)
  


---





<small>[ContributionTrackerStorage.php](../files/web-modules-custom-ct-manager-src-contributiontrackerstorage.md) : Line 18</small>

*Class implementation of the storage utility.*









### Table of Contents









#### Properties
- **[$logger](../classes/Drupal-ct-manager-ContributionTrackerStorage.md#logger)**
         : [TermStorageInterface](# "\Drupal\taxonomy\TermStorageInterface")  

  *Logger.*

- **[$nodeStorage](../classes/Drupal-ct-manager-ContributionTrackerStorage.md#nodestorage)**
         : [NodeStorageInterface](# "\Drupal\node\NodeStorageInterface")  

  *Node storage controller.*

- **[$termStorage](../classes/Drupal-ct-manager-ContributionTrackerStorage.md#termstorage)**
         : [TermStorageInterface](# "\Drupal\taxonomy\TermStorageInterface")  

  *Term storage controller.*


#### Methods
- **[__construct()](../classes/Drupal-ct-manager-ContributionTrackerStorage.md#__construct)**
           : mixed

  *Contribution storage constructor.*

- **[getNodeForCodeContribution()](../classes/Drupal-ct-manager-ContributionTrackerStorage.md#getnodeforcodecontribution)**
           : [Node](# "\Drupal\node\Entity\Node")|null

  *Get node of type code_contribution.*

- **[getNodeForIssue()](../classes/Drupal-ct-manager-ContributionTrackerStorage.md#getnodeforissue)**
           : [Node](# "\Drupal\node\Entity\Node")|null

  *Get issue of type issue.*

- **[getOrCreateIssueNode()](../classes/Drupal-ct-manager-ContributionTrackerStorage.md#getorcreateissuenode)**
           : [Node](# "\Drupal\node\Entity\Node")

  *Retrieves the node detail for issues.*

- **[saveCodeContribution()](../classes/Drupal-ct-manager-ContributionTrackerStorage.md#savecodecontribution)**
           : [Node](# "\Drupal\node\Entity\Node")

  *Save code contributions.*

- **[saveIssue()](../classes/Drupal-ct-manager-ContributionTrackerStorage.md#saveissue)**
           : [Node](# "\Drupal\node\Entity\Node")

  *Save Issues.*

- **[getOrCreateTerm()](../classes/Drupal-ct-manager-ContributionTrackerStorage.md#getorcreateterm)**
           : [TermInterface](# "\Drupal\taxonomy\TermInterface")

  *Get (or create) a term in a specified vocabulary.*







### Properties

#### $logger

<small>[ContributionTrackerStorage.php](../files/web-modules-custom-ct-manager-src-contributiontrackerstorage.md) : Line 38</small>

*Logger.*


protected [TermStorageInterface](# "\Drupal\taxonomy\TermStorageInterface") $logger







#### $nodeStorage

<small>[ContributionTrackerStorage.php](../files/web-modules-custom-ct-manager-src-contributiontrackerstorage.md) : Line 24</small>

*Node storage controller.*


protected [NodeStorageInterface](# "\Drupal\node\NodeStorageInterface") $nodeStorage







#### $termStorage

<small>[ContributionTrackerStorage.php](../files/web-modules-custom-ct-manager-src-contributiontrackerstorage.md) : Line 31</small>

*Term storage controller.*


protected [TermStorageInterface](# "\Drupal\taxonomy\TermStorageInterface") $termStorage









### Methods

#### __construct()

<small>[ContributionTrackerStorage.php](../files/web-modules-custom-ct-manager-src-contributiontrackerstorage.md) : Line 43</small>

*Contribution storage constructor.*

!!! note ""
    __construct([EntityTypeManagerInterface](# "\Drupal\Core\Entity\EntityTypeManagerInterface") $entityTypeManager, [LoggerChannelInterface](# "\Drupal\Core\Logger\LoggerChannelInterface") $loggerChannel) :mixed




**Parameters**

- **$entityTypeManager**: [EntityTypeManagerInterface](# "\Drupal\Core\Entity\EntityTypeManagerInterface")
    
- **$loggerChannel**: [LoggerChannelInterface](# "\Drupal\Core\Logger\LoggerChannelInterface")
    







#### getNodeForCodeContribution()

<small>[ContributionTrackerStorage.php](../files/web-modules-custom-ct-manager-src-contributiontrackerstorage.md) : Line 122</small>

*Get node of type code_contribution.*

!!! note ""
    getNodeForCodeContribution(string $commentLink) :[Node](# "\Drupal\node\Entity\Node")|null




**Parameters**

- **$commentLink**: string
    





**Return Values**

- [Node](# "\Drupal\node\Entity\Node")|null



#### getNodeForIssue()

<small>[ContributionTrackerStorage.php](../files/web-modules-custom-ct-manager-src-contributiontrackerstorage.md) : Line 109</small>

*Get issue of type issue.*

!!! note ""
    getNodeForIssue(string $issueLink) :[Node](# "\Drupal\node\Entity\Node")|null




**Parameters**

- **$issueLink**: string
    





**Return Values**

- [Node](# "\Drupal\node\Entity\Node")|null



#### getOrCreateIssueNode()

<small>[ContributionTrackerStorage.php](../files/web-modules-custom-ct-manager-src-contributiontrackerstorage.md) : Line 135</small>

*Retrieves the node detail for issues.*

!!! note ""
    getOrCreateIssueNode([Issue](../classes/Drupal-ct-manager-Data-Issue.md) $issue) :[Node](# "\Drupal\node\Entity\Node")




**Parameters**

- **$issue**: [Issue](../classes/Drupal-ct-manager-Data-Issue.md)
    





**Return Values**

- [Node](# "\Drupal\node\Entity\Node")



#### saveCodeContribution()

<small>[ContributionTrackerStorage.php](../files/web-modules-custom-ct-manager-src-contributiontrackerstorage.md) : Line 70</small>

*Save code contributions.*

!!! note ""
    saveCodeContribution([CodeContribution](../classes/Drupal-ct-manager-Data-CodeContribution.md) $comment, [Node](# "\Drupal\node\Entity\Node") $issueNode, [User](# "\Drupal\user\Entity\User") $user) :[Node](# "\Drupal\node\Entity\Node")




**Parameters**

- **$comment**: [CodeContribution](../classes/Drupal-ct-manager-Data-CodeContribution.md)
    
- **$issueNode**: [Node](# "\Drupal\node\Entity\Node")
    
- **$user**: [User](# "\Drupal\user\Entity\User")
    





**Return Values**

- [Node](# "\Drupal\node\Entity\Node")



#### saveIssue()

<small>[ContributionTrackerStorage.php](../files/web-modules-custom-ct-manager-src-contributiontrackerstorage.md) : Line 52</small>

*Save Issues.*

!!! note ""
    saveIssue([Issue](../classes/Drupal-ct-manager-Data-Issue.md) $issue) :[Node](# "\Drupal\node\Entity\Node")




**Parameters**

- **$issue**: [Issue](../classes/Drupal-ct-manager-Data-Issue.md)
    





**Return Values**

- [Node](# "\Drupal\node\Entity\Node")



#### getOrCreateTerm()

<small>[ContributionTrackerStorage.php](../files/web-modules-custom-ct-manager-src-contributiontrackerstorage.md) : Line 154</small>

*Get (or create) a term in a specified vocabulary.*

!!! note ""
    getOrCreateTerm(string $termName, string $vocabulary) :[TermInterface](# "\Drupal\taxonomy\TermInterface")




**Parameters**

- **$termName**: string
    
Name of the term to be retrieved or created.

- **$vocabulary**: string
    
Machine name of the vocabulary.






**Return Values**

- [TermInterface](# "\Drupal\taxonomy\TermInterface")


The term with the given name in the given vocabulary.




