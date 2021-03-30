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

Cypress.Commands.add("login", (valid) => {
  cy.server();
  cy.route({
    url: Cypress.env("apiUrl") + "/iam/tokens?reason=Nexway-Center",
    method: "POST",
  }).as("loginRequest");

  cy.fixture("creds.json").then(({ username, password }) => {
    cy.get("input[name=username]").clear().type(username);
    cy.get("input[name=password]").clear().type(password);
    cy.get("form").submit();

    cy.wait("@loginRequest", { timeout: 40000 });
  });
});
