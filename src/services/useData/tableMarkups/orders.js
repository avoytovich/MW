const defaultShow = {
  firstName: true,
  email: true,
  status: true,
  // phone: true,
  // onlineStore:true,
  // companyName:true,
  id: true,
  invoiceId: true,
  netPrice: true,
  grossPrice: true,
  vatAmount: true,
  currency: true,
  // splitPayment:true,
  productFamily: true,
  paymentTypeId: true,
  invoiceDate: true,
  country: true,
  informativeDPStatus: true,
  subscriptionProcessingStatus: true,
};

const markUp = {
  headers: [
    { value: 'Customer', id: 'firstName' },
    { value: 'Email address', id: 'email' },
    { value: 'Status', id: 'status' },
    // { value: 'Phone', id:: '' },
    // { value: 'Online store', id:: '' },
    // { value: 'Company name', id:: '' }, //(if any)
    { value: 'Order ID', id: 'id' },
    { value: 'InvoiceID', id: 'invoiceId' },
    { value: 'Net price', id: 'netPrice' },
    { value: 'Gross price', id: 'grossPrice' },
    { value: 'Vat amount', id: 'vatAmount' },
    { value: 'Currency', id: 'currency' },
    // { value: 'Split Payment', id:: '' }, //(if any)
    { value: 'Products', id: 'productFamily' },
    { value: 'Payment type', id: 'paymentTypeId' },
    { value: 'Invoice Date', id: 'invoiceDate' },
    { value: 'Country', id: 'country' },
    { value: 'Payment status', id: 'informativeDPStatus' },
    { value: 'Subscription Status', id: 'subscriptionProcessingStatus' },
    // { value: 'Cancellation Reasons', id:: '' },
  ],
};

const generateData = (data) => {
  const values = data.items.map((val) => ({
    firstName: val.endUser?.firstName,
    email: val.endUser?.email,
    status: val.status,
    // phone: val.,
    // onlineStore:val.
    // companyName:val.
    id: val.id,
    invoiceId: val.invoice?.id,
    netPrice: val.fullTotalAmount?.netPrice,
    grossPrice: val.fullTotalAmount?.grossPrice,
    vatAmount: val.fullTotalAmount?.vatAmount,
    currency: val.currency,
    // splitPayment: val.,
    productFamily: val.productFamily,
    paymentTypeId: val.payment?.paymentTypeId,
    invoiceDate: val.invoice?.date,
    country: val.endUser?.country,
    informativeDPStatus: val.payment?.informativeDPStatus,
    subscriptionProcessingStatus: val.subscriptionProcessingStatus,
  }));

  const meta = {
    totalPages: data.totalPages,
  };
  Object.assign(markUp, { values, meta });
  return markUp;
};

export { generateData, defaultShow };
