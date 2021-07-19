import moment from 'moment';
import localization from '../../../localization';

const defaultShow = {
  id: true,
  customer: true,
  processingDate: true,
  notificationHistoryId: true,
  notHisStatus: true,
  event: true,
  receiverEmail: true,
  receiverUrl: true,
  webhookSuccessResponse: true,
};

const markUp = {
  headers: [
    { value: localization.t('labels.notificationsHistory.customer'), id: 'customer' },
    {
      value: localization.t('labels.notificationsHistory.processingDate'),
      id: 'processingDate',
      sortParam: 'processingDate',
    },
    {
      value: localization.t('labels.notificationsHistory.notificationHistoryId'),
      id: 'notificationHistoryId',
    },
    {
      value: localization.t('labels.notificationsHistory.status'),
      id: 'notHisStatus',
      sortParam: 'status',
    },
    {
      value: localization.t('labels.notificationsHistory.event'),
      id: 'event',
    },
    {
      value: localization.t('labels.notificationsHistory.receiverEmail'),
      id: 'receiverEmail',
      sortParam: 'emails',
    },
    {
      value: localization.t('labels.notificationsHistory.receiverURL'),
      id: 'receiverUrl',
      sortParam: 'url',
    },
    {
      value: localization.t('labels.notificationsHistory.webhookSuccessResponse'),
      id: 'webhookSuccessResponse',
      sortParam: 'webHookResponse',
    },
  ],
};

const generateData = (data, customers) => {
  let customer;
  const values = data.items.map((val) => {
    customer = val.customerId === 'Nexway'
      ? val.customerId
      : customers.find((item) => item.id === val.customerId)?.name;

    return {
      id: val.id,
      customer: customer || 'GNR Management',
      processingDate: moment(val.processingDate).format('D MMM YYYY') || '',
      notificationHistoryId: '',
      notHisStatus: val.status || '',
      event: val.eventFact || '',
      receiverEmail: val.emails || '',
      receiverUrl: val.url || '',
      webhookSuccessResponse: val.webHookResponse || '',
    };
  });

  const meta = {
    totalPages: data.totalPages,
  };

  Object.assign(markUp, { values, meta, defaultShow });

  return markUp;
};

export { generateData, defaultShow, markUp };
