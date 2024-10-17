// Describe the test suite for Form Auto-Suggestions Validation with Extracted User Name
describe('Form Auto-Suggestions Validation with Extracted User Name', () => {
  it('should show auto-suggestions when typing the first user name', () => {
    // Visit the page with the form
    cy.visit('/');

    // Extract the first user name from the specified locator
    cy.get('.contrib__card_contributer > a')
      .first() // Select the first user
      .invoke('text') // Get the text of the user
      .then((userName) => {
        // Trim the user name and ensure it's not empty
        const trimmedUserName = userName.trim();
        if (!trimmedUserName) {
          throw new Error('User name is empty');
        }

        // Log the extracted user name
        cy.log(`Extracted user name: ${trimmedUserName}`);

        // Type the extracted user name into the input field
        cy.get('#edit-uid')
          .should('be.visible') // Ensure the input field is visible
          .type(trimmedUserName) // Enter the user name
          .should('have.value', trimmedUserName) // Verify the input contains the user name
          .wait(1000); // Wait for suggestions to appear (improved dynamic wait below)

        // Dynamically wait for the suggestions to become visible
        cy.get('.ui-menu-item')
          .should('be.visible') // Ensure suggestions are visible
          .and('have.length.greaterThan', 0); // Check for at least one suggestion

        // Verify suggestions contain the extracted user name
        cy.get('.ui-menu-item>a')
          .should('contain.text', trimmedUserName) // Ensure suggestion contains user name
          .first() // Optionally, select the first suggestion
          .click();

        // Click the apply button to filter results
        cy.get('#edit-submit-all-contributions')
          .should('have.value', 'Apply') // Ensure the button label is 'Apply'
          .click();

        // Verify filtered results show the user name
        cy.get('.contrib__card_contributer>a')
          .should('be.visible') // Ensure results are visible
          .each(($el) => {
            cy.wrap($el)
              .should('have.text', trimmedUserName); // Verify each result contains the user name
          });
      });
  });

  // Optional test case to check for no suggestions when typing invalid user names
  it('should not show suggestions for invalid user names', () => {
    cy.visit('/');

    // Type an invalid user name into the input field
    cy.get('#edit-uid')
      .type('InvalidUserName123') // Type an invalid name
      .wait(1000); // Wait for any suggestions

    // Ensure no suggestions are displayed
    cy.get('.ui-menu-item').should('not.exist'); // Check no suggestions appear
  });
});
