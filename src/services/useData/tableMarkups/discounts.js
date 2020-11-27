import moment from 'moment';
import localization from '../../../localization';

const defaultShow = {
  id: false,
  customer: true,
  discountRuleName: true,
  model: true,
  status: true,
  discountAmount: true,
  startDate: true,
  endDate: true,
  maximumUses: true,
  sources: true,
};

const markUp = {
  headers: [
    { value: localization.t('labels.customer'), id: 'customer' },
    { value: localization.t('labels.discountRuleName'), id: 'discountRuleName' },
    { value: localization.t('labels.model'), id: 'model' },
    { value: localization.t('labels.status'), id: 'status' },
    { value: localization.t('labels.discountAmount'), id: 'discountAmount' },
    { value: localization.t('labels.startDate'), id: 'startDate' },
    { value: localization.t('labels.endDate'), id: 'endDate' },
    { value: localization.t('labels.maximumUses'), id: 'maximumUses' },
    { value: localization.t('labels.sources'), id: 'sources' },
  ],
};

const generateData = (data) => {
  const values = data.items.map((val) => ({
    id: val.id,
    customer: val.customerId,
    discountRuleName: val.name,
    model: val.model.replaceAll('_', ' '),
    status: val.status,
    discountAmount: val.discountRate ? `${val.discountRate * 100}%` : null,
    startDate: moment(val.startDate).format('D MMM YYYY'),
    endDate: moment(val.endDate).format('D MMM YYYY'),
    maximumUses: val.maxUsages,
    sources: val.sources ? val.sources.join(', ') : null,
  }));

  const meta = {
    totalPages: data.totalPages,
  };

  Object.assign(markUp, { values, meta });
  return markUp;
};

export { generateData, defaultShow, markUp };
