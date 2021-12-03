import moment from 'moment';
import parentPaths from '../../services/paths';
import { getCustomerName } from '../../services/helpers/customersHelper';

import localization from '../../localization';

const emptyValue = '-';

const generateData = async (subscription) => {
  let customerName = emptyValue;
  if (subscription.customerId) {
    customerName = await getCustomerName(subscription.customerId);
  }
  const res = {
    general: [
      { label: localization.t('labels.subscriptionId'), value: subscription.id || emptyValue, shouldCopy: subscription.id },
      {
        label: localization.t('labels.customer'),
        value: customerName || emptyValue,
        shouldCopy: subscription.customerId,
        link: 'internal',
        path: `${parentPaths.customers}/${subscription.customerId}`,
      },
      {
        label: localization.t('labels.creationDate'),
        value: moment(subscription.createDate).format('YYYY-MM-DD') || emptyValue,
      },
      {
        label: localization.t('labels.lastUpdate'),
        value: moment(subscription.updateDate).format('YYYY-MM-DD') || emptyValue,
      },
      {
        label: localization.t('labels.subscriptionName'),
        value: subscription.name || emptyValue,
      },
      {
        label: localization.t('labels.storeId'),
        value: subscription.storeId || emptyValue,
        shouldCopy: subscription.storeId,
        link: 'internal',
        path: `${parentPaths.stores}/${subscription.storeId}`,
      },
      {
        label: localization.t('labels.productId'),
        value: subscription?.products[0]?.lineItemId || emptyValue,
      },
    ],
    lifecycle: [
      {
        label: localization.t('labels.lifecycleId'),
        value: subscription?.lifecycle?.id || emptyValue,
        shouldCopy: subscription?.lifecycle?.id,
      },
      {
        label: localization.t('labels.status'),
        value: subscription?.lifecycle?.status || emptyValue,
      },
      {
        label: localization.t('labels.modelId'),
        value: subscription?.lifecycle?.modelId || emptyValue,
        shouldCopy: subscription?.lifecycle?.modelId,
      },
      {
        label: localization.t('labels.creationDate'),
        value: moment(subscription?.lifecycle?.creationDate).format('YYYY-MM-DD') || emptyValue,
      },
      {
        label: localization.t('labels.anniversaryDate'),
        value: moment(subscription?.lifecycle?.anniversaryDate).format('YYYY-MM-DD') || emptyValue,
      },
      {
        label: localization.t('labels.paymentDeadline'),
        value: moment(subscription?.lifecycle?.paymentDeadline).format('YYYY-MM-DD') || emptyValue,
      },
      {
        label: localization.t('labels.numDaysBeforeAnniversary'),
        value: subscription?.lifecycle?.daysBeforeAnniversary || emptyValue,
      },
      {
        label: localization.t('labels.nextBillingDate'),
        value: moment(subscription?.lifecycle?.nextBillingDate).format('YYYY-MM-DD') || emptyValue,
      },
    ],
  };

  return res;
};

export { generateData, emptyValue };
