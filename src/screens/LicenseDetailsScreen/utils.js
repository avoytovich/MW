import parentPaths from '../../services/paths';
import { getCustomerName } from '../../services/helpers/customersHelper';

import localization from '../../localization';

const emptyValue = '-';

const generateGeneralData = async (license) => {
  let customerName = emptyValue;
  if (license.customerId) {
    customerName = await getCustomerName(license.customerId);
  }
  const res = {
    general: [
      {
        label: localization.t('labels.licenseId'),
        value: license.id,
        shouldCopy: license.id,
      },
      { label: localization.t('labels.status'), value: license.status || emptyValue },
      {
        label: localization.t('labels.customer'),
        value: customerName,
        link: 'internal',
        shouldCopy: license.customerId,
        path: `${parentPaths.customers}/${license.customerId}`,
      },
      { label: localization.t('labels.orderId'), value: license.checkout.orderId || emptyValue },
      { label: localization.t('labels.orderLineId'), value: license.checkout.orderLineId || emptyValue },
    ],
    user: [
      { label: localization.t('labels.firstName'), value: license.user.firstName || emptyValue },
      { label: localization.t('labels.lastName'), value: license.user.lastName || emptyValue },
      { label: localization.t('labels.email'), value: license.user.email || emptyValue },
      { label: localization.t('labels.city'), value: license.user.city || emptyValue },
      { label: localization.t('labels.zipCode'), value: license.user.zipCode || emptyValue },
      { label: localization.t('labels.country'), value: license.user.country || emptyValue },
      { label: localization.t('labels.locale'), value: license.user.locale || emptyValue },
    ],
    product: [
      { label: localization.t('labels.productId'), value: license.product.id || emptyValue },
      { label: localization.t('labels.licenseProviderDefinitionId'), value: license.product.licenseProviderDefinitionId || emptyValue },
      { label: localization.t('labels.publisherProductId'), value: license.product.publisherProductId || emptyValue },
      { label: localization.t('labels.name'), value: license.product.name || emptyValue },
    ],
  };

  return res;
};

export { generateGeneralData, emptyValue };
