
[Drupal](../namespaces/drupal.md) | [ct_github](../namespaces/drupal-ct-github.md)

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
- **[$query](../classes/Drupal-ct-github-GithubRetriever.md#query)**
         : [GithubQuery](../classes/Drupal-ct-github-GithubQuery.md)  

  *Github query.*

- **[$userContributions](../classes/Drupal-ct-github-GithubRetriever.md#usercontributions)**
         : array&lt;string|int, mixed&gt;  

  *User Entity Storage.*

- **[$username](../classes/Drupal-ct-github-GithubRetriever.md#username)**
         : string  

  *Github username.*


#### Methods
- **[__construct()](../classes/Drupal-ct-github-GithubRetriever.md#__construct)**
           : mixed

  *ContributionRetriever constructor.*

- **[getCodeContributions()](../classes/Drupal-ct-github-GithubRetriever.md#getcodecontributions)**
           : mixed

  *Get PR commits and issue comments for user.*

- **[getIssues()](../classes/Drupal-ct-github-GithubRetriever.md#getissues)**
           : mixed

  *Get issues for user.*

- **[getUserContributions()](../classes/Drupal-ct-github-GithubRetriever.md#getusercontributions)**
           : mixed

  *Returns user&#039;s contribution.*







### Properties

#### $query

[GithubRetriever.php](../files/web-modules-custom-ct-github-src-githubretriever.md) : Line 30

*Github query.*


protected [GithubQuery](../classes/Drupal-ct-github-GithubQuery.md) $query







#### $userContributions

[GithubRetriever.php](../files/web-modules-custom-ct-github-src-githubretriever.md) : Line 23

*User Entity Storage.*


protected array&lt;string|int, mixed&gt; $userContributions







#### $username

[GithubRetriever.php](../files/web-modules-custom-ct-github-src-githubretriever.md) : Line 37

*Github username.*


protected string $username









### Methods

#### __construct()

[GithubRetriever.php](../files/web-modules-custom-ct-github-src-githubretriever.md) : Line 47

*ContributionRetriever constructor.*

!!! note ""
    __construct([GithubQuery](../classes/Drupal-ct-github-GithubQuery.md) $query, string $user) :mixed




**Parameters**

- **$query**: [GithubQuery](../classes/Drupal-ct-github-GithubQuery.md)
    
The github query service.

- **$user**: string
    
The user name.








#### getCodeContributions()

[GithubRetriever.php](../files/web-modules-custom-ct-github-src-githubretriever.md) : Line 80

*Get PR commits and issue comments for user.*

!!! note ""
    getCodeContributions() :mixed











#### getIssues()

[GithubRetriever.php](../files/web-modules-custom-ct-github-src-githubretriever.md) : Line 66

*Get issues for user.*

!!! note ""
    getIssues() :mixed











#### getUserContributions()

[GithubRetriever.php](../files/web-modules-custom-ct-github-src-githubretriever.md) : Line 55

*Returns user&#039;s contribution.*

!!! note ""
    getUserContributions(mixed $username) :mixed




**Parameters**

- **$username**: mixed
    








