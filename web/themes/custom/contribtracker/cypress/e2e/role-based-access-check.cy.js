import pageUrls from '../fixtures/page-role-check-urls.json';

describe('Role-Based Content Access Validation', () => {
  Object.keys(pageUrls).forEach((key) => {
    const urlConfig = pageUrls[key];
    const url = urlConfig.url;
    const userType = urlConfig.userType;
    const expectedStatus = urlConfig.expectedStatus;

    it(`Validates ${userType}'s access to ${key}`, () => {
      // Log in if not anonymous
      if (userType !== 'anonymous') {
        cy.login(userType);
      }

      // Verify URL is reachable with expected status code
      cy.request({
        url: url,
        failOnStatusCode: false // Do not fail the test automatically for 4xx/5xx
      }).then((response) => {
        expect(response.status).to.eq(expectedStatus);
      });

      // Visit the page if expected status is 200
      if (expectedStatus === 200) {
        cy.visit(url);

        // Additional UI assertions for roles
        switch (userType) {
          case 'anonymous':
            cy.contains('Log in').should('exist');
            break;
          case 'authenticated':
            cy.contains('My Account').should('exist'); // Adjust for user profile links
            break;
          case 'api_basic_read':
            cy.contains('API').should('exist'); // Verify endpoint returns API content
            break;
          case 'contribution_moderator':
            cy.contains('Moderation Dashboard').should('exist'); // Adjust for moderation-specific content
            break;
          case 'administrator':
            cy.contains('Administration').should('exist'); // Check admin UI loads correctly
            break;
        }
      } else if (expectedStatus === 403) {
        cy.contains('Access Denied').should('exist');
      }
    });
  });
});
