import localization from '../../../localization';

const parseData = (data) => {
  const res = [];
  Object.keys(data).forEach((key) => {
    if (key === 'logoStore') {
      res.push({
        image: data[key],
        textTitle: 'Logo',
      });
    } else if (key === 'bannerInvoice') {
      res.push({
        image: data[key],
        textTitle: 'Invoice banner',
      });
    } else if (key === 'bannerOrderConfEmail') {
      res.push({
        image: data[key],
        textTitle: 'Confirmation email banner',
      });
    } else if (key === 'logoFavicon') {
      res.push({
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
      id: localization.t('labels.name'),
      value: data?.name,
    },
    customer: {
      id: localization.t('labels.customer'),
      value: customer,
    },

    status: {
      id: localization.t('labels.status'),
      value: data?.status,
      row: 'odd',
    },
    hostnames: {
      id: localization.t('labels.hostnames'),
      value: data?.routes[0]?.hostname,
      row: 'even',
    },

    defaultLanguage: {
      id: localization.t('labels.defaultLanguage'),
      value: data?.defaultLocale,
      row: 'odd',
    },
    salesLanguages: {
      id: localization.t('labels.salesLanguages'),
      value: data?.saleLocales?.join(', '),
      row: 'odd',
    },
    enduserPortalTheme: {
      id: localization.t('labels.enduserPortalTheme'),
      value: data?.designs?.checkout?.themeRef?.name,
      row: 'even',
    },
    checkoutTheme: {
      id: localization.t('labels.checkoutTheme'),
      value: data?.designs?.resellerCheckout?.themeRef?.name,
      row: 'even',
    },

    paymentMethods: data?.designs?.paymentComponent
      ?.rankedPaymentTabsByCountriesList[0]?.rankedPaymentTabs
      ? {
          id: localization.t('labels.paymentMethods'),
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
