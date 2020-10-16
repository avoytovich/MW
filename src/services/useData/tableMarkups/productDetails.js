import formatDate from '../../dateFormatting';

const parseData = (data) => {
  const res = data.map((item) => ({
    image: item.url,
    text: `<p>${item.label}</p>`,
  }));
  return res;
};

const generateData = (data, storeName) => {
  const values = {
    header: 'Product',
    left: {
      titles: [
        {
          id: 'Name',
          value: data?.genericName,
        },
      ],
      main: [
        {
          id: 'Type',
          value: data?.type,
          row: 'odd',
        },
        // eslint-disable-next-line spaced-comment
        //3???
        {
          id: 'Selling Stores',
          value: storeName,
          row: 'even',
        },
        {
          id: 'Currency',
          value:
            data?.prices && data?.prices?.priceByCountryByCurrency
              ? Object.keys(data?.prices?.priceByCountryByCurrency).join(', ')
              : '-',
          row: 'odd',
        },
      ],
      other: [
        {
          id: 'Last Update',
          value: formatDate(data?.updateDate),
          row: 'odd',
        },
        {
          id: 'Life Time',
          value: data?.lifeTime,
          row: 'odd',
        },
        {
          id: 'Trial Allowed',
          value: `${data?.trialAllowed}`,
          row: 'even',
        },
      ],
    },
    right: {
      paymentMethods: null,
      prices: [
        {
          id: 'Total price',
          value: data?.prices?.priceByCountryByCurrency
            ? data?.prices?.priceByCountryByCurrency?.[
              data?.prices?.defaultCurrency
            ]?.default?.value
            : '-',
        },
        {
          id: 'Total',
          value: data?.prices?.priceByCountryByCurrency
            ? data?.prices?.priceByCountryByCurrency?.[
                data?.prices?.defaultCurrency
              ]?.default?.value
            : '-',
        },
      ],
    },
    bottom: data?.resources ? parseData(data?.resources) : null,
  };
  return values;
};

export default generateData;
