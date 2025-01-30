

- [Drupal](../namespaces/drupal.md)
- [ct_drupal](../namespaces/drupal-ct-drupal.md)


### 
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

- **[$comment](../classes/Drupal-ct-drupal-CommentDetails.md#property_comment)**
         : `<abbr title="\Hussainweb\DrupalApi\Entity\Comment">Comment</abbr>`  
*Comment details from d.o.*


- **[$commentProcessed](../classes/Drupal-ct-drupal-CommentDetails.md#property_commentProcessed)**
         : `bool`  
*Is the comment processed?*


- **[$contribRetriever](../classes/Drupal-ct-drupal-CommentDetails.md#property_contribRetriever)**
         : `<a href="classes/Drupal-ct-drupal-DrupalRetrieverInterface.html"><abbr title="\Drupal\ct_drupal\DrupalRetrieverInterface">DrupalRetrieverInterface</abbr></a>`  
*Contribution retriever service.*


- **[$issueData](../classes/Drupal-ct-drupal-CommentDetails.md#property_issueData)**
         : `<abbr title="\Hussainweb\DrupalApi\Entity\Node">Node</abbr>`  
*Node details from d.o.*


- **[$issueStatus](../classes/Drupal-ct-drupal-CommentDetails.md#property_issueStatus)**
         : `string`  
*Issue status.*


- **[$patchFilesCount](../classes/Drupal-ct-drupal-CommentDetails.md#property_patchFilesCount)**
         : `int`  
*Number of patches attached to the comment.*


- **[$timeService](../classes/Drupal-ct-drupal-CommentDetails.md#property_timeService)**
         : `<abbr title="\Drupal\Component\Datetime\TimeInterface">TimeInterface</abbr>`  
*The datetime.time service.*


- **[$totalFilesCount](../classes/Drupal-ct-drupal-CommentDetails.md#property_totalFilesCount)**
         : `int`  
*Number of all files attached to the comment.*


#### Methods

- **[__construct()](../classes/Drupal-ct-drupal-CommentDetails.md#method___construct)**
           : `mixed`
*DrupalOrgCommentDetails constructor.*


- **[getDescription()](../classes/Drupal-ct-drupal-CommentDetails.md#method_getDescription)**
           : `string`
*Get comment Description.*


- **[getIssueStatus()](../classes/Drupal-ct-drupal-CommentDetails.md#method_getIssueStatus)**
           : `string`
*Get the issue status.*


- **[getPatchFilesCount()](../classes/Drupal-ct-drupal-CommentDetails.md#method_getPatchFilesCount)**
           : `int`
*Get the number of patch files in this comment.*


- **[getTotalFilesCount()](../classes/Drupal-ct-drupal-CommentDetails.md#method_getTotalFilesCount)**
           : `int`
*Get the number of all files in this comment.*


- **[determineIssueStatus()](../classes/Drupal-ct-drupal-CommentDetails.md#method_determineIssueStatus)**
           : `void`
*Determine the status of the issue.*


- **[getStatusFromCode()](../classes/Drupal-ct-drupal-CommentDetails.md#method_getStatusFromCode)**
           : `string`
*Translate the status id to text.*


- **[isPatchFile()](../classes/Drupal-ct-drupal-CommentDetails.md#method_isPatchFile)**
           : `bool`
*Determine if this is a patch file.*


- **[processFileDetails()](../classes/Drupal-ct-drupal-CommentDetails.md#method_processFileDetails)**
           : `void`
*Check the type and number of files attached to a comment under a issue.*







### Properties

#### $comment


[CommentDetails.php](../files/web-modules-custom-ct-drupal-src-commentdetails.md) : Line 29

*Comment details from d.o.*



`protected [](../\Hussainweb\DrupalApi\Entity\Comment)|UTF-8 $comment`









#### $commentProcessed


[CommentDetails.php](../files/web-modules-custom-ct-drupal-src-commentdetails.md) : Line 64

*Is the comment processed?*



`protected [](../bool)|UTF-8 $commentProcessed = FALSE`









#### $contribRetriever


[CommentDetails.php](../files/web-modules-custom-ct-drupal-src-commentdetails.md) : Line 22

*Contribution retriever service.*



`protected [](../classes/Drupal-ct-drupal-DrupalRetrieverInterface.md)|UTF-8 $contribRetriever`









#### $issueData


[CommentDetails.php](../files/web-modules-custom-ct-drupal-src-commentdetails.md) : Line 36

*Node details from d.o.*



`protected [](../\Hussainweb\DrupalApi\Entity\Node)|UTF-8 $issueData = NULL`









#### $issueStatus


[CommentDetails.php](../files/web-modules-custom-ct-drupal-src-commentdetails.md) : Line 57

*Issue status.*



`protected [](../string)|UTF-8 $issueStatus`









#### $patchFilesCount


[CommentDetails.php](../files/web-modules-custom-ct-drupal-src-commentdetails.md) : Line 43

*Number of patches attached to the comment.*



`protected [](../int)|UTF-8 $patchFilesCount`









#### $timeService


[CommentDetails.php](../files/web-modules-custom-ct-drupal-src-commentdetails.md) : Line 71

*The datetime.time service.*



`protected [](../\Drupal\Component\Datetime\TimeInterface)|UTF-8 $timeService`









#### $totalFilesCount


[CommentDetails.php](../files/web-modules-custom-ct-drupal-src-commentdetails.md) : Line 50

*Number of all files attached to the comment.*



`protected [](../int)|UTF-8 $totalFilesCount`











### Methods

#### __construct()


[CommentDetails.php](../files/web-modules-custom-ct-drupal-src-commentdetails.md) : Line 83

*DrupalOrgCommentDetails constructor.*

```php
__construct(<a href="classes/Drupal-ct-drupal-DrupalRetrieverInterface.html"><abbr title="\Drupal\ct_drupal\DrupalRetrieverInterface">DrupalRetrieverInterface</abbr></a>  $retriever, <abbr title="\Hussainweb\DrupalApi\Entity\Comment">Comment</abbr>  $comment, <abbr title="\Drupal\Component\Datetime\TimeInterface">TimeInterface</abbr>  $time_service) :mixed
```





#### Parameters

- **$retriever**: &lt;a href=&quot;classes/Drupal-ct-drupal-DrupalRetrieverInterface.html&quot;&gt;&lt;abbr title=&quot;\Drupal\ct_drupal\DrupalRetrieverInterface&quot;&gt;DrupalRetrieverInterface&lt;/abbr&gt;&lt;/a&gt;
    
The injected contribution retriever service.

- **$comment**: &lt;abbr title=&quot;\Hussainweb\DrupalApi\Entity\Comment&quot;&gt;Comment&lt;/abbr&gt;
    
The comment data from drupal.org.

- **$time_service**: &lt;abbr title=&quot;\Drupal\Component\Datetime\TimeInterface&quot;&gt;TimeInterface&lt;/abbr&gt;
    
The datetime.time service.










#### getDescription()


[CommentDetails.php](../files/web-modules-custom-ct-drupal-src-commentdetails.md) : Line 130

*Get comment Description.*

```php
getDescription() :string
```



Fix for relative user url used in comment section.









#### Return Values

string



#### getIssueStatus()


[CommentDetails.php](../files/web-modules-custom-ct-drupal-src-commentdetails.md) : Line 116

*Get the issue status.*

```php
getIssueStatus() :string
```












#### Return Values

string



#### getPatchFilesCount()


[CommentDetails.php](../files/web-modules-custom-ct-drupal-src-commentdetails.md) : Line 92

*Get the number of patch files in this comment.*

```php
getPatchFilesCount() :int
```












#### Return Values

int



#### getTotalFilesCount()


[CommentDetails.php](../files/web-modules-custom-ct-drupal-src-commentdetails.md) : Line 104

*Get the number of all files in this comment.*

```php
getTotalFilesCount() :int
```












#### Return Values

int



#### determineIssueStatus()


[CommentDetails.php](../files/web-modules-custom-ct-drupal-src-commentdetails.md) : Line 173

*Determine the status of the issue.*

```php
determineIssueStatus() :void
```














#### getStatusFromCode()


[CommentDetails.php](../files/web-modules-custom-ct-drupal-src-commentdetails.md) : Line 199

*Translate the status id to text.*

```php
getStatusFromCode(int  $statusId) :string
```





#### Parameters

- **$statusId**: int
    
Issue status id.








#### Return Values

string


Readable text corresponding to the status id.



#### isPatchFile()


[CommentDetails.php](../files/web-modules-custom-ct-drupal-src-commentdetails.md) : Line 228

*Determine if this is a patch file.*

```php
isPatchFile(<abbr title="\Hussainweb\DrupalApi\Entity\File">File</abbr>  $fileRecord) :bool
```





#### Parameters

- **$fileRecord**: &lt;abbr title=&quot;\Hussainweb\DrupalApi\Entity\File&quot;&gt;File&lt;/abbr&gt;
    
The file data returned from API.








#### Return Values

bool


TRUE if this is a patch file, else FALSE.



#### processFileDetails()


[CommentDetails.php](../files/web-modules-custom-ct-drupal-src-commentdetails.md) : Line 142

*Check the type and number of files attached to a comment under a issue.*

```php
processFileDetails() :void
```















