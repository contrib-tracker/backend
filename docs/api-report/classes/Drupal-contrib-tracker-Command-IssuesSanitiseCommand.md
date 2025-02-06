
[Drupal](../namespaces/drupal.md) | [contrib_tracker](../namespaces/drupal-contrib-tracker.md) | [Command](../namespaces/drupal-contrib-tracker-command.md)

## IssuesSanitiseCommand

- **extends**: [Command](# &quot;\Drupal\Console\Core\Command\Command&quot;)

- **In Package**:
    - [Application](../packages/Application.md)
  


---





<small>[IssuesSanitiseCommand.php](../files/web-modules-custom-contrib-tracker-src-command-issuessanitisecommand.md) : Line 23</small>

*Detect duplicate issues and remove them.*




### Tags

- **DrupalCommand**
  - (
    extension="contrib_tracker",
    extensionType="module"
)





### Table of Contents









#### Properties
- **[$contribTrackStorage](../classes/Drupal-contrib-tracker-Command-IssuesSanitiseCommand.md#contribtrackstorage)**
         : [ContributionStorageInterface](# "\Drupal\contrib_tracker\ContributionStorageInterface")  

  *Drupal\contrib_tracker\ContributionStorageInterface definition.*

- **[$database](../classes/Drupal-contrib-tracker-Command-IssuesSanitiseCommand.md#database)**
         : [Connection](# "\Drupal\Core\Database\Connection")  

  *Drupal\Core\Database\Driver\mysql\Connection definition.*

- **[$entityTypeManager](../classes/Drupal-contrib-tracker-Command-IssuesSanitiseCommand.md#entitytypemanager)**
         : [EntityTypeManagerInterface](# "\Drupal\Core\Entity\EntityTypeManagerInterface")  

  *Drupal\Core\Entity\EntityTypeManagerInterface definition.*


#### Methods
- **[__construct()](../classes/Drupal-contrib-tracker-Command-IssuesSanitiseCommand.md#__construct)**
           : mixed

  *IssuesSanitiseCommand constructor.*

- **[configure()](../classes/Drupal-contrib-tracker-Command-IssuesSanitiseCommand.md#configure)**
           : mixed

  *{@inheritdoc}*

- **[execute()](../classes/Drupal-contrib-tracker-Command-IssuesSanitiseCommand.md#execute)**
           : mixed

  *{@inheritdoc}*

- **[getDuplicateIssueDoIds()](../classes/Drupal-contrib-tracker-Command-IssuesSanitiseCommand.md#getduplicateissuedoids)**
           : array&lt;string|int, string&gt;

  *Get a list of IDs which are duplicated.*

- **[getNidsForDoIssue()](../classes/Drupal-contrib-tracker-Command-IssuesSanitiseCommand.md#getnidsfordoissue)**
           : array&lt;string|int, int&gt;

  *Get node ids linked to a d.o issue.*

- **[updateReferencesForIssueNid()](../classes/Drupal-contrib-tracker-Command-IssuesSanitiseCommand.md#updatereferencesforissuenid)**
           : int

  *Replace references to various node ids with a different node id.*







### Properties

#### $contribTrackStorage

<small>[IssuesSanitiseCommand.php](../files/web-modules-custom-contrib-tracker-src-command-issuessanitisecommand.md) : Line 30</small>

*Drupal\contrib_tracker\ContributionStorageInterface definition.*


protected [ContributionStorageInterface](# "\Drupal\contrib_tracker\ContributionStorageInterface") $contribTrackStorage







#### $database

<small>[IssuesSanitiseCommand.php](../files/web-modules-custom-contrib-tracker-src-command-issuessanitisecommand.md) : Line 44</small>

*Drupal\Core\Database\Driver\mysql\Connection definition.*


protected [Connection](# "\Drupal\Core\Database\Connection") $database







#### $entityTypeManager

<small>[IssuesSanitiseCommand.php](../files/web-modules-custom-contrib-tracker-src-command-issuessanitisecommand.md) : Line 37</small>

*Drupal\Core\Entity\EntityTypeManagerInterface definition.*


protected [EntityTypeManagerInterface](# "\Drupal\Core\Entity\EntityTypeManagerInterface") $entityTypeManager









### Methods

#### __construct()

<small>[IssuesSanitiseCommand.php](../files/web-modules-custom-contrib-tracker-src-command-issuessanitisecommand.md) : Line 56</small>

*IssuesSanitiseCommand constructor.*

!!! note ""
    __construct([ContributionStorageInterface](# "\Drupal\contrib_tracker\ContributionStorageInterface") $ctStorage, [EntityTypeManagerInterface](# "\Drupal\Core\Entity\EntityTypeManagerInterface") $entityTypeManager, [Connection](# "\Drupal\Core\Database\Connection") $database) :mixed




**Parameters**

- **$ctStorage**: [ContributionStorageInterface](# "\Drupal\contrib_tracker\ContributionStorageInterface")

  *The contrib tracker storage service.*

- **$entityTypeManager**: [EntityTypeManagerInterface](# "\Drupal\Core\Entity\EntityTypeManagerInterface")

  *The entity type manager service.*

- **$database**: [Connection](# "\Drupal\Core\Database\Connection")

  *The database connection.*








#### configure()

<small>[IssuesSanitiseCommand.php](../files/web-modules-custom-contrib-tracker-src-command-issuessanitisecommand.md) : Line 66</small>

*{@inheritdoc}*

!!! note ""
    configure() :mixed











#### execute()

<small>[IssuesSanitiseCommand.php](../files/web-modules-custom-contrib-tracker-src-command-issuessanitisecommand.md) : Line 76</small>

*{@inheritdoc}*

!!! note ""
    execute([InputInterface](# "\Symfony\Component\Console\Input\InputInterface") $input, [OutputInterface](# "\Symfony\Component\Console\Output\OutputInterface") $output) :mixed




**Parameters**

- **$input**: [InputInterface](# "\Symfony\Component\Console\Input\InputInterface")


- **$output**: [OutputInterface](# "\Symfony\Component\Console\Output\OutputInterface")









#### getDuplicateIssueDoIds()

<small>[IssuesSanitiseCommand.php](../files/web-modules-custom-contrib-tracker-src-command-issuessanitisecommand.md) : Line 127</small>

*Get a list of IDs which are duplicated.*

!!! note ""
    getDuplicateIssueDoIds() :array&lt;string|int, string&gt;









**Return Values**

- array&lt;string|int, string&gt;

  *Array of IDs which are duplicated.*


#### getNidsForDoIssue()

<small>[IssuesSanitiseCommand.php](../files/web-modules-custom-contrib-tracker-src-command-issuessanitisecommand.md) : Line 144</small>

*Get node ids linked to a d.o issue.*

!!! note ""
    getNidsForDoIssue(string $issueId) :array&lt;string|int, int&gt;




**Parameters**

- **$issueId**: string

  *The d.o issue ID.*






**Return Values**

- array&lt;string|int, int&gt;

  *Array of node ids.*


#### updateReferencesForIssueNid()

<small>[IssuesSanitiseCommand.php](../files/web-modules-custom-contrib-tracker-src-command-issuessanitisecommand.md) : Line 169</small>

*Replace references to various node ids with a different node id.*

!!! note ""
    updateReferencesForIssueNid(array&lt;string|int, int&gt; $issueNids, array&lt;string|int, int&gt; $originalNid) :int




**Parameters**

- **$issueNids**: array&lt;string|int, int&gt;

  *The node ids to be searched and replaced.*

- **$originalNid**: array&lt;string|int, int&gt;

  *The updated node id value.*






**Return Values**

- int

  *Number of records updated.*



