import moment from 'moment';

import localization from '../../../localization';
import api from '../../../api';

const defaultShow = {
  id: true,
  customer: true,
  name: true,
  lastUpdate: true,
  fallbackLocale: true,
};

const markUp = {
  headers: [
    {
      value: localization.t('labels.id'),
      id: 'id',
    },
    {
      value: localization.t('labels.customer'),
      id: 'customer',
    },
    {
      value: localization.t('labels.name'),
      id: 'name',
      sortParam: 'name',
    },
    {
      value: localization.t('labels.lastUpdate'),
      id: 'lastUpdate',
      sortParam: 'lastUpdate',
    },
    {
      value: localization.t('labels.fallbackLocale'),
      id: 'fallbackLocale',
    },
  ],
};

const generateData = async (data, customers, selectedCustomer) => {
  if (selectedCustomer?.name) {
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
    customer: val.customer,
    name: val.name,
    lastUpdate: moment(val.updateDate).format('D MMM YYYY'),
    fallbackLocale: val.fallbackLocale,
  }));

  const meta = {
    totalPages: data.totalPages,
    totalItems: data.totalItems,
  };

  Object.assign(markUp, { values, meta });
  return markUp;
};

export { generateData, defaultShow, markUp };
