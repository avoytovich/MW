import localization from '../../../localization';

const defaultShow = {
  id: false,
  name: true,
  alpha3Code: true,
  alpha2Code: true,
  numericCode: true,
  createDate: true,
  updateDate: true,
  inEU: true,
  inEEC: true,
  zipCodeStatus: true,
};

const markUp = {
  headers: [
    { value: localization.t('labels.id'), id: 'id' },
    { value: localization.t('labels.name'), id: 'name', sortParam: 'name' },
    { value: localization.t('labels.alpha3Code'), id: 'alpha3Code', sortParam: 'alpha3Code' },
    { value: localization.t('labels.alpha2Code'), id: 'alpha2Code', sortParam: 'alpha2Code' },
    { value: localization.t('labels.numericCode'), id: 'numericCode', sortParam: 'numericCode' },
    { value: localization.t('labels.createDate'), id: 'createDate', sortParam: 'createDate' },
    { value: localization.t('labels.updateDate'), id: 'updateDate', sortParam: 'updateDate' },
    { value: localization.t('labels.inEU'), id: 'inEU', sortParam: 'inEU' },
    { value: localization.t('labels.inEEC'), id: 'inEEC', sortParam: 'inEEC' },
    { value: localization.t('labels.zipCodeStatus'), id: 'zipCodeStatus', sortParam: 'zipCodeStatus' },

  ],
};

const generateData = (data) => {
  const values = data.items.map((val) => ({
    id: val.id,
    createDate: val.createDate,
    updateDate: val.updateDate,
    name: val.name,
    alpha3Code: val.alpha3Code,
    alpha2Code: val.alpha2Code,
    numericCode: val.numericCode,
    inEU: val.inEU,
    inEEC: val.inEEC,
    zipCodeStatus: val.zipCodeStatus,

  }));
  const meta = {
    totalPages: data.totalPages,
    totalItems: data.totalItems,
  };

  Object.assign(markUp, { values, meta });
  return markUp;
};

export { generateData, defaultShow, markUp };
