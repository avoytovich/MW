import localization from '../../../localization';

const defaultShow = {
  customer: true,
  email: true,
  status: true,
  storeId: true,
  companyName: true,
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
    { value: localization.t('labels.customer'), id: 'customer' },
    { value: localization.t('labels.email'), id: 'email' },
    { value: localization.t('labels.status'), id: 'status' },
    { value: localization.t('labels.onlineStore'), id: 'storeId' },
    { value: localization.t('labels.companyName'), id: 'companyName' },
    { value: localization.t('labels.orderID'), id: 'id' },
    { value: localization.t('labels.invoiceID'), id: 'invoiceId' },
    { value: localization.t('labels.currency'), id: 'currency' },
    { value: localization.t('labels.products'), id: 'products' },
    { value: localization.t('labels.country'), id: 'country' },
    { value: localization.t('labels.paymentType'), id: 'paymentType' },
    { value: localization.t('labels.paymentStatus'), id: 'paymentStatus' },
  ],
};

const orders = (data, customers) => {
  const values = data.items.map((val) => {
    const customer = customers.items.filter(
      (item) => item.id === val.customer.id,
    )[0]?.name;
    return {
      customer,
      email: val.endUser?.email,
      status: val.status,
      storeId: val.endUser?.storeId,
      companyName: val.customer?.id,
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
  Object.assign(markUp, { values, meta, defaultShow });
  return markUp;
};

export default orders;
