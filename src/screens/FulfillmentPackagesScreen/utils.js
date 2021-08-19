import api from '../../api';
import { generateData as generateAutoFulfillments, defaultShow as defaultShowAutoFulfillments } from '../../services/useData/tableMarkups/autoFulfillments';
import { generateData as generateManualFulfillments, defaultShow as defaultShowManualFulfillments } from '../../services/useData/tableMarkups/manualFulfillments';
import { generateData as generateLicenseProviderDefinitions, defaultShow as defaultShowLicenseProviderDefinitions, markUp as markUpLicenseProviderDefinitions } from '../../services/useData/tableMarkups/licenseProviderDefinitions';
import localization from '../../localization';
import parentPaths from '../../services/paths';

const getCustomers = async (data, key) => {
  const costumersIds = [];
  data.items.forEach((item) => {
    if (item[key] && !costumersIds.includes(item[key])) {
      const searchVal = encodeURIComponent(item[key]);
      const id = searchVal.replace(new RegExp("'", 'g'), "''");
      const costumer = `id=${id}`;
      costumersIds.push(costumer);
    }
  });
  const result = await api.getCustomersByIds(costumersIds.join('&'));
  return result;
};

const tabsData = [
  {
    label: 'autoFulfillments',
    path: `${parentPaths.fulfillment}/autoFulfillments`,
    request: api.getAutoFulfillments,
    sortKey: 'autoFulfillments',
    secondaryRequest: (data) => getCustomers(data, 'customerId'),
    generateData: generateAutoFulfillments,
    defaultShow: defaultShowAutoFulfillments,
    noActions: true,
    scope: 'autoFulfillments',
    headers: null,
  },
  {
    label: 'manualFulfillments',
    noActions: true,
    path: `${parentPaths.fulfillment}/manualFulfillments`,
    request: api.getManualFulfillments,
    generateData: generateManualFulfillments,
    defaultShow: defaultShowManualFulfillments,
    secondaryRequest: (data) => getCustomers(data, 'publisherId'),
    sortKey: 'manualFulfillments',
    scope: 'manualFulfillments',
    headers: null,
  },
  {
    label: 'licenseProviderDefinitions',
    path: `${parentPaths.fulfillment}/licenseProviderDefinitions`,
    button: `${localization.t('general.add')} ${localization.t(
      'labels.licenseProviderDefinition',
    )}`,
    request: api.getLicenseProviderDefinitions,
    secondaryRequest: (data) => getCustomers(data, 'customerId'),
    sortKey: 'licenseProviderDefinitions',
    generateData: generateLicenseProviderDefinitions,
    defaultShow: defaultShowLicenseProviderDefinitions,
    scope: 'licenseProviderDefinitions',
    deleteFunc: api.deleteLicenseProviderDefinitionById,
    headers: markUpLicenseProviderDefinitions.headers,
  },
];

export default tabsData;
