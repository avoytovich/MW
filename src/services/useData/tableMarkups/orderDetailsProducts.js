import localization from '../../../localization';

const defaultShow = {
  id: false,
  publisherRefId: true,
  quantity: true,
  priceFunction: true,
  name: true,
  activationCode: true,
  discount: true,
  netPrice: true,
  grossPrice: true,
  vatAmount: true,
};

const markUp = {
  headers: [
    { value: localization.t('forms.inputs.publisherRefId'), id: 'publisherRefId' },
    { value: localization.t('labels.quantity'), id: 'quantity' },
    { value: localization.t('forms.inputs.priceFunction'), id: 'priceFunction' },
    { value: localization.t('labels.name'), id: 'name' },
    { value: localization.t('labels.activationCodeKey'), id: 'activationCode' },
    { value: localization.t('general.discount'), id: 'discount' },
    { value: localization.t('labels.net'), id: 'netPrice' },
    { value: localization.t('labels.gross'), id: 'grossPrice' },
    { value: localization.t('labels.vat'), id: 'vatAmount' },
  ],
};

const generateData = (data) => {
  const values = data.map((val) => ({
    id: val.id,
    publisherRefId: val.publisherRefId,
    quantity: 1,
    priceFunction: '-',
    name: `${val.name} - ${val.lifeTime}`,
    activationCode: val.activationCode || '-',
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
