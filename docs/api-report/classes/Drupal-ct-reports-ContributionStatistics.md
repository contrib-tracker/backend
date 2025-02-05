
- [Drupal](../namespaces/drupal.md)
- [ct_reports](../namespaces/drupal-ct-reports.md)


## ContributionStatistics


- **In Package**:
    - [Application](../packages/Application.md)
  


---





[ContributionStatistics.php](../files/web-modules-custom-ct-reports-src-contributionstatistics.md) : Line 13

*Class to calcluate contribution statistics.*









### Table of Contents









#### Properties
- **[$database](../classes/Drupal-ct-reports-ContributionStatistics.md#database)**
         : [Connection](# \Drupal\Core\Database\Connection)  
*Drupal\Core\Database\Driver\mysql\Connection definition.*

- **[$nodeStorage](../classes/Drupal-ct-reports-ContributionStatistics.md#nodestorage)**
         : [NodeStorageInterface](# \Drupal\node\NodeStorageInterface)  
*Node storage controller.*


#### Methods
- **[__construct()](../classes/Drupal-ct-reports-ContributionStatistics.md#__construct)**
           : mixed
*Contribution storage constructor.*

- **[codeContributions()](../classes/Drupal-ct-reports-ContributionStatistics.md#codecontributions)**
           : int
*Calcuate total contributions with patches.*

- **[totalContributions()](../classes/Drupal-ct-reports-ContributionStatistics.md#totalcontributions)**
           : int
*Calcuates total contributions.*

- **[totalContributors()](../classes/Drupal-ct-reports-ContributionStatistics.md#totalcontributors)**
           : int
*Calcuate total number of contributors.*







### Properties

#### $database

[ContributionStatistics.php](../files/web-modules-custom-ct-reports-src-contributionstatistics.md) : Line 27

*Drupal\Core\Database\Driver\mysql\Connection definition.*


protected [Connection](# \Drupal\Core\Database\Connection) $database







#### $nodeStorage

[ContributionStatistics.php](../files/web-modules-custom-ct-reports-src-contributionstatistics.md) : Line 20

*Node storage controller.*


protected [NodeStorageInterface](# \Drupal\node\NodeStorageInterface) $nodeStorage









### Methods

#### __construct()

[ContributionStatistics.php](../files/web-modules-custom-ct-reports-src-contributionstatistics.md) : Line 32

*Contribution storage constructor.*

```php
__construct([EntityTypeManagerInterface](# \Drupal\Core\Entity\EntityTypeManagerInterface) $entityTypeManager, [Connection](# \Drupal\Core\Database\Connection) $database) :mixed
```




**Parameters**

- **$entityTypeManager**: [EntityTypeManagerInterface](# \Drupal\Core\Entity\EntityTypeManagerInterface)
    
- **$database**: [Connection](# \Drupal\Core\Database\Connection)
    







#### codeContributions()

[ContributionStatistics.php](../files/web-modules-custom-ct-reports-src-contributionstatistics.md) : Line 52

*Calcuate total contributions with patches.*

```php
codeContributions() :int
```









**Return Values**

int



#### totalContributions()

[ContributionStatistics.php](../files/web-modules-custom-ct-reports-src-contributionstatistics.md) : Line 40

*Calcuates total contributions.*

```php
totalContributions() :int
```









**Return Values**

int



#### totalContributors()

[ContributionStatistics.php](../files/web-modules-custom-ct-reports-src-contributionstatistics.md) : Line 65

*Calcuate total number of contributors.*

```php
totalContributors() :int
```









**Return Values**

int




