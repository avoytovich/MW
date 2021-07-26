import moment from 'moment';
import localization from '../../../localization';

const defaultShow = {
  id: false,
  customer: true,
  createDate: true,
  lastUpdate: true,
  enduserId: true,
  name: true,
  storeId: true,
};

const markUp = {
  headers: [
    { value: localization.t('labels.id'), id: 'id' },
    { value: localization.t('labels.lifecycleId'), id: 'lifecycle' },
    { value: localization.t('labels.customer'), id: 'customer' },
    { value: localization.t('labels.creationDate'), id: 'createDate' },
    { value: localization.t('labels.lastUpdate'), id: 'lastUpdate' },
    { value: localization.t('labels.enduserId'), id: 'enduserId' },
    { value: localization.t('labels.subscriptionName'), id: 'name' },
    { value: localization.t('labels.storeId'), id: 'storeId' },
  ],
};

const generateData = (data) => {
  const values = data.items.map((val) => ({
    id: val.id,
    customer: val.customerId,
    createDate: moment(val.createDate).format('D MMM YYYY'),
    lastUpdate: moment(val.updateDate).format('D MMM YYYY'),
    enduserId: val.enduserId,
    name: val.name,
    storeId: val.storeId,
  }));

  const meta = {
    totalPages: data.totalPages,
  };

  Object.assign(markUp, { values, meta });
  return markUp;
};

export { generateData, defaultShow, markUp };
