import localization from "../../../src/localization";

/// <reference types="cypress" />

describe("Recovery Screen", () => {
  before(() => {
    cy.visit("/recover-password", { failOnStatusCode: false });
  });

  it("contains /recover-password", () => {
    cy.url().should("contain", "/recover-password");
  });
  it("contains email input", () => {
    cy.get('input[type="email"]');
  });
  it("contains reset button", () => {
    cy.contains("button", "reset", { matchCase: false });
  });

  it("requires email", () => {
    cy.get('input[type="email"]').as("email").parent();

    cy.get("@email").focus().blur().parent().should("have.class", "Mui-error");
    cy.contains("p.Mui-error", "required", { matchCase: false });
  });

  it("validates email", () => {
    cy.get('input[type="email"]').as("email").type("WRONG");

    cy.get("@email").focus().blur().parent().should("have.class", "Mui-error");

    cy.contains("p.Mui-error", "Invalid email address", { matchCase: false });

    cy.get("@email")
      .clear()
      .type("em@i.pl")
      .parent()
      .should("not.have.class", "Mui-error");
  });

  it("can reset password", () => {
    cy.intercept("POST", "**/iam/identities/lostpassword/nexway").as(
      "resetRequest"
    );
    cy.fixture("emails.json").then((data) => {
      const email = data.valid.filter((v) => v.acceptable)[0].email;
      cy.get("input[name=email]").type(email);
      cy.get("button[type=submit]").click();
    });
    cy.wait("@resetRequest").its("response.statusCode").should("eq", 200);
    cy.get("h3")
      .contains(localization.t("general.checkYourEmailToResetThePassword"))
      .should("exist");
  });
});
