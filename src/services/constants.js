const VALID_REFRESH_SCOPES = ['productlist', 'stores', 'orderlist', 'notifications', 'notification-definition', 'notification-history', 'carts', 'licenses', 'recommendations', 'marketingAbandoned', 'resellers', 'customerslist', 'marketingCampaigns', 'discounts'];
const VALID_FILTER_SCOPES = [
  'productlist',
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
  'price-functions',
  'autoFulfillments',
  'manualFulfillments',
  'marketingCampaigns',
  'discounts',
  'licenseProviderDefinitions',
  'recommendations',
  'marketingAbandoned',
  'resellers',
  'enduserlist',
  'customerslist',
];

const KNOWN_REALMS = ['/nexway', '/mynexway'];

export { VALID_REFRESH_SCOPES, VALID_FILTER_SCOPES, KNOWN_REALMS };
