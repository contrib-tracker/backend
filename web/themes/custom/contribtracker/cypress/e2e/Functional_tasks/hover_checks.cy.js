// Describe the test suite for Hover Actions Verification
describe('Hover Actions Verification', { tags: '@functional' }, () => {
  // Before test, visit the base URL
  before(() => {
    cy.visit('/');
  });

  // Define the test case for verifying hover actions
  it('should change the element style on hover', () => {
    // Perform a hover action on the second navigation authentication link
    cy.xpath('(//a[@class="link nav__auth-link auth-link"])[2]').realHover();

    // Assert that the color of the element changes to the expected value upon hover
    cy.xpath('(//a[@class="link nav__auth-link auth-link"])[2]').should(
      'have.css',
      'color',
      'rgba(236, 75, 6, 0.933)', // Example: color changes to red (rgba format)
    );
  });
});

// describe('Check for .aspx links', { tags: '@functional' }, () => {
//   it('should not contain any .aspx links', () => {
//     cy.visit('https://waps-php.test.ohchr.org/',{failOnStatusCode: false}); // Replace with your actual URL

//     cy.get('a[href*=".aspx"]').then($els => {
//       if ($els.length > 0) {
//         // Collect all .aspx links
//         const aspxLinks = [];
//         $els.each((index, el) => {
//           aspxLinks.push(el.getAttribute('href'));
//         });

//         // Throw an error with all the found .aspx links
//         throw new Error(`Found .aspx links on the page: ${aspxLinks.join(', ')}`);
//       }
//     });
//   });
// });
