describe("On click open appropriate item", () => {
  beforeEach(() => {
    cy.visit("/login", { failOnStatusCode: false });
    cy.login();
    cy.server();
  });

  it("Open selected store", function () {
    cy.visit("/overview/stores", { failOnStatusCode: false });
    cy.route("GET", "**/stores/**").as("requestStoreData");

    cy.get(".tableRowGrid", { timeout: 100000 })
      .first()
      .then(($element) => {
        const id = $element.attr("data-id");
        cy.wait("@requestStoreData");
        cy.url().should("include", id);
      });
  });
});
