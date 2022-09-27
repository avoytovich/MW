const VALID_REFRESH_SCOPES = [
  'productlist',
  'catalogs',
  'stores',
  'orderlist',
  'notifications',
  'notification-definition',
  'notification-history',
  'carts',
  'licenses',
  'recommendations',
  'marketingAbandoned',
  'resellers',
  'endusergroups',
  'customerslist',
  'marketingCampaigns',
  'discounts',
  'emailbuilder',
  'discountrules',
  'roles',
  'metaRoles',
  'privileges',
  'remittables',
  'audits',
  'onboarding',
  'translations',
  'invoicetranslations',
  'users',
  'realms',
  'currencies',
  'locales',
  'countries',
];
const VALID_FILTER_SCOPES = [
  'productlist',
  'catalogs',
  'stores',
  'subscriptions',
  'licenses',
  'themes',
  'layouts',
  'fonts',
  'translations',
  'orderlist',
  'notifications',
  'notification-definition',
  'notification-history',
  'carts',
  'prices',
  'pricefunctions',
  'autoFulfillments',
  'manualFulfillments',
  'marketingCampaigns',
  'discounts',
  'licenseProviderDefinitions',
  'recommendations',
  'marketingAbandoned',
  'resellers',
  'enduserlist',
  'endusergroups',
  'customerslist',
  'emailbuilder',
  'discountrules',
  'roles',
  'metaRoles',
  'privileges',
  'remittables',
  'audits',
  'onboarding',
  'invoicetranslations',
  'users',
  'realms',
  'currencies',
  'locales',
  'countries',
];

const KNOWN_REALMS = ['/nexway', '/mynexway', '/kasperskyfrance'];

const VALID_SEARCH_SCOPES = [
  'orderlist',
  'subscriptions',
  'licenses',
  'carts',
  'stores',
  'productlist',
  'prices',
  'recommendations',
  'discountrules',
  'marketingCampaigns',
  'marketingAbandoned',
  'enduserlist',
  'endusergroups',
  'resellers',
  'realms',
];

const VALID_DUPLICATE_SCOPES = ['discountrules', 'recommendations', 'productlist'];

export {
  VALID_REFRESH_SCOPES,
  VALID_FILTER_SCOPES,
  KNOWN_REALMS,
  VALID_SEARCH_SCOPES,
  VALID_DUPLICATE_SCOPES,
};
