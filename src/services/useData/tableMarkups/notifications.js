import localization from '../../../localization';

const defaultShow = {
  id: true,
  customer: true,
  name: true,
  url: true,
  emails: true,
  events: true,
  status: true,
};

const markUp = {
  headers: [
    { value: localization.t('labels.notificationid'), id: 'id', sortParam: 'id' },
    { value: localization.t('labels.notificationCustomer'), id: 'customer', sortParam: 'customer' },
    {
      value: localization.t('labels.notificationName'),
      id: 'name',
      sortParam: 'name',
    },
    { value: localization.t('labels.notificationUrl'), id: 'url', sortParam: 'url' },
    {
      value: localization.t('labels.notificationEmails') + localization.t('labels.oneByLine'),
      id: 'emails',
      sortParam: 'emails',
    },
    {
      value: localization.t('labels.notificationEvents'),
      id: 'events',
      sortParam: 'events',
    },
    {
      value: localization.t('labels.notificationStatus'),
      id: 'status',
      sortParam: 'status',
    },
  ],
};

const generateData = (data) => {
  const values = data.items.map((val) => {
    let status = '';
    if (val.status === 'Active') {
      status = localization.t('general.notificationEnabled');
    } else if (val.status !== 'Active') {
      status = localization.t('general.notificationDisabled');
    }
    return {
      id: val.id,
      customer: val.customerId,
      name: val.name,
      url: val.url,
      emails: val.emails,
      // events: ,
      status: val.status,
    };
  });

  const meta = {
    totalPages: data.totalPages,
  };

  Object.assign(markUp, { values, meta, defaultShow });

  return markUp;
};

export { generateData, defaultShow, markUp };
