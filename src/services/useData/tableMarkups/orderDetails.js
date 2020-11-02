import formatDate from '../../dateFormatting';
import localization from '../../../localization';

const formBottom = (array, products) => {
  const res = array.map((item) => {
    let product = '';
    products.items.forEach((val) => {
      if (val?.id === item.productId) {
        product = val.genericName;
      }
    });
    const textTitle = product; // toDoL class='orderText'
    const text = item?.shortDesc;
    return { image: null, textTitle, text };
  });
  return res;
};

const generateData = (data, customer, products) => {
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
          value: data?.lineItems && data?.lineItems[0]?.amount,
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
          id: localization.t('labels.fraudStatus'),
          value: `${data?.payments[0]?.informativeFraudCheck}`,
          row: 'odd',
        },

        {
          id: localization.t('labels.paymentType'),
          value: data?.payment?.methodType,
          row: 'even',
        },
        {
          id: localization.t('labels.fulfillment'),
          value: data?.lineItems[0]?.fulfillmentProcessingStatus,
          row: 'even',
        },
        {
          id: localization.t('labels.paymentStatus'),
          value: data?.payment?.status,
          row: 'odd',
        },
        {
          id: localization.t('labels.subscription'),
          value: data?.lineItems[0]?.subscriptionProcessingStatus,
          row: 'odd',
        },
        {
          id: localization.t('labels.creationDate'),
          value: formatDate(data?.createDate),
          row: 'even',
        },
        {
          id: localization.t('labels.lastUpdate'),
          value: formatDate(data?.updateDate),
          row: 'even',
        },
        {
          id: localization.t('labels.updateReason'),
          value: data?.lastUpdateReason,
          row: 'odd',
        },
        {
          id: localization.t('labels.emailDate'),
          value:
            data?.emails
            && formatDate(data?.emails[data?.emails.length - 1].createDate),
          row: 'odd',
        },
        {
          id: localization.t('labels.invoiceDate'),
          value: formatDate(data?.invoice?.date),
          row: 'even',
        },
        {
          id: localization.t('labels.endUser'),
          value: `${data?.endUser?.firstName} ${data?.endUser?.lastName}`,
          row: 'even',
        },
        {
          id: localization.t('labels.companyName'),
          value: data?.endUser?.company?.companyName
            ? data?.endUser?.company?.companyName
            : '',
          row: 'odd',
        },
        {
          id: localization.t('labels.address'),
          value: data?.endUser?.streetAddress,
          row: 'odd',
        },
        {
          id: localization.t('labels.zipCode'),
          value: data?.endUser?.zipCode,
          row: 'even',
        },
        {
          id: localization.t('labels.country'),
          value: data?.endUser?.country,
          row: 'even',
        },
        {
          id: localization.t('labels.transactionID'),
          value: data?.payment?.transactionId,
          row: 'odd',
        },
        {
          id: localization.t('labels.installments'),
          value: data?.maxPaymentsParts,
          row: 'odd',
        },
        {
          id: localization.t('labels.paymentDeadline'),
          value: data?.paymentDeadline,
          row: 'even',
        },
      ],
    },
    bottom: data?.lineItems ? formBottom(data?.lineItems, products) : null,
  };
  return values;
};

export default generateData;
