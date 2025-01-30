

- [Drupal](../namespaces/drupal.md)
- [ct_reports](../namespaces/drupal-ct-reports.md)


### 
## ContributionStatistics


- **In Package**:
    - [Application](../packages/Application.md)
  


---






[ContributionStatistics.php](../files/web-modules-custom-ct-reports-src-contributionstatistics.md) : Line 13

*Class to calcluate contribution statistics.*











### Table of Contents









#### Properties

- **[$database](../classes/Drupal-ct-reports-ContributionStatistics.md#property_database)**
         : `<abbr title="\Drupal\Core\Database\Connection">Connection</abbr>`  
*Drupal\Core\Database\Driver\mysql\Connection definition.*


- **[$nodeStorage](../classes/Drupal-ct-reports-ContributionStatistics.md#property_nodeStorage)**
         : `<abbr title="\Drupal\node\NodeStorageInterface">NodeStorageInterface</abbr>`  
*Node storage controller.*


#### Methods

- **[__construct()](../classes/Drupal-ct-reports-ContributionStatistics.md#method___construct)**
           : `mixed`
*Contribution storage constructor.*


- **[codeContributions()](../classes/Drupal-ct-reports-ContributionStatistics.md#method_codeContributions)**
           : `int`
*Calcuate total contributions with patches.*


- **[totalContributions()](../classes/Drupal-ct-reports-ContributionStatistics.md#method_totalContributions)**
           : `int`
*Calcuates total contributions.*


- **[totalContributors()](../classes/Drupal-ct-reports-ContributionStatistics.md#method_totalContributors)**
           : `int`
*Calcuate total number of contributors.*







### Properties

#### $database


[ContributionStatistics.php](../files/web-modules-custom-ct-reports-src-contributionstatistics.md) : Line 27

*Drupal\Core\Database\Driver\mysql\Connection definition.*



`protected [](../\Drupal\Core\Database\Connection)|UTF-8 $database`









#### $nodeStorage


[ContributionStatistics.php](../files/web-modules-custom-ct-reports-src-contributionstatistics.md) : Line 20

*Node storage controller.*



`protected [](../\Drupal\node\NodeStorageInterface)|UTF-8 $nodeStorage`











### Methods

#### __construct()


[ContributionStatistics.php](../files/web-modules-custom-ct-reports-src-contributionstatistics.md) : Line 32

*Contribution storage constructor.*

```php
__construct(<abbr title="\Drupal\Core\Entity\EntityTypeManagerInterface">EntityTypeManagerInterface</abbr>  $entityTypeManager, <abbr title="\Drupal\Core\Database\Connection">Connection</abbr>  $database) :mixed
```





#### Parameters

- **$entityTypeManager**: &lt;abbr title=&quot;\Drupal\Core\Entity\EntityTypeManagerInterface&quot;&gt;EntityTypeManagerInterface&lt;/abbr&gt;
    
- **$database**: &lt;abbr title=&quot;\Drupal\Core\Database\Connection&quot;&gt;Connection&lt;/abbr&gt;
    









#### codeContributions()


[ContributionStatistics.php](../files/web-modules-custom-ct-reports-src-contributionstatistics.md) : Line 52

*Calcuate total contributions with patches.*

```php
codeContributions() :int
```












#### Return Values

int



#### totalContributions()


[ContributionStatistics.php](../files/web-modules-custom-ct-reports-src-contributionstatistics.md) : Line 40

*Calcuates total contributions.*

```php
totalContributions() :int
```












#### Return Values

int



#### totalContributors()


[ContributionStatistics.php](../files/web-modules-custom-ct-reports-src-contributionstatistics.md) : Line 65

*Calcuate total number of contributors.*

```php
totalContributors() :int
```












#### Return Values

int




