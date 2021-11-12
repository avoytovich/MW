import { useState, useEffect } from 'react';

import {
  requiredFields,
  structureSelectOptions,
} from '../../screens/AdministrationDetailsScreens/MetaRoleDetailScreen/utils';
import api from '../../api';

const useMetaRoleDetailData = (id, nxState) => {
  const [update, setUpdate] = useState(0);
  const [isLoading, setLoading] = useState(true);

  const [metaRole, setMetaRole] = useState(null);
  const [curMetaRole, setCurMetaRole] = useState(null);
  const [selectOptions, setSelectOptions] = useState({
    roles: null,
  });
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    let metaRoleRequest;
    setLoading(true);

    if (id === 'add') {
      metaRoleRequest = Promise.resolve({
        data: { customerId: nxState.selectedCustomer?.id },
      });
    } else {
      metaRoleRequest = api.getMetaRoleById(id);
    }
    metaRoleRequest.then(({ data }) => {
      const checkedMetaRole = requiredFields(data);
      setMetaRole(JSON.parse(JSON.stringify(checkedMetaRole)));
      setCurMetaRole(JSON.parse(JSON.stringify(checkedMetaRole)));
      setLoading(false);
    })
      .catch(() => {
        setLoading(false);
      });
    api.getRoles({ size: 500 }).then(({ data }) => setSelectOptions({
      ...selectOptions,
      roles: structureSelectOptions(data.items) || [],
    }));
  }, [update]);

  useEffect(() => {
    setHasChanges(JSON.stringify(curMetaRole) !== JSON.stringify(metaRole));

    return () => setHasChanges(false);
  }, [curMetaRole]);
  return {
    curMetaRole,
    setUpdate,
    metaRole,
    hasChanges,
    setCurMetaRole,
    selectOptions,
    isLoading,
  };
};

export default useMetaRoleDetailData;
