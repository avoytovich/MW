import localization from '../../../localization';

const defaultShow = {
  serviceName: true,
  availableActions: true,
  createDate: true,
  updateDate: true,
};

const markUp = {
  headers: [
    {
      value: localization.t('labels.serviceName'),
      id: 'serviceName',
      sortParam: 'serviceName',
    },
    {
      value: localization.t('labels.availableActions'),
      id: 'availableActions',
    },

    {
      value: localization.t('labels.createDate'),
      id: 'createDate',
      sortParam: 'createDate',
    },
    {
      value: localization.t('labels.lastUpdate'),
      id: 'updateDate',
      sortParam: 'updateDate',
    },
  ],
};

const generateData = (data) => {
  const values = data.items.map((val) => (
    {
      id: val.id,
      serviceName: val.serviceName,
      availableActions: val.availableActions?.length || 0,
      createDate: val.createDate,
      updateDate: val.updateDate,
    }
  ));

  const meta = {
    totalPages: data.totalPages,
  };

  Object.assign(markUp, { values, meta, defaultShow });
  return markUp;
};
export { generateData, defaultShow, markUp };
