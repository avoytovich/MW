/// <reference types="cypress" />

describe('Top Bar', () => {
  before(() => {
    cy.visit('/login');
    cy.login(true);
    cy.route(/\/products.+/).as('requestData');
    cy.wait('@requestData');
  });

  context('Action items', () => {
    it('should exist', () => {
      cy.get('.top-bar').find('button[aria-label="menu"]').should('be.visible');
      cy.get('.top-bar').find('button[aria-label="search"]').should('be.visible');
      cy.get('.top-bar').find('input[type="text"]').should('be.visible');
      cy.get('.top-bar').find('button[aria-label="filter-list"]').should('be.visible');
      cy.get('.top-bar').find('button[aria-label="refresh"]').should('be.visible');
      cy.get('.top-bar').find('button[aria-label="logout"]').should('be.visible');
    });

    it('should conditionally exist for details pages', () => {
      cy.get('.tableBodyGrid').find('.tableRowGrid').first().click();
      cy.get('.top-bar').find('button[aria-label="menu"]').should('be.visible');
      cy.get('.top-bar').find('button[aria-label="search"]').should('not.exist');
      cy.get('.top-bar').find('input[type="text"]').should('not.exist');
      cy.get('.top-bar').find('button[aria-label="filter-list"]').should('not.exist');
      cy.get('.top-bar').find('button[aria-label="refresh"]').should('not.exist');
      cy.get('.top-bar').find('button[aria-label="logout"]').should('be.visible');
      cy.go('back');
    });

    it('drawer - should toggle the sidenav', () => {
      cy.get('.side-bar .MuiDrawer-paper').should('be.visible');
      cy.get('.top-bar button[aria-label="menu"]').click();
      cy.get('.side-bar .MuiDrawer-paper').should('not.be.visible');
      cy.get('.top-bar button[aria-label="menu"]').click();
      cy.get('.side-bar .MuiDrawer-paper').should('be.visible');
    });

    it('refresh - should make table refresh', () => {
      cy.get('div[role="progressbar"]').should('not.exist');

      cy.server();
      cy.route(/\/products.+/).as('getData');
      cy.get('.top-bar button[aria-label="refresh"]').click();
      
      cy.get('div[role="progressbar"]').should('be.visible');
      cy.wait('@getData').should('have.a.property', 'status', 200).then(() => {
        cy.get('div[role="progressbar"]').should('not.exist');
      });
    });

    it('logout - should log out the user', () => {
      cy.get('.top-bar button[aria-label="logout"]').click();
      cy.get('#success-notification').should('exist');
      cy.url().should('contain', '/login');
    });
  });

});
