// Importing the fixture containing URLs
import urlsFixture from '../../fixtures/urls.json';

describe('Visual Testing', { tags: '@percy' }, () => {
  // Loop through the first 5 URLs from the fixture
  Object.keys(urlsFixture).forEach((key) => {
    const url = urlsFixture[key];

    it(`Visits ${key} page and takes Percy snapshot`, () => {
      // Sending a request to the URL to ensure it's reachable
      cy.request(url).then(() => {
        // Asserting that the document is visible
        cy.document().should('have.property', 'visibilityState', 'visible');
      });

      // Setting a property before reloading the window
      cy.window().then((w) => (w.beforeReload = true));

      // Initially, the new property should exist
      cy.window().should('have.prop', 'beforeReload', true);

      // Visiting the page
      cy.visit(url);

      // After reload, the property should no longer exist
      cy.window().should('not.have.prop', 'beforeReload');

      // Scroll down and up to ensure lazy loading components are rendered
      cy.scrollTo('bottom', { ensureScrollable: false }).wait(1000);
      cy.scrollTo('top', { ensureScrollable: false }).wait(1000);

      // Take Percy snapshot with a descriptive name
      cy.percySnapshot(`${key} page`);
    });
  });
});
