import formatDate from '../../dateFormatting';
import localization from '../../../localization';

const parseData = (data) => {
  const res = data.map((item) => ({
    image: item.url,
    textTitle: item.label,
  }));
  return res;
};

const generateData = (data, storeName) => {
  const values = {
    header: 'Product',
    left: {
      name: {
        id: localization.t('labels.name'),
        value: data?.genericName,
      },

      type: {
        id: localization.t('labels.type'),
        value: data?.type,
        row: 'odd',
      },
      // eslint-disable-next-line spaced-comment
      //3???
      sellingStores: {
        id: localization.t('labels.sellingStores'),
        value: storeName,
        row: 'even',
      },
      currency: {
        id: localization.t('labels.currency'),
        value:
          data?.prices && data?.prices?.priceByCountryByCurrency
            ? Object.keys(data?.prices?.priceByCountryByCurrency).join(', ')
            : '-',
        row: 'odd',
      },
      updateDate: {
        id: localization.t('labels.lastUpdate'),
        value: formatDate(data?.updateDate),
        row: 'odd',
      },
      lifeTime: {
        id: localization.t('labels.lifeTime'),
        value: data?.lifeTime,
        row: 'odd',
      },
      trialAllowed: {
        id: localization.t('labels.trialAllowed'),
        value: `${data?.trialAllowed}`,
        row: 'even',
      },
    },
    right: {
      paymentMethods: null,
      prices: [
        {
          id: localization.t('labels.totalPrice'),
          value: data?.prices?.priceByCountryByCurrency
            ? data?.prices?.priceByCountryByCurrency?.[
              data?.prices?.defaultCurrency
            ]?.default?.value
            : '-',
        },
        {
          id: localization.t('labels.total'),
          value: data?.prices?.priceByCountryByCurrency
            ? data?.prices?.priceByCountryByCurrency?.[
              data?.prices?.defaultCurrency
            ]?.default?.value
            : '-',
        },
      ],
    },
    imagesBlock: data?.resources ? parseData(data?.resources) : null,
  };
  return values;
};

export default generateData;
