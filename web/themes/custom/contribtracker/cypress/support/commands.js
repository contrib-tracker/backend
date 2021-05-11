// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import '@percy/cypress';

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
  return cy.request({
    method: 'POST',
    url: '/user/login',
    form: true,
    body: {
      ...perms,
      // eslint-disable-next-line @typescript-eslint/camelcase
      form_id: 'user_login_form',
    },
  });
});
