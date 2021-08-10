import moment from 'moment';
import api from '../../../api';
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
    { value: localization.t('labels.webHook'), id: 'webHook', sortParam: 'webHookResponse' },
  ],
};

const generateData = async (data, customers, selectedCustomer) => {
  if (selectedCustomer.name) {
    const arrNotificationHistoryDefinitionIds = data.items.map(
      (item) => (item.notificationDefinitionId),
    );
    const strNotificationHistoryDefinitionIds = arrNotificationHistoryDefinitionIds.map((item) => `id=${item}`).join('&');
    const resNotificationDefinitionByIds = await api.getNotificationDefinitionByIds(
      strNotificationHistoryDefinitionIds,
    );
    data.items.map(
      (item) => resNotificationDefinitionByIds.data.items.map(
        (each) => {
          if (each.id === item.notificationDefinitionId) {
            Object.assign(item, { customerName: selectedCustomer.name, eventName: each.name });
          }
        },
      ),
    );
  } else {
    const arrNotificationHistoryDefinitionIds = data.items.map(
      (item) => (item.notificationDefinitionId),
    );
    const strNotificationHistoryDefinitionIds = arrNotificationHistoryDefinitionIds.map((item) => `id=${item}`).join('&');
    const resNotificationDefinitionByIds = await api.getNotificationDefinitionByIds(
      strNotificationHistoryDefinitionIds,
    );
    data.items.map(
      (item) => resNotificationDefinitionByIds.data.items.map(
        (each) => {
          if (each.id === item.notificationDefinitionId) {
            Object.assign(item, { eventName: each.name });
          }
        },
      ),
    );
    const arrNotificationHistoryСustomerIds = data.items.map(
      (item) => (item.customerId),
    );
    const strNotificationHistoryСustomerIds = arrNotificationHistoryСustomerIds.map((item) => `id=${item}`).join('&');
    const resCustomersByIds = await api.getCustomersByIds(strNotificationHistoryСustomerIds);
    data.items.map((item) => resCustomersByIds.data.items.map((each) => {
      if (each.id === item.customerId) {
        Object.assign(item, { customerName: each.name });
      }
    }));
  }

  const values = data.items.map((val) => ({
    id: val.id,
    customer: val.customerName,
    processingDate: moment(val.processingDate).format('D MMM YYYY'),
    status: val.status === 'InProgress' ? localization.t('labels.inProgress') : val.status,
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
