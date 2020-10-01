import auth from '../../src/services/auth';
/// <reference types="cypress" />

describe('App', () => {  
  before(() => cy.visit('/'));

  context('Authenticaton', () => {
    context('Is Not Signed', () => {
      it('redirects guest user from private routes to login', () => {
        expect(localStorage.getItem('accessToken')).to.null;
  
        ['/overview/products', '/overview/stores', '/overview/orders'].forEach(path => {
          cy.visit(path);
          cy.url().should('include', '/login');
        });
      });
    });

    context('Is Signed', () => {
      beforeEach(() => cy.login(true));

      it('proceeds with valid token', () => {
        const token = localStorage.getItem('accessToken');
        
        expect(token).to.be.string;
        expect(auth.isValidToken(token)).to.be.true;
        cy.url().should('include', '/overview/products');
      });

      it('redirects signed user from guest routes to homepage', () => {
        ['/login', '/recover-password'].forEach(path => {
          cy.visit(path);
          cy.url().should('include', '/overview/products');
        });
      });
    });
  });
});