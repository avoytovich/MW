import moment from 'moment';
import localization from '../../../localization';

const defaultShow = {
  id: false,
  startDate: true,
  endDate: true,
  productId: true,
  marketingId: true,
  country: true,
  currency: true,
  value: true,
  msrp: true,
  upSell: true,
  crossSell: true,
  vatIncluded: true,
};

const markUp = {
  headers: [
    { value: localization.t('labels.id'), id: 'id' },
    { value: localization.t('labels.startDate'), id: 'startDate' },
    { value: localization.t('labels.endDate'), id: 'endDate' },
    { value: localization.t('labels.productId'), id: 'productId' },
    { value: localization.t('labels.marketingId'), id: 'marketingId' },
    { value: localization.t('labels.priceCountry'), id: 'country' },
    { value: localization.t('labels.currency'), id: 'currency' },
    { value: localization.t('labels.value'), id: 'value' },
    { value: localization.t('labels.msrp'), id: 'msrp' },
    { value: localization.t('labels.upsellPrice'), id: 'upSell' },
    { value: localization.t('labels.crossSellPrice'), id: 'crossSell' },
    { value: localization.t('labels.vatIncluded'), id: 'vatIncluded' },
  ],
};

const generateData = (data) => {
  const values = data.items.map((val) => ({
    id: val.id,
    startDate: moment(val.startDate).format('D MMM YYYY'),
    endDate: val.endDate ? moment(val.endDate).format('D MMM YYYY') : '-',
    productId: val.productId,
    marketingId: val.marketingId || '-',
    country: val.country,
    currency: val.currency,
    value: `${val.value}`,
    msrp: val.msrp || '-',
    upSell: val.upSell || '-',
    crossSell: val.crossSell || '-',
    vatIncluded: val.vatIncluded,
  }));

  const meta = {
    totalPages: data.totalPages,
  };

  Object.assign(markUp, { values, meta });
  return markUp;
};

export { generateData, defaultShow, markUp };
