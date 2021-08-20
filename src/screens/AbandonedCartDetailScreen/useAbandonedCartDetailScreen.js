import { useState, useEffect } from 'react';

import { checkRequiredFields } from './utils';

import api from '../../api';

const useAbandonedCartDetailScreen = (id, nxState) => {
  const [isLoading, setLoading] = useState(true);

  const [curAbandonedCart, setCurAbandonedCart] = useState(null);
  const [abandonedCart, setAbandonedCart] = useState(null);
  const [update, setUpdate] = useState(0);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    const abandonedCartData = id !== 'add'
      ? api.getAbandonedCartById(id)
      : Promise.resolve({
        data: {
          customerId: nxState?.selectedCustomer?.id,
        },
      });
    abandonedCartData.then(({ data }) => {
      if (!isCancelled) {
        const checkedData = checkRequiredFields(data);
        setAbandonedCart({ ...checkedData });
        setCurAbandonedCart({ ...checkedData });
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
    setHasChanges(JSON.stringify(curAbandonedCart) !== JSON.stringify(abandonedCart));

    return () => setHasChanges(false);
  }, [curAbandonedCart]);

  return {
    setUpdate,
    curAbandonedCart,
    setCurAbandonedCart,
    isLoading,
    hasChanges,
    abandonedCart,
  };
};

export default useAbandonedCartDetailScreen;
