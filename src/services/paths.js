import defPath from './helpers/routingHelper';

const parentPaths = {
  default: `${defPath}/`,
  orderlist: `${defPath}/sales/orderlist`,
  subscriptions: `${defPath}/sales/subscriptions`,
  invoices: `${defPath}/sales/invoices`,
  licenses: `${defPath}/sales/licenses`,
  carts: `${defPath}/sales/carts`,
  archivedOrders: `${defPath}/sales/archivedorders`,

  stores: `${defPath}/storesetup/stores`,
  checkoutpagebuilder: {
    main: `${defPath}/storesetup/checkoutpagebuilder`,
    themesTab: `${defPath}/storesetup/checkoutpagebuilder/themes`,
    layoutsTab: `${defPath}/storesetup/checkoutpagebuilder/layouts`,
    fontsTab: `${defPath}/storesetup/checkoutpagebuilder/fonts`,
  },
  localization: {
    main: `${defPath}/storesetup/localization`,
    translationsTab: `${defPath}/storesetup/localization/translations`,
    invoiceTranslationsTab: `${defPath}/storesetup/localization/invoicetranslations`,
  },
  emailbuilder: `${defPath}/storesetup/emailbuilder`,

  productlist: `${defPath}/products/productlist`,
  pricemodels: {
    main: `${defPath}/products/pricemodels`,
    pricesTab: `${defPath}/products/pricemodels/prices`,
    pricefunctionsTab: `${defPath}/products/pricemodels/pricefunctions`,
  },
  recommendations: `${defPath}/products/recommendations`,
  fulfillment: {
    main: `${defPath}/products/fulfillment`,
    autoFulfillmentsTab: `${defPath}/products/fulfillment/autoFulfillments`,
    manualFulfillmentsTab: `${defPath}/products/fulfillment/manualFulfillments`,
    licenseProviderDefinitionsTab: `${defPath}/products/fulfillment/licenseProviderDefinitions`,
  },
  catalogs: `${defPath}/products/catalogs`,
  discountrules: `${defPath}/marketing/discountrules`,
  campaigns: {
    main: `${defPath}/marketing/campaigns`,
    campaigns: `${defPath}/marketing/campaigns/marketingCampaigns`,
    abandoned: `${defPath}/marketing/campaigns/marketingAbandoned`,
  },
  endusers: `${defPath}/endusers/enduserlist`,
  endusergroups: `${defPath}/endusers/endusergroups`,
  resellers: `${defPath}/endusers/resellers`,

  reports: `${defPath}/reports`,

  users: `${defPath}/settings/users`,
  userroles: {
    main: `${defPath}/settings/userroles`,
    roles: `${defPath}/settings/userroles/roles`,
    metaRoles: `${defPath}/settings/userroles/metaRoles`,
    privileges: `${defPath}/settings/userroles/privileges`,
  },
  notifications: {
    main: `${defPath}/customermanagement/notifications`,
    notificationTab: `${defPath}/customermanagement/notifications/notifications`,
    notificationDefinitionTab: `${defPath}/customermanagement/notifications/notification-definition`,
    notificationHistoryTab: `${defPath}/customermanagement/notifications/notification-history`,
  },
  myaccount: `${defPath}/myaccount`,
  crudHelper: {
    main: `${defPath}/settings/crudHelper`,
    request: `${defPath}/settings/crudHelper/request`,
  },
  serviceconfiguration: `${defPath}/settings/serviceconfiguration`,

  customers: `${defPath}/customermanagement/customerslist`,
  onboarding: `${defPath}/customermanagement/onboarding`,
  remittables: `${defPath}/customermanagement/remittables`,
  audits: `${defPath}/customermanagement/audits`,

  referentialManager: {
    main: `${defPath}/serviceconfiguration/referentialmanager`,
    currenciesTab: `${defPath}/serviceconfiguration/referentialmanager/currencies`,
    localesTab: `${defPath}/serviceconfiguration/referentialmanager/locales`,
    countriesTab: `${defPath}/serviceconfiguration/referentialmanager/countries`,
  },
  subsidiaryManager: {
    main: `${defPath}/serviceconfiguration/subsidiarymanager`,
    subsidiariesTab: `${defPath}/serviceconfiguration/subsidiarymanager/subsidiaries`,
    subsidiaryRulesTab: `${defPath}/serviceconfiguration/subsidiarymanager/subsidiaryrules`,
  },

  productdocumentation: 'https://www.nexway.com/',
  apidocumentation: 'https://apidoc.nexway.store',

  realms: `${defPath}/realms`,
};

export default parentPaths;
