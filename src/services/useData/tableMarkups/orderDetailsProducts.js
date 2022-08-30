import api from '../../../api';
import localization from '../../../localization';
import parentPaths from '../../paths';

const defaultShow = {
  id: false,
  publisherRefId: true,
  quantity: true,
  priceFunction: true,
  name: true,
  activationCode: true,
  subscription: true,
  discount: true,
  netPrice: true,
  grossPrice: true,
  vatAmount: true,
  netDiscountPrice: true,
  grossDiscountPrice: true,
  vatDiscountAmount: true,
  details: true,
};

const links = [
  { id: 'name', path: `${parentPaths.productlist}/:productId`, internal: true },
  { id: 'subscription', path: 'https://subscription.prep.websizing.com/bo/subscriptions/:subscription/detail', internal: false },
];

const markUp = {
  headers: [
    { value: localization.t('forms.inputs.publisherRefId'), id: 'publisherRefId' },
    { value: localization.t('labels.quantity'), id: 'quantity' },
    { value: localization.t('forms.inputs.priceFunction'), id: 'priceFunction' },
    { value: localization.t('labels.name'), id: 'name' },
    { value: localization.t('labels.activationCodeKey'), id: 'activationCode' },
    { value: localization.t('general.subscription'), id: 'subscription' },
    { value: localization.t('labels.net'), id: 'netPrice' },
    { value: localization.t('labels.gross'), id: 'grossPrice' },
    { value: localization.t('labels.vat'), id: 'vatAmount' },
    { value: localization.t('labels.details'), id: 'details' },
  ],
};

const generateData = (data, subscriptions) => {
  const values = data.map(async (val) => {
    const subscription = subscriptions ? subscriptions.filter((item) => item.id === val.subscriptionId)[0]?.lifecycle?.id : '';

    const returnData = {
      id: val.id,
      publisherRefId: val.publisherRefId,
      quantity: 1,
      priceFunction: '-',
      name: `${val.name} - ${val.lifeTime}`,
      activationCode: val.activationCode || '-',
      subscription: subscription || val.subscriptionId || '',
      discount: '-',
      netPrice: `${val?.price?.netPrice || 0} ${val?.price?.currency || 'USD'}`,
      grossPrice: `${val?.price?.grossPrice || 0} ${val?.price?.currency || 'USD'}`,
      vatAmount: `${val?.price?.vatAmount || 0} ${val?.price?.currency || 'USD'}`,
      netDiscountPrice: `${val?.price?.discountedPrice?.discountedNetPrice || 0} ${val?.price?.currency || 'USD'}`,
      grossDiscountPrice: `${val?.price?.discountedPrice?.discountedGrossPrice || 0} ${val?.price?.currency || 'USD'}`,
      vatDiscountAmount: `${val?.price?.discountedPrice?.vatDiscountAmount || 0} ${val?.price?.currency || 'USD'}`,
      processingError: val.processingStatus === 'FAILURE',
      details: val.processingEvent?.some((obj) => obj.status === 'Failed') ? 'failed_event' : undefined,
      productId: val.productId,
    };

    const discountId = val?.price?.discountedPrice?.discountId;

    if (discountId) {
      const discountName = await api.getDiscountById(discountId).then(({ data: data_ }) => data_?.name || '-');

      links.push({
        id: 'discount', path: `${parentPaths.discountrules}/:discountId`, internal: true,
      });

      markUp.headers.splice(
        9,
        0,
        ...[
          { value: localization.t('general.discount'), id: 'discount' },
          { value: localization.t('labels.discountedNetPrice'), id: 'netDiscountPrice' },
          { value: localization.t('labels.discountedGrossPrice'), id: 'grossDiscountPrice' },
          { value: localization.t('labels.vatDiscountAmount'), id: 'vatDiscountAmount' },
        ],
      );

      return { ...returnData, discount: discountName, discountId };
    }

    const discountRelatedKeys = ['discount', 'netDiscountPrice', 'grossDiscountPrice', 'vatDiscountAmount'];

    markUp.headers = markUp.headers.filter((i) => discountRelatedKeys.indexOf(i.id) < 0);

    return returnData;
  });

  const meta = {
    totalPages: data.totalPages,
    totalItems: data.totalItems,
  };

  return Promise
    .all(values)
    .then((resp) => {
      Object.assign(markUp, { values: resp, meta });

      return markUp;
    });
};

export {
  generateData,
  defaultShow,
  markUp,
  links,
};
