import localization from '../../../src/localization';

/// <reference types="cypress" />

describe('Pagination', () => {

  it('Pagination should not exist', () => {
    cy.visit('/login');
    cy.login(true);

    cy.visit('/overview/products');
    cy.server();
    cy.route(/\/products.+/).as('requestData');

    cy.wait('@requestData').then((request) => {
      cy.wait(200);
      expect(request.status).to.be.equal(200);
    });

    cy.get('.paginationBlock').should('not.exist');
  });

  it('Pagination exist', () => {
    cy.visit('/login');
    cy.login(true);

    cy.visit('/overview/stores');
    cy.server();
    cy.route(/\/stores.+/).as('requestData');

    cy.wait('@requestData').then((request) => {
      cy.wait(200);
      expect(request.status).to.be.equal(200);
    });

    cy.get('.paginationBlock').should('exist');
  });

  it('Show "First" page when exist, when current one is not first', () => {
    cy.get('.paginationNumbers > div').eq(1).click();
    cy.get('.firstPaginationPage').should('exist');
  });

  it('Show "Last" and "Next" pages exist, when current one is not last', () => {
    cy.get('.paginationNumbers > div').eq(0).click();
    cy.get('.lastPaginationPage').should('exist');
    cy.get('.nextPaginationPage').should('exist');
  });

  it('Clicking the first/last/next should fetch and show paginated items accordingly', () => {
    cy.visit('/login');
    cy.login(true);

    cy.visit('/overview/stores');
    cy.server();
    cy.route(/\/stores.+/).as('requestData');

    cy.wait('@requestData').then((request) => {
      cy.wait(200);
      expect(request.status).to.be.equal(200);
      cy.get('div[role="progressbar"]').should('not.exist');
    });

    cy.get('.lastPaginationPage').click();
    cy.wait('@requestData').then((request) => {
      cy.wait(200);
      expect(request.status).to.be.equal(200);

      const totalPages = request.response.body.totalPages - 1;
      const currentPage = request.response.body.number;
      expect(currentPage).to.eq(totalPages)
    });

    cy.get('.firstPaginationPage').click();
    cy.wait('@requestData').then((request) => {
      cy.wait(200);
      expect(request.status).to.be.equal(200);

      const currentPage = request.response.body.number;
      expect(currentPage).to.eq(0)
    });

    cy.get('.nextPaginationPage').click();
    cy.wait('@requestData').then((request) => {
      cy.wait(200);
      expect(request.status).to.be.equal(200);

      const currentPage = request.response.body.number;
      expect(currentPage).to.eq(1)
    });
  });

  it('Clicking the first/last/next should fetch and show paginated items accordingly', () => {
    cy.visit('/login');
    cy.login(true);

    cy.visit('/overview/stores');
    cy.server();
    cy.route(/\/stores.+/).as('requestData');

    cy.wait('@requestData').then((request) => {
      cy.wait(200);
      expect(request.status).to.be.equal(200);
      cy.get('div[role="progressbar"]').should('not.exist');
    });

    cy.get('.nextPaginationPage').click();
    cy.wait('@requestData').then((request) => {
      cy.wait(200);
      expect(request.status).to.be.equal(200);

      const currentPage = request.response.body.number;
      cy.get('.paginationNumbers > div').eq(1).get('p').should('have.class', 'currentPage');
    });

    cy.get('.nextPaginationPage').click();
    cy.wait('@requestData').then((request) => {
      cy.wait(200);
      expect(request.status).to.be.equal(200);

      const currentPage = request.response.body.number;
      cy.get('.paginationNumbers > div').eq(2).get('p').should('have.class', 'currentPage');
    });
  });

});
