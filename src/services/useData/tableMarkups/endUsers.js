import localization from '../../../localization';

const defaultShow = {
  customer: true,
  group: true,
  firstName: true,
  lastName: true,
  companyName: true,
  email: true,
  country: true,
  zip: true,
  status: true,
  city: true,
  streetAddress: true,
  account: true,
};

const markUp = {
  headers: [
    { value: localization.t('labels.customer'), id: 'customer' },
    { value: localization.t('labels.group'), id: 'group' },
    {
      value: localization.t('labels.firstName'),
      id: 'firstName',
      sortParam: 'firstName',
    },
    {
      value: localization.t('labels.lastName'),
      id: 'lastName',
      sortParam: 'lastName',
    },
    {
      value: localization.t('labels.companyName'),
      id: 'companyName',
      sortParam: 'company.companyName',
    },
    {
      value: localization.t('labels.emailAddress'),
      id: 'email',
      sortParam: 'email',
    },
    {
      value: localization.t('labels.country'),
      id: 'country',
    },
    {
      value: localization.t('labels.zip'),
      id: 'zip',
    },
    {
      value: localization.t('labels.status'),
      id: 'status',
      sortParam: 'status',
    },
    {
      value: localization.t('labels.city'),
      id: 'city',
      sortParam: 'city',
    },
    {
      value: localization.t('labels.streetAddress'),
      id: 'streetAddress',
      sortParam: 'streetAddress',
    },
    {
      value: localization.t('labels.account'),
      id: 'account',
    },

  ],
};

const generateData = (data) => {
  const values = data.items.map((val) => ({
    customer: val?.customerId,
    group: '',
    firstName: val?.firstName,
    lastName: val?.lastName,
    companyName: val?.company?.companyName,
    email: val?.email,
    country: val?.country,
    zip: val?.zipCode,
    status: val?.status,
    city: val?.city,
    streetAddress: val?.streetAddress,
    account: val?.accountCreated,
  }));

  const meta = {
    totalPages: data.totalPages,
  };
  Object.assign(markUp, { values, meta });
  return markUp;
};

export { generateData, defaultShow, markUp };
