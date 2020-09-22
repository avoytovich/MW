import localization from '../../localization';

const navConfig = [
  {
    subheader: localization.t('sideBar.subheaders.overview'),
    items: [
      {
        id: 'products',
        title: localization.t('sideBar.titles.products'),
        href: '/overview/products',
      },
      {
        id: 'stores',
        title: localization.t('sideBar.titles.stores'),
        href: '/overview/stores',
      },
      {
        id: 'orders',
        title: localization.t('sideBar.titles.orders'),
        href: '/overview/orders',
      },
      {
        id: 'invoices-credit-notes',
        title: localization.t('sideBar.titles.invoicesCreditNotes'),
        href: '/overview/invoices-credit-notes',
      },
      {
        id: 'subscriptions',
        title: localization.t('sideBar.titles.subscriptions'),
        href: '/overview/subscriptions',
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
      },
      {
        id: 'marketing',
        title: localization.t('sideBar.titles.marketing'),
        href: '/tobedefined/marketing',
      },
      {
        id: 'checkout-experience',
        title: localization.t('sideBar.titles.checkoutExperience'),
        href: '/tobedefined/checkout-experience',
      },
      {
        id: 'reports',
        title: localization.t('sideBar.titles.reports'),
        href: '/tobedefined/reports',
      },
      {
        id: 'myaccount',
        title: localization.t('sideBar.titles.myAccount'),
        href: '/tobedefined/myaccount',
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
      },
      {
        id: 'services-configuration',
        title: localization.t('sideBar.titles.servicesConfiguration'),
        href: '/settings/services-configuration',
      },
      {
        id: 'administration',
        title: localization.t('sideBar.titles.administration'),
        href: '/settings/administration',
      },
      {
        id: 'identities',
        title: localization.t('sideBar.titles.identities'),
        href: '/settings/identities',
      },
    ],
  },
];

export default navConfig;
