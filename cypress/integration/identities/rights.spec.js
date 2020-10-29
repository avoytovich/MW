/// <reference types="cypress" />

describe('Rights tab', () => {
  let identityData = {};

  before(() => {
    cy.visit('/login');
    cy.login(true);
    cy.visit('/settings/identities');

    cy.server();
    cy.route(/\/identities[^\/].+/).as('getIdentities');
    cy.route(/\/privileges.+/).as('privilegesData');
    cy.route(/\/roles.+/).as('rolesData');
    cy.route(/\/meta-roles.+/).as('metaRolesData');
    cy.route(/\/identities\/.+/).as('getIdentity');
    
    cy.wait('@getIdentities').then(() => {
      cy.get('.tableBodyGrid').find('.tableRowGrid').first().click();

      cy.wait('@getIdentity').then((resp) => {
        expect(resp.status).to.be.equal(200);
        identityData = resp.response.body;

        cy.get('.identity-details-screen .MuiTab-wrapper').contains('Rights').click();
      });
    });
  });
  
  it('should have all items listed due to api responses', () => {
    cy.wait('@privilegesData').then((resp) => {
      expect(resp.status).to.be.equal(200);
      
      resp.response.body.items.forEach((item) => {
        cy.get('.rights-details-privileges').should('contain', item.serviceName);
      });
    });

    cy.wait('@rolesData').then((resp) => {
      expect(resp.status).to.be.equal(200);
      
      resp.response.body.items.forEach((item) => {
        cy.get('.rights-details-roles').should('contain', item.name);
      });
    });

    cy.wait('@metaRolesData').then((resp) => {
      expect(resp.status).to.be.equal(200);
      
      resp.response.body.items.forEach((item) => {
        cy.get('.rights-details-meta-roles').should('contain', item.name);
      });
    });
  });

  it('should be active tab', () => {
    cy
      .get('.identity-details-screen .MuiTab-wrapper').contains('Rights').parent()
      .should('have.class', 'Mui-selected');
  });
});