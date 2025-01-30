

- [Drupal](../namespaces/drupal.md)
- [ct_manager](../namespaces/drupal-ct-manager.md)
- [Data](../namespaces/drupal-ct-manager-data.md)


### 
## CodeContribution


- **In Package**:
    - [Application](../packages/Application.md)
  


---


- **Final**: Yes




[CodeContribution.php](../files/web-modules-custom-ct-manager-src-data-codecontribution.md) : Line 7












### Table of Contents









#### Properties

- **[$accountUrl](../classes/Drupal-ct-manager-Data-CodeContribution.md#property_accountUrl)**
         : `string`  


- **[$date](../classes/Drupal-ct-manager-Data-CodeContribution.md#property_date)**
         : `<abbr title="\DateTimeImmutable">DateTimeImmutable</abbr>`  


- **[$description](../classes/Drupal-ct-manager-Data-CodeContribution.md#property_description)**
         : `string`  


- **[$filesCount](../classes/Drupal-ct-manager-Data-CodeContribution.md#property_filesCount)**
         : `int`  


- **[$issue](../classes/Drupal-ct-manager-Data-CodeContribution.md#property_issue)**
         : `<a href="classes/Drupal-ct-manager-Data-Issue.html"><abbr title="\Drupal\ct_manager\Data\Issue">Issue</abbr></a>`  


- **[$patchCount](../classes/Drupal-ct-manager-Data-CodeContribution.md#property_patchCount)**
         : `int`  


- **[$project](../classes/Drupal-ct-manager-Data-CodeContribution.md#property_project)**
         : `string`  


- **[$projectUrl](../classes/Drupal-ct-manager-Data-CodeContribution.md#property_projectUrl)**
         : `string`  


- **[$status](../classes/Drupal-ct-manager-Data-CodeContribution.md#property_status)**
         : `string`  


- **[$technology](../classes/Drupal-ct-manager-Data-CodeContribution.md#property_technology)**
         : `string`  


- **[$title](../classes/Drupal-ct-manager-Data-CodeContribution.md#property_title)**
         : `string`  


- **[$url](../classes/Drupal-ct-manager-Data-CodeContribution.md#property_url)**
         : `string`  


#### Methods

- **[__construct()](../classes/Drupal-ct-manager-Data-CodeContribution.md#method___construct)**
           : `mixed`


- **[getAccountUrl()](../classes/Drupal-ct-manager-Data-CodeContribution.md#method_getAccountUrl)**
           : `string`


- **[getDate()](../classes/Drupal-ct-manager-Data-CodeContribution.md#method_getDate)**
           : `<abbr title="\DateTimeImmutable">DateTimeImmutable</abbr>`


- **[getDescription()](../classes/Drupal-ct-manager-Data-CodeContribution.md#method_getDescription)**
           : `string`


- **[getFilesCount()](../classes/Drupal-ct-manager-Data-CodeContribution.md#method_getFilesCount)**
           : `int`


- **[getIssue()](../classes/Drupal-ct-manager-Data-CodeContribution.md#method_getIssue)**
           : `<a href="classes/Drupal-ct-manager-Data-Issue.html"><abbr title="\Drupal\ct_manager\Data\Issue">Issue</abbr></a>|null`


- **[getPatchCount()](../classes/Drupal-ct-manager-Data-CodeContribution.md#method_getPatchCount)**
           : `int`


- **[getProject()](../classes/Drupal-ct-manager-Data-CodeContribution.md#method_getProject)**
           : `string`


- **[getProjectUrl()](../classes/Drupal-ct-manager-Data-CodeContribution.md#method_getProjectUrl)**
           : `string`


- **[getStatus()](../classes/Drupal-ct-manager-Data-CodeContribution.md#method_getStatus)**
           : `string`


- **[getTechnology()](../classes/Drupal-ct-manager-Data-CodeContribution.md#method_getTechnology)**
           : `string`


- **[getTitle()](../classes/Drupal-ct-manager-Data-CodeContribution.md#method_getTitle)**
           : `string`


- **[getUrl()](../classes/Drupal-ct-manager-Data-CodeContribution.md#method_getUrl)**
           : `string`


- **[setAccountUrl()](../classes/Drupal-ct-manager-Data-CodeContribution.md#method_setAccountUrl)**
           : `self`


- **[setDescription()](../classes/Drupal-ct-manager-Data-CodeContribution.md#method_setDescription)**
           : `self`


- **[setFilesCount()](../classes/Drupal-ct-manager-Data-CodeContribution.md#method_setFilesCount)**
           : `self`


- **[setIssue()](../classes/Drupal-ct-manager-Data-CodeContribution.md#method_setIssue)**
           : `self`


- **[setPatchCount()](../classes/Drupal-ct-manager-Data-CodeContribution.md#method_setPatchCount)**
           : `self`


- **[setProject()](../classes/Drupal-ct-manager-Data-CodeContribution.md#method_setProject)**
           : `self`


- **[setProjectUrl()](../classes/Drupal-ct-manager-Data-CodeContribution.md#method_setProjectUrl)**
           : `self`


- **[setStatus()](../classes/Drupal-ct-manager-Data-CodeContribution.md#method_setStatus)**
           : `self`


- **[setTechnology()](../classes/Drupal-ct-manager-Data-CodeContribution.md#method_setTechnology)**
           : `self`







### Properties

#### $accountUrl


[CodeContribution.php](../files/web-modules-custom-ct-manager-src-data-codecontribution.md) : Line 27




`protected [](../string)|UTF-8 $accountUrl`


URL of user account on the platform.







#### $date


[CodeContribution.php](../files/web-modules-custom-ct-manager-src-data-codecontribution.md) : Line 17




`protected [](../\DateTimeImmutable)|UTF-8 $date`


Date of the contribution.







#### $description


[CodeContribution.php](../files/web-modules-custom-ct-manager-src-data-codecontribution.md) : Line 32




`protected [](../string)|UTF-8 $description = &#039;&#039;`


Description.







#### $filesCount


[CodeContribution.php](../files/web-modules-custom-ct-manager-src-data-codecontribution.md) : Line 52




`protected [](../int)|UTF-8 $filesCount = 0`


File count.







#### $issue


[CodeContribution.php](../files/web-modules-custom-ct-manager-src-data-codecontribution.md) : Line 67




`protected [](../classes/Drupal-ct-manager-Data-Issue.md)|UTF-8 $issue = NULL`


Related issue.







#### $patchCount


[CodeContribution.php](../files/web-modules-custom-ct-manager-src-data-codecontribution.md) : Line 47




`protected [](../int)|UTF-8 $patchCount = 0`


Patch count.







#### $project


[CodeContribution.php](../files/web-modules-custom-ct-manager-src-data-codecontribution.md) : Line 37




`protected [](../string)|UTF-8 $project = &#039;&#039;`


Project.







#### $projectUrl


[CodeContribution.php](../files/web-modules-custom-ct-manager-src-data-codecontribution.md) : Line 42




`protected [](../string)|UTF-8 $projectUrl = &#039;&#039;`


ProjectUrl.







#### $status


[CodeContribution.php](../files/web-modules-custom-ct-manager-src-data-codecontribution.md) : Line 57




`protected [](../string)|UTF-8 $status = &#039;&#039;`


Status.







#### $technology


[CodeContribution.php](../files/web-modules-custom-ct-manager-src-data-codecontribution.md) : Line 62




`protected [](../string)|UTF-8 $technology = &#039;&#039;`


Technology.







#### $title


[CodeContribution.php](../files/web-modules-custom-ct-manager-src-data-codecontribution.md) : Line 12




`protected [](../string)|UTF-8 $title`


Title.







#### $url


[CodeContribution.php](../files/web-modules-custom-ct-manager-src-data-codecontribution.md) : Line 22




`protected [](../string)|UTF-8 $url`


URL of the contribution.









### Methods

#### __construct()


[CodeContribution.php](../files/web-modules-custom-ct-manager-src-data-codecontribution.md) : Line 69


```php
__construct(string  $title, string  $url, <abbr title="\DateTimeImmutable">DateTimeImmutable</abbr>  $date) :mixed
```





#### Parameters

- **$title**: string
    
- **$url**: string
    
- **$date**: &lt;abbr title=&quot;\DateTimeImmutable&quot;&gt;DateTimeImmutable&lt;/abbr&gt;
    









#### getAccountUrl()


[CodeContribution.php](../files/web-modules-custom-ct-manager-src-data-codecontribution.md) : Line 87


```php
getAccountUrl() :string
```












#### Return Values

string



#### getDate()


[CodeContribution.php](../files/web-modules-custom-ct-manager-src-data-codecontribution.md) : Line 83


```php
getDate() :<abbr title="\DateTimeImmutable">DateTimeImmutable</abbr>
```












#### Return Values

<abbr title="\DateTimeImmutable">DateTimeImmutable</abbr>



#### getDescription()


[CodeContribution.php](../files/web-modules-custom-ct-manager-src-data-codecontribution.md) : Line 96


```php
getDescription() :string
```












#### Return Values

string



#### getFilesCount()


[CodeContribution.php](../files/web-modules-custom-ct-manager-src-data-codecontribution.md) : Line 141


```php
getFilesCount() :int
```












#### Return Values

int



#### getIssue()


[CodeContribution.php](../files/web-modules-custom-ct-manager-src-data-codecontribution.md) : Line 123


```php
getIssue() :<a href="classes/Drupal-ct-manager-Data-Issue.html"><abbr title="\Drupal\ct_manager\Data\Issue">Issue</abbr></a>|null
```












#### Return Values

<a href="classes/Drupal-ct-manager-Data-Issue.html"><abbr title="\Drupal\ct_manager\Data\Issue">Issue</abbr></a>|null



#### getPatchCount()


[CodeContribution.php](../files/web-modules-custom-ct-manager-src-data-codecontribution.md) : Line 132


```php
getPatchCount() :int
```












#### Return Values

int



#### getProject()


[CodeContribution.php](../files/web-modules-custom-ct-manager-src-data-codecontribution.md) : Line 105


```php
getProject() :string
```












#### Return Values

string



#### getProjectUrl()


[CodeContribution.php](../files/web-modules-custom-ct-manager-src-data-codecontribution.md) : Line 114


```php
getProjectUrl() :string
```












#### Return Values

string



#### getStatus()


[CodeContribution.php](../files/web-modules-custom-ct-manager-src-data-codecontribution.md) : Line 150


```php
getStatus() :string
```












#### Return Values

string



#### getTechnology()


[CodeContribution.php](../files/web-modules-custom-ct-manager-src-data-codecontribution.md) : Line 159


```php
getTechnology() :string
```












#### Return Values

string



#### getTitle()


[CodeContribution.php](../files/web-modules-custom-ct-manager-src-data-codecontribution.md) : Line 75


```php
getTitle() :string
```












#### Return Values

string



#### getUrl()


[CodeContribution.php](../files/web-modules-custom-ct-manager-src-data-codecontribution.md) : Line 79


```php
getUrl() :string
```












#### Return Values

string



#### setAccountUrl()


[CodeContribution.php](../files/web-modules-custom-ct-manager-src-data-codecontribution.md) : Line 91


```php
setAccountUrl(string  $accountUrl) :self
```





#### Parameters

- **$accountUrl**: string
    







#### Return Values

self



#### setDescription()


[CodeContribution.php](../files/web-modules-custom-ct-manager-src-data-codecontribution.md) : Line 100


```php
setDescription(string  $description) :self
```





#### Parameters

- **$description**: string
    







#### Return Values

self



#### setFilesCount()


[CodeContribution.php](../files/web-modules-custom-ct-manager-src-data-codecontribution.md) : Line 145


```php
setFilesCount(int  $filesCount) :self
```





#### Parameters

- **$filesCount**: int
    







#### Return Values

self



#### setIssue()


[CodeContribution.php](../files/web-modules-custom-ct-manager-src-data-codecontribution.md) : Line 127


```php
setIssue(<a href="classes/Drupal-ct-manager-Data-Issue.html"><abbr title="\Drupal\ct_manager\Data\Issue">Issue</abbr></a>  $issue) :self
```





#### Parameters

- **$issue**: &lt;a href=&quot;classes/Drupal-ct-manager-Data-Issue.html&quot;&gt;&lt;abbr title=&quot;\Drupal\ct_manager\Data\Issue&quot;&gt;Issue&lt;/abbr&gt;&lt;/a&gt;
    







#### Return Values

self



#### setPatchCount()


[CodeContribution.php](../files/web-modules-custom-ct-manager-src-data-codecontribution.md) : Line 136


```php
setPatchCount(int  $patchCount) :self
```





#### Parameters

- **$patchCount**: int
    







#### Return Values

self



#### setProject()


[CodeContribution.php](../files/web-modules-custom-ct-manager-src-data-codecontribution.md) : Line 109


```php
setProject(string  $project) :self
```





#### Parameters

- **$project**: string
    







#### Return Values

self



#### setProjectUrl()


[CodeContribution.php](../files/web-modules-custom-ct-manager-src-data-codecontribution.md) : Line 118


```php
setProjectUrl(string  $projectUrl) :self
```





#### Parameters

- **$projectUrl**: string
    







#### Return Values

self



#### setStatus()


[CodeContribution.php](../files/web-modules-custom-ct-manager-src-data-codecontribution.md) : Line 154


```php
setStatus(string  $status) :self
```





#### Parameters

- **$status**: string
    







#### Return Values

self



#### setTechnology()


[CodeContribution.php](../files/web-modules-custom-ct-manager-src-data-codecontribution.md) : Line 163


```php
setTechnology(string  $technology) :self
```





#### Parameters

- **$technology**: string
    







#### Return Values

self




