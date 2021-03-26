import {
  markUp,
  defaultShow,
} from "../../../src/services/useData/tableMarkups/products";
describe("Product list", () => {
  before(() => {
    cy.visit("/login", { failOnStatusCode: false });
    cy.login();
    cy.intercept(
      "GET",
      "**/products?format=short&parentId=null&size=50&page=0"
    ).as("REQ");
    cy.visit("/overview/products", { failOnStatusCode: false });
    cy.get(".tableRowGrid", { timeout: 100000 });
  });

  it("navbar button is selected", () => {
    cy.contains(".listItemButton.active", "products", { matchCase: false });
  });
  it("contains /overview/products", () => {
    cy.url().should("contain", "/overview/products");
  });
  it("contains add product button", () => {
    cy.get("#add-product").should("be.visible");
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

  context("list filter", () => {
    // TODO -> needs mocks?
  });
});
