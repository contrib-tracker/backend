// Import custom Cypress commands from commands.js
import './commands';

// Require Cypress XPath plugin to use XPath selectors
require('@cypress/xpath');

// Import Percy for visual testing
import '@percy/cypress';
import 'cypress-real-events';

// Handle uncaught exceptions in Cypress tests
Cypress.on('uncaught:exception', () => {
  // Returning false here prevents Cypress from failing the test
  return false;
});
