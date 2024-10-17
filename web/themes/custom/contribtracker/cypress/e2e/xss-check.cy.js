// Describe the test suite for XSS Attack Simulation in Form Fields Verification
describe('XSS Attack Simulation in Form Fields Verification', () => {
  before(() => {
    // Visit the page with the form
    cy.visit('/');
  });

  it('should detect XSS vulnerabilities in form fields', () => {
    // Define a malicious XSS payload
    const xssPayload = '<script>alert("XSS")</script>';
    let alertTriggered = false;

    // Listen for the window.alert event, which indicates an XSS vulnerability
    cy.on('window:alert', (txt) => {
      alertTriggered = true;
      // Assert that the alert message is what we expect (XSS vulnerability detected)
      expect(txt).to.contains('XSS');
    });

    // Fill in the form fields with the XSS payload
    cy.get('input#edit-title').should('be.visible').type(xssPayload);
    cy.get('input#edit-uid').should('be.visible').type(xssPayload);

    // Submit the form
    cy.get('input#edit-submit-all-contributions').click();

    // After submitting, check if alert was triggered
    cy.then(() => {
      if (!alertTriggered) {
        throw new Error(
          'XSS payload was not executed, no alert was triggered. The form may be safe from XSS.',
        );
      }
    });
  });

  // Additional test to ensure sanitization after form submission
  it('should sanitize XSS payload in form fields', () => {
    // Define a malicious XSS payload
    const xssPayload = '<script>alert("XSS")</script>';

    // Fill in the form fields with the XSS payload
    cy.get('input#edit-title').should('be.visible').type(xssPayload);
    cy.get('input#edit-uid').should('be.visible').type(xssPayload);

    // Submit the form
    cy.get('input#edit-submit-all-contributions').click();

    // After submission, ensure the XSS payload is sanitized (not visible in the page source)
    cy.get('input#edit-title').should('not.have.value', xssPayload);
    cy.get('input#edit-uid').should('not.have.value', xssPayload);
    
    // Check that no script tags or XSS payload are reflected in the DOM
    cy.get('body').should('not.contain', xssPayload);
  });
});
