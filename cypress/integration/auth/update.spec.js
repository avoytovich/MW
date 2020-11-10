import localization from '../../../src/localization';

/// <reference types="cypress" />

describe('Update Password', () => {
  before(() => cy.visit('update-password/123'));

  context('Update Password', () => {
    it('has a form with inputs for "New Password" and "Confirm Passpord"', () => {
      cy.get('form').as('updatePasswordForm').should('exist');
      cy.get('@updatePasswordForm').find('input[name=newPassword]').should('exist');
      cy.get('@updatePasswordForm').find('input[name=confirmedPassword]').should('exist');
    });

    it('has button for setting new password', () => {
      cy.get('input[name=newPassword]').focus().clear().blur()
      cy.get('input[name=confirmedPassword]').focus().clear().blur()

      cy.get('button[type=submit]').should('exist').and('be.disabled');
    });

    it('has Error Notification about "at least 6 characters"', () => {
      cy.get('input[name=newPassword]').focus().clear().blur()

      cy.get('input[name=newPassword]').clear().type('email')
      cy.get('p').contains(localization.t('errorNotifications.atLeast6Characters')).should('exist');
    });

    it('has Error Notification about "less than 20 characters"', () => {
      cy.get('input[name=newPassword]').focus().clear().blur()

      cy.get('input[name=newPassword]').clear().type('1234567890Qwertyuiop[]')
      cy.get('p').contains(localization.t('errorNotifications.lessThan20Characters')).should('exist');
    });

    it('has Error Notification about "contains at least 1 uppercase character"', () => {
      cy.get('input[name=newPassword]').focus().clear().blur()

      cy.get('input[name=newPassword]').clear().type('uppercase1')
      cy.get('p').contains(localization.t('errorNotifications.containsAtLeast1UppercaseCharacter')).should('exist');
    });

    it('has Error Notification about "contains at least 1 lowercase character"', () => {
      cy.get('input[name=newPassword]').focus().clear().blur()

      cy.get('input[name=newPassword]').clear().type('LOWERCASE1')
      cy.get('p').contains(localization.t('errorNotifications.containsAtLeast1LowercaseCharacter')).should('exist');
    });

    it('has Error Notification about "contains at least 1 digit from 0-9"', () => {
      cy.get('input[name=newPassword]').focus().clear().blur()

      cy.get('input[name=newPassword]').clear().type('Digit')
      cy.get('p').contains(localization.t('errorNotifications.containsAtLeast1DigitFrom0to9')).should('exist');
    });

    it('has Error Notification about "password confirmation match"', () => {
      cy.get('input[name=newPassword]').focus().clear().blur()
      cy.get('input[name=confirmedPassword]').focus().clear().blur()


      cy.get('input[name=newPassword]').clear().type('Confirmation1')
      cy.get('input[name=confirmedPassword]').clear().type('Confirmation2')

      cy.get('p').contains(localization.t('errorNotifications.passwordConfirmationMatch')).should('exist');
    });

    it('Both passwords match without eny error Notifications', () => {
      cy.get('input[name=newPassword]').focus().clear().blur()
      cy.get('input[name=confirmedPassword]').focus().clear().blur()


      cy.get('input[name=newPassword]').clear().type('Confirmation1')
      cy.get('input[name=confirmedPassword]').clear().type('Confirmation1')

      cy.get('button[type=submit]').should('exist').and('not.be.disabled');
    });

  });
});
