import moment from 'moment';
import { getCustomerName } from '../../helpers/customersHelper';
import localization from '../../../localization';

const defaultShow = {
  id: true,
  customer: true,
  name: true,
  type: true,
  salesMode: true,
  singleUse: true,
  running: true,
  status: true,
  creationDate: true,
  lastUpdate: true,
};

const markUp = {
  headers: [
    { value: localization.t('labels.catalogsId'), id: 'id' },
    { value: localization.t('labels.customer'), id: 'customer' },
    {
      value: localization.t('labels.name'),
      id: 'name',
      sortParam: 'name',
    },
    {
      value: localization.t('labels.type'),
      id: 'type',
      sortParam: 'type',
    },
    {
      value: localization.t('labels.salesMode'),
      id: 'salesMode',
      sortParam: 'salesMode',
    },
    {
      value: localization.t('labels.singleUse'),
      id: 'singleUse',
      sortParam: 'singleUse',
    },
    {
      value: localization.t('labels.running'),
      id: 'running',
      sortParam: 'running',
    },
    {
      value: localization.t('labels.status'),
      id: 'status',
      sortParam: 'status',
    },
    {
      value: localization.t('labels.creationDate'),
      id: 'creationDate',
      sortParam: 'createDate',
    },
    {
      value: localization.t('labels.lastUpdate'),
      id: 'lastUpdate',
      sortParam: 'updateDate',
    },
  ],
};

const generateData = (data) => {
  const values = data.items.map(async (val) => {
    const returnData = {
      id: val.id,
      customer: val.customerId,
      name: val.name,
      type: val.type,
      salesMode: val.salesMode,
      singleUse: val.singleUse,
      running: val.running,
      status: val.status,
      creationDate: moment(val.createDate).format('D MMM YYYY'),
      lastUpdate: moment(val.updateDate).format('D MMM YYYY'),
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
