import moment from 'moment';
import { getCustomerName } from '../../helpers/customersHelper';
import localization from '../../../localization';

const defaultShow = {
  id: false,
  customer: true,
  discountRuleName: true,
  model: true,
  status: true,
  discountAmount: true,
  startDate: true,
  endDate: true,
  maximumUses: true,
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
    { value: localization.t('labels.sources'), id: 'sources' },
  ],
};

const generateData = (data) => {
  const values = data.items.map(async (val) => {
    const returnData = {
      id: val.id,
      customer: val.customerId,
      discountRuleName: val.name,
      model: val.model.replaceAll('_', ' '),
      status: val.status,
      discountAmount: val.discountRate ? `${val.discountRate * 100}%` : null,
      startDate: moment(val.startDate).format('D MMM YYYY'),
      endDate: moment(val.endDate).format('D MMM YYYY'),
      maximumUses: val.maxUsages,
      sources: val.sources ? val.sources.join(', ') : null,
    };

    if (val.customerId) {
      const name = await getCustomerName(val.customerId);
      return { ...returnData, customer: name };
    }

    return returnData;
  });

  const meta = {
    totalPages: data.totalPages,
  };

  return Promise
    .all(values)
    .then((resp) => {
      Object.assign(markUp, { values: resp, meta });

      return markUp;
    });
};

export { generateData, defaultShow, markUp };
