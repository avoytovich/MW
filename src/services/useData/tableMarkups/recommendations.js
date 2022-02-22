import moment from 'moment';
import { getCustomerName } from '../../helpers/customersHelper';
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
    { value: localization.t('labels.creationDate'), id: 'creationDate', sortParam: 'creationDate' },
    { value: localization.t('labels.lastUpdate'), id: 'lastUpdate', sortParam: 'lastUpdate' },
    { value: localization.t('labels.customer'), id: 'customer' },
    { value: localization.t('labels.ruleName'), id: 'ruleName', sortParam: 'name' },
    { value: localization.t('labels.status'), id: 'status', sortParam: 'status' },
    { value: localization.t('labels.type'), id: 'type', sortParam: 'type' },
    { value: localization.t('labels.levels'), id: 'levels' },
    { value: localization.t('labels.sources'), id: 'sources' },
    { value: localization.t('labels.weight'), id: 'weight', sortParam: 'weight' },
  ],
};

const generateData = (data) => {
  const values = data.items.map(async (val) => {
    const returnData = {
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
    };

    if (val.customerId) {
      const name = await getCustomerName(val.customerId);
      return { ...returnData, customer: name };
    }

    return returnData;
  });

  const meta = {
    totalPages: data.totalPages,
  };

  return Promise
    .all(values)
    .then((resp) => {
      Object.assign(markUp, { values: resp, meta });

      return markUp;
    });
};

export { generateData, defaultShow, markUp };
