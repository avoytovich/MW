import { useState, useEffect } from 'react';
import api from '../../api';
import { structureSelectOptions, realmRequiredFields } from '../helpers/dataStructuring';

const useRealmsDetails = (id, nxState) => {
  const [isLoading, setLoading] = useState(true);
  const [selectOptions, setSelectOptions] = useState({
    customers: null,
  });
  const [curRealm, setCurRealm] = useState(null);
  const [realms, setRealms] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [update, setUpdate] = useState(0);
  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    const realmData = id !== 'add'
      ? api.getRealmById(id)
      : Promise.resolve({
        data: {
          customerId: nxState.selectedCustomer.id,
        },
      });
    realmData.then(({ data }) => {
      if (!isCancelled) {
        const checkedRealm = realmRequiredFields(data);
        setRealms({ ...checkedRealm });
        setCurRealm({ ...checkedRealm });
        setLoading(false);
      }
      if (id !== 'add') {
        Promise.allSettled([
          api.getCustomers(),
        ]).then(([customersOptions]) => {
          setSelectOptions({
            ...selectOptions,
            customers: structureSelectOptions({ options: customersOptions.value?.data.items, optionValue: 'name' }) || [],
          });
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
    setHasChanges(JSON.stringify(curRealm) !== JSON.stringify(realms));

    return () => setHasChanges(false);
  }, [curRealm]);

  return {
    isLoading,
    realms,
    setRealms,
    curRealm,
    hasChanges,
    setCurRealm,
    setUpdate,
    selectOptions,
    setSelectOptions,
  };
};

export default useRealmsDetails;
