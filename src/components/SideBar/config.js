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
import localization from '../../localization';

const navConfig = [
  {
    items: [
      {
        id: 'dashboard',
        title: localization.t('sideBar.titles.dashboard'),
        href: parentPaths.default,
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
        href: parentPaths.orderlist,
      },
      {
        id: 'subscriptions',
        title: localization.t('sideBar.titles.subscriptions'),
        href: parentPaths.subscriptions,
      },
      {
        id: 'invoices-credit-notes',
        title: localization.t('sideBar.titles.invoicesCreditNotes'),
        href: parentPaths.invoices,
      },
      {
        id: 'licenses',
        title: localization.t('sideBar.titles.licenses'),
        href: parentPaths.licenses,
      },
      {
        id: 'carts',
        title: localization.t('sideBar.titles.carts'),
        href: parentPaths.carts,
      },
      {
        id: 'archived-orders',
        title: localization.t('sideBar.titles.archivedOrders'),
        href: parentPaths.archivedOrders,
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
        href: parentPaths.stores,
      },
      {
        id: 'checkout-experience',
        title: localization.t('sideBar.titles.checkoutExperience'),
        href: parentPaths.checkoutpagebuilder.main,
      },
      {
        id: 'localization',
        title: localization.t('sideBar.titles.localization'),
        href: parentPaths.localization.main,
      },
      {
        id: 'email-builder',
        title: localization.t('sideBar.titles.emailBuilder'),
        href: parentPaths.emailbuilder,
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
        href: parentPaths.productlist,
      },
      {
        id: 'price-models',
        title: localization.t('sideBar.titles.priceModels'),
        href: parentPaths.pricemodels,
      },
      {
        id: 'cros-sell-up-sell-reco',
        title: localization.t('sideBar.titles.crosSellUpSellReco'),
        href: parentPaths.recommendations,
      },
      {
        id: 'fulfillment-packages',
        title: localization.t('sideBar.titles.fulfillmentPackages'),
        href: parentPaths.fulfillment.main,
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
        href: parentPaths.marketing.discounts,
      },
      {
        id: 'marketing-campaigns',
        title: localization.t('sideBar.titles.campaigns'),
        href: parentPaths.campaigns.campaigns,
      },
    ],
  },
  {
    subheader: localization.t('sideBar.subheaders.endUsers'),
    subheaderIcon: BusinessCenter,
    items: [
      {
        id: 'end-users',
        title: localization.t('sideBar.titles.endUsers'),
        href: parentPaths.endusers,
      },
      {
        id: 'end-user-groups',
        title: localization.t('sideBar.titles.endUserGroups'),
        href: parentPaths.endusergroups,
      },
      {
        id: 'resellers',
        title: localization.t('sideBar.titles.resellers'),
        href: parentPaths.resellers,
      },
    ],
  },
  {
    items: [
      {
        id: 'reports',
        title: localization.t('sideBar.titles.reports'),
        href: parentPaths.reports,
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
        href: parentPaths.users,
      },
      {
        id: 'user-privileges',
        title: localization.t('sideBar.titles.userPrivileges'),
        href: parentPaths.userprivileges,
      },
      {
        id: 'user-roles-profiles',
        title: localization.t('sideBar.titles.userRolesProfiles'),
        href: parentPaths.userroles,
      },
      {
        id: 'event-notifications',
        title: localization.t('sideBar.titles.eventNotifications'),
        href: parentPaths.notifications.main,
      },
      {
        id: 'my-account',
        title: localization.t('sideBar.titles.myAccount'),
        href: parentPaths.myaccount,
      },
    ],
  },
  {
    subheader: localization.t('sideBar.subheaders.customers'),
    subheaderIcon: Person,
    items: [
      {
        id: 'customer',
        title: localization.t('sideBar.titles.customers'),
        href: parentPaths.customers,
      },
      {
        id: 'onboarding',
        title: localization.t('sideBar.titles.onboarding'),
        href: parentPaths.onboarding,
      },
      {
        id: 'remittables',
        title: localization.t('sideBar.titles.remittables'),
        href: parentPaths.remittables,
      },
      {
        id: 'audits',
        title: localization.t('sideBar.titles.audits'),
        href: parentPaths.audits,
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
        href: parentPaths.productdocumentation,
      },
    ],
  },
];

export default navConfig;
