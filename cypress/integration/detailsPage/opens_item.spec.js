describe('On click open appropriate item', () => {
  let id = undefined;

  beforeEach(() => {
    cy.visit('/login');
    cy.login(true);
    cy.server();
  });

  it('Open selected product', () => {
    cy.visit('/overview/products');
    cy.route('GET', '**/products/**').as('requestProductData');

    cy.get('.tableRowGrid', { timeout: 100000 })
      .first()
      .then(($element) => {
        id = $element.attr('data-id');
      })
      .click();
    cy.wait('@requestProductData').then((request) => {
      expect(request.status).to.be.equal(200);
      expect(request.response.body.id).to.be.equal(id);
      cy.url().should('include', id);
    });
  });

  it('Open selected store', () => {
    cy.visit('/overview/stores');
    cy.route('GET', '**/stores/**').as('requestStoreData');

    cy.get('.tableRowGrid', { timeout: 100000 })
      .first()
      .then(($element) => {
        id = $element.attr('data-id');
      })
      .click();
    cy.wait('@requestStoreData').then((request) => {
      expect(request.status).to.be.equal(200);
      expect(request.response.body.id).to.be.equal(id);
      cy.url().should('include', id);
    });
  });

  it('Open selected order', () => {
    cy.visit('/overview/orders');
    cy.route('GET', '**/orders/**').as('requestOrderData');

    cy.get('.tableRowGrid', { timeout: 100000 })
      .first()
      .then(($element) => {
        id = $element.attr('data-id');
      })
      .click();
    cy.wait('@requestOrderData').then((request) => {
      expect(request.status).to.be.equal(200);
      expect(request.response.body.id).to.be.equal(id);
      cy.url().should('include', id);
    });
  });
});
