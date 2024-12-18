
  describe('File Upload Test in Form', () => {
    it('Should successfully upload a file', () => {
      // Visit the form page
      cy.visit('/user/register');
  
      // Verify file input exists
      cy.get('input[type="file"]').should('exist');
  
      // Upload the file
      cy.get('input[type="file"]').attachFile('sample_image.png');
  
      // Confirm file upload succeeded (e.g., value updated or form submission feedback)
      cy.get('input#edit-user-picture-0-upload').should('not.have.value', '');
    });
  });
  