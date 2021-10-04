import localization from '../../../localization';

const defaultShow = {
  id: true,
  name: true,
  status: true,
  email: true,
  createDate: true,
  updateDate: true,
};

const markUp = {
  headers: [
    { value: localization.t('labels.id'), id: 'id' },

    { value: localization.t('labels.name'), id: 'name', sortParam: 'name' },
    {
      value: localization.t('labels.status'),
      id: 'status',
      sortParam: 'status',
    },
    { value: localization.t('labels.email'), id: 'email', sortParam: 'email' },
    {
      value: localization.t('labels.accountCreated'),
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
  const values = data.items.map((val) => {
    let status = '';
    if (val.status === 'RUNNING') {
      status = localization.t('general.live');
    } else if (val.status === 'TRIAL') {
      status = localization.t('general.test');
    }
    return {
      id: val.id,
      name: val.name,
      status,
      email: val.email,
      createDate: val.createDate,
      updateDate: val.updateDate,
    };
  });

  const meta = {
    totalPages: data.totalPages,
  };

  Object.assign(markUp, { values, meta, defaultShow });

  return markUp;
};

export { generateData, defaultShow, markUp };
