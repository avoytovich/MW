/// <reference types="cypress" />

describe('Table items actions', () => {
  before(() => {
    cy.visit('/login');
    cy.login(true);
  });

  it('should show more item actions on hover', () => {
    cy.get('.tableBodyGrid').find('.tableRowGrid').first().as('rowItem');

    cy.get('@rowItem').trigger('mouseover').then(($el) => {
      expect($el.find('.deleteIcon')).to.be.visible;
      expect($el.find('.editIcon')).to.be.visible;
      expect($el.find('.copyIcon')).to.be.visible;
    });

    cy.get('@rowItem').trigger('mouseout').then(($el) => {
      expect($el.find('.deleteIcon')).not.to.exist;
      expect($el.find('.editIcon')).not.to.exist;
      expect($el.find('.copyIcon')).not.to.exist;
    });
  });

  context('Delete action', () => {
    before(() => {
      cy.server();
      cy.route({
        method: 'DELETE',
        url: /\/.+/,
      }).as('deleteRequest');

      cy.get('.tableBodyGrid .tableRowGrid').first().trigger('mouseover').find('.deleteIcon').click();
    });

    it('should try to delete an item with success/error notification', () => {
      cy.wait('@deleteRequest').then((resp) => {
        if(resp.status === 200) {
          cy.get('#success-notification').should('exist');
        } else {
          cy.get('#error-notification').should('exist');
        }
      });
    });
  });

  context('Copy action', () => {
    it('should show success notification', () => {
      cy.wait(500);
      cy.get('.tableBodyGrid .tableRowGrid').first().trigger('mouseover').find('.copyIcon').click();
      cy.get('#success-notification').should('exist');
    });
  });

  context('Checking items', () => {
    it('should check/uncheck all if checkall checkbox is clicked', () => {
      cy.get('input[name="checkAll"]').click();

      cy.get('.tableBodyGrid .tableRowGrid input[type="checkbox"]').each((value) => {
        expect(value[0]).to.be.checked;
      });

      cy.get('input[name="checkAll"]').click();

      cy.get('.tableBodyGrid .tableRowGrid input[type="checkbox"]').each((value) => {
        expect(value[0]).not.to.be.checked;
      });
    });

    it('should check/uncheck item if it\'s checkbox has been clicked', () => {
      cy.get('.tableBodyGrid .tableRowGrid input[type="checkbox"]').each((value) => {
        value[0].click();
        expect(value[0]).to.be.checked;
        value[0].click();
        expect(value[0]).not.to.be.checked;
      });
    });

    it('should show multiple items actions if at least one item is selected', () => {
      cy.get('.table-items-actions').should('not.be.visible');
      cy.get('.tableBodyGrid .tableRowGrid input[type="checkbox"]').first().click();
      cy.get('.table-items-actions').should('be.visible');
      cy.get('.tableBodyGrid .tableRowGrid input[type="checkbox"]').first().click();
      cy.get('.table-items-actions').should('not.be.visible');
    });
  });

  context('Multiple items actions', () => {
    let selectedIds = [];

    before(() => {
      cy.get('.tableBodyGrid .tableRowGrid input[type="checkbox"]').each((value) => {
        value[0].click();
        selectedIds.push(value[0].name);
      });
    });

    it('should try to delete all selected items with success/error message', () => {
      cy.server();
      cy.route({
        method: 'DELETE',
        url: /\/.+/,
      }).as('deleteRequest');

      cy.get('.table-items-actions .deleteFab').click();

      cy.wait('@deleteRequest').then((resp) => {
        selectedIds.forEach((id) => {
          expect(resp.url).to.contain(id);
        });

        if(resp.status === 200) {
          cy.get('#success-notification').should('exist');
        } else {
          cy.get('#error-notification').should('exist');
        }
      });
    });
  });
});
