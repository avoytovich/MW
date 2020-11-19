import { useState, useEffect } from 'react';

const useDetailsData = (setLoading, requests, needUpdate) => {
  const [fetchedData, setFetchedData] = useState();

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);

    requests()
      .then((payload) => {
        if (!isCancelled) {
          setFetchedData(payload);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setLoading(false);
        }
      });

    return () => { isCancelled = true; };
  }, [needUpdate]);

  return fetchedData;
};

export default useDetailsData;
