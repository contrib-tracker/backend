

- [Drupal](../namespaces/drupal.md)
- [ct_github](../namespaces/drupal-ct-github.md)


### 
## GithubRetriever


- **In Package**:
    - [Application](../packages/Application.md)
  


---






[GithubRetriever.php](../files/web-modules-custom-ct-github-src-githubretriever.md) : Line 16

*Github retriever class.*


This class is responsible for retrieving data from Github API and
provide methods to return information relevant to the application.









### Table of Contents









#### Properties

- **[$query](../classes/Drupal-ct-github-GithubRetriever.md#property_query)**
         : `<a href="classes/Drupal-ct-github-GithubQuery.html"><abbr title="\Drupal\ct_github\GithubQuery">GithubQuery</abbr></a>`  
*Github query.*


- **[$userContributions](../classes/Drupal-ct-github-GithubRetriever.md#property_userContributions)**
         : `array&lt;string|int, mixed&gt;`  
*User Entity Storage.*


- **[$username](../classes/Drupal-ct-github-GithubRetriever.md#property_username)**
         : `string`  
*Github username.*


#### Methods

- **[__construct()](../classes/Drupal-ct-github-GithubRetriever.md#method___construct)**
           : `mixed`
*ContributionRetriever constructor.*


- **[getCodeContributions()](../classes/Drupal-ct-github-GithubRetriever.md#method_getCodeContributions)**
           : `mixed`
*Get PR commits and issue comments for user.*


- **[getIssues()](../classes/Drupal-ct-github-GithubRetriever.md#method_getIssues)**
           : `mixed`
*Get issues for user.*


- **[getUserContributions()](../classes/Drupal-ct-github-GithubRetriever.md#method_getUserContributions)**
           : `mixed`
*Returns user&#039;s contribution.*







### Properties

#### $query


[GithubRetriever.php](../files/web-modules-custom-ct-github-src-githubretriever.md) : Line 30

*Github query.*



`protected [](../classes/Drupal-ct-github-GithubQuery.md)|UTF-8 $query`









#### $userContributions


[GithubRetriever.php](../files/web-modules-custom-ct-github-src-githubretriever.md) : Line 23

*User Entity Storage.*



`protected [](../array&amp;lt;string|int, mixed&amp;gt;)|UTF-8 $userContributions`









#### $username


[GithubRetriever.php](../files/web-modules-custom-ct-github-src-githubretriever.md) : Line 37

*Github username.*



`protected [](../string)|UTF-8 $username`











### Methods

#### __construct()


[GithubRetriever.php](../files/web-modules-custom-ct-github-src-githubretriever.md) : Line 47

*ContributionRetriever constructor.*

```php
__construct(<a href="classes/Drupal-ct-github-GithubQuery.html"><abbr title="\Drupal\ct_github\GithubQuery">GithubQuery</abbr></a>  $query, string  $user) :mixed
```





#### Parameters

- **$query**: &lt;a href=&quot;classes/Drupal-ct-github-GithubQuery.html&quot;&gt;&lt;abbr title=&quot;\Drupal\ct_github\GithubQuery&quot;&gt;GithubQuery&lt;/abbr&gt;&lt;/a&gt;
    
The github query service.

- **$user**: string
    
The user name.










#### getCodeContributions()


[GithubRetriever.php](../files/web-modules-custom-ct-github-src-githubretriever.md) : Line 80

*Get PR commits and issue comments for user.*

```php
getCodeContributions() :mixed
```














#### getIssues()


[GithubRetriever.php](../files/web-modules-custom-ct-github-src-githubretriever.md) : Line 66

*Get issues for user.*

```php
getIssues() :mixed
```














#### getUserContributions()


[GithubRetriever.php](../files/web-modules-custom-ct-github-src-githubretriever.md) : Line 55

*Returns user&#039;s contribution.*

```php
getUserContributions(mixed  $username) :mixed
```





#### Parameters

- **$username**: mixed
    










