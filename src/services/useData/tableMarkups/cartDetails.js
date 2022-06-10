import api from '../../../api';
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
  const values = data.map(async (val) => {
    const returnData = {
      id: val.id,
      publisherRefId: val.publisherRefId,
      quantity: val.quantity,
      name: val.name,
      discount: '-',
      netPrice: `${val?.price?.netPrice || 0} ${val?.price?.currency || 'USD'}`,
      grossPrice: `${val?.price?.grossPrice || 0} ${val?.price?.currency || 'USD'}`,
      vatAmount: `${val?.price?.vatAmount || 0} ${val?.price?.currency || 'USD'}`,
      discountedNetPrice: '-',
      discountedGrossPrice: '-',
      vatDiscountAmount: '-',
    };

    const discountId = val?.price?.discountedPrice.discountId;
    if (discountId) {
      const discountName = await api.getDiscountById(discountId).then(({ data: data_ }) => data_?.name || '-');

      return {
        ...returnData,
        discount: discountName,
        discountedNetPrice: `${val?.price?.discountedPrice?.discountedNetPrice} ${val?.price?.currency}`,
        discountedGrossPrice: `${val?.price?.discountedPrice?.discountedGrossPrice} ${val?.price?.currency}`,
        vatDiscountAmount: `${val?.price?.discountedPrice?.vatDiscountAmount} ${val?.price?.currency}`,
      };
    }

    return returnData;
  });

  const meta = {
    totalPages: data.totalPages || 1,
  };

  return Promise
    .all(values)
    .then((resp) => {
      Object.assign(markUp, { values: resp, meta });

      return markUp;
    });
};

export { generateData, defaultShow, markUp };
