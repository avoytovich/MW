import { useState, useEffect } from 'react';
import api from '../../api';

const useIdentityDetailsData = (id, setLoading, needUpdate) => {
  const [identityData, setIdentityData] = useState();

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    api
      .getIdentityById(id)
      .then(({ data }) => {
        if (!isCancelled) {
          setIdentityData(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [needUpdate]);

  return identityData;
};

export default useIdentityDetailsData;
