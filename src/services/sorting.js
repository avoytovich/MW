export const sortKeys = {
  fontsTab: 'fontsTabSortParams',
  identities: 'identitiesSortParams',
  customerslist: 'customerslist',
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
  endUsersGroups: 'endUsersGroupsSortParams',
  licenses: 'licensesSortParams',
  autoFulfillments: 'autoFulfillmentsSortParams',
  manualFulfillments: 'manualFulfillmentsSortParams',
  licenseProviderDefinitions: 'licenseProviderDefinitionsSortParams',
  resellers: 'resellers',
  enduserlist: 'enduserSortParams',
  abandoned: 'abandonedSortParams',
  campaigns: 'campaignsSortParams',
  discounts: 'discountsSortParams',
};

export const getSortParams = (key) => JSON.parse(localStorage.getItem(key));

export const saveSortParams = (key, value) => localStorage.setItem(key, JSON.stringify(value));
