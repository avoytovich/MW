Cypress.Commands.add("login", () => {
  cy.intercept({
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
