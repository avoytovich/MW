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
  roleAdmin: 'roleAdminSortParams',
  metaRoleAdmin: 'metaRoleAdminSortParams',
  privilegesAdmin: 'privilegesAdminSortParams',
  notification: 'notificationsSortParams',
  notificationDefinition: 'notificationDefinirionsSortParams',
  notificationHistory: 'notificationsHistorySortParams',
  prices: 'pricesSortParams',
  priceFunctions: 'priceFunctionsSortParams',
  carts: 'cartsSortParams',
  licenses: 'licensesSortParams',
  autoFulfillments: 'autoFulfillmentsSortParams',
  manualFulfillments: 'manualFulfillmentsSortParams',
  licenseProviderDefinitions: 'licenseProviderDefinitionsSortParams',
  abandoned: 'abandonedSortParams',
};

export const getSortParams = (key) => JSON.parse(localStorage.getItem(key));

export const saveSortParams = (key, value) => localStorage.setItem(key, JSON.stringify(value));
