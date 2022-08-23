import { getCustomerName, getCustomerNameSync } from '../../helpers/customersHelper';
import localization from '../../../localization';

const defaultShow = {
  hierarchy: true,
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
  subscriptionModel: true,
  priceFunction: true,
};
const markUp = {
  headers: [
    { value: localization.t('labels.productId'), id: 'id' },
    {
      value: localization.t('labels.creationDate'),
      id: 'createDate',
      sortParam: 'createDate',
    },
    {
      value: localization.t('labels.lastUpdate'),
      id: 'updateDate',
      sortParam: 'updateDate',
    },
    { value: localization.t('labels.customer'), id: 'customer' },
    {
      value: localization.t('labels.name'),
      id: 'genericName',
      sortParam: 'genericName',
    },
    {
      value: localization.t('labels.publisherRefId'),
      id: 'publisherRefId',
      sortParam: 'publisherRefId',
    },
    { value: localization.t('labels.type'), id: 'type' },
    {
      value: localization.t('labels.lifeTime'),
      id: 'lifeTime',
      sortParam: 'lifeTime',
    },
    {
      value: localization.t('labels.status'),
      id: 'status',
      sortParam: 'status',
    },
    { value: localization.t('labels.family'), id: 'family' },
    { value: localization.t('labels.priceFunction'), id: 'priceFunction' },
    { value: localization.t('labels.subscriptionModel'), id: 'subscriptionModel' },
  ],
};

const generateData = (data, children) => {
  const ch = [];
  children.forEach((element) => {
    ch.push(...element);
  });
  const newData = [...data.items, ...ch];
  const usedCustomers = [];

  const values = newData.map(async (val) => {
    let hierarchy = [val.id];

    if (val?.parentId && children.length) {
      const parent = data.items.find((el) => el.id === val.parentId);
      hierarchy = [parent?.id, val.id];
    }
    let hasChildren = false;
    children.forEach((child) => {
      child.forEach((i) => {
        if (i.parentId === val.id) {
          hasChildren = true;
        }
      });
    });

    const returnData = {
      id: val.id,
      hierarchy,
      createDate: val.createDate,
      updateDate: val.updateDate,
      customer: val.customerId,
      genericName: val.genericName || val.id,
      publisherRefId: val.publisherRefId,
      type: val.type,
      lifeTime: val.lifeTime,
      status: val.status,
      family: val.productFamily || '-',
      subscriptionModel: val?.subscriptionTemplate,
      priceFunction: val.priceFunction || '-',
      hasChildren,
    };
    if (val?.customerId && usedCustomers.indexOf(val.customerId) < 0) {
      usedCustomers.push(val.customerId);
    }

    return returnData;
  });

  const meta = {
    totalPages: data.totalPages,
    totalItems: data.totalItems,
  };

  return Promise
    .all(values)
    .then(async (resp) => {
      const promises = usedCustomers.map((c) => getCustomerName(c));

      await Promise
        .all(promises)
        .finally(() => Object.assign(markUp, {
          values: resp.map((r) => {
            const name = getCustomerNameSync(r.customer);

            return { ...r, customer: name };
          }),
          meta,
        }));

      return markUp;
    });
};

export { generateData, defaultShow, markUp };
