import {
  FolderOpen,
  Visibility,
  EmojiObjects,
  Toll,
  Link,
  FormatQuote,
  Settings,
  Build,
  SwapHorizontalCircle,
  PeopleOutline,
  Dashboard,
} from '@material-ui/icons';

import localization from '../../localization';

const navConfig = [
  {
    items: [
      {
        id: 'dashboard',
        title: localization.t('sideBar.titles.dashboard'),
        href: '/',
        exact: true,
        icon: Dashboard,
      },
    ],
  },
  {
    subheader: localization.t('sideBar.subheaders.overview'),
    items: [
      {
        id: 'products',
        title: localization.t('sideBar.titles.products'),
        href: '/overview/products',
        icon: FolderOpen,
      },
      {
        id: 'stores',
        title: localization.t('sideBar.titles.stores'),
        href: '/overview/stores',
        icon: FolderOpen,
      },
      {
        id: 'orders',
        title: localization.t('sideBar.titles.orders'),
        href: '/overview/orders',
        icon: FolderOpen,
      },
      {
        id: 'invoices-credit-notes',
        title: localization.t('sideBar.titles.invoicesCreditNotes'),
        href: '/overview/invoices-credit-notes',
        icon: FolderOpen,
      },
      {
        id: 'subscriptions',
        title: localization.t('sideBar.titles.subscriptions'),
        href: '/overview/subscriptions',
        icon: FolderOpen,
      },
    ],
  },
  {
    subheader: localization.t('sideBar.subheaders.toBeDefined'),
    items: [
      {
        id: 'sales-customers',
        title: localization.t('sideBar.titles.salesCustomers'),
        href: '/tobedefined/sales-customers',
        icon: Visibility,
      },
      {
        id: 'marketing',
        title: localization.t('sideBar.titles.marketing'),
        href: '/marketing',
        icon: EmojiObjects,
      },
      {
        id: 'checkout-experience',
        title: localization.t('sideBar.titles.checkoutExperience'),
        href: '/checkout-experience',
        icon: Toll,
      },
      {
        id: 'reports',
        title: localization.t('sideBar.titles.reports'),
        href: '/tobedefined/reports',
        icon: Link,
      },
      {
        id: 'myaccount',
        title: localization.t('sideBar.titles.myAccount'),
        href: '/my-account',
        icon: FormatQuote,
      },
    ],
  },
  {
    subheader: localization.t('sideBar.subheaders.settings'),
    items: [
      {
        id: 'api',
        title: localization.t('sideBar.titles.api'),
        href: '/settings/api',
        icon: SwapHorizontalCircle,
      },
      {
        id: 'services-configuration',
        title: localization.t('sideBar.titles.servicesConfiguration'),
        href: '/settings/services-configuration',
        icon: Build,
      },
      {
        id: 'administration',
        title: localization.t('sideBar.titles.administration'),
        href: '/settings/administration',
        icon: Settings,
      },
      {
        id: 'identities',
        title: localization.t('sideBar.titles.identities'),
        href: '/settings/identities',
        icon: PeopleOutline,
      },
    ],
  },
];

export default navConfig;
