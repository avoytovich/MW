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
    discountCode: val.discountCode,
    status: val.used ? val.used : 'Not used',
    orderId: '',
  }));

  const meta = {
    totalPages: data.totalPages,
  };

  Object.assign(markUp, { values, meta });
  return markUp;
};

export { generateData, defaultShow, markUp };
