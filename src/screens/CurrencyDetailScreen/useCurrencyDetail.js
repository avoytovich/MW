import { useState, useEffect } from 'react';

import api from '../../api';

const useCurrencyDetail = (id) => {
  const [isLoading, setLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  const [update, setUpdate] = useState(0);

  const [currencyData, setCurrencyData] = useState(null);

  const [curCurrency, setCurCurrency] = useState(null);
  useEffect(() => {
    let request;
    setLoading(true);

    if (id === 'add') {
      request = Promise.resolve({
        data: {
          name: '',
          code: '',
        },
      });
    } else {
      request = api.getCurrencyById(id);
    }
    request.then(({ data }) => {
      setCurrencyData(data);
      setCurCurrency(data);
      setLoading(false);
    })
      .catch(() => {
        setLoading(false);
      });
  }, [update]);
  useEffect(() => {
    setHasChanges(
      JSON.stringify(curCurrency) !== JSON.stringify(currencyData),
    );
    return () => setHasChanges(false);
  }, [curCurrency]);

  return {
    isLoading,
    currencyData,
    curCurrency,
    setCurCurrency,
    hasChanges,
    setUpdate,
  };
};

export default useCurrencyDetail;
