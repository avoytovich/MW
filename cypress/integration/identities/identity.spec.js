/// <reference types="cypress" />

describe("Identity", () => {
  beforeEach(() => {
    cy.visit("/login", { failOnStatusCode: false });
    cy.login();

    cy.intercept("GET", "**/identities/**", (req) => {
      req.reply((res) => {
        res.send();
      });
    }).as("identityReq");

    cy.visit("/settings/identities", { failOnStatusCode: false });
    cy.get(".tableRowGrid", { timeout: 100000 }).first().click();

    cy.wait("@identityReq")
      .then(({ response: { body } }) => {
        return body;
      })
      .as("identity");
  });

  it("profile tab should be enabled", () => {
    cy.contains(".Mui-selected", "Profile");
  });

  it("contains /settings/identitities/ID", function () {
    cy.url().should("contain", this.identity.id);
  });

  it("should have identity basic information in Basic Profile section", function () {
    cy.get('.identity-details-screen input[name="firstName"]').and(
      "have.value",
      this.identity.firstName
    );
    cy.get('.identity-details-screen input[name="lastName"]').and(
      "have.value",
      this.identity.lastName
    );
    cy.get('.identity-details-screen input[name="email"]').and(
      "have.value",
      this.identity.email
    );
    cy.get('.identity-details-screen input[name="userName"]').and(
      "have.value",
      this.identity.userName
    );
  });

  it("should have identity configuration information in Configuration section", () => {
    cy.get(".identity-details-screen .MuiSwitch-root .MuiButtonBase-root");
  });
});
