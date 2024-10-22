// Importing the fixture containing URLs
import pageUrls from '../fixtures/page-check-urls.json';
import 'cypress-axe';  // Import Cypress-Axe for accessibility checks

describe('Accessibility Testing for Multiple Pages', () => {
  // Iterate through the URLs in the fixture file
  Object.keys(pageUrls).forEach((key) => {
    const url = pageUrls[key].url;
    const userType = pageUrls[key].hasOwnProperty('userType') ? pageUrls[key].userType : '';

    it(`Visits ${key} page and checks for accessibility violations`, () => {
      // Login for admin pages if required
      if (userType === 'admin') {
        cy.login('admin');  // Assumes you have a cy.login custom command
      }

      // Ensure the page is reachable by sending a request
      cy.request(url).then(() => {
        cy.document().should('have.property', 'visibilityState', 'visible');
      });

      // Visit the page
      cy.visit(url);

      // Inject axe-core for accessibility testing
      cy.injectAxe();

      // Run accessibility checks and log violations
      cy.checkA11y(null, null, (violations) => {
        // Log the number of violations
        cy.task('log', `${violations.length} accessibility violations detected on ${key} page`);

        // Log detailed information for each violation
        violations.forEach((violation) => {
          cy.task('log', `Violation ID: ${violation.id}`);
          cy.task('log', `Description: ${violation.description}`);
          cy.task('log', `Help URL: ${violation.helpUrl}`);
          violation.nodes.forEach((node) => {
            cy.task('log', `Element causing the issue: ${node.target}`);
            cy.task('log', `Failure Summary: ${node.failureSummary}`);
          });
          cy.task('log', '----------------------');
        });

        // Assert that there are no violations
        expect(violations).to.have.length(0);
      });
    });
  });
});
