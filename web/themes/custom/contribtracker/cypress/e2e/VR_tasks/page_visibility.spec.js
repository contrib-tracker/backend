//Testcase - Checks for main page response code, broken images and any other visibility glitches

const urls = Cypress.env('urlsList');
// const version = Cypress.env('version');

describe('Validate Page Visibility and Status Code', () => {
  urls.forEach((page) => {
    it(`should check visibility and status code of ${page['title']} page`, () => {
      cy.request(page['url']).then(() => {
        cy.document().should('have.property', 'visibilityState', 'visible');
      });
      cy.window().then((w) => (w.beforeReload = true));

      //Initially the new property is there
      cy.window().should('have.prop', 'beforeReload', true);

      //Visiting the page
      cy.visit(page['url']);

      //After reload the property should be gone
      cy.window().should('not.have.prop', 'beforeReload');

      //Scroll down as the page is having lazy loading component in it
      cy.scrollTo('bottom', { ensureScrollable: false }).wait(1000);
      cy.scrollTo('top', { ensureScrollable: false }).wait(1000);

      //Enable visual regression
      // cy.percySnapshot(`${page.title} page`);
    });
  });
});
