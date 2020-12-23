import moment from 'moment';
import localization from '../../../localization';

const defaultShow = {
  id: false,
  creationDate: true,
  lastUpdate: true,
  customer: true,
  ruleName: true,
  status: true,
  type: true,
  levels: true,
  sources: true,
  weight: true,
};

const markUp = {
  headers: [
    { value: localization.t('labels.creationDate'), id: 'creationDate' },
    { value: localization.t('labels.lastUpdate'), id: 'lastUpdate' },
    { value: localization.t('labels.customer'), id: 'customer' },
    { value: localization.t('labels.ruleName'), id: 'ruleName' },
    { value: localization.t('labels.status'), id: 'status' },
    { value: localization.t('labels.type'), id: 'type' },
    { value: localization.t('labels.levels'), id: 'levels' },
    { value: localization.t('labels.sources'), id: 'sources' },
    { value: localization.t('labels.weight'), id: 'weight' },
  ],
};

const generateData = (data) => {
  const values = data.items.map((val) => ({
    id: val.id,
    creationDate: moment(val.createDate).format('D MMM YYYY'),
    lastUpdate: moment(val.updateDate).format('D MMM YYYY'),
    customer: val.customerId,
    ruleName: val.name,
    status: val.status,
    type: val.type.replaceAll('_', ' '),
    levels: val.levels ? val.levels.join(', ') : null,
    sources: val.sources ? val.sources.join(', ') : null,
    weight: val.weight,
  }));

  const meta = {
    totalPages: data.totalPages,
  };

  Object.assign(markUp, { values, meta });
  return markUp;
};

export { generateData, defaultShow, markUp };
