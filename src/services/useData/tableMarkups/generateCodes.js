import localization from '../../../localization';

const defaultShow = {
  discountCode: true,
  status: true,
  orderId: true,
};
const markUp = {
  headers: [
    { value: localization.t('labels.discountCode'), id: 'discountCode' },
    { value: localization.t('labels.status'), id: 'status' },
    { value: localization.t('labels.orderId'), id: 'orderId' },
  ],
};

const generateData = (data) => {
  const values = data.items.map((val) => ({
    id: val?.discountCode,
    discountCode: val.discountCode,
    status: val.used ? 'Used' : 'Not used',
    used: val.used,
    orderId: '',
  }));

  const meta = {
    totalPages: data.totalPages,
    totalItems: data.totalItems,
  };

  Object.assign(markUp, { values, meta });
  return markUp;
};

export { generateData, defaultShow, markUp };
