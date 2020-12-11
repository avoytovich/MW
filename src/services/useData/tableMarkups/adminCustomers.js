import localization from '../../../localization';

const defaultShow = {
  name: true,
  status: true,
  email: true,
  createDate: true,
};

const markUp = {
  headers: [
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
    };
  });

  const meta = {
    totalPages: data.totalPages,
  };

  Object.assign(markUp, { values, meta, defaultShow });

  return markUp;
};

export { generateData, defaultShow, markUp };
