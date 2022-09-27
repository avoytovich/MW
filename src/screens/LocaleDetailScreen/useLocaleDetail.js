import { useState, useEffect } from 'react';

import api from '../../api';

const useLocaleDetail = (id) => {
  const [isLoading, setLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  const [update, setUpdate] = useState(0);

  const [localeData, setLocaleData] = useState(null);

  const [curLocale, setCurLocale] = useState(null);
  useEffect(() => {
    let request;
    setLoading(true);

    if (id === 'add') {
      request = Promise.resolve({
        data: {
          label: '',
          code: '',
        },
      });
    } else {
      request = api.getLocaleById(id);
    }
    request.then(({ data }) => {
      setLocaleData(data);
      setCurLocale(data);
      setLoading(false);
    })
      .catch(() => {
        setLoading(false);
      });
  }, [update]);
  useEffect(() => {
    setHasChanges(
      JSON.stringify(curLocale) !== JSON.stringify(localeData),
    );
    return () => setHasChanges(false);
  }, [curLocale]);

  return {
    isLoading,
    localeData,
    curLocale,
    setCurLocale,
    hasChanges,
    setUpdate,
  };
};

export default useLocaleDetail;
