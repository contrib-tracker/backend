

- [Drupal](../namespaces/drupal.md)
- [contrib_tracker](../namespaces/drupal-contrib-tracker.md)
- [Command](../namespaces/drupal-contrib-tracker-command.md)


### 
## IssuesSanitiseCommand

- **Extends**: `[Command](../\Drupal\Console\Core\Command\Command)`

- **In Package**:
    - [Application](../packages/Application.md)
  


---






[IssuesSanitiseCommand.php](../files/web-modules-custom-contrib-tracker-src-command-issuessanitisecommand.md) : Line 23

*Detect duplicate issues and remove them.*





### Tags

- **DrupalCommand**
            - (
    extension="contrib_tracker",
    extensionType="module"
)

  





### Table of Contents









#### Properties

- **[$contribTrackStorage](../classes/Drupal-contrib-tracker-Command-IssuesSanitiseCommand.md#property_contribTrackStorage)**
         : `<abbr title="\Drupal\contrib_tracker\ContributionStorageInterface">ContributionStorageInterface</abbr>`  
*Drupal\contrib_tracker\ContributionStorageInterface definition.*


- **[$database](../classes/Drupal-contrib-tracker-Command-IssuesSanitiseCommand.md#property_database)**
         : `<abbr title="\Drupal\Core\Database\Connection">Connection</abbr>`  
*Drupal\Core\Database\Driver\mysql\Connection definition.*


- **[$entityTypeManager](../classes/Drupal-contrib-tracker-Command-IssuesSanitiseCommand.md#property_entityTypeManager)**
         : `<abbr title="\Drupal\Core\Entity\EntityTypeManagerInterface">EntityTypeManagerInterface</abbr>`  
*Drupal\Core\Entity\EntityTypeManagerInterface definition.*


#### Methods

- **[__construct()](../classes/Drupal-contrib-tracker-Command-IssuesSanitiseCommand.md#method___construct)**
           : `mixed`
*IssuesSanitiseCommand constructor.*


- **[configure()](../classes/Drupal-contrib-tracker-Command-IssuesSanitiseCommand.md#method_configure)**
           : `mixed`
*{@inheritdoc}*


- **[execute()](../classes/Drupal-contrib-tracker-Command-IssuesSanitiseCommand.md#method_execute)**
           : `mixed`
*{@inheritdoc}*


- **[getDuplicateIssueDoIds()](../classes/Drupal-contrib-tracker-Command-IssuesSanitiseCommand.md#method_getDuplicateIssueDoIds)**
           : `array&lt;string|int, string&gt;`
*Get a list of IDs which are duplicated.*


- **[getNidsForDoIssue()](../classes/Drupal-contrib-tracker-Command-IssuesSanitiseCommand.md#method_getNidsForDoIssue)**
           : `array&lt;string|int, int&gt;`
*Get node ids linked to a d.o issue.*


- **[updateReferencesForIssueNid()](../classes/Drupal-contrib-tracker-Command-IssuesSanitiseCommand.md#method_updateReferencesForIssueNid)**
           : `int`
*Replace references to various node ids with a different node id.*







### Properties

#### $contribTrackStorage


[IssuesSanitiseCommand.php](../files/web-modules-custom-contrib-tracker-src-command-issuessanitisecommand.md) : Line 30

*Drupal\contrib_tracker\ContributionStorageInterface definition.*



`protected [](../\Drupal\contrib_tracker\ContributionStorageInterface)|UTF-8 $contribTrackStorage`









#### $database


[IssuesSanitiseCommand.php](../files/web-modules-custom-contrib-tracker-src-command-issuessanitisecommand.md) : Line 44

*Drupal\Core\Database\Driver\mysql\Connection definition.*



`protected [](../\Drupal\Core\Database\Connection)|UTF-8 $database`









#### $entityTypeManager


[IssuesSanitiseCommand.php](../files/web-modules-custom-contrib-tracker-src-command-issuessanitisecommand.md) : Line 37

*Drupal\Core\Entity\EntityTypeManagerInterface definition.*



`protected [](../\Drupal\Core\Entity\EntityTypeManagerInterface)|UTF-8 $entityTypeManager`











### Methods

#### __construct()


[IssuesSanitiseCommand.php](../files/web-modules-custom-contrib-tracker-src-command-issuessanitisecommand.md) : Line 56

*IssuesSanitiseCommand constructor.*

```php
__construct(<abbr title="\Drupal\contrib_tracker\ContributionStorageInterface">ContributionStorageInterface</abbr>  $ctStorage, <abbr title="\Drupal\Core\Entity\EntityTypeManagerInterface">EntityTypeManagerInterface</abbr>  $entityTypeManager, <abbr title="\Drupal\Core\Database\Connection">Connection</abbr>  $database) :mixed
```





#### Parameters

- **$ctStorage**: &lt;abbr title=&quot;\Drupal\contrib_tracker\ContributionStorageInterface&quot;&gt;ContributionStorageInterface&lt;/abbr&gt;
    
The contrib tracker storage service.

- **$entityTypeManager**: &lt;abbr title=&quot;\Drupal\Core\Entity\EntityTypeManagerInterface&quot;&gt;EntityTypeManagerInterface&lt;/abbr&gt;
    
The entity type manager service.

- **$database**: &lt;abbr title=&quot;\Drupal\Core\Database\Connection&quot;&gt;Connection&lt;/abbr&gt;
    
The database connection.










#### configure()


[IssuesSanitiseCommand.php](../files/web-modules-custom-contrib-tracker-src-command-issuessanitisecommand.md) : Line 66

*{@inheritdoc}*

```php
configure() :mixed
```














#### execute()


[IssuesSanitiseCommand.php](../files/web-modules-custom-contrib-tracker-src-command-issuessanitisecommand.md) : Line 76

*{@inheritdoc}*

```php
execute(<abbr title="\Symfony\Component\Console\Input\InputInterface">InputInterface</abbr>  $input, <abbr title="\Symfony\Component\Console\Output\OutputInterface">OutputInterface</abbr>  $output) :mixed
```





#### Parameters

- **$input**: &lt;abbr title=&quot;\Symfony\Component\Console\Input\InputInterface&quot;&gt;InputInterface&lt;/abbr&gt;
    
- **$output**: &lt;abbr title=&quot;\Symfony\Component\Console\Output\OutputInterface&quot;&gt;OutputInterface&lt;/abbr&gt;
    









#### getDuplicateIssueDoIds()


[IssuesSanitiseCommand.php](../files/web-modules-custom-contrib-tracker-src-command-issuessanitisecommand.md) : Line 127

*Get a list of IDs which are duplicated.*

```php
getDuplicateIssueDoIds() :array&lt;string|int, string&gt;
```












#### Return Values

array&lt;string|int, string&gt;


Array of IDs which are duplicated.



#### getNidsForDoIssue()


[IssuesSanitiseCommand.php](../files/web-modules-custom-contrib-tracker-src-command-issuessanitisecommand.md) : Line 144

*Get node ids linked to a d.o issue.*

```php
getNidsForDoIssue(string  $issueId) :array&lt;string|int, int&gt;
```





#### Parameters

- **$issueId**: string
    
The d.o issue ID.








#### Return Values

array&lt;string|int, int&gt;


Array of node ids.



#### updateReferencesForIssueNid()


[IssuesSanitiseCommand.php](../files/web-modules-custom-contrib-tracker-src-command-issuessanitisecommand.md) : Line 169

*Replace references to various node ids with a different node id.*

```php
updateReferencesForIssueNid(array&lt;string|int, int&gt;  $issueNids, array&lt;string|int, int&gt;  $originalNid) :int
```





#### Parameters

- **$issueNids**: array&amp;lt;string|int, int&amp;gt;
    
The node ids to be searched and replaced.

- **$originalNid**: array&amp;lt;string|int, int&amp;gt;
    
The updated node id value.








#### Return Values

int


Number of records updated.




