// Assuming the URLs for specific pages are stored in a fixture file similar to your example
import pageUrls from '../fixtures/page-check-urls.json';

describe('Logging a Contribution', () => {
  Object.keys(pageUrls).forEach((key) => {
    const url = pageUrls[key].url;
    const userType = pageUrls[key].hasOwnProperty('userType') ? pageUrls[key].userType : '';

    // Only apply this test for pages related to logging contributions
    if (key.includes('contributions-add')) {
      it(`Visits ${key} page and logs a new contribution`, () => {
        // If the user needs to be logged in
        if (userType == 'admin') {
          cy.login('admin');
        }

        // Ensure the URL is reachable
        cy.request(url).then(() => {
          cy.document().should('have.property', 'visibilityState', 'visible');
        });

        // Initial window state setup
        cy.window().then((w) => (w.beforeReload = true));
        cy.window().should('have.prop', 'beforeReload', true);

        // Visit the contribution form page
        cy.visit(url);

        // Check that the 'beforeReload' property no longer exists after reload
        cy.window().should('not.have.prop', 'beforeReload');

        // Scroll to trigger lazy loading if necessary
        cy.scrollTo('bottom').wait(1000);
        cy.scrollTo('top').wait(1000);

        // Fill out the contribution form
        cy.get('input[name="title"]').type('Drupal Code Contribution');
        cy.get('textarea[name="description"]').type('Contributed a bug fix to the Views module.');
        cy.get('select[name="contribution_type"]').select('Code');

        // Submit the form
        cy.get('button[type="submit"]').click();

        // Ensure the form submission was successful
        cy.contains('Contribution has been successfully added').should('be.visible');
      });
    }
  });
});
