describe('User Login Test', { tags: ['login'] }, () => {
    beforeEach(() => {
      // Visit the login page
      cy.visit('/user/login');
    });
  
    it('Should log in a user successfully', () => {
      // Fill out the login form
      cy.get('input[name="name"]').type('existinguser');
      cy.get('input[name="pass"]').type('CorrectPassword123!');
  
      // Submit the form
      cy.get('input[type="submit"]').click();
  
      // Verify login success
      cy.url().should('include', '/'); // Assuming redirection to a dashboard
      cy.contains('Welcome back, existinguser').should('be.visible'); // Check for welcome message
    });
  
    it('Should show an error for invalid credentials', () => {
      // Fill out the login form with incorrect credentials
      cy.get('input[name="name"]').type('nonexistent');
      cy.get('input[name="pass"]').type('WrongPassword!');
  
      // Submit the form
      cy.get('input[type="submit"]').click();
  
      // Verify error message
      cy.contains('Unrecognized username or password').should('be.visible');
    });
  
    it('Should validate required fields', () => {
      // Submit the form without filling fields
      cy.get('input[type="submit"]').click();
  
      // Verify validation messages
      cy.contains('Username is required').should('be.visible');
      cy.contains('Password is required').should('be.visible');
    });
  });
  