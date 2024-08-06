// Describe the test suite for Pagination Handling and Validation
describe('Pagination Handling and Validation', () => {
  // Define the test case
  it('should filter results with selected contribution type on each page', () => {
    // Visit the page with the form
    cy.visit('/');

    // Remove code and non-code contribution types
    cy.get('span.select2-selection--multiple').should('be.visible').click();
    cy.get('li[id*="-code_contribution"]').should('be.visible').click();
    cy.get('span.select2-selection--multiple').should('be.visible').click();
    cy.get('li[id*="non_code_contribution"]').should('be.visible').click();

    // Submit the form or trigger the filter action
    cy.get('input#edit-submit-all-contributions').click();

    // Assert the filtered results and handle pagination
    filterAssertion();
    clickNextButton();
  });
});

// Function to assert that the filtered results match the expected criteria
function filterAssertion() {
  // Get the displayed selected filter text
  cy.get('.select2-selection__choice__display')
    .invoke('text')
    .then((expectedText) => {
      // For each contribution card type, assert it matches the expected filter text
      cy.get('.contrib__card_type').each(($el) => {
        cy.wrap($el)
          .invoke('text')
          .then((actualText) => {
            // Trim whitespace and compare actual text to expected text
            cy.wrap(actualText.trim()).should('eq', expectedText);
          });
      });
    });
}

// Function to handle clicking the next pagination button and asserting results
function clickNextButton() {
  cy.get('body').then((pagination) => {
    // Check if the "next" pagination button exists
    if (pagination.find('.pager__item--next').length > 0) {
      // Click the "next" button if it exists and assert the filtered results
      cy.get('.pager__item--next').should('exist').click();
      filterAssertion();
      // Recursively call clickNextButton to handle multiple pages
      clickNextButton();
    } else {
      // Verify that no "next" button is found on the last page
      cy.get('body').then((pager) => {
        if (pager.find('.pager__item--next').length > 0) {
          // Throw an error if "next" button is found at the last page
          throw new Error(
            'Pagination Error - pager next found at the last page',
          );
        } else {
          // Assert that everything is okay if no "next" button is found
          assert.isOk('No pager found', 'everything is OK');
        }
      });
    }
  });
}
