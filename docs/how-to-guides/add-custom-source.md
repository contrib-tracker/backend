# Adding and Customizing a Contribution Source

The Contribution Tracker supports tracking contributions from various data sources through custom plugins. This guide explains how to add a new contribution source, including creating and configuring the plugin and managing any necessary database adjustments.

## Steps to Add and Customize a Contribution Source

1. **Understand the Contribution Plugin System**  
   - Contribution sources are implemented as plugins of type `ContributionSource` in the Contribution Plugin Manager.  
   - Each plugin retrieves and processes contributions for its source during cron runs.  

2. **Configure the New Data Source**  
   - Identify the API or database schema for the source you wish to integrate.  
   - Ensure you have access credentials, such as tokens or API keys, for secure integration.  

3. **Create the Custom Plugin**  
   - **File Location**: Place the plugin in the `src/Plugin/ContributionSource` directory of your custom module.  
   - **Plugin Annotation**: Use the `@ContributionSource` annotation to define the plugin, like this:

     ```php
     /**
      * @ContributionSource(
      *   id = "custom_source",
      *   description = @Translation("Retrieve contributions from Custom Source.")
      * )
      */
     ```

   - **Implement the Interface**: Ensure the plugin implements the `ContributionSourceInterface` and its required methods:  
     - `process()`: Fetch and process contributions.  
     - `getUserIssues()` and `getUserCodeContributions()`: Handle data retrieval for user contributions.  

4. **Adjust the Database if Necessary**  
   - Review the existing schema to determine if additional fields or tables are needed for the new data source.  
   - Use Drupal’s schema API to add custom tables or fields.  

5. **Test the Plugin**  
   - Use test data or sandbox API credentials to validate the plugin.  
   - Ensure contributions are retrieved and processed correctly without errors.  

6. **Integrate with the Contribution Tracker**  
   - Enable the plugin in the Contribution Tracker configuration.  
   - Run cron to test how contributions from the new source are tracked.  

### Example: Creating a Plugin for Custom API Source

- **File Path**: `custom_module/src/Plugin/ContributionSource/CustomSource.php`  
- **Sample Code**:

   ```php
   namespace Drupal\custom_module\Plugin\ContributionSource;

   use Drupal\ct_manager\ContributionSourceInterface;

   /**
    * @ContributionSource(
    *   id = "custom_source",
    *   description = @Translation("Retrieve contributions from a custom API.")
    * )
    */
   class CustomSource implements ContributionSourceInterface {
       public function process() {
           // Custom logic to fetch and process contributions.
       }

       public function getUserIssues() {
           // Fetch user issues from the API.
       }

       public function getUserCodeContributions() {
           // Fetch user code contributions from the API.
       }
   }
   ```
