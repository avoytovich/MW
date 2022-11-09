import api from '../../api';
import localization from '../../localization';

const updateStorage = (name, id) => {
  const loaded = JSON.parse(sessionStorage.getItem('customersData')) || [];

  sessionStorage.setItem('customersData', JSON.stringify([...loaded, { name: name || null, id }]));
};

// eslint-disable-next-line
export const fetchCustomersNames = async(customers) => {
  const loadedCustomers = JSON.parse(sessionStorage.getItem('customersData')) || [];
  const customersIds = [];

  customers.forEach((item) => {
    const [existing] = loadedCustomers.filter((c) => c.id === item);

    const customer = `id=${item}`;
    if (!existing && !customersIds.includes(customer)) {
      customersIds.push(customer);
    }
  });

  if (customersIds?.length > 0) {
    return api
      .getCustomersByIds(customersIds.join('&'))
      .then(async ({ data }) => {
        customersIds.forEach((it) => {
          const [, itemId] = it.split('id=');
          const [curItem] = data?.items?.filter((i) => i.id === itemId);

          updateStorage(curItem?.name || undefined, curItem?.id || itemId);
        });
      });
  }

  return Promise.resolve();
};

export const getCustomerName = async (id) => {
  const loadedCustomers = JSON.parse(sessionStorage.getItem('customersData')) || [];
  const [existing] = loadedCustomers.filter((c) => c.id === id);

  if (existing) {
    return existing?.name || localization.t('labels.customerNotFound');
  }

  const name = await api.getCustomerById(id).then(({ data }) => {
    updateStorage(data?.name, id);

    return data?.name;
  }).catch(() => {
    updateStorage();

    return id;
  });

  return name || id;
};

export const getCustomerNameSync = (id) => {
  const loadedCustomers = JSON.parse(sessionStorage.getItem('customersData')) || [];
  const [existing] = loadedCustomers.filter((c) => c.id === id);

  return existing?.name || id || localization.t('labels.customerNotFound');
};
