// Describe the test suite for Form Auto-Suggestions Validation with Extracted User Name
describe('Form Auto-Suggestions Validation with Extracted User Name', { tags: ['critical-path'] }, () => {
  it('should show auto-suggestions when typing the first user name', () => {
    // Visit the page with the form
    cy.visit('/');

    // Extract the first user name from the specified locator
    cy.get('.contrib__card_contributer > a')
      .first() // Select the first user
      .invoke('text') // Get the text of the user
      .then((userName) => {
        // Log the extracted user name
        cy.log(`Extracted user name: ${userName.trim()}`);

        // Type the extracted user name into the input field
        cy.get('#edit-uid')
          .type(userName.trim()) // Enter the user name
          .wait(1000); // Wait for suggestions to appear

        // Verify that suggestions are visible
        cy.get('.ui-menu-item')
          .should('be.visible') // Ensure suggestions are visible
          .and('have.length.greaterThan', 0); // Check for at least one suggestion

        // Verify suggestions contain the extracted user name
        cy.get('.ui-menu-item>a').should('contain.text', userName.trim()); // Ensure suggestion contains user name

        // Optionally, click on a suggestion
        cy.get('.ui-menu-item>a')
          .first() // Select the first suggestion
          .click();

        // Click the apply button to filter results
        cy.get('#edit-submit-all-contributions')
          .should('have.value', 'Apply') // Ensure the button label is 'Apply'
          .click();

        // Verify filtered results show the user name
        cy.get('.contrib__card_contributer>a')
          .should('be.visible')
          .each(($el) => {
            cy.wrap($el)
              .should('be.visible') // Ensure each contributor name is visible
              .should('have.text', userName.trim()); // Verify text matches the user name
          });
      });
  });
});
