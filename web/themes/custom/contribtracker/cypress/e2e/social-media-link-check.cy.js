// Describe the test suite for Social Media Icons Redirection Validation
describe('Social Media Icons Redirection Validation', () => {
  // List of social media icons with their selectors
  const socialMediaLinks = [
    { selector: '.icon-facebook' },
    { selector: '.icon-twitter' },
    { selector: '.icon-linkedin' },
  ];

  // Test each social media icon redirection
  socialMediaLinks.forEach((link) => {
    it(`should redirect to the correct page when clicking the ${link.selector}`, () => {
      // Visit the main page to access the social media icons
      cy.visit('/');

      // Get the parent anchor tag of the social media icon
      cy.get(link.selector)
        .parent('a') // Select the parent anchor tag <a>
        .should('have.attr', 'href') // Assert that the anchor tag has an 'href' attribute
        .then((href) => {
          // Log the initial href value for debugging purposes
          cy.log(`Initial href: ${href}`);

          // Make a request to the href URL to check for redirection
          cy.request({
            url: href, // The URL to request
            followRedirect: false, // Do not follow redirects automatically to capture the response directly
          }).then((response) => {
            // Log the initial response status and headers for debugging
            cy.log(`Initial response status: ${response.status}`);
            cy.log(`Response headers: ${JSON.stringify(response.headers)}`);

            // Check if the response indicates a redirect (301 or 302 status code)
            if (response.status === 301 || response.status === 302) {
              // Extract the redirect URL from the 'Location' header
              const redirectUrl = response.headers.location;
              // Log the redirect URL for debugging
              cy.log(`Redirect URL from response headers: ${redirectUrl}`);

              // Visit the redirect URL and verify the final URL
              cy.visit(redirectUrl, { failOnStatusCode: false }); // Navigate to the redirect URL
              cy.url().should('eq', redirectUrl); // Assert that the current URL matches the redirect URL
            } else {
              // If no redirect, visit the initial URL directly
              cy.visit(href, { failOnStatusCode: false }); // Navigate to the initial URL
              cy.url().should('eq', href); // Assert that the current URL matches the initial href
            }
          });
        });
    });
  });
});
