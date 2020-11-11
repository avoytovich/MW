import localization from '../../../localization';

const defaultShow = {
  fullName: true,
  userName: true,
  email: true,
  createDate: true,
};

const markUp = {
  headers: [
    { value: localization.t('labels.fullName'), id: 'fullName' },
    { value: localization.t('labels.userID'), id: 'userName' },
    { value: localization.t('labels.email'), id: 'email' },
    { value: localization.t('labels.accountCreated'), id: 'createDate' },
  ],
};

const generateData = (data) => {
  const values = data.items.map((val) => ({
    id: val.id,
    fullName: `${val.firstName} ${val.lastName}`,
    userName: val.userName,
    email: val.email,
    createDate: val.createDate,
  }));

  const meta = {
    totalPages: data.totalPages,
  };

  Object.assign(markUp, { values, meta, defaultShow });

  return markUp;
};

export { generateData, defaultShow, markUp };