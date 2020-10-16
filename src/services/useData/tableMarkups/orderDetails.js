import formatDate from '../../dateFormatting';

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
          id: 'Store',
          value: data?.store?.name,
          row: 'odd',
        },
      ],
      other: [
        {
          id: 'Payment ID',
          value: data?.processingEvent[0]?.metadata?.paymentId,
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
        {
          id: 'Fraud status',
          value: `${data?.payments[0]?.informativeFraudCheck}`,
          row: 'even',
        },

        {
          id: 'Fulfillment',
          value: data?.lineItems[0]?.fulfillmentProcessingStatus,
          row: 'odd',
        },
        {
          id: 'Subscription status',
          value: data?.lineItems[0]?.subscriptionProcessingStatus,
          row: 'odd',
        },
      ],
    },
    right: { paymentMethods: null, prices: null },
    bottom: [
      {
        text: `<p class='orderText'>${
          data?.createDate && formatDate(data?.createDate)
        }</p><p>${data?.updateDate && formatDate(data?.updateDate)}</p>`,
      },
      {
        text: `<p class='orderText'>${data?.endUser?.firstName} ${
          data?.endUser?.lastName
        }</p><p>${
          data?.endUser?.company?.companyName
            ? data?.endUser?.company?.companyName
            : ''
        }</p>`,
      },
      {
        text: `<p class='orderText'>${data?.payment?.transactionId}</p><p>${
          data?.installments ? data?.installments : ''
        }</p>`,
      },
      {
        text: `<p class='orderText'>${data?.lineItems[0]?.name}</p><p>${data?.lineItems[0]?.productType}</p>`,
      },
    ],
  };
  return values;
};

export default generateData;
