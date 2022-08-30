import localization from '../../localization';
import api from '../../api';

const defaultShow = {
  endUserId: true,
  type: true,
  createDate: true,
  customer: true,
  group: true,
  firstName: true,
  lastName: true,
  companyName: true,
  emailAddress: true,
  country: true,
  zip: false,
  status: true,
  city: true,
  streetAddress: true,
  account: true,
};
const secondaryRequest = async (data) => {
  const costumersIds = [];
  const groupsIds = [];
  const result = { data: {} };
  data.items.forEach((item) => {
    if (item.customerId && !costumersIds.includes(item.customerId)) {
      const searchVal = encodeURIComponent(item.customerId);
      const id = searchVal.replace(new RegExp("'", 'g'), "''");
      const costumer = `id=${id}`;
      costumersIds.push(costumer);
    }
    if (item.groupId && !groupsIds.includes(item.groupId)) {
      const searchVal = encodeURIComponent(item.groupId);
      const id = searchVal.replace(new RegExp("'", 'g'), "''");
      const group = `id=${id}`;
      groupsIds.push(group);
    }
  });
  return Promise.allSettled([
    // todo: remove - reuse common service
    api.getCustomersByIds(costumersIds.join('&')),
    api.getEnduserGroupsByIds(groupsIds.join('&')),
  ]).then(([customers, groups]) => {
    result.data.customers = customers.value ? customers.value.data : null;
    result.data.groups = groups.value ? groups.value.data : null;
    return result;
  });
};
const markUp = {
  headers: [
    { value: localization.t('labels.endUserId'), id: 'endUserId' },
    {
      value: localization.t('labels.type'),
      id: 'type',
    },
    {
      value: localization.t('labels.createDate'),
      id: 'createDate',
    },
    {
      value: localization.t('labels.customer'),
      id: 'customer',
    },
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
    { value: localization.t('labels.companyName'), id: 'companyName', sortParam: 'company.companyName' },
    {
      value: localization.t('labels.emailAddress'),
      id: 'emailAddress',
      sortParam: 'email',
    },
    {
      value: localization.t('labels.country'),
      id: 'country',
      sortParam: 'country',
    },
    {
      value: localization.t('labels.zip'),
      id: 'zip',
      sortParam: 'zipCode',
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
      sortParam: 'accountCreated',
    },
  ],
};

const generateData = (data, additionalData) => {
  const values = data.items.map((val) => {
    const customer = val.customerId === 'Nexway' ? val.customerId : additionalData.customers.items?.find((item) => item.id === val.customerId)?.name;
    const group = val.groupId ? additionalData.groups.items?.find((item) => item.id === val.groupId)?.name : '-';
    return ({
      id: val.id,
      endUserId: val.id,
      type: val.type,
      createDate: val.createDate,
      customer: customer || '-',
      group,
      firstName: val.firstName,
      lastName: val.lastName,
      companyName: val.company?.companyName || '-',
      emailAddress: val.email || '-',
      country: val.country || '-',
      zip: val.zipCode || '-',
      status: val.status,
      city: val.city || '-',
      streetAddress: val.streetAddress || '-',
      account: val.accountCreated || '-',
    });
  });
  const meta = {
    totalPages: data.totalPages,
    totalItems: data.totalItems,
  };

  Object.assign(markUp, { values, meta });
  return markUp;
};

export {
  generateData,
  defaultShow,
  markUp,
  secondaryRequest,
};
