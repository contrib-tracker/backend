

- [Drupal](../namespaces/drupal.md)
- [ct_github](../namespaces/drupal-ct-github.md)


### 
## GithubQuery


- **In Package**:
    - [Application](../packages/Application.md)
  


---






[GithubQuery.php](../files/web-modules-custom-ct-github-src-githubquery.md) : Line 19

*Github Query Class.*


This class is responsible for constructing a GraphQL query
and making API requests of Issues, Issue Comments and
Pull Requests.









### Table of Contents









#### Properties

- **[$cache](../classes/Drupal-ct-github-GithubQuery.md#property_cache)**
         : `<abbr title="\Drupal\Core\Cache\CacheBackendInterface">CacheBackendInterface</abbr>`  
*Cache backend service.*


- **[$client](../classes/Drupal-ct-github-GithubQuery.md#property_client)**
         : `<abbr title="\Github\Client">Client</abbr>`  
*Establish connection to client.*


#### Methods

- **[__construct()](../classes/Drupal-ct-github-GithubQuery.md#method___construct)**
           : `mixed`
*Set authentication token to access GitHub API.*


- **[getQuery()](../classes/Drupal-ct-github-GithubQuery.md#method_getQuery)**
           : `string`
*GraphQL query to get contributions associated with a user.*


- **[getUserContributions()](../classes/Drupal-ct-github-GithubQuery.md#method_getUserContributions)**
           : `mixed`
*API request to get user contributions.*


- **[isUserValid()](../classes/Drupal-ct-github-GithubQuery.md#method_isUserValid)**
           : `bool`
*Check username validity.*







### Properties

#### $cache


[GithubQuery.php](../files/web-modules-custom-ct-github-src-githubquery.md) : Line 33

*Cache backend service.*



`protected [](../\Drupal\Core\Cache\CacheBackendInterface)|UTF-8 $cache`









#### $client


[GithubQuery.php](../files/web-modules-custom-ct-github-src-githubquery.md) : Line 26

*Establish connection to client.*



`protected [](../\Github\Client)|UTF-8 $client`











### Methods

#### __construct()


[GithubQuery.php](../files/web-modules-custom-ct-github-src-githubquery.md) : Line 43

*Set authentication token to access GitHub API.*

```php
__construct(<abbr title="\Drupal\Core\Config\ConfigFactory">ConfigFactory</abbr>  $config_factory, <abbr title="\Drupal\Core\Cache\CacheBackendInterface">CacheBackendInterface</abbr>  $cacheBackend) :mixed
```





#### Parameters

- **$config_factory**: &lt;abbr title=&quot;\Drupal\Core\Config\ConfigFactory&quot;&gt;ConfigFactory&lt;/abbr&gt;
    
The config factory.

- **$cacheBackend**: &lt;abbr title=&quot;\Drupal\Core\Cache\CacheBackendInterface&quot;&gt;CacheBackendInterface&lt;/abbr&gt;
    
The injected cache backend service.










#### getQuery()


[GithubQuery.php](../files/web-modules-custom-ct-github-src-githubquery.md) : Line 60

*GraphQL query to get contributions associated with a user.*

```php
getQuery(string  $username) :string
```





#### Parameters

- **$username**: string
    
The Github username.








#### Return Values

string


Github Graphql query object



#### getUserContributions()


[GithubQuery.php](../files/web-modules-custom-ct-github-src-githubquery.md) : Line 134

*API request to get user contributions.*

```php
getUserContributions(string  $username) :mixed
```





#### Parameters

- **$username**: string
    









#### isUserValid()


[GithubQuery.php](../files/web-modules-custom-ct-github-src-githubquery.md) : Line 113

*Check username validity.*

```php
isUserValid(string  $username) :bool
```





#### Parameters

- **$username**: string
    







#### Return Values

bool




