// Login
Cypress.Commands.add('login', (type) => {
  let perms = {};
  switch (type) {
    case 'admin':
      perms = {
        name: Cypress.env('ADMIN_USERNAME'),
        pass: Cypress.env('ADMIN_PASSWORD'),
      };
      break;
  }

  cy.visit('/user/login');
  cy.get('#edit-name').type(perms.name);
  cy.get('#edit-pass').type(perms.pass);
  cy.get('input#edit-submit').contains('Log in').click();
});
