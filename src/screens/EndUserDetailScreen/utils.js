import { toast } from 'react-toastify';
import moment from 'moment';
import localization from '../../localization';
import parentPaths from '../../services/paths';

const defaultObject = {
  accountCreated: false,
  company: { companyName: '', vatNumber: '' },
  country: '',
  login: '',
  phone: '',
  status: 'ENABLED',
  streetAddress: '',
  taxOffice: '',
  groupId: '',
};

const checkRequiredFields = (data) => ({ ...defaultObject, ...data });

const makeCopy = (value) => {
  navigator.clipboard.writeText(value)
    .then(() => toast(localization.t('general.itemHasBeenCopied')));
};

const defaultOrdersShow = {
  orderDate: true,
  orderId: true,
  product: true,
  status: true,
  amount: true,
};
const defaultEmailsShow = {
  sentAt: true,
  type: true,
  status: true,
};
const generateOrders = (data) => {
  let markUp;
  const values = data.map((val) => {
    markUp = {
      headers: [
        {
          value: localization.t('labels.orderDate'),
          id: 'orderDate',
        },
        {
          value: localization.t('labels.orderId'),
          id: 'orderId',
          clickable: true,
          path: `${parentPaths.orderlist}/${val.id}`,

        },
        {
          value: localization.t('labels.product'),
          id: 'product',
          clickable: true,
          path: `${parentPaths.productlist}/${val.lineItems[0].productId}`,
        },
        {
          value: localization.t('labels.status'),
          id: 'status',
        },
        {
          value: localization.t('labels.amount'),
          id: 'amount',
        },
      ],
    };
    return {
      id: val.id,
      orderDate: moment(val.createDate).format('D MMM YYYY'),
      orderId: val.id,
      product: val.lineItems[0].name,
      status: val.status,
      amount: `${val.payment.amount} ${val.currency}`,
    };
  });

  const meta = {
    totalPages: data.totalPages,
  };

  Object.assign(markUp, { values, meta, defaultOrdersShow });

  return markUp;
};

const generateEmails = (data) => {
  let markUp;
  const values = data.map((val) => {
    markUp = {
      headers: [
        {
          value: localization.t('labels.sentAt'),
          id: 'sentAt',
        },
        {
          value: localization.t('labels.type'),
          id: 'type',
        },
        {
          value: localization.t('labels.status'),
          id: 'status',
          clickable: true,
          external: true,
          path: `http://mailstorage.prepmailstorage.telechargement.fr/ui/mails/${val.emailId}`,
        },
      ],
    };
    return {
      id: val.id,
      sentAt: moment(val.createDate).format('D MMM YYYY'),
      type: val.type,
      status: 'Sent',
    };
  });

  const meta = {
    totalPages: data.totalPages,
  };

  Object.assign(markUp, { values, meta, defaultEmailsShow });

  return markUp;
};

export {
  checkRequiredFields, makeCopy, generateOrders, generateEmails,
};
