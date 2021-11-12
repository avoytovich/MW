import { useState, useEffect } from 'react';

import api from '../../../api';

const usePrivilegeDetailsData = (id, nxState) => {
  const [isLoading, setLoading] = useState(true);
  const [privilege, setPrivilege] = useState(null);
  const [curPrivilege, setCurPrivilege] = useState(null);

  const [hasChanges, setHasChanges] = useState(false);
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    let request;
    setLoading(true);
    if (id === 'add') {
      request = Promise.resolve({
        data: {
          customerId: nxState.selectedCustomer?.id,
          availableActions: [],
        },
      });
    } else {
      request = api.getPrivilegeById(id);
    }
    request.then(({ data }) => {
      setPrivilege(JSON.parse(JSON.stringify(data)));
      setCurPrivilege(JSON.parse(JSON.stringify(data)));
      setLoading(false);
    })
      .catch(() => {
        setLoading(false);
      });
  }, [update]);

  useEffect(() => {
    setHasChanges(JSON.stringify(curPrivilege) !== JSON.stringify(privilege));

    return () => setHasChanges(false);
  }, [curPrivilege]);

  return {
    hasChanges,
    setUpdate,
    curPrivilege,
    setCurPrivilege,
    privilege,
    isLoading,
  };
};

export default usePrivilegeDetailsData;
