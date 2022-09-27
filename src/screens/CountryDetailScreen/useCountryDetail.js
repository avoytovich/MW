import { useState, useEffect } from 'react';

import api from '../../api';

const useCurrencyDetail = (id) => {
  const [isLoading, setLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  const [update, setUpdate] = useState(0);

  const [countryData, setCountryData] = useState(null);

  const [curCountry, setCurCountry] = useState(null);
  useEffect(() => {
    let request;
    setLoading(true);

    if (id === 'add') {
      request = Promise.resolve({
        data: {
          name: '',
          alpha2Code: '',
          alpha3Code: '',
          inEEC: false,
          numericCode: '',
          zipCodeStatus: 'OPTIONAL',
        },
      });
    } else {
      request = api.getCountryById(id);
    }
    request.then(({ data }) => {
      setCountryData(data);
      setCurCountry(data);
      setLoading(false);
    })
      .catch(() => {
        setLoading(false);
      });
  }, [update]);
  useEffect(() => {
    setHasChanges(
      JSON.stringify(curCountry) !== JSON.stringify(countryData),
    );
    return () => setHasChanges(false);
  }, [curCountry]);

  return {
    isLoading,
    countryData,
    curCountry,
    setCurCountry,
    hasChanges,
    setUpdate,
  };
};

export default useCurrencyDetail;
