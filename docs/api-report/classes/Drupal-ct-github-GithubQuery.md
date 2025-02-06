
[Drupal](../namespaces/drupal.md) | [ct_github](../namespaces/drupal-ct-github.md)

## GithubQuery


- **In Package**:
    - [Application](../packages/Application.md)
  


---





<small>[GithubQuery.php](../files/web-modules-custom-ct-github-src-githubquery.md) : Line 19</small>

*Github Query Class.*


This class is responsible for constructing a GraphQL query
and making API requests of Issues, Issue Comments and
Pull Requests.






### Table of Contents









#### Properties
- **[$cache](../classes/Drupal-ct-github-GithubQuery.md#cache)**
         : [CacheBackendInterface](# "\Drupal\Core\Cache\CacheBackendInterface")  

  *Cache backend service.*

- **[$client](../classes/Drupal-ct-github-GithubQuery.md#client)**
         : [Client](# "\Github\Client")  

  *Establish connection to client.*


#### Methods
- **[__construct()](../classes/Drupal-ct-github-GithubQuery.md#__construct)**
           : mixed

  *Set authentication token to access GitHub API.*

- **[getQuery()](../classes/Drupal-ct-github-GithubQuery.md#getquery)**
           : string

  *GraphQL query to get contributions associated with a user.*

- **[getUserContributions()](../classes/Drupal-ct-github-GithubQuery.md#getusercontributions)**
           : mixed

  *API request to get user contributions.*

- **[isUserValid()](../classes/Drupal-ct-github-GithubQuery.md#isuservalid)**
           : bool

  *Check username validity.*







### Properties

#### $cache

<small>[GithubQuery.php](../files/web-modules-custom-ct-github-src-githubquery.md) : Line 33</small>

*Cache backend service.*


protected [CacheBackendInterface](# "\Drupal\Core\Cache\CacheBackendInterface") $cache







#### $client

<small>[GithubQuery.php](../files/web-modules-custom-ct-github-src-githubquery.md) : Line 26</small>

*Establish connection to client.*


protected [Client](# "\Github\Client") $client









### Methods

#### __construct()

<small>[GithubQuery.php](../files/web-modules-custom-ct-github-src-githubquery.md) : Line 43</small>

*Set authentication token to access GitHub API.*

!!! note ""
    __construct([ConfigFactory](# "\Drupal\Core\Config\ConfigFactory") $config_factory, [CacheBackendInterface](# "\Drupal\Core\Cache\CacheBackendInterface") $cacheBackend) :mixed




**Parameters**

- **$config_factory**: [ConfigFactory](# "\Drupal\Core\Config\ConfigFactory")
    The config factory.
- **$cacheBackend**: [CacheBackendInterface](# "\Drupal\Core\Cache\CacheBackendInterface")
    The injected cache backend service.







#### getQuery()

<small>[GithubQuery.php](../files/web-modules-custom-ct-github-src-githubquery.md) : Line 60</small>

*GraphQL query to get contributions associated with a user.*

!!! note ""
    getQuery(string $username) :string




**Parameters**

- **$username**: string
    The Github username.





**Return Values**

- string

  *Github Graphql query object*


#### getUserContributions()

<small>[GithubQuery.php](../files/web-modules-custom-ct-github-src-githubquery.md) : Line 134</small>

*API request to get user contributions.*

!!! note ""
    getUserContributions(string $username) :mixed




**Parameters**

- **$username**: string
    







#### isUserValid()

<small>[GithubQuery.php](../files/web-modules-custom-ct-github-src-githubquery.md) : Line 113</small>

*Check username validity.*

!!! note ""
    isUserValid(string $username) :bool




**Parameters**

- **$username**: string
    





**Return Values**

- bool




