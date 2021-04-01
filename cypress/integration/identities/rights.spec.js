/// <reference types="cypress" />

describe("Rights tab", () => {
  beforeEach(() => {
    cy.visit("/login", { failOnStatusCode: false });
    cy.login();

    cy.intercept("GET", "**/identities/**").as("identityReq");
    cy.intercept("GET", "**privileges**").as("priviledgeReq");
    cy.intercept("GET", "**/roles**").as("rolesReq");
    cy.intercept("GET", "**/meta-roles**").as("metaReq");

    cy.visit("/settings/identities", { failOnStatusCode: false });
    cy.get(".tableRowGrid", { timeout: 100000 }).first().click();

    cy.wait("@identityReq")
      .then(({ response: { body } }) => {
        return body;
      })
      .as("identity");
    cy.contains("button", "Rights").click();
  });

  it("profile tab should be enabled", () => {
    cy.contains(".Mui-selected", "Rights");
  });
  it("should have priviledges displayed", () => {
    cy.wait("@priviledgeReq").then(({ response: { body } }) => {
      body.items.forEach(({ serviceName }) => {
        cy.get(".rights-details-privileges").should("contain", serviceName);
      });
    });
  });
  it("should have roles displayed", () => {
    cy.wait("@rolesReq").then(({ response: { body } }) => {
      body.items.forEach(({ name }) => {
        cy.get(".rights-details-roles").should("contain", name);
      });
    });
  });
  it("should have meta-roles displayed", () => {
    cy.wait("@metaReq").then(({ response: { body } }) => {
      body.items.forEach(({ name }) => {
        cy.get(".rights-details-meta-roles").should("contain", name);
      });
    });
  });
});
