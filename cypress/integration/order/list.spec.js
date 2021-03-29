import {
  markUp,
  defaultShow,
} from "../../../src/services/useData/tableMarkups/orders";
describe("Store list", () => {
  before(() => {
    cy.visit("/login", { failOnStatusCode: false });
    cy.login();
    cy.visit("/overview/orders", { failOnStatusCode: false });
  });
  it("navbar button is selected", () => {
    cy.contains(".listItemButton.active", "orders", { matchCase: false });
  });
  it("contains /overview/orders", () => {
    cy.url().should("contain", "/overview/orders");
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
