const discountObj = {
  publisherRefIds: [1],
  name: '',
  maxUsages: '',
  maxUsePerStore: '',
  maxUsePerEndUser: '',
  countries: ['AD'],
  parentProductIds: [1],
  productIds: [1],
  enduserId: '',
  storeIds: [1],
  codes: {},
  sources: ['MANUAL_RENEWAL'],
  endUserGroupIds: [1],
  endUserEmails: ['endUserEmail_1'],
  level: 'PRODUCT',
  model: 'CAMPAIGN',
  status: 'ENABLED',
  discountRate: '1',
  externalContext: 'testExternalContext',
  endDate: Date.now() + 6.048e8,
  endUserTypes: ['BUYER', 'RESELLER'],
  localizedLabels: {
    neutral: 'neutral LocalizedLabel',
    'fr-FR': 'fr- FR LocalizedLabel',
  },
};

const selectOptions = {
  refProducts: [{ id: 1, value: ' refProduct_1' }],
  endUserGroups: [{ id: 1, value: 'endUserGroup_1' }],
  countries: [{ id: 'AD', value: 'Andorra' }],
  endUsers: [],
  stores: [{ id: 1, value: 'store_1' }],
  parentProducts: [{ id: 1, value: 'parentProduct_1' }],
  discountProducts: [{ id: 1, value: ' discountProduct_1' }],
};
export { discountObj, selectOptions };
