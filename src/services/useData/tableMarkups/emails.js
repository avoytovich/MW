import localization from '../../../localization';

const defaultShow = {
  id: true,
  emailId: true,
  createDate: true,
  type: true,
};

const markUp = {
  headers: [
    { value: localization.t('labels.id'), id: 'id' },

    {
      value: localization.t('labels.emailId'),
      id: 'emailId',
    },
    {
      value: localization.t('labels.createDate'),
      id: 'createDate',
    },
    {
      value: localization.t('labels.type'),
      id: 'type',
    },
  ],
};

const generateData = (data) => {
  const values = data.map((val) => {
    const returnData = {
      id: val?.id,
      emailId: val?.emailId,
      createDate: val?.createDate,
      type: val?.type,
    };

    return returnData;
  });

  const meta = {
    totalPages: data.totalPages,
    totalItems: data.totalItems,
  };

  Object.assign(markUp, { values, meta });
  return markUp;
};

export { generateData, defaultShow, markUp };
