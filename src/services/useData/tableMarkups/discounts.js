import moment from 'moment';
import { getCustomerName, getCustomerNameSync } from '../../helpers/customersHelper';
import localization from '../../../localization';

const defaultShow = {
  customer: true,
  discountRuleName: true,
  discountRuleId: true,
  model: true,
  status: true,
  creationDate: true,
  lastUpdate: true,
  discountAmount: true,
  startDate: true,
  endDate: true,
  maximumUses: true,
  maximumUsesPerStore: true,
  maximumUsesPerEndUser: true,
  sources: true,
};

const markUp = {
  headers: [
    { value: localization.t('labels.customer'), id: 'customer' },
    {
      value: localization.t('labels.discountRuleName'),
      id: 'discountRuleName',
      sortParam: 'name',
    },
    { value: localization.t('labels.discountRuleId'), id: 'discountRuleId' },
    {
      value: localization.t('labels.model'),
      id: 'model',
      sortParam: 'model',
    },
    {
      value: localization.t('labels.status'),
      id: 'status',
      sortParam: 'status',
    },
    {
      value: localization.t('labels.creationDate'),
      id: 'creationDate',
      sortParam: 'createDate',
    },
    {
      value: localization.t('labels.lastUpdate'),
      id: 'lastUpdate',
      sortParam: 'updateDate',
    },
    {
      value: localization.t('labels.discountAmount'),
      id: 'discountAmount',
      sortParam: 'discountRate',
    },
    {
      value: localization.t('labels.startDate'),
      id: 'startDate',
      sortParam: 'startDate',
    },
    {
      value: localization.t('labels.endDate'),
      id: 'endDate',
      sortParam: 'endDate',
    },
    {
      value: localization.t('labels.maximumUses'),
      id: 'maximumUses',
      sortParam: 'maxUsages',
    },

    {
      value: localization.t('labels.maximumUsesPerStore'),
      id: 'maximumUsesPerStore',
      sortParam: 'maxUsePerStore',
    },

    {
      value: localization.t('labels.maximumUsesPerEndUser'),
      id: 'maximumUsesPerEndUser',
      sortParam: 'maxUsePerEndUser',
    },
    { value: localization.t('labels.sources'), id: 'sources' },
  ],
};

const generateData = (data) => {
  const usedCustomers = [];

  const values = data.items.map(async (val) => {
    const returnData = {
      id: val.id,
      discountRuleId: val.id,
      customer: val.customerId,
      discountRuleName: val.name,
      model: val.model.replaceAll('_', ' '),
      status: val.status,
      creationDate: moment(val.createDate).format('D MMM YYYY'),
      lastUpdate: moment(val.updateDate).format('D MMM YYYY'),
      discountAmount: val.discountRate ? `${val.discountRate * 100}%` : null,
      startDate: moment(val.startDate).format('D MMM YYYY'),
      endDate: moment(val.endDate).format('D MMM YYYY'),
      maximumUses: val.maxUsages,
      maximumUsesPerStore: val.maxUsePerStore || '-',
      maximumUsesPerEndUser: val.maxUsePerEndUser || '-',
      sources: val.sources ? val.sources.join(', ') : null,
    };

    if (val?.customerId && usedCustomers.indexOf(val.customerId) < 0) {
      usedCustomers.push(val.customerId);
    }

    return returnData;
  });

  const meta = {
    totalPages: data.totalPages,
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
