import moment from 'moment';
import localization from '../../../localization';

const defaultShow = {
  id: false,
  customer: true,
  creationDate: true,
  lastUpdate: true,
  name: true,
  startDate: true,
  endDate: true,
  status: true,
};

const markUp = {
  headers: [
    { value: localization.t('labels.id'), id: 'id' },
    { value: localization.t('labels.customer'), id: 'customer' },
    { value: localization.t('labels.creationDate'), id: 'creationDate' },
    { value: localization.t('labels.lastUpdate'), id: 'lastUpdate' },
    { value: localization.t('labels.name'), id: 'name' },
    { value: localization.t('labels.startDate'), id: 'startDate' },
    { value: localization.t('labels.endDate'), id: 'endDate' },
    { value: localization.t('labels.status'), id: 'status' },
  ],
};

const generateData = (data) => {
  const values = data.items.map((val) => ({
    id: val.id,
    customer: val.customerId,
    creationDate: moment(val.createDate).format('D MMM YYYY'),
    lastUpdate: moment(val.updateDate).format('D MMM YYYY'),
    name: val.name,
    startDate: moment(val.startDate).format('D MMM YYYY'),
    endDate: moment(val.endDate).format('D MMM YYYY'),
    status: val.status,
  }));

  const meta = {
    totalPages: data.totalPages,
  };

  Object.assign(markUp, { values, meta });
  return markUp;
};

export { generateData, defaultShow, markUp };
