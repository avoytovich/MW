import navigationItems from '../../../src/components/SideBar/config';

/// <reference types="cypress" />

describe('Side Navigation', () => {
  before(() => {
    cy.visit('/login');
    cy.login(true);
  });

  context('Sub-categories and nav items', () => {
    navigationItems.forEach((item, index) => {
      context(`'${item.subheader}' section`, () => {
        beforeEach(() => {
          cy.get(`.side-bar ul:nth-of-type(${index + 1})`).as('curList');
        });

        it('should have a list with regarding sub-category', () => {
          cy.get('@curList').should('exist').then(($el) => {
            const curHeader = $el.find('.MuiListSubheader-root');
            expect(curHeader).to.contain(item.subheader);
          });
        });

        it('should include all expected nav items', () => {
          cy.get('@curList').should('exist').then(($el) => {
            const curListItems = $el.find('.listItem');
            expect(curListItems.length).to.be.equal(item.items.length);

            item.items.forEach((it) => {
              expect($el).to.contain(it.title);
            });
          });
        });
      });
    });
  });

  context('Nav items actions', () => {
    it('should have the active navigation changed and highlighted on click', () => {
      navigationItems.forEach(section => {
        section.items.forEach(item => {
          cy.get(`.listItem a[href="${item.href}"]`).click().should('have.class', 'active');
          cy.url().should('contain', item.href);
        })
      })
    });
  });

  context('Customer selection', () => {
    it('should display customer select dropbox', () => {
      cy.get('#customers-select').scrollIntoView().should('be.visible');
    })
    it('should display customers list after click on dropdown', () => {
      cy.get('#customers-select').click();
      cy.get('[aria-controls=customers-select-popup]').should('be.visible')
    })
  })
});
