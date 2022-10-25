import localization from '../../../localization';

const defaultShow = {
  id: false,
  name: true,
  legalName: true,
  subsidiaryId: true,
  createDate: true,
  updateDate: true,
};

const markUp = {
  headers: [
    { value: localization.t('labels.id'), id: 'id' },
    { value: localization.t('labels.name'), id: 'name', sortParam: 'name' },
    { value: localization.t('labels.legalName'), id: 'legalName', sortParam: 'legalName' },
    { value: localization.t('labels.subsidiaryId'), id: 'subsidiaryId', sortParam: 'subsidiaryId' },
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
    legalName: val.legalName,
    subsidiaryId: val.subsidiaryId,
  }));
  const meta = {
    totalPages: data.totalPages,
    totalItems: data.totalItems,
  };

  Object.assign(markUp, { values, meta });
  return markUp;
};

export { generateData, defaultShow, markUp };
