/// <reference types="cypress" />
/* eslint-disable */
describe("My account screen", () => {
  beforeEach(() => {
    cy.visit("/login", { failOnStatusCode: false });
    cy.login();
    cy.intercept("**/identities/*").as("identityReq");
    cy.visit("/my-account", { failOnStatusCode: false });

    cy.wait("@identityReq")
      .then(({ response: { body } }) => {
        return body;
      })
      .as("identity");
  });

  it("profile tab should be enabled", () => {
    cy.contains(".Mui-selected", "My Account");
  });

  it(`Contains first name field`, function () {
    cy.get("@identity");
    cy.get(`.my-account-screen input[name=firstName]`).should(
      "have.value",
      this.identity.firstName
    );
  });

  it(`Contains last name field.`, function () {
    cy.get(`.my-account-screen input[name=lastName]`).should(
      "have.value",
      this.identity.lastName
    );
  });

  it(`Contains email field.`, function () {
    cy.get(`.my-account-screen input[name=email]`).should(
      "have.value",
      this.identity.email
    );
  });

  it(`Contains username field.`, function () {
    cy.get(`.my-account-screen input[name=userName]`).should(
      "have.value",
      this.identity.userName
    );
  });
  it(`Contains stores field.`, function () {
    cy.get(`.my-account-screen input[name=catalogs]`);
  });
  it(`Contains username field.`, function () {
    cy.get(`.my-account-screen input[name=catalogs]`);
  });
});
