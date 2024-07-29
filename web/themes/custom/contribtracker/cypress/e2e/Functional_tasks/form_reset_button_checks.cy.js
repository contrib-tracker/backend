// Describe the test suite for verifying form reset functionality with positive and negative scenarios
describe(
  'Form Reset Button Validation with Positive and Negative Scenarios',
  { tags: '@form' },
  () => {
    // Before each test, visit the page containing the form
    beforeEach(() => {
      cy.visit('/');
    });

    // Test to validate form reset functionality with valid data entry
    it(
      'should reset the form with valid data entry',
      { tags: '@positive' },
      () => {
        // Extract the first user name from the specified locator
        cy.get('.contrib__card_contributer > a')
          .first() // Select the first user
          .invoke('text') // Get the text of the user
          .then((userName) => {
            // Log the extracted user name for debugging
            cy.log(`Extracted user name: ${userName.trim()}`);

            // Type the extracted user name into the input field
            cy.get('#edit-uid').type(userName.trim());

            // Click the apply button to filter results
            cy.get('#edit-submit-all-contributions')
              .should('have.value', 'Apply')
              .click();

            // Verify the input field contains the entered user name
            cy.get('#edit-uid').should('have.value', userName.trim());

            // Click the reset button to clear the form
            cy.get('#edit-reset-all-contributions')
              .should('have.value', 'Reset')
              .click();

            // Verify the input field is reset to empty
            cy.get('#edit-uid').should('have.value', '');

            // Verify the reset button visibility
            verifyResetButtonVisibility();
          });
      },
    );

    // Test to validate form reset functionality with invalid data entry
    it(
      'should reset the form with invalid data entry',
      { tags: '@negative' },
      () => {
        // Type an invalid user name into the input field
        cy.get('#edit-uid').type('NonExistUser'); // Enter an invalid user name

        // Click the apply button to filter results
        cy.get('#edit-submit-all-contributions')
          .should('have.value', 'Apply')
          .click();

        // Verify the input field contains the entered invalid user name
        cy.get('#edit-uid').should('have.value', 'NonExistUser');

        // Click the reset button to clear the form
        cy.get('#edit-reset-all-contributions')
          .should('have.value', 'Reset')
          .click();

        // Verify the input field is reset to empty
        cy.get('#edit-uid').should('have.value', '');

        // Verify the reset button visibility
        verifyResetButtonVisibility();
      },
    );
  },
);

// Function to verify the reset button visibility after reset
function verifyResetButtonVisibility() {
  cy.get('body').then(($body) => {
    if ($body.find('#edit-reset-all-contributions').length > 0) {
      throw new Error('Reset Button is still visible, expected to not exist');
    } else {
      assert.isOk(
        'Reset Button not found - All works as expected',
        'everything is OK',
      );
    }
  });
}
