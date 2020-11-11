/// <reference types="cypress" />

describe('My account screen', () => {
  before(() => {
    cy.visit('/login');
    cy.login(true);
    cy.visit('/my-account');
    cy.route(/\/identities.+/).as('requestData');
    cy.wait('@requestData');
  });

  it('should have main user details filled', () => {
    cy.get('@requestData').then(({ response: { body } }) => {
      const { firstName, lastName, email, userName } = body;

      cy.get('.my-account-screen input[name="firstName"]').should('exist').and('have.value', firstName);
      cy.get('.my-account-screen input[name="lastName"]').should('exist').and('have.value', lastName);
      cy.get('.my-account-screen input[name="email"]').should('exist').and('have.value', email);
      cy.get('.my-account-screen input[name="userName"]').should('exist').and('have.value', userName);
    });
  });

  it('should show save button if any update is made', () => {
    cy.get('#save-account-button').should('not.be.visible');
    cy.get('.my-account-screen input[name="firstName"]').type('1');
    cy.get('#save-account-button').should('be.visible');
  });

  it('should send updates to server on save', () => {
    cy
      .server()
      .route({
        method: 'PUT',
        url: /\/identities.+/
      })
      .as('requestUpdate');

    cy.get('#save-account-button').click();
    cy.wait('@requestUpdate').then(({ status }) => {
      if (status === 200) {
        cy.get('#success-notification').should('exist');
      } else {
        cy.get('#error-notification').should('exist');
      }
    });
  });
});
