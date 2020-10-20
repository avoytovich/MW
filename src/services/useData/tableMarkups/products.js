import localization from '../../../localization';

const defaultShow = {
  id: false,
  createDate: true,
  updateDate: true,
  customer: true,
  genericName: true,
  publisherRefId: true,
  type: true,
  lifeTime: true,
  status: true,
  family: false,
};
const markUp = {
  headers: [
    { value: localization.t('labels.productID'), id: 'id' },
    { value: localization.t('labels.creationDate'), id: 'createDate' },
    { value: localization.t('labels.lastUpdate'), id: 'updateDate' },
    { value: localization.t('labels.customer'), id: 'customer' },
    { value: localization.t('labels.name'), id: 'genericName' },
    { value: localization.t('labels.publisherRefID'), id: 'publisherRefId' },
    { value: localization.t('labels.type'), id: 'type' },
    { value: localization.t('labels.lifeTime'), id: 'lifeTime' },
    { value: localization.t('labels.status'), id: 'status' },
    { value: localization.t('labels.family'), id: 'family' },
    { value: localization.t('labels.priceFunction'), id: 'priseFunction' },
  ],
};

const products = (data, customers) => {
  const values = data.items.map((val) => {
    const customer = customers.items.filter(
      (item) => item.id === val.customerId,
    )[0]?.name;
    return {
      id: val.id,
      createDate: val.createDate,
      updateDate: val.updateDate,
      customer,
      genericName: val.genericName,
      publisherRefId: val.publisherRefId,
      type: val.type,
      lifeTime: val.lifeTime,
      status: val.status,
      family: val.family,
    };
  });

  const meta = {
    totalPages: data.totalPages,
  };
  Object.assign(markUp, { values, meta, defaultShow });
  return markUp;
};

export default products;
