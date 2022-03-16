import localization from '../../../localization';

const defaultShow = {
  id: false,
  name: true,
  customer: true,
  aggregatedRoles: true,
  createDate: true,
  updateDate: true,
  description: true,
};

const markUp = {
  headers: [
    { value: localization.t('labels.id'), id: 'id' },

    { value: localization.t('labels.name'), id: 'name', sortParam: 'name' },
    {
      value: localization.t('labels.customer'),
      id: 'customer',
    },
    {
      value: localization.t('labels.aggregatedRoles'),
      id: 'aggregatedRoles',
    },
    {
      value: localization.t('labels.createDate'),
      id: 'createDate',
      sortParam: 'createDate',
    },
    {
      value: localization.t('labels.lastUpdate'),
      id: 'updateDate',
      sortParam: 'updateDate',
    },
    {
      value: localization.t('labels.description'),
      id: 'description',
      sortParam: 'description',
    },
  ],
};

const generateData = (data, customers) => {
  let customer;
  const values = data.items.map((val) => {
    // todo: remake using common service
    customer = val.customerId === 'Nexway' ? val.customerId : customers.find((item) => item.id === val.customerId)?.name;

    return {
      id: val.id,
      name: val.name,
      customer: customer || '',
      aggregatedRoles: val.roleIds?.length || 0,
      createDate: val.createDate,
      updateDate: val.updateDate,
      description: val.description || '',
    };
  });
  const meta = {
    totalPages: data.totalPages,
  };

  Object.assign(markUp, { values, meta, defaultShow });
  return markUp;
};
export { generateData, defaultShow, markUp };
