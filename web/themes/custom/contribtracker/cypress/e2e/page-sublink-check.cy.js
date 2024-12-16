// Describe the test suite for Main Page Sublinks Response Code Validation
describe('Main Page Sublinks Response Code Validation', { tags: ['expensive', 'critical-path'] }, () => {
  // Before each test, visit the main page
  beforeEach(() => {
    cy.visit('/');
  });

  // Test case to validate the response codes for header links
  it('should validate the response codes for header links', () => {
    validateResponseCodes('header a');
  });

  // Test case to validate the response codes for main content links
  it('should validate the response codes for main links', () => {
    //Login to check admin accessibile pages
    cy.login('admin');
    validateResponseCodes('main a');
  });

  // Test case to validate the response codes for footer links
  // Social links were excluded from this test because they often lead to external sites
  // (e.g., social media platforms) that may have restrictions or security policies
  // (like CORS or bot detection) that can result in 400/500 response codes.
  // Such restrictions are beyond our control and do not indicate issues with our site’s functionality.
  it('should validate the response codes for footer links', () => {
    validateResponseCodes('footer a:not(.social__sharing a)');
  });

  // Function to validate response codes for links in the given section
  function validateResponseCodes(sectionSelector) {
    // Array to store URLs that failed validation
    const failedUrls = [];

    // Collect all links from the specified section and validate each link
    cy.get(sectionSelector)
      .each(($el) => {
        const href = $el.attr('href');
        if (href) {
          // Make a request to the URL and validate the response code
          cy.request({
            url: href,
            failOnStatusCode: false, // Allow the test to continue even if the status code is not 2xx or 3xx
          }).then((response) => {
            // If the response status code is not 200, 301, or 302, add it to the failedUrls array
            if (![200, 301, 302].includes(response.status)) {
              failedUrls.push({ link: href, status: response.status });
            }
          });
        }
      })
      .then(() => {
        // After all requests are done, check if there are any failed URLs
        if (failedUrls.length > 0) {
          // Log and fail the test with the details of failed URLs
          const error = new Error(
            `Failed URLs:\n${failedUrls.map((url) => `Link: ${url.link}, Status: ${url.status}`).join('\n')}`,
          );
          throw error;
        }
      });
  }
});
