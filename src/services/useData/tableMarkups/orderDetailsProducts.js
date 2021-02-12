// ToDo - add localization
const defaultShow = {
  id: false,
  publisherRefId: true,
  quantity: true,
  priceFunction: true,
  name: true,
  // activationCode: true,
  // subscription: true,
  discount: true,
  netPrice: true,
  grossPrice: true,
  vatAmount: true,
  // discountedNet: true,
  // discountedGross: true,
  // discountedVat: true,
};

const markUp = {
  headers: [
    { value: 'Publisher Ref ID', id: 'publisherRefId' },
    { value: 'Quantity', id: 'quantity' },
    { value: 'Price Function', id: 'priceFunction' },
    { value: 'Name', id: 'name' },
    // { value: 'Activation Code/Key', id: 'activationCode' },
    // { value: 'Subscription', id: 'subscription' },
    { value: 'Discount', id: 'discount' },
    { value: 'Net', id: 'netPrice' },
    { value: 'Gross', id: 'grossPrice' },
    { value: 'VAT', id: 'vatAmount' },
    // { value: 'Discounted Net', id: 'discountedNet' },
    // { value: 'Discounted Gross', id: 'discountedGross' },
    // { value: 'Discounted VAT', id: 'discountedVat' },
  ],
};

const generateData = (data) => {
  const values = data.map((val) => ({
    id: val.id,
    publisherRefId: val.publisherRefId,
    quantity: 1,
    priceFunction: '-',
    name: `${val.name} - ${val.lifeTime}`,
    activationCode: '-',
    subscription: val.subscriptionId,
    discount: '-',
    netPrice: `${val?.price?.netPrice || 0} ${val?.price?.currency || 'USD'}`,
    grossPrice: `${val?.price?.grossPrice || 0} ${val?.price?.currency || 'USD'}`,
    vatAmount: `${val?.price?.vatAmount || 0} ${val?.price?.currency || 'USD'}`,
    discountedNet: '-',
    discountedGross: '-',
    discountedVat: '-',
    processingError: val.processingStatus === 'FAILURE',
  }));

  const meta = {
    totalPages: data.totalPages,
  };

  Object.assign(markUp, { values, meta });
  return markUp;
};

export { generateData, defaultShow, markUp };
