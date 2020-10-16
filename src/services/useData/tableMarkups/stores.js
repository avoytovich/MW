const defaultShow = {
  customerId: false,
  name: true,
  createDate: true,
  updateDate: true,
  defaultLocale: true,
  status: true,
  gtmId: true,
  id: true,
};

const markUp = {
  headers: [
    { value: 'Customer', id: 'customerId' }, // Temporary
    { value: 'Name', id: 'name' },
    { value: 'Creation Date', id: 'createDate' },
    { value: 'Last update', id: 'updateDate' },
    { value: 'Default Language', id: 'defaultLocale' },
    { value: 'Status', id: 'status' },
    { value: 'GTM ID', id: 'gtmId' },
    { value: 'Store ID', id: 'id' },
  ],
};

const generateData = (data) => {
  const values = data.items.map((val) => ({
    customerId: val.customerId,
    name: val.name,
    createDate: val.createDate,
    updateDate: val.updateDate,
    defaultLocale: val.defaultLocale,
    status: val.status,
    gtmId: val.gtmId,
    id: val.id,
  }));
  const meta = {
    totalPages: data.totalPages,
  };
  Object.assign(markUp, { values, meta });
  return markUp;
};

export { generateData, defaultShow };
