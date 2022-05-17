import { useState, useEffect } from 'react';

import { structureSelectOptions, identityRequiredFields } from '../helpers/dataStructuring';

import api from '../../api';

const useIdentityDetails = (id, nxState) => {
  const [isLoading, setLoading] = useState(true);
  const [selectOptions, setSelectOptions] = useState({
    roles: null,
    metaRoles: null,
    customers: null,
  });
  const [identityType, setIdentityType] = useState('user');
  const [curIdentity, setCurIdentity] = useState(null);
  const [identity, setIdentity] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [update, setUpdate] = useState(0);
  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    const identityData = id !== 'add'
      ? api.getIdentityById(id)
      : Promise.resolve({
        data: {
          customerId: nxState.selectedCustomer?.id,
        },
      });
    identityData.then(({ data }) => {
      if (!isCancelled) {
        const checkedIdentity = identityRequiredFields(data);
        setIdentity({ ...checkedIdentity });
        setCurIdentity({ ...checkedIdentity });
        setLoading(false);
        if (data.clientId) {
          setIdentityType('application');
        }
      }
      if (id !== 'add') {
        Promise.allSettled([
          api.getRoleById(`usableForIdentity/${id}`),
          api.getMetaRoles({ filters: `&customerId=${data.customerId}` }),
          api.getCustomers(),
        ]).then(([rolesOptions, metaRolesOptions, customersOptions]) => {
          setSelectOptions({
            ...selectOptions,
            roles: structureSelectOptions({ options: rolesOptions.value?.data.items, optionValue: 'name' }) || [],
            metaRoles: structureSelectOptions({ options: metaRolesOptions.value?.data.items, optionValue: 'name' }) || [],
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
    setHasChanges(JSON.stringify(curIdentity) !== JSON.stringify(identity));

    return () => setHasChanges(false);
  }, [curIdentity]);

  return {
    setUpdate,
    curIdentity,
    isLoading,
    identityType,
    setIdentityType,
    setCurIdentity,
    hasChanges,
    selectOptions,
  };
};

export default useIdentityDetails;
