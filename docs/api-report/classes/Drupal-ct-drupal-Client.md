
- [Drupal](../namespaces/drupal.md)
- [ct_drupal](../namespaces/drupal-ct-drupal.md)


## Client

- **extends**: [Client](# \Hussainweb\DrupalApi\Client)

- **In Package**:
    - [Application](../packages/Application.md)
  


---





[Client.php](../files/web-modules-custom-ct-drupal-src-client.md) : Line 15

*Drupal.org client service.*


This class is responsible for retrieving data from drupal.org. It is a simple
decorator on the base client class in hussainweb/drupal-api-client package.
The decorator just adds a header to set User-Agent for this application.







### Table of Contents










#### Methods
- **[getEntity()](../classes/Drupal-ct-drupal-Client.md#getentity)**
           : mixed
*{@inheritdoc}*









### Methods

#### getEntity()

[Client.php](../files/web-modules-custom-ct-drupal-src-client.md) : Line 20

*{@inheritdoc}*

!!! info
    getEntity([Request](# \Hussainweb\DrupalApi\Request\Request) $request) :mixed




**Parameters**

- **$request**: [Request](# \Hussainweb\DrupalApi\Request\Request)
    








