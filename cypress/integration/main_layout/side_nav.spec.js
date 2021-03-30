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
      for (let i = 0; i < navigationItems.length; i++) {
        for (let z = 0; z < navigationItems[i].items.length; z++) {
          cy.get(`.listItem a[href="${navigationItems[i].items[z].href}"]`).click().should('have.class', 'active');
          cy.url().should('contain', navigationItems[i].items[z].href);
        };
      };
    });
  });

  context('Nav items actions', () => {
    it('should have the active navigation changed and highlighted on click', () => {
      for (let i = 0; i < navigationItems.length; i++) {
        for (let z = 0; i < navigationItems[i].length; z++) {
          cy.get(`.listItem a[href="${navigationItems[i].items[z].href}"]`).click().should('have.class', 'active');
          cy.url().should('contain', navigationItems[i].items[z].href);
        };
      };
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
