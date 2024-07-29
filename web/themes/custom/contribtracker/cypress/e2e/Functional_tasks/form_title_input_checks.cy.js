// Describe the test suite for Title Input Filter Validation with Positive and Negative Scenarios
describe(
  'Title Input Filter Validation with Positive and Negative Scenarios',
  { tags: '@form' },
  () => {
    // Before each test, visit the base URL
    beforeEach(() => {
      cy.visit('/');
    });

    // Test to verify the correct results are displayed when a title is entered in the input field
    it(
      'should show right results on title input',
      { tags: '@positive' },
      () => {
        // Get the text of the first contribution title
        cy.get('.contrib__card_title>a')
          .first()
          .invoke('text')
          .then((text) => {
            cy.log(text);
            // Type the title into the title input field
            cy.get('#edit-title').type(text);
            // Click the apply button to filter results
            cy.get('#edit-submit-all-contributions')
              .should('have.value', 'Apply')
              .click();
            // Verify each result has the expected title
            cy.get('.contrib__card_title>a')
              .should('be.visible')
              .each(($el) => {
                cy.wrap($el).should('be.visible').should('have.text', text);
              });
          });
      },
    );

    // Test to verify no results are displayed for an incorrect title input
    it(
      'should show no results for incorrect title input',
      { tags: '@negative' },
      () => {
        // Type an incorrect title into the title input field
        cy.get('#edit-title').type('NonExistentTitle');
        // Click the apply button to filter results
        cy.get('#edit-submit-all-contributions')
          .should('have.value', 'Apply')
          .click();
        // Verify that no results are displayed
        cy.get('.contrib__card_title>a').should('not.exist');
      },
    );

    // Test to verify no results are displayed for special characters in the title input
    it(
      'should show no results for special characters in title input',
      { tags: '@negative' },
      () => {
        // Type special characters into the title input field
        cy.get('#edit-title').type('!@#$%^&*()');
        // Click the apply button to filter results
        cy.get('#edit-submit-all-contributions')
          .should('have.value', 'Apply')
          .click();
        // Verify that no results are displayed
        cy.get('.contrib__card_title>a').should('not.exist');
      },
    );

    // Test to verify no results are displayed for numerical title input
    it(
      'should show no results for numerical title input',
      { tags: '@negative' },
      () => {
        // Type numerical characters into the title input field
        cy.get('#edit-title').type('1234567890');
        // Click the apply button to filter results
        cy.get('#edit-submit-all-contributions')
          .should('have.value', 'Apply')
          .click();
        // Verify that no results are displayed
        cy.get('.contrib__card_title>a').should('not.exist');
      },
    );
  },
);
