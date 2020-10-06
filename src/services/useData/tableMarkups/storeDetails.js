const parseData = (data) => {
  const res = Object.keys(data).map((key) => {
    const { image, text } = data[key].match(/<p><img src="(?<image>.[^"]+)".+>(?<text>.+)<\/p>/).groups;
    return {
      image,
      text,
    };
  });
  return res;
};

const generateData = (data, customer) => {
  const values = {
    header: 'Store',
    left: {
      titles: [
        {
          id: 'Name',
          value: data?.name,
        },
        {
          id: 'Customer',
          value: customer,
        },
      ],
      main: [
        {
          id: 'Status',
          value: data?.status,
          row: 'odd',
        },

        {
          id: 'Hostnames',
          value: data?.routes[0]?.hostname,
          row: 'even',
        },
      ],
      other: [
        {
          id: 'Default language',
          value: data?.defaultLocale,
          row: 'odd',
        },
        {
          id: 'Sales languages',
          value: data?.saleLocales.join(', '),
          row: 'odd',
        },
        {
          id: 'Enduser portal theme',
          value: data?.designs?.checkout?.themeRef?.name,
          row: 'even',
        },
        {
          id: 'Checkout theme',
          value: data?.designs?.resellerCheckout?.themeRef?.name,
          row: 'even',
        },
      ],
    },
    right: {
      id: 'Payment methods',
      value:
        data?.designs?.paymentComponent?.rankedPaymentTabsByCountriesList[0]
          ?.rankedPaymentTabs,
    },
    bottom: parseData(data?.thankYouDesc),
  };
  return values;
};

export default generateData;
