
[Drupal](../namespaces/drupal.md) | [ct_github](../namespaces/drupal-ct-github.md) | [Plugin](../namespaces/drupal-ct-github-plugin.md) | [ContributionSource](../namespaces/drupal-ct-github-plugin-contributionsource.md)

## GithubContribution

- **extends**: [PluginBase](# &quot;\Drupal\Component\Plugin\PluginBase&quot;)

- **In Package**:
    - [Application](../packages/Application.md)
  
- **Implements**:
    [ContributionSourceInterface](../classes/Drupal-ct-manager-ContributionSourceInterface.md),     [ContainerFactoryPluginInterface](# &quot;\Drupal\Core\Plugin\ContainerFactoryPluginInterface&quot;)  

---





<small>[GithubContribution.php](../files/web-modules-custom-ct-github-src-plugin-contributionsource-githubcontribution.md) : Line 26</small>

*Retrieve and Store contributions from github.com.*




### Tags

- **ContributionSource**
  - (
  id = "github",
  description = @Translation("Retrieve and store contribution data from github."),
)





### Table of Contents



#### Interfaces
- **[ContributionSourceInterface](../classes/Drupal-ct-manager-ContributionSourceInterface.md)**
  An interface for all Contribution type plugins.
- **[ContainerFactoryPluginInterface](# &quot;\Drupal\Core\Plugin\ContainerFactoryPluginInterface&quot;)**






#### Properties
- **[$entityTypeManager](../classes/Drupal-ct-github-Plugin-ContributionSource-GithubContribution.md#entitytypemanager)**
         : [EntityTypeManagerInterface](# "\Drupal\Core\Entity\EntityTypeManagerInterface")  

  *Entity type manager.*

- **[$query](../classes/Drupal-ct-github-Plugin-ContributionSource-GithubContribution.md#query)**
         : [GithubQuery](../classes/Drupal-ct-github-GithubQuery.md)  

  *Github request query.*

- **[$retriever](../classes/Drupal-ct-github-Plugin-ContributionSource-GithubContribution.md#retriever)**
         : [GithubRetriever](../classes/Drupal-ct-github-GithubRetriever.md)  

  *Retrievers for each user.*

- **[$tokenValid](../classes/Drupal-ct-github-Plugin-ContributionSource-GithubContribution.md#tokenvalid)**
         : bool  

  *GitHub Token Validity*


#### Methods
- **[__construct()](../classes/Drupal-ct-github-Plugin-ContributionSource-GithubContribution.md#__construct)**
           : mixed

  *Constructs a Drupal\rest\Plugin\ResourceBase object.*

- **[create()](../classes/Drupal-ct-github-Plugin-ContributionSource-GithubContribution.md#create)**
           : mixed

  *{@inheritdoc}*

- **[getNotificationMessage()](../classes/Drupal-ct-github-Plugin-ContributionSource-GithubContribution.md#getnotificationmessage)**
           : string

  *Get message for notification.*

- **[getUserCodeContributions()](../classes/Drupal-ct-github-Plugin-ContributionSource-GithubContribution.md#getusercodecontributions)**
           : mixed

  *Get comments from the total contribution data.*

- **[getUserIssues()](../classes/Drupal-ct-github-Plugin-ContributionSource-GithubContribution.md#getuserissues)**
           : mixed

  *Get issues from the total contribution data.*

- **[getUsers()](../classes/Drupal-ct-github-Plugin-ContributionSource-GithubContribution.md#getusers)**
           : mixed

  *Get all users with github username.*

- **[isUserValid()](../classes/Drupal-ct-github-Plugin-ContributionSource-GithubContribution.md#isuservalid)**
           : bool

  *Get user contributions from the platform.*

- **[getOrCreateRetriever()](../classes/Drupal-ct-github-Plugin-ContributionSource-GithubContribution.md#getorcreateretriever)**
           : [GithubRetriever](../classes/Drupal-ct-github-GithubRetriever.md)

  *Returns a user retriever object.*







### Properties

#### $entityTypeManager

<small>[GithubContribution.php](../files/web-modules-custom-ct-github-src-plugin-contributionsource-githubcontribution.md) : Line 33</small>

*Entity type manager.*


protected [EntityTypeManagerInterface](# "\Drupal\Core\Entity\EntityTypeManagerInterface") $entityTypeManager







#### $query

<small>[GithubContribution.php](../files/web-modules-custom-ct-github-src-plugin-contributionsource-githubcontribution.md) : Line 47</small>

*Github request query.*


protected [GithubQuery](../classes/Drupal-ct-github-GithubQuery.md) $query







#### $retriever

<small>[GithubContribution.php](../files/web-modules-custom-ct-github-src-plugin-contributionsource-githubcontribution.md) : Line 40</small>

*Retrievers for each user.*


protected [GithubRetriever](../classes/Drupal-ct-github-GithubRetriever.md) $retriever = []







#### $tokenValid

<small>[GithubContribution.php](../files/web-modules-custom-ct-github-src-plugin-contributionsource-githubcontribution.md) : Line 51</small>

*GitHub Token Validity*


protected bool $tokenValid









### Methods

#### __construct()

<small>[GithubContribution.php](../files/web-modules-custom-ct-github-src-plugin-contributionsource-githubcontribution.md) : Line 67</small>

*Constructs a Drupal\rest\Plugin\ResourceBase object.*

!!! note ""
    __construct(array&lt;string|int, mixed&gt; $configuration, string $plugin_id, mixed $plugin_definition, [EntityTypeManagerInterface](# "\Drupal\Core\Entity\EntityTypeManagerInterface") $entityTypeManager, [GithubQuery](../classes/Drupal-ct-github-GithubQuery.md) $query, [ConfigFactoryInterface](# "\Drupal\Core\Config\ConfigFactoryInterface") $configFactory) :mixed




**Parameters**

- **$configuration**: array&lt;string|int, mixed&gt;

  *A configuration array containing information about the plugin instance.*

- **$plugin_id**: string

  *The plugin_id for the plugin instance.*

- **$plugin_definition**: mixed

  *The plugin_definition for the plugin instance.*

- **$entityTypeManager**: [EntityTypeManagerInterface](# "\Drupal\Core\Entity\EntityTypeManagerInterface")

  *The injected entity type manager service.*

- **$query**: [GithubQuery](../classes/Drupal-ct-github-GithubQuery.md)

  *The injected github query service.*

- **$configFactory**: [ConfigFactoryInterface](# "\Drupal\Core\Config\ConfigFactoryInterface")









#### create()

<small>[GithubContribution.php](../files/web-modules-custom-ct-github-src-plugin-contributionsource-githubcontribution.md) : Line 82</small>

*{@inheritdoc}*

!!! note ""
    static create([ContainerInterface](# "\Symfony\Component\DependencyInjection\ContainerInterface") $container, array&lt;string|int, mixed&gt; $configuration, mixed $plugin_id, mixed $plugin_definition) :mixed




**Parameters**

- **$container**: [ContainerInterface](# "\Symfony\Component\DependencyInjection\ContainerInterface")


- **$configuration**: array&lt;string|int, mixed&gt;


- **$plugin_id**: mixed


- **$plugin_definition**: mixed









#### getNotificationMessage()

<small>[GithubContribution.php](../files/web-modules-custom-ct-github-src-plugin-contributionsource-githubcontribution.md) : Line 160</small>

*Get message for notification.*

!!! note ""
    getNotificationMessage([CodeContribution](../classes/Drupal-ct-manager-Data-CodeContribution.md) $contribution, [User](# "\Drupal\user\Entity\User") $user) :string




**Parameters**

- **$contribution**: [CodeContribution](../classes/Drupal-ct-manager-Data-CodeContribution.md)


- **$user**: [User](# "\Drupal\user\Entity\User")







**Return Values**

- string



#### getUserCodeContributions()

<small>[GithubContribution.php](../files/web-modules-custom-ct-github-src-plugin-contributionsource-githubcontribution.md) : Line 150</small>

*Get comments from the total contribution data.*

!!! note ""
    getUserCodeContributions([User](# "\Drupal\user\Entity\User") $user) :mixed




**Parameters**

- **$user**: [User](# "\Drupal\user\Entity\User")









#### getUserIssues()

<small>[GithubContribution.php](../files/web-modules-custom-ct-github-src-plugin-contributionsource-githubcontribution.md) : Line 140</small>

*Get issues from the total contribution data.*

!!! note ""
    getUserIssues([User](# "\Drupal\user\Entity\User") $user) :mixed




**Parameters**

- **$user**: [User](# "\Drupal\user\Entity\User")









#### getUsers()

<small>[GithubContribution.php](../files/web-modules-custom-ct-github-src-plugin-contributionsource-githubcontribution.md) : Line 96</small>

*Get all users with github username.*

!!! note ""
    getUsers() :mixed











#### isUserValid()

<small>[GithubContribution.php](../files/web-modules-custom-ct-github-src-plugin-contributionsource-githubcontribution.md) : Line 114</small>

*Get user contributions from the platform.*

!!! note ""
    isUserValid([User](# "\Drupal\user\Entity\User") $user) :bool




**Parameters**

- **$user**: [User](# "\Drupal\user\Entity\User")







**Return Values**

- bool



#### getOrCreateRetriever()

<small>[GithubContribution.php](../files/web-modules-custom-ct-github-src-plugin-contributionsource-githubcontribution.md) : Line 125</small>

*Returns a user retriever object.*

!!! note ""
    getOrCreateRetriever([User](# "\Drupal\user\Entity\User") $user) :[GithubRetriever](../classes/Drupal-ct-github-GithubRetriever.md)




**Parameters**

- **$user**: [User](# "\Drupal\user\Entity\User")







**Return Values**

- [GithubRetriever](../classes/Drupal-ct-github-GithubRetriever.md)




