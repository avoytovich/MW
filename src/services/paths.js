import defPath from './helpers/routingHelper';

const parentPaths = {
  default: `${defPath}/`,
  orderlist: `${defPath}/orders/orderlist`,
  subscriptions: `${defPath}/orders/subscriptions`,
  invoices: `${defPath}/orders/invoices`,
  licenses: `${defPath}/orders/licenses`,
  carts: `${defPath}/orders/carts`,
  archivedOrders: `${defPath}/orders/archivedorders`,

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
    invoiceTranslationsTab: `${defPath}/storesetup/localization/invoice-translations`,
  },
  emailbuilder: `${defPath}/storesetup/emailbuilder`,

  productlist: `${defPath}/products/productlist`,
  pricemodels: {
    main: `${defPath}/products/pricemodels`,
    pricesTab: `${defPath}/products/pricemodels/prices`,
    pricefunctionsTab: `${defPath}/products/pricemodels/price-functions`,
  },
  recommendations: `${defPath}/products/recommendations`,
  fulfillment: {
    main: `${defPath}/products/fulfillment`,
    autoFulfillmentsTab: `${defPath}/products/fulfillment/autoFulfillments`,
    manualFulfillmentsTab: `${defPath}/products/fulfillment/manualFulfillments`,
    licenseProviderDefinitionsTab: `${defPath}/products/fulfillment/licenseProviderDefinitions`,
  },
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
  userprivileges: `${defPath}/settings/userprivileges`,
  userroles: `${defPath}/settings/userroles`,
  notifications: {
    main: `${defPath}/settings/notifications`,
    notificationTab: `${defPath}/settings/notifications/notifications`,
    notificationDefinitionTab: `${defPath}/settings/notifications/notification-definition`,
    notificationHistoryTab: `${defPath}/settings/notifications/notification-history`,
  },
  myaccount: `${defPath}/settings/myaccount`,

  customers: `${defPath}/customermanagement/customerslist`,
  onboarding: `${defPath}/customermanagement/onboarding`,
  remittables: `${defPath}/customermanagement/remittables`,
  audits: `${defPath}/customermanagement/audits`,

  productdocumentation: `${defPath}/product-documentation`,
};

export default parentPaths;
