import { getCustomerName, getCustomerNameSync } from '../../helpers/customersHelper';
import localization from '../../../localization';

const defaultShow = {
  customer: true,
  id: true,
  name: true,
  createDate: true,
  updateDate: true,
  status: true,
  dataBegining: true,
};

const markUp = {
  headers: [
    {
      value: localization.t('labels.customer'),
      id: 'customer',
    },
    {
      value: localization.t('labels.id'),
      id: 'id',
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
      value: localization.t('labels.updateDate'),
      id: 'updateDate',
      sortParam: 'updateDate',
    },
    {
      value: localization.t('labels.status'),
      id: 'status',
      sortParam: 'status',
    },
    {
      value: localization.t('labels.dataBegining'),
      id: 'dataBegining',
    },
  ],
};

const generateData = (data) => {
  const usedCustomers = [];

  const values = data.items.map(async (val) => {
    const returnData = {
      customer: '-',
      id: val.id || '-',
      name: val.name || '-',
      createDate: val.createDate,
      updateDate: val.updateDate,
      status: val.status || '-',
      dataBegining: JSON.stringify(val).slice(0, 70),
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
