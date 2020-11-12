import localization from '../../../src/localization';

/// <reference types="cypress" />

describe('Login Screen', () => {  
  before(() => cy.visit('/login'));

  context('Login Form', () => {
    beforeEach(() => {
      cy.get('input[name=username]').clear();
      cy.get('input[name=password]').clear();
    });

    it('has a form with inputs for credentials', () => {
      cy.get('form').as('loginForm').should('exist');
      cy.get('@loginForm').find('input[name=username]').should('exist');
      cy.get('@loginForm').find('input[name=password]').should('exist');
    });

    it('has submit button disabled without filled inputs', () => {
      cy.get('form')
        .find('button[type=submit]').as('submitButton')
        .should('exist').and('be.disabled');

      cy.get('input[name=password]').type('something');
      cy.get('@submitButton').should('exist').and('be.disabled');

      cy.get('input[name=password]').clear();
      cy.get('input[name=username]').type('something');
      cy.get('@submitButton').should('exist').and('be.disabled');
    });

    it('has submit button enabled with filled inputs', () => {
      cy.get('input[name=username]').type('something');
      cy.get('input[name=password]').type('something');
      
      cy.get('form').find('button[type=submit]')
        .should('exist').and('not.be.disabled');
    });

    it('has recovery password navigation', () => {
      cy.contains(localization.t('forms.text.forgotPassword')).as('recoveryButton')
        .should('be.visible').and('not.be.disabled');
      
      cy.get('@recoveryButton').click();

      cy.url().should('contain', '/recover-password');
    });
  });

  context('Auth Actions', () => {
    beforeEach(() => cy.visit('/login'));

    it('reject wrong credentials with error notification', () => {
      cy.login().then((xhr) => {
        cy.wrap(xhr).then((data) => {
          const { message } = data.response.body;
          
          expect(data.status).to.equal(401);
          cy.get('#error-notification').should('exist');
        })
      });
    });
  
    it('sign in a user with proper credentials', () => {
      cy.login(true).then((xhr) => {
        cy.wrap(xhr).then((data) => {
          const { access_token } = data.response.body;

          expect(data.status).to.equal(200);
          expect(localStorage.getItem('accessToken')).to.equal(access_token);
          cy.get('#success-notification').should('exist');
          cy.url().should('include', '/overview/products');
        })
      });
    });

    it('redirects a user to desired section after signin', () => {
      const desiredPath = '/overview/stores';
      cy.visit(desiredPath);

      cy.wait(300).then(() => {
        expect(sessionStorage.getItem('redirect')).to.be.equal(desiredPath);

        cy.login(true).then((xhr) => {
          cy.wrap(xhr).then((data) => {
            expect(data.status).to.equal(200);
          });
        });

        cy.wait(300).then(() => {
          cy.url().should('contain', desiredPath);
          expect(sessionStorage.getItem('redirect')).to.be.null;
        });
      });
    });
  });
});
