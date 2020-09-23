import localization from '../../localization';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import TollIcon from '@material-ui/icons/Toll';
import LinkIcon from '@material-ui/icons/Link';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import SettingsIcon from '@material-ui/icons/Settings';
import BuildIcon from '@material-ui/icons/Build';
import SwapHorizontalCircleIcon from '@material-ui/icons/SwapHorizontalCircle';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';

const navConfig = [
  {
    subheader: localization.t('sideBar.subheaders.overview'),
    items: [
      {
        id: 'products',
        title: localization.t('sideBar.titles.products'),
        href: '/overview/products',
        icon: FolderOpenIcon,
      },
      {
        id: 'stores',
        title: localization.t('sideBar.titles.stores'),
        href: '/overview/stores',
        icon: FolderOpenIcon,
      },
      {
        id: 'orders',
        title: localization.t('sideBar.titles.orders'),
        href: '/overview/orders',
        icon: FolderOpenIcon,
      },
      {
        id: 'invoices-credit-notes',
        title: localization.t('sideBar.titles.invoicesCreditNotes'),
        href: '/overview/invoices-credit-notes',
        icon: FolderOpenIcon,
      },
      {
        id: 'subscriptions',
        title: localization.t('sideBar.titles.subscriptions'),
        href: '/overview/subscriptions',
        icon: FolderOpenIcon,
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
        icon: VisibilityIcon,
      },
      {
        id: 'marketing',
        title: localization.t('sideBar.titles.marketing'),
        href: '/tobedefined/marketing',
        icon: EmojiObjectsIcon,
      },
      {
        id: 'checkout-experience',
        title: localization.t('sideBar.titles.checkoutExperience'),
        href: '/tobedefined/checkout-experience',
        icon: TollIcon,
      },
      {
        id: 'reports',
        title: localization.t('sideBar.titles.reports'),
        href: '/tobedefined/reports',
        icon: LinkIcon,
      },
      {
        id: 'myaccount',
        title: localization.t('sideBar.titles.myAccount'),
        href: '/tobedefined/myaccount',
        icon: FormatQuoteIcon,
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
        icon: SwapHorizontalCircleIcon,
      },
      {
        id: 'services-configuration',
        title: localization.t('sideBar.titles.servicesConfiguration'),
        href: '/settings/services-configuration',
        icon: BuildIcon,
      },
      {
        id: 'administration',
        title: localization.t('sideBar.titles.administration'),
        href: '/settings/administration',
        icon: SettingsIcon,
      },
      {
        id: 'identities',
        title: localization.t('sideBar.titles.identities'),
        href: '/settings/identities',
        icon: PeopleOutlineIcon,
      },
    ],
  },
];

export default navConfig;
