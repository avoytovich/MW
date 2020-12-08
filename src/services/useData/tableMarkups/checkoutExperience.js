import localization from '../../../localization';

const defaultShow = {
  id: false,
  name: true,
  customer: true,
  createDate: true,
  updateDate: true,
};

const markUp = {
  headers: [
    { value: localization.t('labels.id'), id: 'id' },
    { value: localization.t('labels.name'), id: 'name' },
    { value: localization.t('labels.customer'), id: 'customer' },
    { value: localization.t('labels.lastUpdate'), id: 'updateDate' },
    { value: localization.t('labels.creationDate'), id: 'createDate' },
  ],
};

const generateData = (data, customers) => {
  let customer;
  const values = data.items.map((val) => {
    customer = val.customerId === 'Nexway'
      ? val.customerId
      : customers.find((item) => item.id === val.customerId)?.name;

    return {
      id: val.id,
      name: val.name,
      customer: customer || '',
      updateDate: val.updateDate,
      createDate: val.createDate,
    };
  });

  const meta = {
    totalPages: data.totalPages,
  };

  Object.assign(markUp, { values, meta, defaultShow });

  return markUp;
};

export { generateData, defaultShow, markUp };
