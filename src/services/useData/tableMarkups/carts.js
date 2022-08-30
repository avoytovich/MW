import moment from 'moment';
import { getCustomerName, getCustomerNameSync } from '../../helpers/customersHelper';
import localization from '../../../localization';

const defaultShow = {
  id: true,
  customer: true,
  createDate: true,
  updateDate: true,
  scheduledRemoval: true,
  store: true,
  source: true,
  emailAddress: true,
  firstName: true,
  lastName: true,
};
const markUp = {
  headers: [
    { value: localization.t('labels.cartId'), id: 'id' },
    {
      value: localization.t('labels.customer'),
      id: 'customer',
    },
    {
      value: localization.t('labels.creationDate'),
      id: 'createDate',
      sortParam: 'createDate',
    },
    {
      value: localization.t('labels.updateDate'),
      id: 'updateDate',
      sortParam: 'updateDate',
    },
    {
      value: localization.t('labels.scheduledRemoval'),
      id: 'scheduledRemoval',
      sortParam: 'scheduledRemoval',
    },
    {
      value: localization.t('labels.store'),
      id: 'store',
    },
    {
      value: localization.t('labels.source'),
      id: 'source',
    },
    { value: localization.t('labels.emailAddress'), id: 'emailAddress' },
    {
      value: localization.t('labels.firstName'),
      id: 'firstName',
    },
    {
      value: localization.t('labels.lastName'),
      id: 'lastName',
    },
  ],
};

const generateData = (data, stores) => {
  const usedCustomers = [];

  const values = data.items.map(async (val) => {
    const store = stores.items.filter(
      (item) => item.id === val.storeId,
    )[0]?.name;

    const returnData = {
      id: val.id,
      customer: val.customerId,
      createDate: val.createDate,
      updateDate: val.updateDate,
      scheduledRemoval: moment(val.scheduledSuppressionDate).format('D MMM YYYY'),
      store,
      source: val.source === 'PURCHASE' ? localization.t('labels.acquisition') : localization.t('labels.manualRenewal'),
      emailAddress: val.endUser.email,
      firstName: val.endUser.firstName,
      lastName: val.endUser.lastName,
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
