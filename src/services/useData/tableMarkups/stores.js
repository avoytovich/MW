import localization from '../../../localization';

const defaultShow = {
  customer: true,
  name: true,
  createDate: true,
  updateDate: true,
  defaultLocale: true,
  status: true,
  gtmId: true,
  id: true,
};

const markUp = {
  headers: [
    { value: localization.t('labels.customer'), id: 'customer' },
    { value: localization.t('labels.name'), id: 'name' },
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
    { value: localization.t('labels.defaultLanguage'), id: 'defaultLocale' },
    {
      value: localization.t('labels.status'),
      id: 'status',
      sortParam: 'status',
    },
    { value: localization.t('labels.gtmId'), id: 'gtmId' },
    { value: localization.t('labels.storeId'), id: 'id' },
  ],
};

const generateData = (data, customers) => {
  const values = data.items.map((val) => {
    // todo: remake using common service
    const customer = customers.items.filter(
      (item) => item.id === val.customerId,
    )[0]?.name;

    return {
      customer,
      name: val.name,
      createDate: val.createDate,
      updateDate: val.updateDate,
      defaultLocale: val.defaultLocale,
      status: val.status,
      gtmId: val.gtmId,
      id: val.id,
    };
  });

  const meta = {
    totalPages: data.totalPages,
  };

  Object.assign(markUp, { values, meta });
  return markUp;
};

export { generateData, defaultShow, markUp };
