import localization from '../../../localization';

const defaultShow = {
  notificationsId: true,
  customer: true,
  name: true,
  url: true,
  emails: true,
  events: true,
  status: true,
};

const markUp = {
  headers: [
    { value: localization.t('labels.notificationsId'), id: 'notificationsId' },
    { value: localization.t('labels.notificationCustomer'), id: 'customer' },
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
    },
    {
      value: localization.t('labels.notificationStatus'),
      id: 'status',
      sortParam: 'status',
    },
  ],
};

const generateData = (data, customers) => {
  let customer;
  const values = data.items.map((val) => {
    customer = val.customerId === 'Nexway'
      ? val.customerId
      : customers.find((item) => item.id === val.customerId)?.name;

    return {
      notificationsId: val.id,
      id: val.id,
      customer: customer || '',
      name: val.name,
      url: val.url,
      emails: val.emails,
      status: val.status === 'Active' ? 'ENABLED' : 'DISABLED',
    };
  });

  const meta = {
    totalPages: data.totalPages,
  };

  Object.assign(markUp, { values, meta, defaultShow });

  return markUp;
};

export { generateData, defaultShow, markUp };
