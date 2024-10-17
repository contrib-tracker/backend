// Importing the fixture containing URLs
import pageUrls from '../fixtures/page-check-urls.json';
import 'cypress-file-upload';  // Import Cypress File Upload plugin

describe('File Upload Testing for Multiple Pages', () => {
  const validFileName = 'test-image.jpg';  // Name of the valid file to upload
  const invalidFileName = 'test-document.pdf'; // Example of an invalid file type
  const largeFileName = 'large-test-image.jpg'; // File that exceeds the size limit

  // Iterate through the URLs in the fixture file
  Object.keys(pageUrls).forEach((key) => {
    const url = pageUrls[key].url;
    const userType = pageUrls[key].hasOwnProperty('userType') ? pageUrls[key].userType : '';

    it(`Visits ${key} page and tests file upload functionality`, function () {
      // Login for admin pages if required
      if (userType === 'admin') {
        cy.login('admin');  // Assumes you have a cy.login custom command
      }

      // Visit the page
      cy.visit(url);

      // Check if the file input exists
      cy.get('body').then(($body) => {
        if ($body.find('input[type="file"]').length > 0) {
          // File input exists, proceed with upload tests
          cy.get('input[type="file"]').then(($fileInput) => {
            // Test valid file upload
            cy.wrap($fileInput).attachFile(validFileName);
            cy.get('button[type="submit"]').click();
            cy.contains('Upload successful').should('be.visible');

            // Test invalid file format
            cy.wrap($fileInput).attachFile(invalidFileName);
            cy.get('button[type="submit"]').click();
            cy.contains('Invalid file format').should('be.visible');

            // Test file size limit
            cy.wrap($fileInput).attachFile(largeFileName);
            cy.get('button[type="submit"]').click();
            cy.contains('File size exceeds the limit').should('be.visible');
          });
        } else {
          // Log a message indicating that the file input is not available
          cy.log(`No file upload option available on the ${key} page. Skipping file upload tests.`);
          this.skip();  // Skip the test if no file input is available
        }
      });
    });
  });
});