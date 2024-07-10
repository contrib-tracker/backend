// Import custom Cypress commands from commands.js
import './commands';

// Register Cypress Grep to filter tests using tags or keywords
const registerCypressGrep = require('@cypress/grep');
registerCypressGrep();

// Require Cypress XPath plugin to use XPath selectors
require('@cypress/xpath');

// Import Percy for visual testing
import '@percy/cypress';

// Handle uncaught exceptions in Cypress tests
Cypress.on('uncaught:exception', () => {
  // Returning false here prevents Cypress from failing the test
  return false;
});

// Import mochawesome to add context to the test reports
import addContext from 'mochawesome/addContext';

// Utility function to convert test titles to filenames
const titleToFileName = (title) => title.replace(/[:\/]/g, '');

// Add context after each test run
Cypress.on('test:after:run', (test, runnable) => {
  // If the test failed, add a screenshot to the report
  if (test.state === 'failed') {
    let parent = runnable.parent;
    let filename = '';
    while (parent && parent.title) {
      filename = `${titleToFileName(parent.title)} -- ${filename}`;
      parent = parent.parent;
    }
    filename += `${titleToFileName(test.title)} (failed).png`;
    addContext({ test }, `../screenshots/${Cypress.spec.name}/${filename}`);
  }
  // Always add the video to the report
  addContext({ test }, `../videos/${Cypress.spec.name}.mp4`);
});
