export const sortKeys = {
  fontsTab: 'fontsTabSortParams',
  identities: 'identitiesSortParams',
  customerAdmin: 'customerAdminSortParams',
  layoutsTab: 'layoutsTabSortParams',
  themesTab: 'themesTabSortParams',
  translationsTab: 'translationsTabSortParams',
  orders: 'ordersSortParams',
  products: 'productsSortParams',
  stores: 'storesSortParams',
};

export const getSortParams = (key) => JSON.parse(localStorage.getItem(key));

export const saveSortParams = (key, value) => localStorage.setItem(key, JSON.stringify(value));
