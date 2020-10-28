import { markUp, defaultShow } from '../../../src/services/useData/tableMarkups/orders';
/// <reference types="cypress" />

describe('Orders list table', () => {
  before(() => {
    cy.visit('/login');
    cy.login(true);
  });

  it('has orders list regarding to the api response', () => {
    cy.visit('/overview/orders');
    cy.server();
    cy.route(/\/orders.+/).as('requestData');

    cy.wait('@requestData').then((request) => {
      cy.wait(200);
      expect(request.status).to.be.equal(200);
      cy.get('div[role="progressbar"]').should('not.exist');

      const { items } = request.response.body;
      cy.get('.tableBodyGrid').find('.tableRowGrid').should('have.length', items.length);
    });
  });

  it('has table headers regardng to the table configuration', () => {
    const enabledHeaders = markUp.headers.filter((header) => defaultShow[header.id]);

    enabledHeaders.forEach((header) => {
      cy.get('.tableHeaderGrid').should('contain', header.value);
    })
  });
});
