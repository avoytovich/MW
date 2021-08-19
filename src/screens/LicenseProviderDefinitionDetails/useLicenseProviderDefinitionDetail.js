import { useState, useEffect } from 'react';

import { checkRequiredFields } from './utils';

import api from '../../api';

const useLicenseProviderDefinitionDetail = (id, nxState) => {
  const [isLoading, setLoading] = useState(true);
  const [curLicenseProvider, setCurLicenseProvider] = useState(null);
  const [licenseProvider, setLicenseProvider] = useState(null);
  const [update, setUpdate] = useState(0);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    const requestedData = id !== 'add'
      ? api.getLicenseProviderDefinitionById(id)
      : Promise.resolve({
        data: {
          customerId: nxState.selectedCustomer.id,
        },
      });
    requestedData.then(({ data }) => {
      if (!isCancelled) {
        const checkedData = checkRequiredFields(data);
        setLicenseProvider({ ...checkedData });
        setCurLicenseProvider({ ...checkedData });
        setLoading(false);
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
    setHasChanges(JSON.stringify(curLicenseProvider) !== JSON.stringify(licenseProvider));

    return () => setHasChanges(false);
  }, [curLicenseProvider]);

  return {
    setUpdate,
    curLicenseProvider,
    setCurLicenseProvider,
    isLoading,
    hasChanges,
    licenseProvider,
  };
};

export default useLicenseProviderDefinitionDetail;
