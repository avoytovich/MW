import localization from "../../../src/localization";

/// <reference types="cypress" />

describe("Update Password", () => {
  beforeEach(() =>
    cy.visit("update-password/123", { failOnStatusCode: false })
  );

  it("contains update-password", () => {
    cy.url().should("contain", "/update-password");
  });

  it("contains new password field", () => {
    cy.get("input[name=newPassword]");
  });
  it("contains confirm password field", () => {
    cy.get("input[name=confirmedPassword]");
  });
  it("contains set new password button", () => {
    cy.get("button[type=submit]");
  });

  context("new password", () => {
    beforeEach(() => {
      cy.get("input[name=newPassword]").as("input");
    });
    it("cannot be empty", () => {
      cy.get("@input")
        .focus()
        .blur()
        .parent()
        .should("have.class", "Mui-error");
    });
    it("has min length", () => {
      cy.get("@input").type("email");
      cy.contains(
        "p.Mui-error",
        localization.t("errorNotifications.atLeast6Characters"),
        { matchCase: false }
      );
    });
    it("has max length", () => {
      cy.get("@input").type("A".repeat(21));
      cy.contains(
        "p.Mui-error",
        localization.t("errorNotifications.lessThan20Characters"),
        { matchCase: false }
      );
    });
    it("has at least 1 uppercase character", () => {
      cy.get("@input").type("uppercase1");
      cy.contains(
        "p.Mui-error",
        localization.t("errorNotifications.containsAtLeast1UppercaseCharacter"),
        { matchCase: false }
      );
    });
    it("has at least 1 lowercase character", () => {
      cy.get("@input").type("LOWERCASE1");
      cy.contains(
        "p.Mui-error",
        localization.t("errorNotifications.containsAtLeast1LowercaseCharacter"),
        { matchCase: false }
      );
    });
    it("has at least 1 digit", () => {
      cy.get("@input").type("AbCDEF");
      cy.contains(
        "p.Mui-error",
        localization.t("errorNotifications.containsAtLeast1DigitFrom0to9"),
        { matchCase: false }
      );
    });
  });
  it("cannot proceed without correct confirmation", () => {
    cy.get("input[name=newPassword]").clear().type("Confirmation1");
    cy.get("input[name=confirmedPassword]").clear().type("Confirmation2");
    cy.contains(
      "p.Mui-error",
      localization.t("errorNotifications.passwordConfirmationMatch"),
      { matchCase: false }
    );
  });
  it("can proceed with correct confirmation", () => {
    cy.get("input[name=newPassword]").type("Confirmation1");
    cy.get("input[name=confirmedPassword]").type("Confirmation1");

    cy.get("button[type=submit]").should("not.be.disabled");
  });
});
