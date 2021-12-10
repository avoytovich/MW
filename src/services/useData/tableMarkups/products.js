import { getCustomerName } from '../../helpers/customersHelper';
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

const generateData = (data) => {
  const values = data.items.map(async (val) => {
    const returnData = {
      id: val.id,
      createDate: val.createDate,
      updateDate: val.updateDate,
      customer: val.customerId,
      genericName: val.genericName,
      publisherRefId: val.publisherRefId,
      type: val.type,
      lifeTime: val.lifeTime,
      status: val.status,
      family: val.family,
      subscriptionModel: val?.subscriptionTemplate,
      priceFunction: val.priceFunction || '-',
    };

    if (val.customerId) {
      const name = await getCustomerName(val.customerId);
      return { ...returnData, customer: name };
    }

    return returnData;
  });

  const meta = { totalPages: data.totalPages };

  return Promise
    .all(values)
    .then((resp) => {
      Object.assign(markUp, { values: resp, meta });

      return markUp;
    });
};

export { generateData, defaultShow, markUp };
