/// <reference types="cypress" />

describe('My account configuration', () => {
  before(() => {
    cy.visit('/login');
    cy.login(true);
    cy.visit('/my-account');
    cy.route({ method: 'GET', url: /\/stores.+/ }).as('storesRequest');
    cy.route({ method: 'GET', url: /\/products.+/ }).as('productsRequest');
  });

  it('should have configuration details filled', () => {    
    cy.wait('@storesRequest').then(({ response: { body: { items } } }) => {
      const storesNames = [];
      
      items.forEach((item) => {
        storesNames.push(item.name);
      });

      cy.get('.my-account-screen input[name="stores"]').should('exist').and('have.value', storesNames.join(','));
    });

    cy.wait('@productsRequest').then(({ response: { body: { items } } }) => {
      const productsNames = [];
      
      items.forEach((item) => {
        productsNames.push(item.genericName);
      });

      cy.get('.my-account-screen input[name="catalogs"]').should('exist').and('have.value', productsNames.join(','));
    });
  });

  context('Details modal', () => {
    it('should open on edit', () => {
      cy.get('.table-items-modal').should('not.exist');
      cy.get('.my-account-screen input[name="catalogs"]').parent().click();
      cy.get('.table-items-modal').should('exist');
    });

    it('should have item actions on hover', () => {
      cy.get('.table-items-modal .table-item-row').first().as('rowItem');
      
      cy.get('@rowItem').trigger('mouseover').find('.action-items').invoke('show').then(($el) => {
        expect($el.find('.deleteIcon')).to.be.visible;
        expect($el.find('.editIcon')).to.be.visible;
        expect($el.find('.copyIcon')).to.be.visible;
      });

      cy.get('@rowItem').trigger('mouseout').find('.action-items').invoke('hide').then(($el) => {
        expect($el.find('.deleteIcon')).not.to.be.visible;
        expect($el.find('.editIcon')).not.to.be.visible;
        expect($el.find('.copyIcon')).not.to.be.visible;
      });
    });
  });
});
