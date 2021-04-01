import {
  markUp,
  defaultShow,
} from "../../../src/services/useData/tableMarkups/identities";
/// <reference types="cypress" />

describe("Identities list", () => {
  before(() => {
    cy.visit("/login", { failOnStatusCode: false });
    cy.login();
    cy.visit("/settings/identities", { failOnStatusCode: false });
  });
  it("navbar button is selected", () => {
    cy.contains(".listItemButton.active", "identities", { matchCase: false });
  });
  it("contains /overview/identities", () => {
    cy.url().should("contain", "/settings/identities");
  });
  it("contains list headers", () => {
    const enabledHeaders = markUp.headers.filter(
      (header) => defaultShow[header.id]
    );

    enabledHeaders.forEach((header) => {
      cy.get(".tableHeaderGrid").should("contain", header.value);
    });
  });
  it("contains list element", () => {
    cy.get(".tableRowGrid").its("length").should("be.gt", 0);
  });
});
