import filters from '../../../src/services/useData/tableMarkups/filters';
import { DATE_VARIANTS } from '../../../src/components/utils/Modals/Filters/DateSubFilter';
import localization from '../../../src/localization';

/// <reference types="cypress" />

describe('Table filters', () => {
  before(() => {
    cy.visit('/login');
    cy.login(true);
  });

  it('should open filters modal on top bar filter action click', () => {
    cy.get('.filters-modal').should('not.exist');
    cy.get('.top-bar button[aria-label="filter-list"]').click();
    cy.get('.filters-modal').should('be.visible');
  });

  it('should have filter options regarding to configuration', () => {
    cy
      .get('.filters-modal .MuiFormGroup-root').children('.MuiBox-root')
      .should('have.length', filters.products.length);

    filters.products.forEach((filter) => {
      cy.get('.filters-modal .MuiFormGroup-root').should('contain', filter.label);
    })
  });

  it('should have contains/exact toggle for filter type text when enabled', () => {
    const [filterItem] = filters.products.filter((filter) => filter.type === 'text');

    cy
      .get('.filters-modal .MuiFormGroup-root .MuiBox-root')
      .contains(filterItem.label).as('filterEl').click();

    cy.get('@filterEl').parents('.MuiBox-root').should('contain', localization.t('forms.buttons.contains'));
    cy.get('@filterEl').parents('.MuiBox-root').find('.MuiButton-root').click();
    cy.get('@filterEl').parents('.MuiBox-root').should('contain', localization.t('forms.buttons.exact'));
  });

  it('should have select with config options for filter type select when enabled', () => {
    const [filterItem] = filters.products.filter((filter) => filter.type === 'select');

    cy
      .get('.filters-modal .MuiFormGroup-root .MuiBox-root')
      .contains(filterItem.label).as('filterEl').click();

    cy.get('@filterEl').parents('.MuiBox-root').find('[aria-haspopup="listbox"]').click();

    filterItem.values.forEach((value) => {
      cy.get('.MuiPopover-root .MuiMenu-list').should('contain', value.label);
    });

    cy.get('.MuiPopover-root').click();
  });

  it('should have a modal with date picker for filter type date when enabled', () => {
    const [filterItem] = filters.products.filter((filter) => filter.type === 'date');

    cy
      .get('.filters-modal .MuiFormGroup-root .MuiBox-root')
      .contains(filterItem.label).as('filterEl').click();

    cy.get('#date-sub-filters').should('not.exist');
    cy.get('@filterEl').parents('.MuiBox-root').find('.MuiButton-root').click();
    cy.get('#date-sub-filters').should('exist');

    DATE_VARIANTS.forEach((variant) => {
      cy.get('#date-sub-filters').contains(variant).click();

      if(variant === 'unlimited') {
        cy.get('.MuiPaper-root[aria-labelledby="date-sub-filters"] .MuiInputBase-input').should('not.exist');
      } else if(variant === 'between') {
        cy.get('.MuiPaper-root[aria-labelledby="date-sub-filters"] .MuiInputBase-input').should('have.length', 2);
      } else {
        cy.get('.MuiPaper-root[aria-labelledby="date-sub-filters"] .MuiInputBase-input').should('have.length', 1);
      }
    });
  });
});