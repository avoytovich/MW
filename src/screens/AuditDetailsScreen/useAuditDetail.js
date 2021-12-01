import { useState, useEffect } from 'react';
import api from '../../api';
import { generateData } from './utils';

const useAuditDetail = (id) => {
  const [isLoading, setLoading] = useState(true);
  const [audit, setAudit] = useState(null);
  const [details, setDetails] = useState(null);
  useEffect(() => {
    let isCancelled = false;
    setLoading(true);

    api.getAuditById(id).then(({ data }) => {
      if (!isCancelled) {
        generateData(data).then((res) => {
          setAudit({ ...data });
          setDetails(res);
          setLoading(false);
        });
      }
    })
      .catch(() => {
        if (!isCancelled) {
          setLoading(false);
        }
      });

    return () => { isCancelled = true; };
  }, []);

  return {
    isLoading,
    audit,
    details,
  };
};

export default useAuditDetail;
