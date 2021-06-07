import { useState, useEffect } from 'react';

import {
  addDenialOptions,
  formPrivilegeOptions,
  requiredFields,
} from '../../screens/AdministrationDetailsScreens/RoleDetailScreen/utils';
import api from '../../api';

const useRoleDetailsData = (id, nxState) => {
  const [role, setRole] = useState(null);
  const [curRole, setCurRole] = useState(null);
  const [selectOptions, setSelectOptions] = useState({
    conditionsOfAvailability: null,
    privileges: null,
    serviceNames: null,
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    let roleRequest;
    if (id === 'add') {
      roleRequest = Promise.resolve({
        data: { customerId: nxState.selectedCustomer.id },
      });
    } else {
      roleRequest = api.getRoleById(id);
    }
    roleRequest.then(({ data }) => {
      const checkedRole = requiredFields(data);
      setRole(JSON.parse(JSON.stringify(checkedRole)));
      setCurRole(JSON.parse(JSON.stringify(checkedRole)));
    });
    Promise.allSettled([
      api.getConditionsOfAvailability(),
      api.getPrivileges(),
    ]).then(([conditionsOfAvailabilityOptions, clearancesOptions]) => {
      const clearances = formPrivilegeOptions(
        clearancesOptions.value?.data.items,
      );
      setSelectOptions({
        ...selectOptions,
        conditionsOfAvailability:
          addDenialOptions(conditionsOfAvailabilityOptions.value?.data) || [],
        privileges: clearances.privileges || [],
        serviceNames: clearances.serviceNames || [],
      });
    });
  }, [update]);

  useEffect(() => {
    setHasChanges(JSON.stringify(curRole) !== JSON.stringify(role));

    return () => setHasChanges(false);
  }, [curRole]);

  return {
    hasChanges,
    setUpdate,
    curRole,
    setCurRole,
    selectOptions,
  };
};

export default useRoleDetailsData;
