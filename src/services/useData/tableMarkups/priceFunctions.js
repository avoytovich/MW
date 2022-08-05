import moment from 'moment';
import { getCustomerName, getCustomerNameSync } from '../../helpers/customersHelper';
import localization from '../../../localization';

const defaultShow = {
  id: false,
  customerId: true,
  createDate: true,
  updateDate: true,
  name: true,
};

const markUp = {
  headers: [
    { value: localization.t('labels.priceFunctionId'), id: 'id' },
    { value: localization.t('labels.customer'), id: 'customerId' },
    { value: localization.t('labels.createDate'), id: 'createDate', sortParam: 'createDate' },
    { value: localization.t('labels.updateDate'), id: 'updateDate', sortParam: 'updateDate' },
    { value: localization.t('labels.priceFunctionName'), id: 'name', sortParam: 'name' },
  ],
};

const generateData = (data) => {
  const usedCustomers = [];

  const values = data.items.map(async (val) => {
    const returnData = {
      id: val.id,
      customerId: val.customerId,
      createDate: moment(val.createDate).format('D MMM YYYY'),
      updateDate: val.updateDate ? moment(val.updateDate).format('D MMM YYYY') : '-',
      name: val.name,
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
            const name = getCustomerNameSync(r.customerId);

            return { ...r, customerId: name };
          }),
          meta,
        }));

      return markUp;
    });
};

export { generateData, defaultShow, markUp };
