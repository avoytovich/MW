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
    main: [
      {
        id: 'Name',
        value: data?.name,
      },
      {
        id: 'Customer',
        value: customer,
      },
    ],

    left: [
      {
        id: 'Status',
        value: data?.status,
      },
      {
        id: 'Hostnames',
        value: data?.routes[0]?.hostname,
      },
      {
        id: 'Default language',
        value: data?.defaultLocale,
      },
      {
        id: 'Sales languages',
        value: data?.saleLocales.join(', '),
      },
      {
        id: 'Enduser portal theme',
        value: data?.designs?.checkout?.themeRef?.name,
      },
      {
        id: 'Checkout theme',
        value: data?.designs?.resellerCheckout?.themeRef?.name,
      },
    ],
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
