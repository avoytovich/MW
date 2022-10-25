import { useState, useEffect } from 'react';

import api from '../../api';

const useCurrencyDetail = (id) => {
  const [isLoading, setLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  const [update, setUpdate] = useState(0);

  const [subsidiaryData, setSubsidiaryData] = useState(null);

  const [curSubsidiary, setCurSubsidiary] = useState(null);
  useEffect(() => {
    let request;
    setLoading(true);

    if (id === 'add') {
      request = Promise.resolve({
        data: {
          name: '',
          subsidiaryId: '',
          legalName: '',
        },
      });
    } else {
      request = api.getSubsidiaryById(id);
    }
    request.then(({ data }) => {
      setSubsidiaryData(data);
      setCurSubsidiary(data);
      setLoading(false);
    })
      .catch(() => {
        setLoading(false);
      });
  }, [update]);

  useEffect(() => {
    setHasChanges(
      JSON.stringify(curSubsidiary) !== JSON.stringify(subsidiaryData),
    );
    return () => setHasChanges(false);
  }, [curSubsidiary]);

  return {
    isLoading,
    subsidiaryData,
    curSubsidiary,
    setCurSubsidiary,
    hasChanges,
    setUpdate,
  };
};

export default useCurrencyDetail;
