import { useState, useEffect } from 'react';

import api from '../../api';
import { getCustomerName } from '../../services/helpers/customersHelper';

const useInvoiceTranslationsDetail = (id, nxState) => {
  const [isLoading, setLoading] = useState(true);

  const [cuInvoiceTranslation, setCurInvoiceTranslation] = useState(null);
  const [invoiceTranslation, setInvoiceTranslation] = useState(null);
  const [update, setUpdate] = useState(0);
  const [hasChanges, setHasChanges] = useState(false);
  const [customerName, setCustomerName] = useState(null);

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    const invoiceTranslationData = id !== 'add'
      ? api.getInvoiceTranslationById(id)
      : Promise.resolve({
        data: {
          customerId: nxState?.selectedCustomer?.id,
        },
      });
    invoiceTranslationData.then(({ data }) => {
      getCustomerName(data.customerId).then((name) => {
        if (!isCancelled) {
          setInvoiceTranslation({ ...data });
          setCurInvoiceTranslation({ ...data });
          setCustomerName(name);
          setLoading(false);
        }
      });
    })
      .catch(() => {
        if (!isCancelled) {
          setLoading(false);
        }
      });

    return () => { isCancelled = true; };
  }, [update]);

  useEffect(() => {
    setHasChanges(JSON.stringify(cuInvoiceTranslation) !== JSON.stringify(invoiceTranslation));

    return () => setHasChanges(false);
  }, [cuInvoiceTranslation]);

  return {
    setUpdate,
    cuInvoiceTranslation,
    setCurInvoiceTranslation,
    isLoading,
    hasChanges,
    invoiceTranslation,
    customerName,
  };
};

export default useInvoiceTranslationsDetail;
