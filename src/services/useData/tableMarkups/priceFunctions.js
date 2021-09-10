import moment from 'moment';
import localization from '../../../localization';

const defaultShow = {
  id: false,
  customerId: true,
  createDate: true,
  updateDate: true,
  name: true,
};

const markUp = {
  headers: [
    { value: localization.t('labels.priceFunctionId'), id: 'id' },
    { value: localization.t('labels.customer'), id: 'customerId' },
    { value: localization.t('labels.createDate'), id: 'createDate', sortParam: 'createDate' },
    { value: localization.t('labels.updateDate'), id: 'updateDate', sortParam: 'updateDate' },
    { value: localization.t('labels.priceFunctionName'), id: 'name', sortParam: 'name' },
  ],
};

const generateData = (data) => {
  const values = data.items.map((val) => ({
    id: val.id,
    customerId: val.customerId,
    createDate: moment(val.createDate).format('D MMM YYYY'),
    updateDate: val.updateDate ? moment(val.updateDate).format('D MMM YYYY') : '-',
    name: val.name,
  }));

  const meta = {
    totalPages: data.totalPages,
  };

  Object.assign(markUp, { values, meta });
  return markUp;
};

export { generateData, defaultShow, markUp };
