import api from '../../api';

const getCustomers = async (data, key) => {
  const costumersIds = [];
  data.items.forEach((item) => {
    if (item[key] && !costumersIds.includes(item[key])) {
      const searchVal = encodeURIComponent(item[key]);
      const id = searchVal.replace(new RegExp("'", 'g'), "''");
      const costumer = `id=${id}`;
      costumersIds.push(costumer);
    }
  });
  const result = await api.getCustomersByIds(costumersIds.join('&'));
  return result;
};

export default getCustomers;
