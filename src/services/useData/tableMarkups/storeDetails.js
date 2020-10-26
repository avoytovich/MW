import localization from '../../../localization';

const parseData = (data) => {
  const res = Object.keys(data).map((key) => {
    const image = data[key].match(/(?<=<p>)<img src="(?<url>.[^"]+)".+>(?=.+)/)
      ?.groups;
    const text = image
      ? data[key].replace(/(?<=<p>)<img src="(?<image>.[^"]+)".+>(?=.+)/, '')
      : data[key];
    return {
      image: image?.url,
      text,
    };
  });
  return res;
};

const generateData = (data, customer) => {
  const values = {
    header: localization.t('labels.store'),
    left: {
      titles: [
        {
          id: localization.t('labels.name'),
          value: data?.name,
        },
        {
          id: localization.t('labels.customer'),
          value: customer,
        },
      ],
      main: [
        {
          id: localization.t('labels.status'),
          value: data?.status,
          row: 'odd',
        },

        {
          id: localization.t('labels.hostnames'),
          value: data?.routes[0]?.hostname,
          row: 'even',
        },
      ],
      other: [
        {
          id: localization.t('labels.defaultLanguage'),
          value: data?.defaultLocale,
          row: 'odd',
        },
        {
          id: localization.t('labels.salesLanguages'),
          value: data?.saleLocales?.join(', '),
          row: 'odd',
        },
        {
          id: localization.t('labels.enduserPortalTheme'),
          value: data?.designs?.checkout?.themeRef?.name,
          row: 'even',
        },
        {
          id: localization.t('labels.checkoutTheme'),
          value: data?.designs?.resellerCheckout?.themeRef?.name,
          row: 'even',
        },
      ],
    },
    right: {
      paymentMethods: data?.designs?.paymentComponent
        ?.rankedPaymentTabsByCountriesList[0]?.rankedPaymentTabs
        ? {
          id: localization.t('labels.paymentMethods'),
          value:
          data?.designs?.paymentComponent
            ?.rankedPaymentTabsByCountriesList[0]?.rankedPaymentTabs,
        }
        : null,
      prices: null,
    },
    bottom: data?.thankYouDesc ? parseData(data?.thankYouDesc) : null,
  };

  return values;
};

export default generateData;
