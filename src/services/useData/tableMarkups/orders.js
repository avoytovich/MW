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
    { value: 'Customer', id: 'customer' },
    { value: 'Email address', id: 'email' },
    { value: 'Status', id: 'status' },
    { value: 'Online store', id: 'storeId' },
    { value: 'Company name', id: 'companyName' },
    { value: 'Order ID', id: 'id' },
    { value: 'InvoiceID', id: 'invoiceId' },
    { value: 'Currency', id: 'currency' },
    { value: 'Products', id: 'products' },
    { value: 'Country', id: 'country' },
    { value: 'Payment type', id: 'paymentType' },
    { value: 'Payment status', id: 'paymentStatus' },
  ],
};

const generateData = (data, customers) => {
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
  Object.assign(markUp, { values, meta });
  return markUp;
};

export { generateData, defaultShow };
