const parentPaths = {
  orderlist: '/orders/orderlist',
  subscriptions: '/orders/subscriptions',
  invoices: '/orders/invoices',
  licenses: '/orders/licenses',
  carts: '/orders/carts',
  archivedOrders: '/orders/archivedorders',

  stores: '/storesetup/stores',
  checkoutpagebuilder: {
    main: '/storesetup/checkoutpagebuilder',
    themesTab: '/storesetup/checkoutpagebuilder/themes',
    layoutsTab: '/storesetup/checkoutpagebuilder/layouts',
    fontsTab: '/storesetup/checkoutpagebuilder/fonts',
  },
  localization: {
    main: '/storesetup/localization',
    translationsTab: '/storesetup/localization/translations',
    invoiceTranslationsTab: '/storesetup/localization/invoice-translations',
  },
  emailbuilder: '/storesetup/emailbuilder',

  productlist: '/products/productlist',
  pricemodels: '/products/pricemodels',
  recommendations: '/products/recommendations',
  fulfillment: {
    main: '/products/fulfillment',
    autoFulfillmentsTab: '/products/fulfillment/autoFulfillments',
    manualFulfillmentsTab: '/products/fulfillment/manualFulfillments',
    licenseProviderDefinitionsTab: '/products/fulfillment/licenseProviderDefinitions',
  },
  discountrules: '/marketing/discountrules',
  campaigns: '/marketing/campaigns',
  marketing: '/marketing',

  customers: '/customers/customerlist',
  customergroup: '/customers/customergroup',
  resellers: '/customers/resellers',

  reports: '/reports',

  users: '/settings/users',
  userprivileges: '/settings/userprivileges',
  userroles: '/settings/userroles',
  notifications: {
    main: '/settings/notifications',
    notificationTab: '/settings/notifications/notifications',
    notificationDefinitionTab: '/settings/notifications/notification-definition',
    notificationHistoryTab: '/settings/notifications/notification-history',
  },
  myaccount: '/settings/myaccount',

  clientlist: '/client/clientlist',
  onboarding: '/client/onboarding',
  remittables: '/client/remittables',
  audits: '/client/audits',
  productdocumentation: '/product-documentation',
};

export default parentPaths;
