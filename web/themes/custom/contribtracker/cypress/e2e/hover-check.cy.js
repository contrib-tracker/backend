// Describe the test suite for Hover Actions Verification
describe('Hover Actions Verification', () => {
    // Set the viewport to "macbook-13" and visit the homepage before each test
    beforeEach(() => {
      cy.viewport('macbook-13'); // Set the viewport size for consistent display
      cy.visit('/'); // Navigate to the base URL
    });
  
    // Test case for verifying hover actions on the "Contrib Tracker" logo
    it('should change the element style on hover for Contrib Tracker logo', () => {
      // Ensure the logo element is visible before interacting
      cy.get('.nav__container a.link.branding__link')
        .should('be.visible')
        .and('have.css', 'color', 'rgba(236, 75, 6, 0.933)'); // Initial color before hover
  
      // Perform hover action and then verify style changes
      cy.get('.nav__container a.link.branding__link')
        .realHover() // Simulate hover action using realHover from the plugin
        .should('have.css', 'color', 'rgb(109, 104, 104)'); // Assert color changes after hover
    });
  
    // Test case for verifying hover actions on the "Login with Google" link
    it('should change the element style on hover for Login with Google link', () => {
      // Ensure the link is visible and has the correct initial color
      cy.get('.nav__auth-link')
        .eq(1)
        .should('be.visible') // Ensure the element is visible before hovering
        .and('have.css', 'color', 'rgba(236, 75, 6, 0.933)'); // Initial color before hover
  
      // Perform hover action and verify style changes
      cy.get('.nav__auth-link')
        .eq(1)
        .realHover() // Simulate hover action
        .should('have.css', 'color', 'rgb(255, 255, 255)') // Assert color changes to white
        .and('have.css', 'background-color', 'rgba(236, 75, 6, 0.933)'); // Assert background color change after hover
    });
  });
  