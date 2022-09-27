import localization from '../../../localization';

const defaultShow = {
  id: false,
  name: true,
  code: true,
  createDate: true,
  updateDate: true,
};

const markUp = {
  headers: [
    { value: localization.t('labels.id'), id: 'id' },
    { value: localization.t('labels.name'), id: 'name', sortParam: 'name' },
    { value: localization.t('labels.code'), id: 'code', sortParam: 'code' },
    { value: localization.t('labels.createDate'), id: 'createDate', sortParam: 'createDate' },
    { value: localization.t('labels.updateDate'), id: 'updateDate', sortParam: 'updateDate' },
  ],
};

const generateData = (data) => {
  const values = data.items.map((val) => ({
    id: val.id,
    createDate: val.createDate,
    updateDate: val.updateDate,
    name: val.name,
    code: val.code,
  }));
  const meta = {
    totalPages: data.totalPages,
    totalItems: data.totalItems,
  };

  Object.assign(markUp, { values, meta });
  return markUp;
};

export { generateData, defaultShow, markUp };
