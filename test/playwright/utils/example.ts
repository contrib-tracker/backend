/**
 * Example usage of the drush utilities in Playwright tests
 */

import { test, expect } from '@playwright/test';
import { drush, isRunningInDdevContainer, isDdevAvailable, isDdevProject } from './index';

// Example test demonstrating drush utilities usage
test.describe('Drush Utilities Example', () => {

  test('should detect DDEV context correctly', async () => {
    console.log('Running in DDEV container:', isRunningInDdevContainer());
    console.log('DDEV available on host:', isDdevAvailable());
    console.log('Is DDEV project:', isDdevProject());
  });

  test('should clear Drupal cache', async () => {
    try {
      await drush.clearCache();
      console.log('Cache cleared successfully');
    } catch (error) {
      console.error('Failed to clear cache:', error);
    }
  });

  test('should get Drupal status', async () => {
    try {
      const status = await drush.status();
      console.log('Drupal status:', status);

      // Parse JSON if possible
      try {
        const statusObj = JSON.parse(status);
        expect(statusObj).toHaveProperty('drupal-version');
      } catch (parseError) {
        // Status might not be in JSON format
        console.log('Status is not in JSON format');
      }
    } catch (error) {
      console.error('Failed to get status:', error);
    }
  });

  test('should execute custom drush command', async () => {
    try {
      const result = await drush.exec('core:status --field=drupal-version');
      console.log('Drupal version:', result);
      expect(result).toBeDefined();
    } catch (error) {
      console.error('Failed to execute custom command:', error);
    }
  });

});

/**
 * Example of using drush utilities in test setup/teardown
 */
test.describe('Test with Drupal Setup', () => {

  test.beforeEach(async () => {
    // Clear cache before each test
    try {
      await drush.clearCache();
    } catch (error) {
      console.warn('Could not clear cache in setup:', error);
    }
  });

  test('example test that needs clean Drupal state', async ({ page }) => {
    // Your test logic here
    // The cache was cleared before this test ran

    // Example: Enable a module for testing
    try {
      await drush.enableModule('dblog');
      console.log('dblog module enabled for testing');
    } catch (error) {
      console.warn('Could not enable dblog module:', error);
    }

    // Navigate to your Drupal site and test
    // await page.goto('http://your-site.ddev.site');
  });

  test.afterEach(async () => {
    // Cleanup after each test if needed
    try {
      await drush.disableModule('dblog');
      console.log('dblog module disabled after test');
    } catch (error) {
      console.warn('Could not disable dblog module:', error);
    }
  });

});
