import moment from 'moment';
import { getCustomerName } from '../../helpers/customersHelper';
import localization from '../../../localization';

const defaultShow = {
  id: false,
  lifecycleId: true,
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
    { value: localization.t('labels.lifecycleId'), id: 'lifecycleId' },
    { value: localization.t('labels.customer'), id: 'customer' },
    { value: localization.t('labels.creationDate'), id: 'createDate' },
    { value: localization.t('labels.lastUpdate'), id: 'lastUpdate' },
    { value: localization.t('labels.enduserId'), id: 'enduserId' },
    { value: localization.t('labels.subscriptionName'), id: 'name' },
    { value: localization.t('labels.storeId'), id: 'storeId' },
  ],
};

const generateData = (data) => {
  const values = data.items.map(async (val) => {
    const returnData = {
      id: val.id,
      lifecycleId: val.lifecycle?.id || '',
      customer: val.customerId,
      createDate: moment(val.createDate).format('D MMM YYYY'),
      lastUpdate: moment(val.updateDate).format('D MMM YYYY'),
      enduserId: val.enduserId,
      name: val.name,
      storeId: val.storeId,
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
