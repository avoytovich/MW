import localization from '../../../localization';

const defaultShow = {
  id: true,
  destination: true,
  emailId: true,
  type: true,
};

const markUp = {
  headers: [
    { value: localization.t('labels.id'), id: 'id' },
    { value: localization.t('labels.destination'), id: 'destination' },
    { value: localization.t('labels.emailId'), id: 'emailId' },
    { value: localization.t('labels.type'), id: 'type' },
  ],
};

const generateData = (data) => {
  const values = data.map((val) => ({
    id: val.id,
    destination: val.dest,
    emailId: val.emailId,
    type: val.type,
  }));

  const meta = {
    totalPages: data.totalPages || 1,
    totalItems: data.totalItems,
  };

  Object.assign(markUp, { values, meta });
  return markUp;
};

export { generateData, defaultShow, markUp };
