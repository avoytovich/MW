/// <reference types="cypress" />

describe('Profile tab', () => {
  let identityData = {};

  before(() => {
    cy.visit('/login');
    cy.login(true);
    cy.visit('/settings/identities');

    cy.server();
    cy.route(/\/identities[^\/].+/).as('getIdentities');
    
    cy.wait('@getIdentities').then(() => {
      cy.route(/\/identities\/.+/).as('getIdentity');

      cy.get('.tableBodyGrid').find('.tableRowGrid').first().click();

      cy.wait('@getIdentity').then((resp) => {
        expect(resp.status).to.be.equal(200);
        identityData = resp.response.body;
      });
    });
  });

  it('should be active tab', () => {
    cy
      .get('.identity-details-screen .MuiTab-wrapper').contains('Profile').parent()
      .should('have.class', 'Mui-selected');
  });

  it('should have identity basic information in Basic Profile section', () => {
    cy.get('.identity-details-screen input[name="firstName"]').should('exist').and('have.value', identityData.firstName);
    cy.get('.identity-details-screen input[name="lastName"]').should('exist').and('have.value', identityData.lastName);
    cy.get('.identity-details-screen input[name="email"]').should('exist').and('have.value', identityData.email);
    cy.get('.identity-details-screen input[name="userName"]').should('exist').and('have.value', identityData.userName);
  });
  
  it('should have identity configuration information in Configuration section', () => {
    cy
      .get('.identity-details-screen .MuiSwitch-root .MuiButtonBase-root')
      .should('exist').and(identityData.inactive ? 'not.have.class' : 'have.class', 'Mui-checked');
  });
});