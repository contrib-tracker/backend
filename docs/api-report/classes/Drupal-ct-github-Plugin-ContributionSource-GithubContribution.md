

- [Drupal](../namespaces/drupal.md)
- [ct_github](../namespaces/drupal-ct-github.md)
- [Plugin](../namespaces/drupal-ct-github-plugin.md)
- [ContributionSource](../namespaces/drupal-ct-github-plugin-contributionsource.md)


### 
## GithubContribution

- **Extends**: `[PluginBase](../\Drupal\Component\Plugin\PluginBase)`

- **In Package**:
    - [Application](../packages/Application.md)
  
- **Implements**:
    `[ContributionSourceInterface](../classes/Drupal-ct-manager-ContributionSourceInterface.md), `
    `[ContainerFactoryPluginInterface](../\Drupal\Core\Plugin\ContainerFactoryPluginInterface)`
  

---






[GithubContribution.php](../files/web-modules-custom-ct-github-src-plugin-contributionsource-githubcontribution.md) : Line 26

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
- **[ContainerFactoryPluginInterface](../\Drupal\Core\Plugin\ContainerFactoryPluginInterface)**






#### Properties

- **[$entityTypeManager](../classes/Drupal-ct-github-Plugin-ContributionSource-GithubContribution.md#property_entityTypeManager)**
         : `<abbr title="\Drupal\Core\Entity\EntityTypeManagerInterface">EntityTypeManagerInterface</abbr>`  
*Entity type manager.*


- **[$query](../classes/Drupal-ct-github-Plugin-ContributionSource-GithubContribution.md#property_query)**
         : `<a href="classes/Drupal-ct-github-GithubQuery.html"><abbr title="\Drupal\ct_github\GithubQuery">GithubQuery</abbr></a>`  
*Github request query.*


- **[$retriever](../classes/Drupal-ct-github-Plugin-ContributionSource-GithubContribution.md#property_retriever)**
         : `array&lt;string|int, <a href="classes/Drupal-ct-github-GithubRetriever.html"><abbr title="\Drupal\ct_github\GithubRetriever">GithubRetriever</abbr></a>&gt;`  
*Retrievers for each user.*


- **[$tokenValid](../classes/Drupal-ct-github-Plugin-ContributionSource-GithubContribution.md#property_tokenValid)**
         : `bool`  
*GitHub Token Validity*


#### Methods

- **[__construct()](../classes/Drupal-ct-github-Plugin-ContributionSource-GithubContribution.md#method___construct)**
           : `mixed`
*Constructs a Drupal\rest\Plugin\ResourceBase object.*


- **[create()](../classes/Drupal-ct-github-Plugin-ContributionSource-GithubContribution.md#method_create)**
           : `mixed`
*{@inheritdoc}*


- **[getNotificationMessage()](../classes/Drupal-ct-github-Plugin-ContributionSource-GithubContribution.md#method_getNotificationMessage)**
           : `string`
*Get message for notification.*


- **[getUserCodeContributions()](../classes/Drupal-ct-github-Plugin-ContributionSource-GithubContribution.md#method_getUserCodeContributions)**
           : `mixed`
*Get comments from the total contribution data.*


- **[getUserIssues()](../classes/Drupal-ct-github-Plugin-ContributionSource-GithubContribution.md#method_getUserIssues)**
           : `mixed`
*Get issues from the total contribution data.*


- **[getUsers()](../classes/Drupal-ct-github-Plugin-ContributionSource-GithubContribution.md#method_getUsers)**
           : `mixed`
*Get all users with github username.*


- **[isUserValid()](../classes/Drupal-ct-github-Plugin-ContributionSource-GithubContribution.md#method_isUserValid)**
           : `bool`
*Get user contributions from the platform.*


- **[getOrCreateRetriever()](../classes/Drupal-ct-github-Plugin-ContributionSource-GithubContribution.md#method_getOrCreateRetriever)**
           : `<a href="classes/Drupal-ct-github-GithubRetriever.html"><abbr title="\Drupal\ct_github\GithubRetriever">GithubRetriever</abbr></a>`
*Returns a user retriever object.*







### Properties

#### $entityTypeManager


[GithubContribution.php](../files/web-modules-custom-ct-github-src-plugin-contributionsource-githubcontribution.md) : Line 33

*Entity type manager.*



`protected [](../\Drupal\Core\Entity\EntityTypeManagerInterface)|UTF-8 $entityTypeManager`









#### $query


[GithubContribution.php](../files/web-modules-custom-ct-github-src-plugin-contributionsource-githubcontribution.md) : Line 47

*Github request query.*



`protected [](../classes/Drupal-ct-github-GithubQuery.md)|UTF-8 $query`









#### $retriever


[GithubContribution.php](../files/web-modules-custom-ct-github-src-plugin-contributionsource-githubcontribution.md) : Line 40

*Retrievers for each user.*



`protected [](../array&amp;lt;string|int, classes/Drupal-ct-github-GithubRetriever.md&amp;gt;)|UTF-8 $retriever = []`









#### $tokenValid


[GithubContribution.php](../files/web-modules-custom-ct-github-src-plugin-contributionsource-githubcontribution.md) : Line 51

*GitHub Token Validity*



`protected [](../bool)|UTF-8 $tokenValid`











### Methods

#### __construct()


[GithubContribution.php](../files/web-modules-custom-ct-github-src-plugin-contributionsource-githubcontribution.md) : Line 67

*Constructs a Drupal\rest\Plugin\ResourceBase object.*

```php
__construct(array&lt;string|int, mixed&gt;  $configuration, string  $plugin_id, mixed  $plugin_definition, <abbr title="\Drupal\Core\Entity\EntityTypeManagerInterface">EntityTypeManagerInterface</abbr>  $entityTypeManager, <a href="classes/Drupal-ct-github-GithubQuery.html"><abbr title="\Drupal\ct_github\GithubQuery">GithubQuery</abbr></a>  $query, <abbr title="\Drupal\Core\Config\ConfigFactoryInterface">ConfigFactoryInterface</abbr>  $configFactory) :mixed
```





#### Parameters

- **$configuration**: array&amp;lt;string|int, mixed&amp;gt;
    
A configuration array containing information about the plugin instance.

- **$plugin_id**: string
    
The plugin_id for the plugin instance.

- **$plugin_definition**: mixed
    
The plugin_definition for the plugin instance.

- **$entityTypeManager**: &lt;abbr title=&quot;\Drupal\Core\Entity\EntityTypeManagerInterface&quot;&gt;EntityTypeManagerInterface&lt;/abbr&gt;
    
The injected entity type manager service.

- **$query**: &lt;a href=&quot;classes/Drupal-ct-github-GithubQuery.html&quot;&gt;&lt;abbr title=&quot;\Drupal\ct_github\GithubQuery&quot;&gt;GithubQuery&lt;/abbr&gt;&lt;/a&gt;
    
The injected github query service.

- **$configFactory**: &lt;abbr title=&quot;\Drupal\Core\Config\ConfigFactoryInterface&quot;&gt;ConfigFactoryInterface&lt;/abbr&gt;
    









#### create()


[GithubContribution.php](../files/web-modules-custom-ct-github-src-plugin-contributionsource-githubcontribution.md) : Line 82

*{@inheritdoc}*

```php
static create(<abbr title="\Symfony\Component\DependencyInjection\ContainerInterface">ContainerInterface</abbr>  $container, array&lt;string|int, mixed&gt;  $configuration, mixed  $plugin_id, mixed  $plugin_definition) :mixed
```





#### Parameters

- **$container**: &lt;abbr title=&quot;\Symfony\Component\DependencyInjection\ContainerInterface&quot;&gt;ContainerInterface&lt;/abbr&gt;
    
- **$configuration**: array&amp;lt;string|int, mixed&amp;gt;
    
- **$plugin_id**: mixed
    
- **$plugin_definition**: mixed
    









#### getNotificationMessage()


[GithubContribution.php](../files/web-modules-custom-ct-github-src-plugin-contributionsource-githubcontribution.md) : Line 160

*Get message for notification.*

```php
getNotificationMessage(<a href="classes/Drupal-ct-manager-Data-CodeContribution.html"><abbr title="\Drupal\ct_manager\Data\CodeContribution">CodeContribution</abbr></a>  $contribution, <abbr title="\Drupal\user\Entity\User">User</abbr>  $user) :string
```





#### Parameters

- **$contribution**: &lt;a href=&quot;classes/Drupal-ct-manager-Data-CodeContribution.html&quot;&gt;&lt;abbr title=&quot;\Drupal\ct_manager\Data\CodeContribution&quot;&gt;CodeContribution&lt;/abbr&gt;&lt;/a&gt;
    
- **$user**: &lt;abbr title=&quot;\Drupal\user\Entity\User&quot;&gt;User&lt;/abbr&gt;
    







#### Return Values

string



#### getUserCodeContributions()


[GithubContribution.php](../files/web-modules-custom-ct-github-src-plugin-contributionsource-githubcontribution.md) : Line 150

*Get comments from the total contribution data.*

```php
getUserCodeContributions(<abbr title="\Drupal\user\Entity\User">User</abbr>  $user) :mixed
```





#### Parameters

- **$user**: &lt;abbr title=&quot;\Drupal\user\Entity\User&quot;&gt;User&lt;/abbr&gt;
    









#### getUserIssues()


[GithubContribution.php](../files/web-modules-custom-ct-github-src-plugin-contributionsource-githubcontribution.md) : Line 140

*Get issues from the total contribution data.*

```php
getUserIssues(<abbr title="\Drupal\user\Entity\User">User</abbr>  $user) :mixed
```





#### Parameters

- **$user**: &lt;abbr title=&quot;\Drupal\user\Entity\User&quot;&gt;User&lt;/abbr&gt;
    









#### getUsers()


[GithubContribution.php](../files/web-modules-custom-ct-github-src-plugin-contributionsource-githubcontribution.md) : Line 96

*Get all users with github username.*

```php
getUsers() :mixed
```














#### isUserValid()


[GithubContribution.php](../files/web-modules-custom-ct-github-src-plugin-contributionsource-githubcontribution.md) : Line 114

*Get user contributions from the platform.*

```php
isUserValid(<abbr title="\Drupal\user\Entity\User">User</abbr>  $user) :bool
```





#### Parameters

- **$user**: &lt;abbr title=&quot;\Drupal\user\Entity\User&quot;&gt;User&lt;/abbr&gt;
    







#### Return Values

bool



#### getOrCreateRetriever()


[GithubContribution.php](../files/web-modules-custom-ct-github-src-plugin-contributionsource-githubcontribution.md) : Line 125

*Returns a user retriever object.*

```php
getOrCreateRetriever(<abbr title="\Drupal\user\Entity\User">User</abbr>  $user) :<a href="classes/Drupal-ct-github-GithubRetriever.html"><abbr title="\Drupal\ct_github\GithubRetriever">GithubRetriever</abbr></a>
```





#### Parameters

- **$user**: &lt;abbr title=&quot;\Drupal\user\Entity\User&quot;&gt;User&lt;/abbr&gt;
    







#### Return Values

<a href="classes/Drupal-ct-github-GithubRetriever.html"><abbr title="\Drupal\ct_github\GithubRetriever">GithubRetriever</abbr></a>




