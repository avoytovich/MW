import moment from 'moment';
import localization from '../../../localization';

const generateData = (orderData, paymentData) => {
  const res = {
    general: [
      {
        key: 'createDate',
        label: localization.t('labels.createDate'),
        value: moment(orderData.createDate).format('ll'),
      },
      {
        key: 'lastUpdate',
        label: localization.t('labels.lastUpdate'),
        value: moment(orderData.updateDate).format('ll'),
      },
      {
        key: 'source',
        label: localization.t('labels.source'),
        value: orderData.source,
      },
      {
        key: 'status',
        label: localization.t('labels.status'),
        value: orderData.status,
      },
      {
        key: 'amount',
        label: localization.t('labels.amount'),
        value: `${orderData?.payment?.amount || 0} ${orderData.currency}`,
      },
      {
        key: 'unpaidAmount',
        label: localization.t('labels.unpaidAmount'),
        value: '',
      },
      {
        key: 'onlineStore',
        label: localization.t('labels.onlineStore'),
        value: orderData?.store?.name,
      },
      {
        key: 'salesFlags',
        label: localization.t('labels.salesFlags'),
        value: orderData.salesFlags && orderData.salesFlags.join(', '),
      },
      {
        key: 'invoiceId',
        label: localization.t('labels.invoiceId'),
        value: orderData?.invoice?.id,
      },
      {
        key: 'termsAndConditions',
        label: localization.t('labels.termsAndConditions'),
        value: '',
      },
      {
        key: 'invoiceDate',
        label: localization.t('labels.invoiceDate'),
        value: moment(orderData?.invoice?.date).format('ll'),
      },
      {
        key: 'numberOfInstallments',
        label: localization.t('labels.numberOfInstallments'),
        value: orderData?.installments,
      },
      {
        key: 'creditNote',
        label: localization.t('labels.creditNote'),
        value: orderData?.creditNotes && orderData?.creditNotes[0]?.id,
      },
      {
        key: 'creditNoteDate',
        label: localization.t('labels.creditNoteDate'),
        value:
          orderData?.creditNotes
          && moment(orderData?.creditNotes[0]?.date).format('ll'),
      },
    ],
    endUser: [
      {
        key: 'id',
        label: localization.t('labels.id'),
        value: orderData?.endUser?.id,
      },
      {
        key: 'firstName',
        label: localization.t('labels.firstName'),
        value: orderData?.endUser?.firstName,
      },
      {
        key: 'lastName',
        label: localization.t('labels.lastName'),
        value: orderData?.endUser?.lastName,
      },
      {
        key: 'emailAddress',
        label: localization.t('labels.emailAddress'),
        value: orderData?.endUser?.email,
      },
      {
        key: 'streetAddress',
        label: localization.t('labels.streetAddress'),
        value: orderData?.endUser?.street,
      },
      {
        key: 'city',
        label: localization.t('labels.city'),
        value: orderData?.endUser?.city,
      },
      {
        key: 'zip',
        label: localization.t('labels.zip'),
        value: orderData?.endUser?.zipCode,
      },
      {
        key: 'country',
        label: localization.t('labels.country'),
        value: orderData?.endUser?.country,
      },
      {
        key: 'phone',
        label: localization.t('labels.phone'),
        value: orderData?.endUser?.phone,
      },
      {
        key: 'endUserIp',
        label: localization.t('labels.ip'),
        value: orderData?.endUserIp,
      },
    ],
    paymentAttempt: [
      {
        key: 'paymentID',
        label: localization.t('labels.paymentID'),
        value: orderData?.payment?.paymentId,
      },
      {
        key: 'paymentStatus',
        label: localization.t('labels.paymentStatus'),
        value: paymentData?.status,
      },
      {
        key: 'ip',
        label: localization.t('labels.ip'),
        value: paymentData?.enduserIp,
      },
      {
        key: 'transactionID',
        label: localization.t('labels.transactionID'),
        value: paymentData?.transactionId,
      },
      {
        key: 'paymentType',
        label: localization.t('labels.paymentType'),
        value: paymentData?.paymentType?.id,
      },
      {
        key: 'paymentRequestDate',
        label: localization.t('labels.paymentRequestDate'),
        value:
          paymentData?.paymentRequestDate
          && moment(paymentData?.paymentRequestDate).format('ll'),
      },
      {
        key: 'paymentDate',
        label: localization.t('labels.paymentDate'),
        value:
          paymentData?.paymentDate
          && moment(paymentData?.paymentDate).format('ll'),
      },
      {
        key: 'paymentProvider',
        label: localization.t('labels.paymentProvider'),
        value: paymentData?.pspId,
      },
      {
        key: 'cardBin',
        label: localization.t('labels.cardBin'),
        value: paymentData?.creditCardDetails?.bin,
      },
      {
        key: 'fraudStatus',
        label: localization.t('labels.fraudStatus'),
        value: paymentData?.fraudStatus,
      },
    ],
  };

  return res;
};
export default generateData;
