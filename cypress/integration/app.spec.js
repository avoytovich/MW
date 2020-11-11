import auth from '../../src/services/auth';
import localization from '../../src/localization';
/// <reference types="cypress" />

describe('App', () => {  
  beforeEach(() => cy.visit('/'));

  context('Authenticaton', () => {
    context('Is Not Signed', () => {
      it('redirects guest user from private routes to login', () => {
        expect(localStorage.getItem('accessToken')).to.be.null;
  
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

  context('Error handling', () => {
    it('should display proper error notifications regarding to the status code', () => {
      cy.visit('/');
      cy.login();
      cy.get('@loginRequest').then(({ status }) => {
        if (status !== 200) {
          let message = '';

          switch (status) {
            case 400: message = localization.t('errorNotifications.badRequest'); break;
            case 401: message = localization.t('errorNotifications.unauthorized'); break;
            case 403: message = localization.t('errorNotifications.forbidden'); break;
            case 404: message = localization.t('errorNotifications.notFound'); break;
            case 409: message = localization.t('errorNotifications.conflict'); break;
            case 412: message = localization.t('errorNotifications.preconditionFailed'); break;
            case 500: message = localization.t('errorNotifications.internalServerError'); break;
            case 504: message = localization.t('errorNotifications.timeout'); break;
            case 598:
            case 599:
              message = localization.t('errorNotifications.network'); break;
        
            default: message = error.message || localization.t('errorNotifications.otherError');
          }

          cy.get('#error-notification').should('exist').and('have.text', message);
        }
      });
    });
  });
});