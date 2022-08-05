import moment from 'moment';
import { getCustomerName, getCustomerNameSync } from '../../helpers/customersHelper';
import localization from '../../../localization';

const defaultShow = {
  campaignId: true,
  createDate: true,
  lastUpdate: true,
  customer: true,
  name: true,
  type: true,
  status: true,
  startDate: true,
  endDate: true,
};

const markUp = {
  headers: [
    { value: localization.t('labels.campaignId'), id: 'campaignId' },
    {
      value: localization.t('labels.createDate'),
      id: 'createDate',
      sortParam: 'createDate',
    },
    {
      value: localization.t('labels.lastUpdate'),
      id: 'lastUpdate',
      sortParam: 'updateDate',
    },
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
      value: localization.t('labels.status'),
      id: 'status',
      sortParam: 'status',
    },
    {
      value: localization.t('labels.startDate'),
      id: 'startDate',
      sortParam: 'startDate',
    },
    {
      value: localization.t('labels.endDate'),
      id: 'endDate',
      sortParam: 'endDate',
    },
  ],
};

const generateData = (data) => {
  const usedCustomers = [];

  const values = data.items.map(async (val) => {
    const returnData = {
      id: val?.id,
      campaignId: val?.id,
      createDate: moment(val?.createDate).format('D MMM YYYY'),
      lastUpdate: moment(val?.updateDate).format('D MMM YYYY'),
      customer: val?.customerId,
      name: val?.name,
      type: val?.type,
      status: val?.status === 'Active',
      startDate: moment(val?.startDate).format('D MMM YYYY'),
      endDate: moment(val?.endDate).format('D MMM YYYY'),
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
