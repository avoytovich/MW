import moment from 'moment';
import localization from '../../../localization';
import parentPaths from '../../paths';
import api from '../../../api';

const emptyValue = '-';

const setColorClass = (val) => {
  switch (val) {
    case 'COMPLETED':
    case 'FORCE_COMPLETED':
      return '#00A300';
    case 'CANCELED':
    case 'CANCELED_WITH_ERROR':
    case 'FORCE_CANCELED':
    case 'ABORTED':
      return '#FF0000';
    default:
      return '#FFA500';
  }
};
const generateData = (orderData, paymentData) => {
  const downloadPdf = (data) => {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${orderData.id}.invoice.pdf`);
    document.body.appendChild(link);
    link.click();
  };

  const downloadTermsAndConditions = (data) => {
    const customerId = orderData.customer?.id || orderData.endUser?.customerId;
    if (customerId) {
      const date = moment(orderData.createDate).format('YYYY-MM-DD');
      api.getTermsAndConditions(customerId, orderData.endUser.locale, date)
        .then((response) => {
          downloadPdf(response.data, data.label);
        });
    }
  };
  const downloadInvoice = (data) => (
    api.getInvoicePdfById(data.value)
      .then((response) => downloadPdf(response.data))
  );

  const res = {
    general: [
      {
        key: 'id',
        label: localization.t('labels.orderId'),
        value: orderData.id,
        shouldCopy: orderData.id,
      },
      {
        key: 'createDate',
        label: localization.t('labels.createDate'),
        value: moment(orderData.createDate).format('ll'),
      },
      {
        key: 'lastUpdate',
        label: localization.t('labels.lastUpdate'),
        value: moment(orderData.updateDate).format('ll') || emptyValue,
      },
      {
        key: 'source',
        label: localization.t('labels.source'),
        value: orderData.source || emptyValue,
      },
      {
        key: 'status',
        label: localization.t('labels.status'),
        value: orderData.status || emptyValue,
        color: setColorClass(orderData.status),
      },
      {
        key: 'amount',
        label: localization.t('labels.amount'),
        value: `${orderData?.payment?.amount || 0} ${orderData.currency}` || emptyValue,
      },
      {
        key: 'unpaidAmount',
        label: localization.t('labels.unpaidAmount'),
        value: emptyValue,
      },
      {
        key: 'onlineStore',
        label: localization.t('labels.onlineStore'),
        value: orderData?.store?.name || emptyValue,
      },
      {
        key: 'salesFlags',
        label: localization.t('labels.salesFlags'),
        value: (orderData.salesFlags && orderData.salesFlags.join(', ')) || emptyValue,
      },
      {
        key: 'invoiceId',
        label: localization.t('labels.invoiceId'),
        value: orderData?.invoice?.id || emptyValue,
        downloadFunc: downloadInvoice,
        shouldCopy: orderData?.invoice?.id,
      },
      {
        key: 'termsAndConditions',
        label: localization.t('labels.termsAndConditions'),
        value: '',
        downloadFunc: (data) => downloadTermsAndConditions(data),
      },
      {
        key: 'invoiceDate',
        label: localization.t('labels.invoiceDate'),
        value: orderData?.invoice?.date ? moment(orderData?.invoice?.date).format('ll') : emptyValue,
      },
      {
        key: 'numberOfInstallments',
        label: localization.t('labels.numberOfInstallments'),
        value: orderData?.installments || emptyValue,
      },
      {
        key: 'creditNote',
        label: localization.t('labels.creditNote'),
        value: (orderData?.creditNotes && orderData?.creditNotes[0]?.id) || emptyValue,
      },
      {
        key: 'creditNoteDate',
        label: localization.t('labels.creditNoteDate'),
        value:
          (orderData?.creditNotes
            && moment(orderData?.creditNotes[0]?.date).format('ll')) || emptyValue,
      },
    ],
    endUser: [
      {
        key: 'id',
        label: localization.t('labels.endUserId'),
        value: orderData?.endUser?.id,
        shouldCopy: orderData?.endUser?.id,
        link: 'internal',
        path: `${parentPaths.endusers}/${orderData?.endUser?.id}`,
      },
      {
        key: 'firstName',
        label: localization.t('labels.firstName'),
        value: orderData?.endUser?.firstName || emptyValue,
      },
      {
        key: 'lastName',
        label: localization.t('labels.lastName'),
        value: orderData?.endUser?.lastName || emptyValue,
      },
      {
        key: 'emailAddress',
        label: localization.t('labels.emailAddress'),
        value: orderData?.endUser?.email || emptyValue,
      },
      {
        key: 'streetAddress',
        label: localization.t('labels.streetAddress'),
        value: orderData?.endUser?.streetAddress || emptyValue,
      },
      {
        key: 'city',
        label: localization.t('labels.city'),
        value: orderData?.endUser?.city || emptyValue,
      },
      {
        key: 'zip',
        label: localization.t('labels.zip'),
        value: orderData?.endUser?.zipCode || emptyValue,
      },
      {
        key: 'country',
        label: localization.t('labels.country'),
        value: orderData?.endUser?.country || emptyValue,
      },
      {
        key: 'phone',
        label: localization.t('labels.phone'),
        value: orderData?.endUser?.phone || emptyValue,
      },
      {
        key: 'endUserIp',
        label: localization.t('labels.ip'),
        value: orderData?.endUserIp || emptyValue,
        shouldCopy: orderData?.endUserIp,
      },
      {
        key: ' companyName',
        label: localization.t('labels.companyName'),
        value: orderData?.endUser?.company?.companyName || emptyValue,
      },
      {
        key: ' vatNumber',
        label: localization.t('labels.vatNumber'),
        value: orderData?.endUser?.company?.vatNumber || emptyValue,
      },
    ],
    paymentAttempt: [
      {
        key: 'paymentID',
        label: localization.t('labels.paymentID'),
        value: orderData?.payment?.paymentId || emptyValue,
        shouldCopy: orderData?.payment?.paymentId,
      },
      {
        key: 'paymentStatus',
        label: localization.t('labels.paymentStatus'),
        color: true,
        value: paymentData?.status || emptyValue,
      },
      {
        key: 'ip',
        label: localization.t('labels.ip'),
        value: paymentData?.enduserIp || emptyValue,
        shouldCopy: paymentData?.enduserIp,
      },
      {
        key: 'transactionID',
        label: localization.t('labels.transactionID'),
        value: paymentData?.transactionId || emptyValue,
        link: 'external',
        path: 'https://directpayment.nexway.com/bo/user/login/tf',
        shouldCopy: paymentData?.transactionId,
      },
      {
        key: 'amount',
        label: localization.t('labels.amount'),
        value: `${orderData?.payment?.amount || 0} ${orderData.currency}` || emptyValue,
      },
      {
        key: 'paymentType',
        label: localization.t('labels.paymentType'),
        value: paymentData?.paymentType?.id || emptyValue,
      },
      {
        key: 'paymentRequestDate',
        label: localization.t('labels.paymentRequestDate'),
        value:
          (paymentData?.paymentRequestDate
            && moment(paymentData?.paymentRequestDate).format('ll')) || emptyValue,
      },
      {
        key: 'paymentDate',
        label: localization.t('labels.paymentDate'),
        value:
          (paymentData?.paymentDate
            && moment(paymentData?.paymentDate).format('ll')) || emptyValue,
      },
      {
        key: 'paymentProvider',
        label: localization.t('labels.paymentProvider'),
        value: paymentData?.pspId || emptyValue,
      },
      {
        key: 'cardBin',
        label: localization.t('labels.cardBin'),
        value: paymentData?.creditCardDetails?.bin || emptyValue,
        shouldCopy: paymentData?.creditCardDetails?.bin,
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

export { generateData, emptyValue };
