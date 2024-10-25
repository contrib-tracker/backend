// Describe the test suite for Hover Actions Verification
describe('Hover Actions Verification', () => {
  // Before each test, visit the base URL
  beforeEach(() => {
    cy.viewport('macbook-13');
    cy.visit('/');
  });

  // Test case for verifying hover actions on the "Contrib Tracker" logo
  it('should change the element style on hover for contrib tracker logo', () => {
    // Assert the initial color of the element before hover
    cy.get('.nav__container a.link.branding__link').should(
      'have.css',
      'color',
      'rgba(236, 75, 6, 0.933)', // Example: color before hover (RGBA format)
    );

    // Perform hover action and then verify the style changes
    cy.get('.nav__container a.link.branding__link')
      .realHover()
      .then(($element) => {
        cy.wrap($element)
          .realHover()
          .then(() => {
            // Assert that the color of the element changes to white upon hover
            cy.wrap($element).should(
              'have.css',
              'color',
              'rgb(109, 104, 104)', // Color changes to white after hover (RGB format)
            );
          });
      });
  });

  // Test case for verifying hover actions on the "Login with Google" link
  it('should change the element style on hover for login with google link', () => {
    // Assert the initial color of the element before hover
    cy.get('.nav__auth-link')
      .eq(1)
      .then(($element) => {
        cy.wrap($element).then(() => {
          cy.wrap($element).should(
            'have.css',
            'color',
            'rgba(236, 75, 6, 0.933)', // Example: color before hover (RGBA format)
          );
        });
      });

    // Perform hover action and then verify the style changes
    cy.get('.nav__auth-link')
      .eq(1)
      .then(($element) => {
        cy.wrap($element)
          .realHover()
          .then(() => {
            // Assert that the color of the element changes to white upon hover
            cy.wrap($element).should(
              'have.css',
              'color',
              'rgb(255, 255, 255)', // Color changes to white after hover (RGB format)
            );
            // Assert that the background color of the element changes to the expected value upon hover
            cy.wrap($element).should(
              'have.css',
              'background-color',
              'rgba(236, 75, 6, 0.933)', // Example: background color changes after hover (RGBA format)
            );
          });
      });
  });
});
