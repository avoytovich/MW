import parentPaths from '../../services/paths';
import localization from '../../localization';
import { getCustomerName } from '../../services/helpers/customersHelper';

const emptyValue = '-';

const generateData = async (data) => {
  let customerOfUserName = emptyValue;
  let subjectCustomerName = emptyValue;
  if (data.who.customerId) {
    customerOfUserName = await getCustomerName(data.who.customerId);
  }
  if (data.what.customerId) {
    subjectCustomerName = await getCustomerName(data.what.customerId);
  }
  const res = {
    who: [
      {
        label: localization.t('labels.userName'),
        value: data.who.userName || emptyValue,
      },
      {
        label: localization.t('labels.customerOfUser'),
        value: customerOfUserName,
        shouldCopy: data.who.customerId,
        link: 'internal',
        path: `${parentPaths.customers}/${data.who.customerId}`,
      },
      {
        label: localization.t('labels.userId'),
        value: data.who.id || emptyValue,
        shouldCopy: data.who.id,
      },
      {
        label: localization.t('labels.userType'),
        value: data.who.userType || emptyValue,
      },
      {
        label: localization.t('labels.userIp'),
        value: data.who.ip || emptyValue,
        shouldCopy: data.who.ip,
      },
    ],
    what: [
      {
        label: localization.t('labels.subjectId'),
        value: data.what.id || emptyValue,
        shouldCopy: data.what.id,
      },
      {
        label: localization.t('labels.operation'),
        value: data.what.fact || emptyValue,
      },
      {
        label: localization.t('labels.subjectType'),
        value: data.what.type || emptyValue,
      },
      {
        label: localization.t('labels.subjectCustomer'),
        value: subjectCustomerName,
        shouldCopy: data.what.customerId,
        link: 'internal',
        path: `${parentPaths.customers}/${data.what.customerId}`,
      },
    ],
    where: [
      {
        label: localization.t('labels.platform'),
        value: data.where.platformName || emptyValue,
      },
      {
        label: localization.t('labels.service'),
        value: data.where.serviceName || emptyValue,
      },
    ],
  };

  return res;
};
export { generateData, emptyValue };
