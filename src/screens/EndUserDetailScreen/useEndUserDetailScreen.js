import { useState, useEffect } from 'react';

import { checkRequiredFields, generateOrders, generateEmails } from './utils';
import { structureSelectOptions } from '../../services/helpers/dataStructuring';
import localization from '../../localization';

import api from '../../api';

const useEndUserDetailScreen = (id) => {
  const [isLoading, setLoading] = useState(true);
  const [curEndUser, setCurEndUser] = useState(null);
  const [endUser, setEndUser] = useState(null);
  const [update, setUpdate] = useState(0);
  const [hasChanges, setHasChanges] = useState(false);
  const [selectOptions, setSelectOptions] = useState({ groups: null });
  const [orders, setOrders] = useState(null);
  const [emails, setEmails] = useState(null);
  const [consent, setConsent] = useState(null);

  const [invalidVatNumber, setInvalidVatNumber] = useState('');

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    const requestedData = api.getEnduserById(id);
    requestedData.then(({ data }) => {
      const promiseArray = [];
      if (!isCancelled) {
        const checkedData = checkRequiredFields(data);
        setEndUser({ ...checkedData });
        setCurEndUser({ ...checkedData });
        if (data.emails?.length) {
          const emailsTableData = generateEmails(data.emails);
          setEmails(emailsTableData);
        }
        const emailVale = encodeURIComponent(data.email).replace(new RegExp("'", 'g'), "''");
        promiseArray.push(
          api.getGroupsOptionsByCustomerId(data.customerId),
          api.getOrdersByEndUserId(data.enduserId),
          api.getConsents({ storeId: data.storeId, email: emailVale }),
        );
        if (data.company?.companyName !== '' && data.company?.vatNumber) {
          promiseArray.push(api.vatNumberCheck(data.company.vatNumber, data.country));
        }
        Promise.allSettled(promiseArray).then((
          [groupsOptions, ordersData, vatNumber, consentData],
        ) => {
          setSelectOptions({
            ...selectOptions,
            groups: structureSelectOptions({ options: groupsOptions.value?.data.items, optionValue: 'name' }) || [],
          });
          if (ordersData.value?.data.items?.length) {
            const orderTableData = generateOrders(ordersData.value?.data.items);
            setOrders(orderTableData);
          }
          if (consentData?.value?.data.items?.length) {
            setConsent(consentData);
          }
          if (vatNumber && vatNumber.status === 'rejected') {
            setInvalidVatNumber(localization.t('errorNotifications.invalidVatNumber'));
          }
          setLoading(false);
        });
      }
    })
      .catch(() => {
        if (!isCancelled) {
          setLoading(false);
        }
      });

    return () => { isCancelled = true; };
  }, [update]);

  useEffect(() => {
    setHasChanges(JSON.stringify(curEndUser) !== JSON.stringify(endUser));

    return () => setHasChanges(false);
  }, [curEndUser]);

  return {
    setUpdate,
    curEndUser,
    setCurEndUser,
    isLoading,
    hasChanges,
    endUser,
    selectOptions,
    orders,
    emails,
    invalidVatNumber,
    setInvalidVatNumber,
    consent,
  };
};

export default useEndUserDetailScreen;
