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
        href: `${defPath}/overview/orders`,
      },
      {
        id: 'subscriptions',
        title: localization.t('sideBar.titles.subscriptions'),
        href: `${defPath}/overview/subscriptions`,
      },
      {
        id: 'invoices-credit-notes',
        title: localization.t('sideBar.titles.invoicesCreditNotes'),
        href: `${defPath}/overview/invoices-credit-notes`,
      },
      {
        id: 'licenses',
        title: localization.t('sideBar.titles.licenses'),
        href: `${defPath}/licenses`,
      },
      {
        id: 'carts',
        title: localization.t('sideBar.titles.carts'),
        href: `${defPath}/settings/carts`,
      },
      {
        id: 'archived-orders',
        title: localization.t('sideBar.titles.archivedOrders'),
        href: `${defPath}/overview/archived-orders`,
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
        href: `${defPath}/overview/stores`,
      },
      {
        id: 'checkout-experience',
        title: localization.t('sideBar.titles.checkoutExperience'),
        href: `${defPath}/checkout-experience`,
      },
      {
        id: 'localization',
        title: localization.t('sideBar.titles.localization'),
        href: `${defPath}/localization`,
      },
      {
        id: 'email-builder',
        title: localization.t('sideBar.titles.emailBuilder'),
        href: `${defPath}/email-builder`,
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
        href: `${defPath}/overview/products`,
      },
      {
        id: 'price-models',
        title: localization.t('sideBar.titles.priceModels'),
        href: `${defPath}/overview/price-models`,
      },
      {
        id: 'cros-sell-up-sell-reco',
        title: localization.t('sideBar.titles.crosSellUpSellReco'),
        href: `${defPath}/overview/cros-sell-up-sell-reco`,
      },
      {
        id: 'fulfillment-packages',
        title: localization.t('sideBar.titles.fulfillmentPackages'),
        href: `${defPath}/overview/fulfillment-packages`,
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
        href: `${defPath}/overview/discount-rules`,
      },
      {
        id: 'discount-rules',
        title: localization.t('sideBar.titles.campaigns'),
        href: `${defPath}/marketing`,
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
        href: `${defPath}/overview/customers`,
      },
      {
        id: 'customer-groups',
        title: localization.t('sideBar.titles.customerGroups'),
        href: `${defPath}/customer-groups`,
      },
      {
        id: 'resellers',
        title: localization.t('sideBar.titles.resellers'),
        href: `${defPath}/resellers`,
      },
    ],
  },
  {
    items: [
      {
        id: 'reports',
        title: localization.t('sideBar.titles.reports'),
        href: `${defPath}/tobedefined/reports`,
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
        href: `${defPath}/settings/identities`,
      },
      {
        id: 'user-privileges',
        title: localization.t('sideBar.titles.userPrivileges'),
        href: `${defPath}/settings/administration`,
      },
      {
        id: 'user-roles-profiles',
        title: localization.t('sideBar.titles.userRolesProfiles'),
        href: `${defPath}/settings/administration`,
      },
      {
        id: 'event-notifications',
        title: localization.t('sideBar.titles.eventNotifications'),
        href: `${defPath}/settings/notifications`,
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
        href: `${defPath}/overview/clients`,
      },
      {
        id: 'onboarding',
        title: localization.t('sideBar.titles.onboarding'),
        href: `${defPath}/overview/onboarding`,
      },
      {
        id: 'remittables',
        title: localization.t('sideBar.titles.remittables'),
        href: `${defPath}/overview/remittables`,
      },
      {
        id: 'audits',
        title: localization.t('sideBar.titles.audits'),
        href: `${defPath}/overview/audits`,
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
        href: `${defPath}/product-documentation`,
      },
    ],
  },
];

export default navConfig;
