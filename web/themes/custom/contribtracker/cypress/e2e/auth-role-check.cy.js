describe('Role-Based Access Control Tests', () => {
  const roles = [
    { username: 'admin', password: 'adminpassword', accessPage: '/admin', visibleText: 'Admin Dashboard' },
    { username: 'contributor', password: 'contributorpassword', accessPage: '/node/add/content', visibleText: 'Create Content' },
    { username: 'guest', password: 'guestpassword', accessPage: '/', visibleText: 'Welcome Guest' }
  ];

  roles.forEach(role => {
    it(`should log in as ${role.username} and access the correct page`, () => {
      cy.visit('/user/login');
      cy.get('input[name="name"]').type(role.username);
      cy.get('input[name="pass"]').type(role.password);
      cy.get('button[id="edit-submit"]').click();
      cy.visit(role.accessPage);
      cy.contains(role.visibleText).should('be.visible');
    });
  });

  it('should restrict guest users from accessing admin page', () => {
    cy.visit('/user/login');
    cy.get('input[name="name"]').type('guest');
    cy.get('input[name="pass"]').type('guestpassword');
    cy.get('button[id="edit-submit"]').click();
    cy.visit('/admin');
    cy.contains('Access Denied').should('be.visible');
  });
});