import localization from '../../../localization';

const defaultShow = {
  id: false,
  customer: true,
  name: true,
  createDate: true,
  updateDate: false,
  defaultLocale: true,
  salesLanguages: false,
  status: true,
  checkoutTheme: true,
  checkoutLayout: true,
  gtmId: false,
};

const markUp = {
  headers: [
    { value: localization.t('labels.storeId'), id: 'id' },
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
    { value: localization.t('labels.salesLanguages'), id: 'salesLanguages' },
    {
      value: localization.t('labels.status'),
      id: 'status',
      sortParam: 'status',
    },
    { value: localization.t('labels.checkoutTheme'), id: 'checkoutTheme' },
    { value: localization.t('labels.checkoutLayout'), id: 'checkoutLayout' },
    { value: localization.t('labels.gtmId'), id: 'gtmId' },
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
      salesLanguages: val?.saleLocales?.length ? val.saleLocales.join(', ') : '-',
      checkoutTheme: val?.designs?.checkout?.theme || '-',
      checkoutLayout: val?.designs?.checkout?.layout || '-',
      status: val.status,
      gtmId: val.gtmId,
      id: val.id,
    };
  });

  const meta = {
    totalPages: data.totalPages,
    totalItems: data.totalItems,
  };

  Object.assign(markUp, { values, meta });
  return markUp;
};

export { generateData, defaultShow, markUp };
