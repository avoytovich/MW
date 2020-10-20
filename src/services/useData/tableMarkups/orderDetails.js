import formatDate from '../../dateFormatting';
import localization from '../../../localization';

const generateData = (data, customer) => {
  const values = {
    header: 'Order',
    left: {
      titles: [
        {
          id: localization.t('labels.iD'),
          value: data?.id,
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
          id: localization.t('labels.amount'),
          value: data?.lineItems[0]?.amount,
          row: 'even',
        },
        {
          id: localization.t('labels.store'),
          value: data?.store?.name,
          row: 'odd',
        },
      ],
      other: [
        {
          id: localization.t('labels.paymentID'),
          value: data?.processingEvent[0]?.metadata?.paymentId,
          row: 'odd',
        },
        {
          id: localization.t('labels.paymentType'),
          value: data?.payment?.methodType,
          row: 'odd',
        },
        {
          id: localization.t('labels.paymentStatus'),
          value: data?.payment?.status,
          row: 'even',
        },
        {
          id: localization.t('labels.fraudStatus'),
          value: `${data?.payments[0]?.informativeFraudCheck}`,
          row: 'even',
        },

        {
          id: localization.t('labels.fulfillment'),
          value: data?.lineItems[0]?.fulfillmentProcessingStatus,
          row: 'odd',
        },
        {
          id: localization.t('labels.subscriptionStatus'),
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
