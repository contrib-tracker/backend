// Describe the test suite for Responsive Layout Validation
describe('Responsive Layout Validation', { tags: ['critical-path'] }, () => {
    // Viewports to test
    const viewports = [
      { device: 'Mobile', width: 375, height: 667 },
      { device: 'Tablet', width: 768, height: 1024 },
      { device: 'Desktop', width: 1440, height: 900 },
    ];
  
    // Test case for each viewport
    viewports.forEach(({ device, width, height }) => {
      it(`should render correctly on ${device} (${width}x${height})`, () => {
        cy.viewport(width, height);
        cy.visit('/');
  
        // Validate elements are visible
        cy.get('header').should('be.visible');
        cy.get('main').should('be.visible');
        cy.get('footer').should('be.visible');
  
        // Validate layout integrity: main should not overlap footer
        cy.get('main').then(($main) => {
          const mainRect = $main[0].getBoundingClientRect();
          cy.get('footer').then(($footer) => {
            const footerRect = $footer[0].getBoundingClientRect();
            expect(mainRect.bottom).to.be.at.most(footerRect.top, 'Main content ends before the footer starts');
          });
        });
      });
    });
  });
  