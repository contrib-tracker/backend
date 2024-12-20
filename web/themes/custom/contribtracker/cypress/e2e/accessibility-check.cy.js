// Import the list of pages and their URLs from a fixture file
import pages from '../fixtures/page-check-urls.json';

describe('Accessibility Testing for All Pages', { tags: ['expensive'] }, () => {  
    // Iterate over each page in the `pages` object
    Object.entries(pages).forEach(([pageName, pageData]) => {
      it(`Validates accessibility for ${pageName} page`, () => {
        // Send an HTTP request to the page's URL to verify its accessibility status
        cy.request({
          url: pageData.url, // Page URL
          failOnStatusCode: false, // Do not fail the test on non-2xx/3xx HTTP status codes
        }).then((response) => {
          // Skip testing the page if the server returns a 403 Forbidden status
          if (response.status === 403) {
            cy.log(`Skipping ${pageName} page due to 403 Forbidden.`);
            return;
          }
  
          // Visit the page to load it in the Cypress browser
          cy.visit(pageData.url);
  
          // Inject the axe-core library into the page for accessibility testing
          cy.injectAxe();
  
          // Perform an accessibility check using axe
          cy.checkA11y(null, null, (violations) => {
            // If any violations are found, log them and fail the test
            if (violations.length > 0) {
              // Log detailed information about each violation
              logAccessibilityViolations(violations, pageName);
  
              // Throw an error to fail the test, including a formatted list of violations
              throw new Error(
                `${violations.length} accessibility violations found on ${pageName}:\n${formatViolations(
                  violations
                )}`
              );
            }
          });
        });
      });
    });
  
    /**
     * Logs detailed information about accessibility violations to the console.
     * @param {Array} violations - The list of accessibility violations.
     * @param {string} pageName - The name of the page being tested.
     */
    function logAccessibilityViolations(violations, pageName) {
      // Log the number of violations on the page
      cy.task('log', `\nAccessibility violations on ${pageName}: ${violations.length}\n`);
      violations.forEach(({ id, impact, description, nodes }) => {
        // Log individual violation details
        cy.task('log', `Violation ID: ${id}`);
        cy.task('log', `Impact: ${impact}`);
        cy.task('log', `Description: ${description}`);
        cy.task('log', `Affected Elements: ${nodes.map((node) => node.target).join(', ')}`);
        cy.task('log', '---------------------------');
      });
    }
  
    /**
     * Formats the list of accessibility violations into a readable string.
     * @param {Array} violations - The list of accessibility violations.
     * @returns {string} - A formatted string of violation details.
     */
    function formatViolations(violations) {
      return violations
        .map(
          ({ id, impact, description, nodes }) =>
            `- Violation ID: ${id}\n  Impact: ${impact}\n  Description: ${description}\n  Affected Elements: ${nodes
              .map((node) => node.target)
              .join(', ')}\n`
        )
        .join('\n');
    }
  });
  