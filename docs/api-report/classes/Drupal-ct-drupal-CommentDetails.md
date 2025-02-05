
- [Drupal](../namespaces/drupal.md)
- [ct_drupal](../namespaces/drupal-ct-drupal.md)


## CommentDetails


- **In Package**:
    - [Application](../packages/Application.md)
  


---





[CommentDetails.php](../files/web-modules-custom-ct-drupal-src-commentdetails.md) : Line 15

*Instance of Drupal.org Comment.*


This class holds the instance of the Drupal org comment from
every Issue node.







### Table of Contents









#### Properties
- **[$comment](../classes/Drupal-ct-drupal-CommentDetails.md#comment)**
         : [Comment](# \Hussainweb\DrupalApi\Entity\Comment)  
*Comment details from d.o.*

- **[$commentProcessed](../classes/Drupal-ct-drupal-CommentDetails.md#commentprocessed)**
         : bool  
*Is the comment processed?*

- **[$contribRetriever](../classes/Drupal-ct-drupal-CommentDetails.md#contribretriever)**
         : [DrupalRetrieverInterface](../classes/Drupal-ct-drupal-DrupalRetrieverInterface.md)  
*Contribution retriever service.*

- **[$issueData](../classes/Drupal-ct-drupal-CommentDetails.md#issuedata)**
         : [Node](# \Hussainweb\DrupalApi\Entity\Node)  
*Node details from d.o.*

- **[$issueStatus](../classes/Drupal-ct-drupal-CommentDetails.md#issuestatus)**
         : string  
*Issue status.*

- **[$patchFilesCount](../classes/Drupal-ct-drupal-CommentDetails.md#patchfilescount)**
         : int  
*Number of patches attached to the comment.*

- **[$timeService](../classes/Drupal-ct-drupal-CommentDetails.md#timeservice)**
         : [TimeInterface](# \Drupal\Component\Datetime\TimeInterface)  
*The datetime.time service.*

- **[$totalFilesCount](../classes/Drupal-ct-drupal-CommentDetails.md#totalfilescount)**
         : int  
*Number of all files attached to the comment.*


#### Methods
- **[__construct()](../classes/Drupal-ct-drupal-CommentDetails.md#__construct)**
           : mixed
*DrupalOrgCommentDetails constructor.*

- **[getDescription()](../classes/Drupal-ct-drupal-CommentDetails.md#getdescription)**
           : string
*Get comment Description.*

- **[getIssueStatus()](../classes/Drupal-ct-drupal-CommentDetails.md#getissuestatus)**
           : string
*Get the issue status.*

- **[getPatchFilesCount()](../classes/Drupal-ct-drupal-CommentDetails.md#getpatchfilescount)**
           : int
*Get the number of patch files in this comment.*

- **[getTotalFilesCount()](../classes/Drupal-ct-drupal-CommentDetails.md#gettotalfilescount)**
           : int
*Get the number of all files in this comment.*

- **[determineIssueStatus()](../classes/Drupal-ct-drupal-CommentDetails.md#determineissuestatus)**
           : void
*Determine the status of the issue.*

- **[getStatusFromCode()](../classes/Drupal-ct-drupal-CommentDetails.md#getstatusfromcode)**
           : string
*Translate the status id to text.*

- **[isPatchFile()](../classes/Drupal-ct-drupal-CommentDetails.md#ispatchfile)**
           : bool
*Determine if this is a patch file.*

- **[processFileDetails()](../classes/Drupal-ct-drupal-CommentDetails.md#processfiledetails)**
           : void
*Check the type and number of files attached to a comment under a issue.*







### Properties

#### $comment

[CommentDetails.php](../files/web-modules-custom-ct-drupal-src-commentdetails.md) : Line 29

*Comment details from d.o.*


protected [Comment](# \Hussainweb\DrupalApi\Entity\Comment) $comment







#### $commentProcessed

[CommentDetails.php](../files/web-modules-custom-ct-drupal-src-commentdetails.md) : Line 64

*Is the comment processed?*


protected bool $commentProcessed = FALSE







#### $contribRetriever

[CommentDetails.php](../files/web-modules-custom-ct-drupal-src-commentdetails.md) : Line 22

*Contribution retriever service.*


protected [DrupalRetrieverInterface](../classes/Drupal-ct-drupal-DrupalRetrieverInterface.md) $contribRetriever







#### $issueData

[CommentDetails.php](../files/web-modules-custom-ct-drupal-src-commentdetails.md) : Line 36

*Node details from d.o.*


protected [Node](# \Hussainweb\DrupalApi\Entity\Node) $issueData = NULL







#### $issueStatus

[CommentDetails.php](../files/web-modules-custom-ct-drupal-src-commentdetails.md) : Line 57

*Issue status.*


protected string $issueStatus







#### $patchFilesCount

[CommentDetails.php](../files/web-modules-custom-ct-drupal-src-commentdetails.md) : Line 43

*Number of patches attached to the comment.*


protected int $patchFilesCount







#### $timeService

[CommentDetails.php](../files/web-modules-custom-ct-drupal-src-commentdetails.md) : Line 71

*The datetime.time service.*


protected [TimeInterface](# \Drupal\Component\Datetime\TimeInterface) $timeService







#### $totalFilesCount

[CommentDetails.php](../files/web-modules-custom-ct-drupal-src-commentdetails.md) : Line 50

*Number of all files attached to the comment.*


protected int $totalFilesCount









### Methods

#### __construct()

[CommentDetails.php](../files/web-modules-custom-ct-drupal-src-commentdetails.md) : Line 83

*DrupalOrgCommentDetails constructor.*

!!! Signature
    __construct([DrupalRetrieverInterface](../classes/Drupal-ct-drupal-DrupalRetrieverInterface.md) $retriever, [Comment](# \Hussainweb\DrupalApi\Entity\Comment) $comment, [TimeInterface](# \Drupal\Component\Datetime\TimeInterface) $time_service) :mixed




**Parameters**

- **$retriever**: [DrupalRetrieverInterface](../classes/Drupal-ct-drupal-DrupalRetrieverInterface.md)
    
The injected contribution retriever service.

- **$comment**: [Comment](# \Hussainweb\DrupalApi\Entity\Comment)
    
The comment data from drupal.org.

- **$time_service**: [TimeInterface](# \Drupal\Component\Datetime\TimeInterface)
    
The datetime.time service.








#### getDescription()

[CommentDetails.php](../files/web-modules-custom-ct-drupal-src-commentdetails.md) : Line 130

*Get comment Description.*

!!! Signature
    getDescription() :string



Fix for relative user url used in comment section.






**Return Values**

string



#### getIssueStatus()

[CommentDetails.php](../files/web-modules-custom-ct-drupal-src-commentdetails.md) : Line 116

*Get the issue status.*

!!! Signature
    getIssueStatus() :string









**Return Values**

string



#### getPatchFilesCount()

[CommentDetails.php](../files/web-modules-custom-ct-drupal-src-commentdetails.md) : Line 92

*Get the number of patch files in this comment.*

!!! Signature
    getPatchFilesCount() :int









**Return Values**

int



#### getTotalFilesCount()

[CommentDetails.php](../files/web-modules-custom-ct-drupal-src-commentdetails.md) : Line 104

*Get the number of all files in this comment.*

!!! Signature
    getTotalFilesCount() :int









**Return Values**

int



#### determineIssueStatus()

[CommentDetails.php](../files/web-modules-custom-ct-drupal-src-commentdetails.md) : Line 173

*Determine the status of the issue.*

!!! Signature
    determineIssueStatus() :void











#### getStatusFromCode()

[CommentDetails.php](../files/web-modules-custom-ct-drupal-src-commentdetails.md) : Line 199

*Translate the status id to text.*

!!! Signature
    getStatusFromCode(int $statusId) :string




**Parameters**

- **$statusId**: int
    
Issue status id.






**Return Values**

string


Readable text corresponding to the status id.



#### isPatchFile()

[CommentDetails.php](../files/web-modules-custom-ct-drupal-src-commentdetails.md) : Line 228

*Determine if this is a patch file.*

!!! Signature
    isPatchFile([File](# \Hussainweb\DrupalApi\Entity\File) $fileRecord) :bool




**Parameters**

- **$fileRecord**: [File](# \Hussainweb\DrupalApi\Entity\File)
    
The file data returned from API.






**Return Values**

bool


TRUE if this is a patch file, else FALSE.



#### processFileDetails()

[CommentDetails.php](../files/web-modules-custom-ct-drupal-src-commentdetails.md) : Line 142

*Check the type and number of files attached to a comment under a issue.*

!!! Signature
    processFileDetails() :void












