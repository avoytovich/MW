import {
  Layers,
  ShoppingCart,
  Widgets,
  LocalOffer,
  Report,
  BusinessCenter,
  Person,
  Help,
  Settings,
  Dashboard,
} from '@material-ui/icons';
import parentPaths from '../../services/paths';
import defPath from '../../services/helpers/routingHelper';
import localization from '../../localization';

const navConfig = [
  {
    items: [
      {
        id: 'dashboard',
        title: localization.t('sideBar.titles.dashboard'),
        href: `${defPath}/`,
        exact: true,
        isMain: true,
        icon: Dashboard,
      },
    ],
  },
  {
    subheader: localization.t('sideBar.subheaders.orders'),
    subheaderIcon: ShoppingCart,
    items: [
      {
        id: 'orders',
        title: localization.t('sideBar.titles.orders'),
        href: `${defPath}${parentPaths.orderlist}`,
      },
      {
        id: 'subscriptions',
        title: localization.t('sideBar.titles.subscriptions'),
        href: `${defPath}${parentPaths.subscriptions}`,
      },
      {
        id: 'invoices-credit-notes',
        title: localization.t('sideBar.titles.invoicesCreditNotes'),
        href: `${defPath}${parentPaths.invoices}`,
      },
      {
        id: 'licenses',
        title: localization.t('sideBar.titles.licenses'),
        href: `${defPath}${parentPaths.licenses}`,
      },
      {
        id: 'carts',
        title: localization.t('sideBar.titles.carts'),
        href: `${defPath}${parentPaths.carts}`,
      },
      {
        id: 'archived-orders',
        title: localization.t('sideBar.titles.archivedOrders'),
        href: `${defPath}${parentPaths.archivedOrders}`,
      },
    ],
  },
  {
    subheader: localization.t('sideBar.subheaders.storeSetup'),
    subheaderIcon: Layers,
    items: [
      {
        id: 'stores',
        title: localization.t('sideBar.titles.stores'),
        href: `${defPath}${parentPaths.stores}`,
      },
      {
        id: 'checkout-experience',
        title: localization.t('sideBar.titles.checkoutExperience'),
        href: `${defPath}${parentPaths.checkoutpagebuilder.main}`,
      },
      {
        id: 'localization',
        title: localization.t('sideBar.titles.localization'),
        href: `${defPath}${parentPaths.localization.main}`,
      },
      {
        id: 'email-builder',
        title: localization.t('sideBar.titles.emailBuilder'),
        href: `${defPath}${parentPaths.emailbuilder}`,
      },
    ],
  },
  {
    subheader: localization.t('sideBar.subheaders.products'),
    subheaderIcon: Widgets,
    items: [
      {
        id: 'products',
        title: localization.t('sideBar.titles.products'),
        href: `${defPath}${parentPaths.productlist}`,
      },
      {
        id: 'price-models',
        title: localization.t('sideBar.titles.priceModels'),
        href: `${defPath}${parentPaths.pricemodels}`,
      },
      {
        id: 'cros-sell-up-sell-reco',
        title: localization.t('sideBar.titles.crosSellUpSellReco'),
        href: `${defPath}${parentPaths.recommendations}`,
      },
      {
        id: 'fulfillment-packages',
        title: localization.t('sideBar.titles.fulfillmentPackages'),
        href: `${defPath}${parentPaths.fulfillment.main}`,
      },
    ],
  },
  {
    subheader: localization.t('sideBar.subheaders.marketing'),
    subheaderIcon: LocalOffer,
    items: [
      {
        id: 'discount-rules',
        title: localization.t('sideBar.titles.discountRules'),
        href: `${defPath}${parentPaths.discountrules}`,
      },
      {
        id: 'marketing-campaigns',
        title: localization.t('sideBar.titles.campaigns'),
        href: `${defPath}${parentPaths.campaigns.main}`,
      },
    ],
  },
  {
    subheader: localization.t('sideBar.subheaders.customers'),
    subheaderIcon: BusinessCenter,
    items: [
      {
        id: 'customers',
        title: localization.t('sideBar.titles.customers'),
        href: `${defPath}${parentPaths.customers}`,
      },
      {
        id: 'customer-groups',
        title: localization.t('sideBar.titles.customerGroups'),
        href: `${defPath}${parentPaths.customergroup}`,
      },
      {
        id: 'resellers',
        title: localization.t('sideBar.titles.resellers'),
        href: `${defPath}${parentPaths.resellers}`,
      },
    ],
  },
  {
    items: [
      {
        id: 'reports',
        title: localization.t('sideBar.titles.reports'),
        href: `${defPath}${parentPaths.reports}`,
        isMain: true,
        icon: Report,
      },
    ],
  },
  {
    subheader: localization.t('sideBar.subheaders.settings'),
    subheaderIcon: Settings,
    items: [
      {
        id: 'users',
        title: localization.t('sideBar.titles.users'),
        href: `${defPath}${parentPaths.users}`,
      },
      {
        id: 'user-privileges',
        title: localization.t('sideBar.titles.userPrivileges'),
        href: `${defPath}${parentPaths.userprivileges}`,
      },
      {
        id: 'user-roles-profiles',
        title: localization.t('sideBar.titles.userRolesProfiles'),
        href: `${defPath}${parentPaths.userroles}`,
      },
      {
        id: 'event-notifications',
        title: localization.t('sideBar.titles.eventNotifications'),
        href: `${defPath}${parentPaths.notifications.main}`,
      },
      {
        id: 'my-account',
        title: localization.t('sideBar.titles.myAccount'),
        href: `${defPath}${parentPaths.myaccount}`,
      },
    ],
  },
  {
    subheader: localization.t('sideBar.subheaders.clientManagement'),
    subheaderIcon: Person,
    items: [
      {
        id: 'clients',
        title: localization.t('sideBar.titles.clients'),
        href: `${defPath}${parentPaths.clientlist}`,
      },
      {
        id: 'onboarding',
        title: localization.t('sideBar.titles.onboarding'),
        href: `${defPath}${parentPaths.onboarding}`,
      },
      {
        id: 'remittables',
        title: localization.t('sideBar.titles.remittables'),
        href: `${defPath}${parentPaths.remittables}`,
      },
      {
        id: 'audits',
        title: localization.t('sideBar.titles.audits'),
        href: `${defPath}${parentPaths.audits}`,
      },
    ],
  },
  {
    subheader: localization.t('sideBar.subheaders.help'),
    subheaderIcon: Help,
    items: [
      {
        id: 'api',
        title: localization.t('sideBar.titles.apiDocumentation'),
        href: 'https://api-doc.staging.nexway.build',
        external: true,
      },
      {
        id: 'product-documentation',
        title: localization.t('sideBar.titles.productDocumentation'),
        href: `${defPath}${parentPaths.productdocumentation}`,
      },
    ],
  },
];

export default navConfig;
