import localization from '../../../localization';

const parseData = (data) => {
  const res = [];
  Object.keys(data).forEach((key, index) => {
    if (key === 'logoStore') {
      res.push({
        id: `${key}_${index}`,
        image: data[key],
        textTitle: 'Logo',
      });
    } else if (key === 'bannerInvoice') {
      res.push({
        id: `${key}_${index}`,
        image: data[key],
        textTitle: 'Invoice banner',
      });
    } else if (key === 'bannerOrderConfEmail') {
      res.push({
        id: `${key}_${index}`,
        image: data[key],
        textTitle: 'Confirmation email banner',
      });
    } else if (key === 'logoFavicon') {
      res.push({
        id: `${key}_${index}`,
        image: data[key],
        textTitle: 'Favicon',
      });
    }
  });
  return res;
};

const generateData = (data, customer) => {
  const imagesBlock = parseData(data);
  const values = {
    header: localization.t('labels.store'),
    name: {
      id: 'name',
      label: localization.t('labels.name'),
      value: data?.name,
    },
    customer: {
      id: 'customer',
      label: localization.t('labels.customer'),
      value: customer,
    },

    status: {
      id: 'status',
      label: localization.t('labels.status'),
      value: data?.status,
    },
    hostnames: {
      id: 'hostnames',

      label: localization.t('labels.hostnames'),
      value: data?.routes[0]?.hostname,
    },

    defaultLanguage: {
      id: 'defaultLanguage',
      label: localization.t('labels.defaultLanguage'),
      value: data?.defaultLocale,
    },
    salesLanguages: {
      id: 'salesLanguages',
      label: localization.t('labels.salesLanguages'),
      value: data?.saleLocales,
    },
    enduserPortalTheme: {
      id: 'enduserPortalTheme',
      label: localization.t('labels.enduserPortalTheme'),
      value: data?.designs?.checkout?.themeRef?.name,
    },
    checkoutTheme: {
      id: 'checkoutTheme',
      label: localization.t('labels.checkoutTheme'),
      value: data?.designs?.resellerCheckout?.themeRef?.name,
    },

    paymentMethods: data?.designs?.paymentComponent
      ?.rankedPaymentTabsByCountriesList[0]?.rankedPaymentTabs
      ? {
        id: 'paymentMethods',
        label: localization.t('labels.paymentMethods'),
        value:
            data?.designs?.paymentComponent?.rankedPaymentTabsByCountriesList[0]
              ?.rankedPaymentTabs,
      }
      : null,
    imagesBlock,
  };

  return values;
};

export default generateData;
