import moment from 'moment';
import { getCustomerName } from '../../helpers/customersHelper';
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
  const values = data.items.map(async (val) => {
    const returnData = {
      id: val.id,
      customerId: val.customerId,
      createDate: moment(val.createDate).format('D MMM YYYY'),
      updateDate: val.updateDate ? moment(val.updateDate).format('D MMM YYYY') : '-',
      name: val.name,
    };

    if (val.customerId) {
      const name = await getCustomerName(val.customerId);
      return { ...returnData, customerId: name };
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
