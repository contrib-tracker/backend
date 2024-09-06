// Describe the test suite for Form Filter Validation with Positive and Negative Scenarios
describe('Form Filter Validation with Positive and Negative Scenarios', () => {
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

  // Test to verify the correct results are displayed when a title is entered in the input field
  it('should show right results on title input', () => {
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
            cy.wrap($el)
              .contains(text, { matchCase: false })
              .should('be.visible');
          });
      });
  });

  // Test to verify no results are displayed for an incorrect title input
  it('should show no results for incorrect title input', () => {
    // Type an incorrect title into the title input field
    cy.get('#edit-title').type('NonExistentTitle');
    // Click the apply button to filter results
    cy.get('#edit-submit-all-contributions')
      .should('have.value', 'Apply')
      .click();
    // Verify that no results are displayed
    cy.get('.contrib__card_title>a').should('not.exist');
  });

  // Test to verify no results are displayed for special characters in the title input
  it('should show no results for special characters in title input', () => {
    // Type special characters into the title input field
    cy.get('#edit-title').type('!@#$%^&*()');
    // Click the apply button to filter results
    cy.get('#edit-submit-all-contributions')
      .should('have.value', 'Apply')
      .click();
    // Verify that no results are displayed
    cy.get('.contrib__card_title>a').should('not.exist');
  });

  // Test to verify no results are displayed for numerical title input
  it('should show no results for numerical title input', () => {
    // Type numerical characters into the title input field
    cy.get('#edit-title').type('1234567890');
    // Click the apply button to filter results
    cy.get('#edit-submit-all-contributions')
      .should('have.value', 'Apply')
      .click();
    // Verify that no results are displayed
    cy.get('.contrib__card_title>a').should('not.exist');
  });

  // Test to verify the correct results are displayed when a technology is selected
  it('should show right results on technology selection', () => {
    // Click on the technology selection dropdown
    cy.get(
      '#select2-edit-field-contribution-technology-target-id-container',
    ).click();
    // Select the second option in the dropdown
    cy.get('li.select2-results__option--selectable').eq(1).click();
    // Click the apply button to filter results
    cy.get('#edit-submit-all-contributions')
      .should('have.value', 'Apply')
      .click();
    // Get the selected technology's title attribute
    cy.get("[class*='contribution-technology'] .select2-selection__rendered")
      .invoke('attr', 'title')
      .then((title) => {
        cy.log(title);

        // Get the text of the technology tags in the results
        cy.get('.contrib__card_tags > a')
          .invoke('text')
          .then((text) => {
            cy.log(text);
            // Verify the title matches the text of the technology tags
            expect(title).to.equal(text);
          });
      });
  });
});
