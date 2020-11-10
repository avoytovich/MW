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
      .click()
      .then(() => {
        cy.wait('@requestProductData').then((xhr) => {
          cy.wrap(xhr).then((data) => {
            if (data.status === 200) {
              expect(data.response.body.id).to.be.equal(id);
            } else {
              cy.get('#error-notification')
                .should('exist')
                .and('have.text', data.response.body.message);
            }
          });
        });
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
      .click()
      .then(() => {
        cy.wait('@requestStoreData').then((xhr) => {
          cy.wrap(xhr).then((data) => {
            if (data.status === 200) {
              expect(data.response.body.id).to.be.equal(id);
            } else {
              cy.get('#error-notification')
                .should('exist')
                .and('have.text', data.response.body.message);
            }
          });
        });
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
      .click()
      .then(() => {
        cy.wait('@requestOrderData').then((xhr) => {
          cy.wrap(xhr).then((data) => {
            if (data.status === 200) {
              expect(data.response.body.id).to.be.equal(id);
            } else {
              cy.get('#error-notification')
                .should('exist')
                .and('have.text', data.response.body.message);
            }
          });
        });
        cy.url().should('include', id);
      });
  });
});
