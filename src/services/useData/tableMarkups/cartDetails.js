import localization from '../../../localization';

const defaultShow = {
  id: false,
  publisherRefId: true,
  quantity: true,
  name: true,
  discount: true,
  netPrice: true,
  grossPrice: true,
  vatAmount: true,
  discountedNetPrice: true,
  discountedGrossPrice: true,
  vatDiscountAmount: true,
};

const markUp = {
  headers: [
    { value: localization.t('forms.inputs.publisherRefId'), id: 'publisherRefId' },
    { value: localization.t('labels.quantity'), id: 'quantity' },
    { value: localization.t('labels.name'), id: 'name' },
    { value: localization.t('general.discount'), id: 'discount' },
    { value: localization.t('labels.net'), id: 'netPrice' },
    { value: localization.t('labels.gross'), id: 'grossPrice' },
    { value: localization.t('labels.vat'), id: 'vatAmount' },
    { value: localization.t('labels.discountedNetPrice'), id: 'discountedNetPrice' },
    { value: localization.t('labels.discountedGrossPrice'), id: 'discountedGrossPrice' },
    { value: localization.t('labels.vatDiscountAmount'), id: 'vatDiscountAmount' },
  ],
};

const generateData = (data) => {
  const values = data.map((val) => ({
    id: val.id,
    publisherRefId: val.publisherRefId,
    quantity: val.quantity,
    name: val.name,
    discount: '-',
    netPrice: `${val?.price?.netPrice || 0} ${val?.price?.currency || 'USD'}`,
    grossPrice: `${val?.price?.grossPrice || 0} ${val?.price?.currency || 'USD'}`,
    vatAmount: `${val?.price?.vatAmount || 0} ${val?.price?.currency || 'USD'}`,
    discountedNet: '-',
    discountedGross: '-',
    discountedVat: '-',
  }));

  const meta = {
    totalPages: data.totalPages || 1,
  };

  Object.assign(markUp, { values, meta });
  return markUp;
};

export { generateData, defaultShow, markUp };
