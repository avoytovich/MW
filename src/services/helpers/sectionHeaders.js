import defPath from './routingHelper';
import localization from '../../localization';

const sideBarTitle = {
  orderlist: localization.t('sideBar.titles.orders'),
  subscriptions: localization.t('sideBar.titles.subscriptions'),
  invoices: localization.t('sideBar.titles.invoicesCreditNotes'),
  licenses: localization.t('sideBar.titles.licenses'),
  carts: localization.t('sideBar.titles.carts'),
  archivedOrders: localization.t('sideBar.titles.archivedOrders'),
  stores: localization.t('sideBar.titles.stores'),
  checkoutpagebuilder: localization.t('sideBar.titles.checkoutPageBuilder'),
  localization: localization.t('sideBar.titles.localization'),
  emailbuilder: localization.t('sideBar.titles.emailBuilder'),
  productlist: localization.t('sideBar.titles.products'),
  pricemodels: localization.t('sideBar.titles.priceModels'),
  recommendations: localization.t('sideBar.titles.crosSellUpSellReco'),
  fulfillment: localization.t('sideBar.titles.fulfillmentPackages'),
  catalogs: localization.t('sideBar.titles.catalogs'),
  discountrules: localization.t('sideBar.titles.discountRules'),
  campaigns: localization.t('sideBar.titles.campaigns'),
  enduserlist: localization.t('sideBar.titles.endUsers'),
  endusergroups: localization.t('sideBar.titles.endUserGroups'),
  resellers: localization.t('sideBar.titles.resellers'),
  reports: localization.t('sideBar.titles.reports'),
  users: localization.t('sideBar.titles.users'),
  userroles: localization.t('sideBar.titles.userRolesProfiles'),
  notifications: localization.t('sideBar.titles.eventNotifications'),
  myaccount: localization.t('sideBar.titles.myAccount'),
  serviceconfiguration: localization.t('sideBar.titles.serviceConfiguration'),
  customerslist: localization.t('sideBar.titles.customers'),
  onboarding: localization.t('sideBar.titles.onboarding'),
  remittables: localization.t('sideBar.titles.remittables'),
  audits: localization.t('sideBar.titles.audits'),
  crudHelper: localization.t('sideBar.titles.crudHelper'),
  'product-documentation': localization.t('sideBar.titles.productDocumentation'),
  subsidiarymanager: localization.t('sideBar.titles.subsidiarymanager'),
  referentialManager: localization.t('sideBar.titles.referentialManager'),
  subsidiaryManager: localization.t('sideBar.titles.subsidiaryManager'),
};

const customHeaders = {
  crudHelper: localization.t('labels.crudHelperResources'),
};

const getSectionHeader = (pathname) => {
  const url = pathname.split(`/${defPath}/`)[0].split('/')[2];
  return customHeaders[url] || sideBarTitle[url];
};

export { getSectionHeader, sideBarTitle };
