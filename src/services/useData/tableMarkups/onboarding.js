import moment from 'moment';

import localization from '../../../localization';
import api from '../../../api';

const defaultShow = {
  id: true,
  status: true,
  customer: true,
  creationDate: true,
  lastUpdate: true,
  companyName: true,
  firstName: true,
  lastName: true,
  email: true,
};

const markUp = {
  headers: [
    {
      value: localization.t('labels.id'),
      id: 'id',
    },
    {
      value: localization.t('labels.status'),
      id: 'status',
      sortParam: 'status',
    },
    {
      value: localization.t('labels.customer'),
      id: 'customer',
    },
    {
      value: localization.t('labels.creationDate'),
      id: 'creationDate',
      sortParam: 'creationDate',
    },
    {
      value: localization.t('labels.lastUpdate'),
      id: 'lastUpdate',
      sortParam: 'lastUpdate',
    },
    {
      value: localization.t('labels.companyName'),
      id: 'companyName',
      sortParam: 'companyName',
    },
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
      value: localization.t('labels.email'),
      id: 'email',
      sortParam: 'email',
    },
  ],
};

const generateData = async (data, customers, selectedCustomer) => {
  if (selectedCustomer.name) {
    data.items.map(
      (item) => Object.assign(item, { customer: selectedCustomer.name }),
    );
  } else {
    const arrEndUsersGroupsСustomerIds = data.items.map(
      (item) => (item.customerId),
    );
    const strEndUsersGroupsСustomerIds = arrEndUsersGroupsСustomerIds.map((item) => `id=${item}`).join('&');
    const resEndUsersGroupsByIds = await api.getCustomersByIds(strEndUsersGroupsСustomerIds);
    // todo: remake using common service
    data.items.map((item) => resEndUsersGroupsByIds.data.items.map((each) => {
      if (each.id === item.customerId) {
        Object.assign(item, { customer: each.name });
      }
    }));
  }
  const values = data.items.map((val) => ({
    id: val.id,
    status: val.status,
    customer: val.customer,
    creationDate: moment(val.createDate).format('D MMM YYYY'),
    lastUpdate: moment(val.updateDate).format('D MMM YYYY'),
    companyName: val.companyName,
    firstName: val.firstName,
    lastName: val.lastName,
    email: val.email,
  }));

  const meta = {
    totalPages: data.totalPages,
  };

  Object.assign(markUp, { values, meta });
  return markUp;
};

export { generateData, defaultShow, markUp };
