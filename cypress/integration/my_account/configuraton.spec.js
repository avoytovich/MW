/// <reference types="cypress" />

describe("My account configuration", () => {
  before(() => {
    cy.visit("/login", { failOnStatusCode: false });
    cy.login();
    cy.visit("/my-account", { failOnStatusCode: false });
    cy.intercept({ method: "GET", url: /\/stores.+/ }).as("storesRequest");
    cy.intercept({ method: "GET", url: /\/products.+/ }).as("productsRequest");
  });

  it("should have configuration details filled", () => {
    cy.wait("@storesRequest").then(
      ({
        response: {
          body: { items },
        },
      }) => {
        const storesNames = [];

        items.forEach((item) => {
          storesNames.push(item.name);
        });

        cy.get('.my-account-screen input[name="stores"]').and(
          "have.value",
          storesNames.join(",")
        );
      }
    );

    cy.wait("@productsRequest").then(
      ({
        response: {
          body: { items },
        },
      }) => {
        const productsNames = [];

        items.forEach((item) => {
          productsNames.push(item.genericName);
        });

        cy.get('.my-account-screen input[name="catalogs"]').and(
          "have.value",
          productsNames.join(",")
        );
      }
    );
  });

  context("Details modal", () => {
    it("should open on edit", () => {
      cy.get(".table-items-modal").should("not.exist");
      cy.get('.my-account-screen input[name="catalogs"]').parent().click();
      cy.get(".table-items-modal");
    });

    it("should have item actions on hover", () => {
      cy.get(".table-items-modal .table-item-row")
        .first()
        .as("rowItem")
        .trigger("mouseover")
        .find(".action-items")
        .invoke("show")
        .then(($el) => {
          expect($el.find(".deleteIcon")).to.be.visible;
          expect($el.find(".editIcon")).to.be.visible;
          expect($el.find(".copyIcon")).to.be.visible;
        });

      cy.get("@rowItem")
        .trigger("mouseout")
        .find(".action-items")
        .invoke("hide")
        .then(($el) => {
          expect($el.find(".deleteIcon")).not.to.be.visible;
          expect($el.find(".editIcon")).not.to.be.visible;
          expect($el.find(".copyIcon")).not.to.be.visible;
        });
    });
  });
});
