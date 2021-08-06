import localization from '../../../localization';

const defaultShow = {
  id: false,
  customer: true,
  name: true,
  format: true,
};

const markUp = {
  headers: [
    { value: localization.t('labels.id'), id: 'id' },
    { value: localization.t('labels.customer'), id: 'customer' },
    { value: localization.t('labels.name'), id: 'name', sortParam: 'name' },
    { value: localization.t('labels.format'), id: 'format' },
  ],
};

const generateData = (data, customers) => {
  const values = data.items.map((val) => {
    const customer = customers.items.filter(
      (item) => item.id === val.customerId,
    )[0]?.name;
    return ({
      id: val.id,
      customer: customer || val.customerId || '-',
      name: val.name,
      format: val.format ? val.format : '-',
    });
  });

  const meta = {
    totalPages: data.totalPages,
  };

  Object.assign(markUp, { values, meta });
  return markUp;
};

export { generateData, defaultShow, markUp };
