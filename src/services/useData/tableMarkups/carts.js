import localization from '../../../localization';

const defaultShow = {
  id: true,
  customer: true,
  createDate: true,
  updateDate: true,
  scheduledRemoval: true,
  store: true,
  source: true,
  emailAddress: true,
  firstName: true,
  lastName: true,
};
const markUp = {
  headers: [
    { value: localization.t('labels.cartId'), id: 'id' },
    {
      value: localization.t('labels.customer'),
      id: 'customer',
    },
    {
      value: localization.t('labels.creationDate'),
      id: 'createDate',
      sortParam: 'createDate',
    },
    {
      value: localization.t('labels.updateDate'),
      id: 'updateDate',
      sortParam: 'updateDate',
    },
    {
      value: localization.t('labels.scheduledRemoval'),
      id: 'scheduledRemoval',
      sortParam: 'scheduledRemoval',
    },
    {
      value: localization.t('labels.store'),
      id: 'store',
    },
    {
      value: localization.t('labels.source'),
      id: 'source',
    },
    { value: localization.t('labels.emailAddress'), id: 'emailAddress' },
    {
      value: localization.t('labels.firstName'),
      id: 'firstName',
    },
    {
      value: localization.t('labels.lastName'),
      id: 'lastName',
    },
  ],
};

const generateData = (data) => {
  const values = data.items.map((val) => ({
    id: val.id,
    customer: val.customerId,
    createDate: val.createDate,
    updateDate: val.updateDate,
    scheduledRemoval: val.scheduledSuppressionDate,
    store: val.storeId,
    source: val.source === 'PURCHASE' ? localization.t('labels.acquisition') : localization.t('labels.manualRenewal'),
    emailAddress: val.endUser.email,
    firstName: val.endUser.firstName,
    lastName: val.endUser.lastName,
  }));

  const meta = {
    totalPages: data.totalPages,
  };

  Object.assign(markUp, { values, meta });
  return markUp;
};

export { generateData, defaultShow, markUp };
