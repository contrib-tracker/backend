// Describe the test suite for Name Input Filter Validation with Positive and Negative Scenarios
describe('Name Input Filter Validation with Positive and Negative Scenarios', () => {
  // Before each test, visit the base URL to ensure a fresh start
  beforeEach(() => {
    cy.visit('/');
  });

  // Test to verify the correct results are displayed when a contributor's name is entered in the input field
  it('should show right results on name input', () => {
    // Get the text of the first contributor's name from the page
    cy.get('.contrib__card_contributer>a')
      .first()
      .invoke('text')
      .then((text) => {
        cy.log(text); // Log the name for debugging purposes
        // Type the contributor's name into the name input field
        cy.get('#edit-uid').type(text);
        // Click the apply button to filter the results based on the name input
        cy.get('#edit-submit-all-contributions')
          .should('have.value', 'Apply')
          .click();
        // Verify that each result matches the contributor's name
        cy.get('.contrib__card_contributer>a')
          .should('be.visible')
          .each(($el) => {
            cy.wrap($el).should('be.visible').should('have.text', text);
          });
      });
  });

  // Test to ensure no results are displayed for an incorrect name input
  it('should show no results for incorrect name input', () => {
    // Type an incorrect name into the name input field
    cy.get('#edit-uid').type('NonExistentName');
    // Click the apply button to filter results
    cy.get('#edit-submit-all-contributions')
      .should('have.value', 'Apply')
      .click();
    // Verify that no results are displayed for the incorrect name
    cy.get('.contrib__card_contributer>a').should('not.exist');
  });

  // Test to ensure no results are displayed for an excessively long name input
  it('should show no results for excessively long name input', () => {
    // Type an excessively long name into the name input field
    const longName = 'a'.repeat(100);
    cy.get('#edit-uid').type(longName);
    // Click the apply button to filter results
    cy.get('#edit-submit-all-contributions')
      .should('have.value', 'Apply')
      .click();
    // Verify that no results are displayed for the excessively long name
    cy.get('.contrib__card_contributer>a').should('not.exist');
  });

  // Test to ensure no results are displayed for a numerical name input
  it('should show no results for numerical name input', () => {
    // Type numerical characters into the name input field
    cy.get('#edit-uid').type('1234567890');
    // Click the apply button to filter results
    cy.get('#edit-submit-all-contributions')
      .should('have.value', 'Apply')
      .click();
    // Verify that no results are displayed for the numerical name
    cy.get('.contrib__card_contributer>a').should('not.exist');
  });

  // Test to ensure no results are displayed for special characters in the name input
  it('should show no results for special characters in name input', () => {
    // Type special characters into the name input field
    cy.get('#edit-uid').type('!@#$%^&*()');
    // Click the apply button to filter results
    cy.get('#edit-submit-all-contributions')
      .should('have.value', 'Apply')
      .click();
    // Verify that no results are displayed for the special characters
    cy.get('.contrib__card_contributer>a').should('not.exist');
  });
});
