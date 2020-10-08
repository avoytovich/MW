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

const generateData = (data, storeName) => {
  const values = {
    header: 'Order',
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
          value: data?.prices
            ? Object.keys(data?.prices?.priceByCountryByCurrency).join(', ')
            : '-',
          row: 'odd',
        },
      ],
      other: [],
    },
    right: {
      paymentMethods: null,
      prices: [
        {
          id: 'Total price',
          value:
            data?.prices?.priceByCountryByCurrency?.[
              data?.prices?.defaultCurrency
            ]?.default?.value,
        },
        {
          id: 'Total',
          value:
            data?.prices?.priceByCountryByCurrency?.[
              data?.prices?.defaultCurrency
            ]?.default?.value,
        },
      ],
    },
    bottom: data?.thankYouDesc ? parseData(data?.thankYouDesc) : null,
  };
  return values;
};

export default generateData;
