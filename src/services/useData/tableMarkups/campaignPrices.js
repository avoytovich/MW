import moment from 'moment';
import localization from '../../../localization';

const defaultShow = {
  id: true,
  productId: true,
  startDate: true,
  endDate: true,
  currency: true,
  value: true,
  msrp: true,
  vatIncluded: true,
};

const markUp = {
  headers: [
    { value: localization.t('labels.price'), id: 'id' },
    { value: localization.t('labels.product'), id: 'productId' },
    { value: localization.t('labels.startDate'), id: 'startDate' },
    { value: localization.t('labels.endDate'), id: 'endDate' },
    { value: localization.t('labels.currency'), id: 'currency' },
    { value: localization.t('labels.value'), id: 'value' },
    { value: localization.t('labels.msrp'), id: 'msrp' },
    { value: localization.t('labels.vatIncluded'), id: 'vatIncluded' },
  ],
};

const generateData = (data) => {
  const values = data.items.map((val) => ({
    id: val.id,
    productId: val.productId,
    startDate: moment(val.startDate).format('D MMM YYYY'),
    endDate: moment(val.endDate).format('D MMM YYYY'),
    currency: val.currency,
    value: val.value,
    msrp: val.msrp,
    vatIncluded: val.vatIncluded,
  }));

  const meta = {
    totalPages: data.totalPages,
    totalItems: data.totalItems,
  };

  Object.assign(markUp, { values, meta });
  return markUp;
};

export { generateData, defaultShow, markUp };
