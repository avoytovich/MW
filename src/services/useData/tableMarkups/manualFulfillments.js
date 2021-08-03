import localization from '../../../localization';

const defaultShow = {
  packageId: false,
  customer: true,
  name: true,
  status: true,
  products: true,
  available: true,
  blacklisted: true,
  canceled: true,
  occupied: true,
  renewed: true,
  threshold: true,
};

const markUp = {
  headers: [
    { value: localization.t('labels.packageId'), id: 'packageId' },
    { value: localization.t('labels.customer'), id: 'customer' },
    { value: localization.t('labels.name'), id: 'name', sortParam: 'name' },
    { value: localization.t('labels.status'), id: 'status' },
    { value: localization.t('labels.products'), id: 'products' },
    { value: localization.t('labels.available'), id: 'available' },
    { value: localization.t('labels.blacklisted'), id: 'blacklisted' },
    { value: localization.t('labels.canceled'), id: 'canceled' },
    { value: localization.t('labels.occupied'), id: 'occupied' },
    { value: localization.t('labels.renewed'), id: 'renewed' },
    { value: localization.t('labels.threshold'), id: 'threshold' },
  ],
};

const generateData = (data, customers) => {
  const values = data.items.map((val) => {
    const customer = customers.items.filter(
      (item) => item.id === val.publisherId,
    )[0]?.name;
    return ({
      id: val.id,
      packageId: val.id,
      customer: customer || val.publisherId,
      name: val.name,
      status: val.status,
      products: val.nexwayProductId ? val.nexwayProductId.join('\r\n') : '-',
      available: val.stock.available,
      blacklisted: val.stock.blacklisted,
      canceled: val.stock.canceled,
      occupied: val.stock.occupied,
      renewed: val.stock.renewed,
      threshold: val.threshold,
    });
  });
  const meta = {
    totalPages: data.totalPages,
  };

  Object.assign(markUp, { values, meta });
  return markUp;
};

export { generateData, defaultShow, markUp };
