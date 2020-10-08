const generateData = (data, customer) => {
  const values = {
    header: 'Order',
    left: {
      titles: [
        {
          id: 'ID',
          value: data?.id,
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
          id: 'Amount',
          value: data?.lineItems[0]?.amount,
          row: 'even',
        },
        {
          id: 'Store name',
          value: data?.store?.name,
          row: 'odd',
        },
      ],
      other: [
        // eslint-disable-next-line spaced-comment
        //4????
        {
          id: 'Transaction ID',
          value: data?.processingEvent[0]?.metadata?.transactionId,
          row: 'odd',
        },
        {
          id: 'Payment type',
          value: data?.payment?.methodType,
          row: 'odd',
        },
        {
          id: 'Payment status',
          value: data?.payment?.status,
          row: 'even',
        },
        // eslint-disable-next-line spaced-comment
        //7?????
        {
          id: 'Fraud Check',
          value: `${data?.payments[0]?.informativeFraudCheck}`,
          row: 'even',
        },
        // eslint-disable-next-line spaced-comment
        //8?????
        {
          id: 'Fulfillment  Status',
          value: data?.lineItems[0]?.fulfillmentProcessingStatus,
          row: 'odd',
        },
        // eslint-disable-next-line spaced-comment
        //9?????
        {
          id: 'Subscription status',
          value: data?.lineItems[0]?.subscriptionProcessingStatus,
          row: 'odd',
        },
      ],
    },
    right: { paymentMethods: null, prices: null },
    bottom: null,
  };
  return values;
};

export default generateData;
