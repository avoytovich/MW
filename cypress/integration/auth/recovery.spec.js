import localization from '../../../src/localization';

/// <reference types="cypress" />

describe('Recovery Screen', () => {
  before(() => cy.visit('/recover-password'));

  context('Recovery Form', () => {
    it('has a form with input for email', () => {
      cy.get('form').as('loginForm').should('exist');
      cy.get('@loginForm').find('input[name=email]').should('exist');
    });

    it('has reset button disabled and error notification with empty input', () => {
      cy.get('input[name=email]').focus().clear().blur()
        .should('have.attr', 'aria-invalid', 'true');
      
      cy.get('button[type=submit]').should('exist').and('be.disabled');
    });

    it('has reset button disabled and error notification with invalid email', () => {
      cy.fixture('emails.json').then((data) => {
        data.invalid.forEach((email) => {
          cy.get('input[name=email]').clear().type(email)
            .should('have.attr', 'aria-invalid', 'true');
          
          cy.get('button[type=submit]')
            .should('exist').and('be.disabled');
        })
      });  
    });

    it('has reset button enabled with valid inputs', () => {
      cy.fixture('emails.json').then((data) => {
        data.valid.forEach((cred) => {
          cy.get('input[name=email]').clear().type(cred.email)
            .should('have.attr', 'aria-invalid', 'false');
          
          cy.get('button[type=submit]')
            .should('exist').and('not.be.disabled');
        })
      });
    });
  });

  context('Reset Actions', () => {
    beforeEach(() => {
      cy.server();

      cy.route({
        url: Cypress.env('apiUrl') + '/iam/identities/lostpassword/nexway',
        method: 'POST',
      }).as('resetRequest');
    });

    it('reject not acceptable email with error notification', () => {
      cy.fixture('emails.json').then((data) => {
        const notAcceptable = data.valid.filter((v) => !v.acceptable);
        
        notAcceptable.forEach((cred) => {
          cy.get('input[name=email]').clear().type(cred.email);
          cy.get('button[type=submit]').click();

          cy.wait('@resetRequest').then((xhr) => {
            cy.wrap(xhr).then((data) => {
              const { message } = data.response.body;
              
              expect(data.status).to.equal(404);
              cy.get('#error-notification').should('exist').and('have.text', message);
            })
          });
        });
      });
    });

    it('proceeds with reset with acceptable email', () => {
      cy.fixture('emails.json').then((data) => {
        const acceptable = data.valid.filter((v) => v.acceptable);
        
        acceptable.forEach((cred) => {
          cy.get('input[name=email]').clear().type(cred.email);
          cy.get('button[type=submit]').click();

          cy.wait('@resetRequest').then((xhr) => {
            cy.wrap(xhr).then((data) => {
              expect(data.status).to.equal(200);
              cy.get('h3').contains(localization.t('general.checkYourEmailToResetThePassword')).should('exist');
            })
          });
        });
      });
    });
  });
});
