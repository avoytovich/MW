/// <reference types="cypress" />

describe("My account screen", () => {
  before(() => {
    cy.visit("/login", { failOnStatusCode: false });
    cy.login();
    cy.visit("/my-account", { failOnStatusCode: false });
    cy.intercept(/\/identities.+/).as("requestData");
    cy.wait("@requestData");
    cy.get("#save-account-button").as("save_btn").should("not.be.visible");
    cy.get('.my-account-screen input[name="firstName"]')
      .clear()
      .type("TESTEST");
  });

  it("should display save button on change", () => {
    cy.get("@save_btn").should("be.visible");
  });

  it("should send updates to server on save.", () => {
    cy.intercept({
      method: "PUT",
      url: /\/identities.+/,
    }).as("requestUpdate");

    cy.get("#save-account-button").click();
    cy.wait("@requestUpdate");
    cy.get("#success-notification").should("exist");
  });
});
