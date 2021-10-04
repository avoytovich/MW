import api from '../../api';
// eslint-disable-next-line
export const getCustomerName = async (id) => {
  const loadedCustomers = JSON.parse(sessionStorage.getItem('customersData')) || [];
  const [existing] = loadedCustomers.filter((c) => c.id === id);

  if (existing) {
    return existing.name || existing.id;
  }

  const updateStorage = (name) => {
    const loaded = JSON.parse(sessionStorage.getItem('customersData')) || [];

    sessionStorage.setItem('customersData', JSON.stringify([...loaded, { name: name || null, id }]));
  };

  const name = await api.getCustomerById(id).then(({ data }) => {
    updateStorage(data?.name);

    return data?.name;
  }).catch(() => {
    updateStorage();

    return id;
  });

  return name || id;
};
