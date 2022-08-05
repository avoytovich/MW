import moment from 'moment';
import { getCustomerName, getCustomerNameSync } from '../../helpers/customersHelper';
import localization from '../../../localization';

const defaultShow = {
  id: false,
  lifecycleId: true,
  customer: true,
  createDate: true,
  updateDate: true,
  enduserId: true,
  name: true,
  storeId: true,
};

const markUp = {
  headers: [
    { value: localization.t('labels.id'), id: 'id' },
    { value: localization.t('labels.lifecycleId'), id: 'lifecycleId' },
    { value: localization.t('labels.customer'), id: 'customer' },
    { value: localization.t('labels.creationDate'), id: 'createDate', sortParam: 'createDate' },
    { value: localization.t('labels.lastUpdate'), id: 'updateDate', sortParam: 'updateDate' },
    { value: localization.t('labels.enduserId'), id: 'enduserId' },
    { value: localization.t('labels.subscriptionName'), id: 'name' },
    { value: localization.t('labels.storeId'), id: 'storeId' },
  ],
};

const generateData = (data) => {
  const usedCustomers = [];

  const values = data.items.map(async (val) => {
    const returnData = {
      id: val.id,
      lifecycleId: val.lifecycle?.id || '',
      customer: val.customerId,
      createDate: moment(val.createDate).format('D MMM YYYY'),
      updateDate: moment(val.updateDate).format('D MMM YYYY'),
      enduserId: val.enduserId,
      name: val.name,
      storeId: val.storeId,
    };

    if (val?.customerId && usedCustomers.indexOf(val.customerId) < 0) {
      usedCustomers.push(val.customerId);
    }

    return returnData;
  });

  const meta = {
    totalPages: data.totalPages,
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
