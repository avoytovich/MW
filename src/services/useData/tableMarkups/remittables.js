import localization from '../../../localization';
import { getCustomerName } from '../../helpers/customersHelper';

const defaultShow = {
  id: false,
  customer: true,
  remittableId: true,
  accountStatus: true,
  name: true,
  createDate: true,
  updateDate: true,
};

const markUp = {
  headers: [
    { value: localization.t('labels.id'), id: 'id' },
    { value: localization.t('labels.customer'), id: 'customer' },
    { value: localization.t('labels.remittableId'), id: 'remittableId' },
    {
      value: localization.t('labels.accountStatus'),
      id: 'accountStatus',
      sortParam: 'status',
    },
    {
      value: localization.t('labels.name'),
      id: 'name',
      sortParam: 'name',
    },
    {
      value: localization.t('labels.creationDate'),
      id: 'createDate',
      sortParam: 'createDate',
    },
    {
      value: localization.t('labels.lastUpdate'),
      id: 'updateDate',
      sortParam: 'updateDate',
    },
  ],
};

const generateData = (data) => {
  const values = data.items.map(async (val) => {
    const returnData = {
      id: val.id,
      remittableId: val.id,
      accountStatus: val.status,
      name: val.name,
      createDate: val.createDate,
      updateDate: val.updateDate,
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
