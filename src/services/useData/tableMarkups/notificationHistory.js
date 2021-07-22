import moment from 'moment';
import localization from '../../../localization';

const defaultShow = {
  customer: true,
  processingDate: true,
  status: true,
  processedEvent: true,
  receiverEmail: true,
  receiverUrl: true,
  webHook: true,
};

const markUp = {
  headers: [
    { value: localization.t('labels.customer'), id: 'customer', sortParam: null },
    {
      value: localization.t('labels.processingDate'),
      id: 'processingDate',
      sortParam: 'processingDate',
    },
    { value: localization.t('labels.status'), id: 'status', sortParam: 'status' },
    {
      value: localization.t('labels.processedEvent'),
      id: 'processedEvent',
      sortParam: null,
    },
    {
      value: localization.t('labels.receiverEmail'),
      id: 'receiverEmail',
      sortParam: 'emails',
    },
    { value: localization.t('labels.receiverUrl'), id: 'receiverUrl', sortParam: 'url' },
    { value: localization.t('labels.webHook'), id: 'webHook', sortParam: null },
  ],
};

const generateData = (data) => {
  const values = data.items.map((val) => ({
    customer: val.customerName,
    processingDate: moment(val.processingDate).format('D MMM YYYY'),
    status: val.status,
    processedEvent: val.eventName,
    receiverEmail: val.emails,
    receiverUrl: val.url,
    webHook: val.webHookResponse,
  }));

  const meta = {
    totalPages: data.totalPages,
  };

  Object.assign(markUp, { values, meta });
  return markUp;
};

export { generateData, defaultShow, markUp };
