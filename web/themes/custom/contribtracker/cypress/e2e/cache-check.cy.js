describe('Cache Testing', () => {
  const testPageUrl = '/code-contributions'; // Replace with the actual page URL

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('Ensures updated content appears for anonymous users after cache clearing', () => {
    // Step 1: Visit the page and capture initial content
    cy.visit(testPageUrl);
    cy.get('body').then((body) => {
      const initialContent = body.text();

      // Step 2: Clear cache using Drush (or other mechanism)
      cy.exec('ddev drush cr').then((result) => {
        expect(result.code).to.eq(0); // Ensure cache clearing was successful
      });

      // Step 3: Visit the page again and verify updated content
      cy.visit(testPageUrl);
      cy.get('body').should((updatedBody) => {
        const updatedContent = updatedBody.text();
        expect(updatedContent).not.to.eq(initialContent);
      });
    });
  });

  it('Tests that pages are cached properly', () => {
    // Step 1: Visit the page and measure first visit load time
    cy.visit(testPageUrl);
    cy.window().then((win) => {
      const firstLoadTime = win.performance.timing.responseEnd - win.performance.timing.navigationStart;

      // Step 2: Reload the page and measure second visit load time
      cy.reload();
      cy.window().then((win) => {
        const secondLoadTime = win.performance.timing.responseEnd - win.performance.timing.navigationStart;

        // Step 3: Assert that the second load time is less than the first
        expect(secondLoadTime).to.be.lessThan(firstLoadTime);
      });
    });
  });
});
