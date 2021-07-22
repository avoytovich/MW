import localization from '../../../localization';

const defaultShow = {
  customer: true,
  email: true,
  status: true,
  store: true,
  id: false,
  invoiceId: true,
  currency: true,
  products: true,
  country: true,
  paymentType: true,
  paymentStatus: true,
};

const markUp = {
  headers: [
    { value: localization.t('labels.id'), id: 'id' },
    { value: localization.t('labels.customer'), id: 'customer' },
    {
      value: localization.t('labels.email'),
      id: 'email',
      sortParam: 'endUser.email',
    },
    {
      value: localization.t('labels.status'),
      id: 'status',
      sortParam: 'status',
    },
    {
      value: localization.t('labels.onlineStore'),
      id: 'store',
      sortParam: 'store.name',
    },
    { value: localization.t('labels.orderID'), id: 'id' },
    {
      value: localization.t('labels.invoiceId'),
      id: 'invoiceId',
      sortParam: 'invoice.id',
    },
    {
      value: localization.t('labels.currency'),
      id: 'currency',
      sortParam: 'currency',
    },
    { value: localization.t('labels.products'), id: 'products' },
    {
      value: localization.t('labels.country'),
      id: 'country',
      sortParam: 'endUser.country',
    },
    { value: localization.t('labels.paymentType'), id: 'paymentType' },
    {
      value: localization.t('labels.paymentStatus'),
      id: 'paymentStatus',
      sortParam: 'paymentStatus',
    },
  ],
};

const generateData = (data, customers, stores) => {
  const values = data.items.map((val) => {
    const customer = customers.items.filter(
      (item) => item.id === val.customer?.id,
    )[0]?.name;
    const store = stores.items.filter(
      (item) => item.id === val.endUser?.storeId,
    )[0]?.name;

    return {
      customer,
      email: val.endUser?.email,
      status: val.status,
      store,
      id: val.id,
      invoiceId: val.invoice?.id,
      currency: val.lineItems[0]?.currency,
      products: val.lineItems[0]?.name,
      country: val.endUser?.country,
      paymentType: val.payments && val.payments[0]?.methodType,
      paymentStatus: val.payments && val.payments[0]?.status,
    };
  });

  const meta = {
    totalPages: data.totalPages,
  };
  Object.assign(markUp, { values, meta });
  return markUp;
};

export { generateData, defaultShow, markUp };
