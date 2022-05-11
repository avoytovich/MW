import moment from 'moment';
import api from '../../../api';

const keyName = {
  discountrules: 'discountRuleName',
  recommendations: 'ruleName',
};
const sections = {
  discountrules: { general: true, cappingAndLimits: true, eligibility: true },
  recommendations: {
    general: true, eligibility: true, cappingAndLimits: true, recommendations: true,
  },
};
const duplicateParamsByScope = {
  discountrules: {
    sections: {
      general: ['status', 'discountRate', 'amountByCurrency', 'applyOnNetPrice', 'model', 'codes', 'externalContext', 'localizedLabels'],
      cappingAndLimits: ['maxUsages', 'maxUsePerEndUser', 'maxUsePerStore', 'startDate', 'endDate'],
      eligibility: ['endUserTypes', 'sources', 'endUserGroupIds', 'enduserId',
        'endUserEmails', 'countries', 'storeIds', 'parentProductIds',
        'productIds', 'publisherRefIds', 'thresholds'],
    },
    needsToBeDeleted: [
      'createDate',
      'cumulative',
      'dbVersion',
      'lastUpdateReason',
      'testOrder',
      'updateDate',
      'weight',
      'id',
    ],
    requiresFields: {
      discountRate: 0.1,
      endDate: moment.utc(Date.now() + 6.048e8).utc().format(),
      endUserTypes: ['BUYER', 'RESELLER'],
      level: 'PRODUCT',
      model: 'CAMPAIGN',
      status: 'ENABLED',
    },
    api: { get: api.getDiscountById, post: api.addNewDiscount },
  },
  recommendations: {
    sections: {
      general: ['status', 'weight', 'fallbackLocale', 'type', 'levels', 'sources'],
      eligibility: ['eligibleStoreIds', 'eligibleProductIds', 'eligibleParentProductIds'],
      cappingAndLimits: ['startDate', 'endDate'],
      recommendations: ['function', 'productIds', 'byProductIds', 'byParentProductIds'],
    },
    needsToBeDeleted: [
      'createDate',
      'dbVersion',
      'lastUpdateReason',
      'updateDate',
      'id',
    ],
    requiresFields: {
      function: 'idToIdsRecoRule',
      levels: ['PRODUCT'],
      sources: ['PURCHASE'],
      status: 'ENABLED',
      weight: 0,
      type: 'CROSS_SELL',
    },
    api: { get: api.getRecoById, post: api.addNewRecommendation },
  },
};
const formateFunc = {
  discountrules: (data) => {
    const resData = { ...data };
    if (data.amountByCurrency) {
      delete resData.discountRate;
    }
    return resData;
  },
};

// eslint-disable-next-line no-confusing-arrow
const beforeSendFormate = (scope, data) => formateFunc[scope] ? formateFunc[scope](data) : data;

export {
  duplicateParamsByScope,
  sections,
  beforeSendFormate,
  keyName,
};
