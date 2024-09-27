// Describe the test suite for Technology Selection Filter Validation
describe('Technology Selection Filter Validation', () => {
  // Before test, visit the base URL
  before(() => {
    cy.visit('/');
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
