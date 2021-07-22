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
import NotificationsActiveOutlinedIcon from '@material-ui/icons/NotificationsActiveOutlined';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
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
        href: `${defPath}/overview/products`,
        icon: FolderOpen,
      },
      {
        id: 'stores',
        title: localization.t('sideBar.titles.stores'),
        href: `${defPath}/overview/stores`,
        icon: FolderOpen,
      },
      {
        id: 'orders',
        title: localization.t('sideBar.titles.orders'),
        href: `${defPath}/overview/orders`,
        icon: FolderOpen,
      },
      {
        id: 'invoices-credit-notes',
        title: localization.t('sideBar.titles.invoicesCreditNotes'),
        href: `${defPath}/overview/invoices-credit-notes`,
        icon: FolderOpen,
      },
      {
        id: 'subscriptions',
        title: localization.t('sideBar.titles.subscriptions'),
        href: `${defPath}/overview/subscriptions`,
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
        href: `${defPath}/tobedefined/sales-customers`,
        icon: Visibility,
      },
      {
        id: 'marketing',
        title: localization.t('sideBar.titles.marketing'),
        href: `${defPath}/marketing`,
        icon: EmojiObjects,
      },
      {
        id: 'checkout-experience',
        title: localization.t('sideBar.titles.checkoutExperience'),
        href: `${defPath}/checkout-experience`,
        icon: Toll,
      },
      {
        id: 'reports',
        title: localization.t('sideBar.titles.reports'),
        href: `${defPath}/tobedefined/reports`,
        icon: Link,
      },
      {
        id: 'myaccount',
        title: localization.t('sideBar.titles.myAccount'),
        href: `${defPath}/my-account`,
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
        href: 'https://api-doc.staging.nexway.build',
        icon: SwapHorizontalCircle,
        external: true,
      },
      {
        id: 'services-configuration',
        title: localization.t('sideBar.titles.servicesConfiguration'),
        href: `${defPath}/settings/services-configuration`,
        icon: Build,
      },
      {
        id: 'administration',
        title: localization.t('sideBar.titles.administration'),
        href: `${defPath}/settings/administration`,
        icon: Settings,
      },
      {
        id: 'identities',
        title: localization.t('sideBar.titles.identities'),
        href: `${defPath}/settings/identities`,
        icon: PeopleOutline,
      },
      {
        id: 'notifications',
        title: localization.t('sideBar.titles.notification'),
        href: `${defPath}/settings/notifications`,
        icon: NotificationsActiveOutlinedIcon,
      },
      {
        id: 'carts',
        title: 'carts',
        href: `${defPath}/settings/carts`,
        icon: ShoppingCartIcon,
      },
    ],
  },
];

export default navConfig;
