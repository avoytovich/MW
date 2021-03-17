import moment from 'moment';
import localization from '../../../localization';
import getSymbolFromCurrency from 'currency-symbol-map';

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
  upsellPrice: true,
  crossSellPrice: true,
  vatIncluded: true,
};

const markUp = {
  headers: [
    { value: localization.t('labels.startDate'), id: 'startDate' },
    { value: localization.t('labels.endDate'), id: 'endDate' },
    // { value: localization.t('labels.productID'), id: 'productId' },
    { value: localization.t('labels.marketingId'), id: 'marketingId' },
    { value: localization.t('labels.priceCountry'), id: 'country' },
    { value: localization.t('labels.currency'), id: 'currency' },
    { value: localization.t('labels.value'), id: 'value' },
    { value: localization.t('labels.msrp'), id: 'msrp' },
    { value: localization.t('labels.upsellPrice'), id: 'upsellPrice' },
    { value: localization.t('labels.crossSellPrice'), id: 'crossSellPrice' },
    { value: localization.t('labels.vatIncluded'), id: 'vatIncluded' },
  ],
};

const generateData = (data) => {
  const values = data.items.map((val) => ({
    id: val.id,
    startDate: moment(val.startDate).format('D MMM YYYY'),
    endDate: moment(val.endDate).format('D MMM YYYY'),
    // productId: val.productId,
    marketingId: val.marketingId || '-',
    country: val.country,
    currency: val.currency,
    value: `${getSymbolFromCurrency(val.currency)}${val.value}`,
    msrp: val.msrp || '-',
    upsellPrice: val.upsellPrice || '-',
    crossSellPrice: val.crossSellPrice || '-',
    vatIncluded: val.vatIncluded,
  }));

  const meta = {
    totalPages: data.totalPages,
  };

  Object.assign(markUp, { values, meta });
  return markUp;
};

export { generateData, defaultShow, markUp };
