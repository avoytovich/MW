import moment from 'moment';
import { getCustomerName, getCustomerNameSync } from '../../services/helpers/customersHelper';
import localization from '../../localization';

const valueNotExists = '';
const defaultShow = {
  templateId: false,
  customer: true,
  name: true,
  version: true,
  store: true,
  lastUpdate: true,
  firstMailingDate: true,
  tags: true,
  locales: true,
  fallbackLanguage: true,
};

const markUp = {
  headers: [
    { value: localization.t('labels.templateId'), id: 'templateId' },
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
      value: localization.t('labels.version'),
      id: 'version',
      sortParam: 'version',
    },
    {
      value: localization.t('labels.store'),
      id: 'store',
    },
    {
      value: localization.t('labels.lastUpdate'),
      id: 'lastUpdate',
      sortParam: 'updateDate',
    },
    {
      value: localization.t('labels.firstMailingDate'),
      id: 'firstMailingDate',
      sortParam: 'firstMailingDate',
    },
    {
      value: localization.t('labels.tags'),
      id: 'tags',
      sortParam: 'tags',
    },
    {
      value: localization.t('labels.locales'),
      id: 'locales',
    },
    {
      value: localization.t('labels.fallbackLanguage'),
      id: 'fallbackLanguage',
    },

  ],
};

const generateData = (data, stores) => {
  const usedCustomers = [];

  const values = data.items.map(async (val) => {
    const store = stores.filter(
      (item) => item.id === val.storeId,
    )[0]?.name;
    const returnData = {
      id: val.id,
      templateId: val.id,
      customer: val.customerId,
      name: val.name || valueNotExists,
      version: val.version || valueNotExists,
      store: store || valueNotExists,
      lastUpdate: moment(val.updateDate).format('D MMM YYYY') || valueNotExists,
      firstMailingDate: moment(val.firstMailingDate).format('D MMM YYYY') || valueNotExists,
      tags: val?.tags?.length > 0 ? val.tags : valueNotExists,
      locales: val.templates ? Object.keys(val.templates) : valueNotExists,
      fallbackLanguage: val.fallbackLocale || valueNotExists,
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
