import moment from 'moment';

import { getCustomerName, getCustomerNameSync } from '../../services/helpers/customersHelper';
import localization from '../../localization';

const emptyField = '-';
const defaultShow = {
  id: false,
  date: true,
  userName: true,
  userId: true,
  userType: true,
  customerOfUser: true,
  operation: true,
  userIp: true,
  subjectType: true,
  subjectId: true,
  subjectCustomer: true,
  platform: true,
  service: true,
  reasonOfOperation: true,
};

const markUp = {
  headers: [
    { value: localization.t('labels.id'), id: 'id' },

    { value: localization.t('labels.date'), id: 'date', sortParam: 'when' },
    { value: localization.t('labels.userName'), id: 'userName', sortParam: 'who.userName' },
    { value: localization.t('labels.userId'), id: 'userId' },
    { value: localization.t('labels.userType'), id: 'userType' },
    { value: localization.t('labels.customerOfUser'), id: 'customerOfUser' },
    { value: localization.t('labels.operation'), id: 'operation' },
    { value: localization.t('labels.userIp'), id: 'userIp' },
    { value: localization.t('labels.subjectType'), id: 'subjectType' },
    { value: localization.t('labels.subjectId'), id: 'subjectId' },
    { value: localization.t('labels.subjectCustomer'), id: 'subjectCustomer' },
    { value: localization.t('labels.platform'), id: 'platform' },
    { value: localization.t('labels.service'), id: 'service' },
    { value: localization.t('labels.reasonOfOperation'), id: 'reasonOfOperation' },
  ],
};

const generateData = (data) => {
  const usedCustomers = [];

  const values = data.items.map(async (val) => {
    const returnData = {
      id: val.id,
      date: moment(val.when).format('D MMM YYYY'),
      userName: val.who?.userName || emptyField,
      userId: val.who?.id || emptyField,
      userType: val.who?.type || emptyField,
      customerOfUser: val.who?.customerId || emptyField,
      operation: val.what?.fact || emptyField,
      userIp: val.who?.ip || emptyField,
      subjectType: val.what?.type || emptyField,
      subjectId: val.what?.id || emptyField,
      subjectCustomer: val.what?.customerId || emptyField,
      platform: val.where?.platformName || emptyField,
      service: val.where?.serviceName || emptyField,
      reasonOfOperation: val.why?.reason || emptyField,
    };

    if (val?.customerOfUser && usedCustomers.indexOf(val.customerOfUser) < 0) {
      usedCustomers.push(val.customerOfUser);
    }

    if (val?.subjectCustomer && usedCustomers.indexOf(val.subjectCustomer) < 0) {
      usedCustomers.push(val.subjectCustomer);
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
            const customerOfUserName = getCustomerNameSync(r?.customerOfUser);
            const subjectCustomerName = getCustomerNameSync(r?.subjectCustomer);

            return {
              ...r,
              customerOfUser: customerOfUserName,
              subjectCustomer: subjectCustomerName,
            };
          }),
          meta,
        }));

      return markUp;
    });
};

export { generateData, defaultShow, markUp };
