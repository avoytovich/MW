import { useState, useEffect } from 'react';

import { structureSelectOptions, notificationRequiredFields } from '../helpers/dataStructuring';

import api from '../../api';

const useNotificationDetail = (id, nxState) => {
  const [isLoading, setLoading] = useState(true);
  const [selectOptions, setSelectOptions] = useState({
    events: null,
    customers: null,
  });
  const [curNotification, setCurNotification] = useState(null);
  const [notification, setNotification] = useState(null);
  const [update, setUpdate] = useState(0);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    const notificationData = id !== 'add'
      ? api.getNotificationById(id)
      : Promise.resolve({
        data: {
          customerId: nxState?.selectedCustomer?.id,
        },
      });
    notificationData.then(({ data }) => {
      if (!isCancelled) {
        const checkedNotification = notificationRequiredFields(data);
        setNotification({ ...checkedNotification });
        setCurNotification({ ...checkedNotification });
        setLoading(false);
      }
      Promise.allSettled([
        api.getEventsOptions(),
        api.getCustomers(),
      ]).then(([eventsOptions, customersOptions]) => {
        setSelectOptions({
          ...selectOptions,
          events: structureSelectOptions({ options: eventsOptions.value?.data.items, optionValue: 'name' }) || [],
          customers: structureSelectOptions({ options: customersOptions.value?.data.items, optionValue: 'name' }) || [],
        });
      });
    })
      .catch(() => {
        if (!isCancelled) {
          setLoading(false);
        }
      });

    return () => { isCancelled = true; };
  }, [update]);

  useEffect(() => {
    setHasChanges(JSON.stringify(curNotification) !== JSON.stringify(notification));

    return () => setHasChanges(false);
  }, [curNotification]);

  return {
    setUpdate,
    curNotification,
    setCurNotification,
    isLoading,
    selectOptions,
    hasChanges,
    notification,
  };
};

export default useNotificationDetail;
