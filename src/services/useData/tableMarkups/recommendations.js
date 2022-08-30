import moment from 'moment';
import { getCustomerName, getCustomerNameSync } from '../../helpers/customersHelper';
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
    { value: localization.t('labels.ruleId'), id: 'id' },
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
  const usedCustomers = [];

  const values = data.items.map(async (val) => {
    const returnData = {
      id: val.id,
      creationDate: moment(val.createDate).format('D MMM YYYY'),
      lastUpdate: moment(val.updateDate).format('D MMM YYYY'),
      customer: val.customerId,
      ruleName: val.name,
      name: val.name,
      status: val.status,
      type: val.type.replaceAll('_', ' '),
      levels: val.levels ? val.levels.join(', ') : null,
      sources: val.sources ? val.sources.join(', ') : null,
      weight: val.weight,
    };

    if (val?.customerId && usedCustomers.indexOf(val.customerId) < 0) {
      usedCustomers.push(val.customerId);
    }

    return returnData;
  });

  const meta = {
    totalPages: data.totalPages,
    totalItems: data.totalItems,
  };

  return Promise
    .all(values)
    .then(async (resp) => {
      const promises = usedCustomers.map((c) => getCustomerName(c));

      await Promise
        .all(promises)
        .finally(() => Object.assign(markUp, {
          values: resp.map((r) => {
            const name = getCustomerNameSync(r.customer);

            return { ...r, customer: name };
          }),
          meta,
        }));

      return markUp;
    });
};

export { generateData, defaultShow, markUp };
