import {
  MiscellaneousServices,
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
} from '@mui/icons-material';
import parentPaths from '../../services/paths';
import localization from '../../localization';
import { sideBarTitle } from '../../services/helpers/sectionHeaders';

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
    subheader: localization.t('sideBar.subheaders.sales'),
    subheaderIcon: ShoppingCart,
    items: [
      {
        id: 'orders',
        title: sideBarTitle.orderlist,
        href: parentPaths.orderlist,
      },
      {
        id: 'subscriptions',
        title: sideBarTitle.subscriptions,
        href: parentPaths.subscriptions,
      },
      {
        id: 'invoices-credit-notes',
        title: sideBarTitle.invoices,
        href: parentPaths.invoices,
      },
      {
        id: 'licenses',
        title: sideBarTitle.licenses,
        href: parentPaths.licenses,
      },
      {
        id: 'carts',
        title: sideBarTitle.carts,
        href: parentPaths.carts,
      },
      {
        id: 'archived-orders',
        title: sideBarTitle.archivedOrders,
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
        title: sideBarTitle.stores,
        href: parentPaths.stores,
      },
      {
        id: 'checkout-experience',
        title: sideBarTitle.checkoutpagebuilder,
        href: parentPaths.checkoutpagebuilder.main,
      },
      {
        id: 'localization',
        title: sideBarTitle.localization,
        href: parentPaths.localization.main,
      },
      {
        id: 'email-builder',
        title: sideBarTitle.emailbuilder,
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
        title: sideBarTitle.productlist,
        href: parentPaths.productlist,
      },
      {
        id: 'price-models',
        title: sideBarTitle.pricemodels,
        href: parentPaths.pricemodels.main,
      },
      {
        id: 'cros-sell-up-sell-reco',
        title: sideBarTitle.recommendations,
        href: parentPaths.recommendations,
      },
      {
        id: 'fulfillment-packages',
        title: sideBarTitle.fulfillment,
        href: parentPaths.fulfillment.main,
      },
      {
        id: 'catalogs',
        title: sideBarTitle.catalogs,
        href: parentPaths.catalogs,
      },
    ],
  },
  {
    subheader: localization.t('sideBar.subheaders.marketing'),
    subheaderIcon: LocalOffer,
    items: [
      {
        id: 'discount-rules',
        title: sideBarTitle.discountrules,
        href: parentPaths.discountrules,
      },
      {
        id: 'marketing-campaigns',
        title: sideBarTitle.campaigns,
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
        title: sideBarTitle.enduserlist,
        href: parentPaths.endusers,
      },
      {
        id: 'end-user-groups',
        title: sideBarTitle.endusergroups,
        href: parentPaths.endusergroups,
      },
      {
        id: 'resellers',
        title: sideBarTitle.resellers,
        href: parentPaths.resellers,
      },
    ],
  },
  {
    items: [
      {
        id: 'reports',
        title: sideBarTitle.reports,
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
        title: sideBarTitle.users,
        href: parentPaths.users,
      },
      {
        id: 'user-roles-profiles',
        title: sideBarTitle.userroles,
        href: parentPaths.userroles.main,
      },
      // {
      //   id: 'crud-helper',
      //   title: sideBarTitle.crudHelper,
      //   href: parentPaths.crudHelper.main,
      // },
      // {
      //   id: 'service-configuration',
      //   title: sideBarTitle.serviceconfiguration,
      //   href: parentPaths.serviceconfiguration,
      // },
    ],
  },
  {
    subheader: localization.t('sideBar.subheaders.customers'),
    subheaderIcon: Person,
    items: [
      {
        id: 'customer',
        title: sideBarTitle.customerslist,
        href: parentPaths.customers,
      },
      {
        id: 'onboarding',
        title: sideBarTitle.onboarding,
        href: parentPaths.onboarding,
      },
      {
        id: 'remittables',
        title: sideBarTitle.remittables,
        href: parentPaths.remittables,
      },
      {
        id: 'audits',
        title: sideBarTitle.audits,
        href: parentPaths.audits,
      },
      {
        id: 'event-notifications',
        title: sideBarTitle.notifications,
        href: parentPaths.notifications.main,
      },
    ],
  },
  {
    subheader: localization.t('sideBar.subheaders.serviceConfiguration'),
    subheaderIcon: MiscellaneousServices,
    items: [
      {
        id: 'referential-manager',
        title: sideBarTitle.referentialManager,
        href: parentPaths.referentialManager.main,
      },
      {
        id: 'subsidiary-manager',
        title: sideBarTitle.subsidiaryManager,
        href: parentPaths.subsidiaryManager,
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
        href: parentPaths.apidocumentation,
        external: true,
      },
      {
        id: 'product-documentation',
        title: sideBarTitle['product-documentation'],
        href: parentPaths.productdocumentation,
        external: true,
      },
    ],
  },
];

export default navConfig;
