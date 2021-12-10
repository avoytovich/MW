import { useState, useEffect } from 'react';

import { checkRequiredFields, parametersToObj } from './utils';
import { getCustomerName } from '../../services/helpers/customersHelper';
import api from '../../api';

const usePriceFunctionDetail = (id, nxState) => {
  const [isLoading, setLoading] = useState(true);

  const [curPriceFunction, setCurPriceFunction] = useState(null);
  const [priceFunction, setPriceFunction] = useState(null);
  const [update, setUpdate] = useState(0);
  const [hasChanges, setHasChanges] = useState(false);
  const [parameters, setParameters] = useState(null);
  const [curParameters, setCurParameters] = useState(null);

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    const productsPriceFunctionData = id !== 'add'
      ? api.getProductsPriceFunctionById(id)
      : Promise.resolve({
        data: {
          customerId: nxState?.selectedCustomer?.id,
        },
      });
    productsPriceFunctionData.then(({ data }) => {
      if (!isCancelled) {
        getCustomerName(data.customerId).then((customerName) => {
          const checkedData = checkRequiredFields(data, customerName);
          const parametersData = parametersToObj(data.parameters);
          setCurParameters({ ...parametersData });
          setParameters({ ...parametersData });
          setPriceFunction({ ...checkedData });
          setCurPriceFunction({ ...checkedData });
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
  }, [update]);

  useEffect(() => {
    setHasChanges((JSON.stringify(curPriceFunction)
      !== JSON.stringify(priceFunction)) || (JSON.stringify(curParameters)
        !== JSON.stringify(parameters)));
    return () => setHasChanges(false);
  }, [curPriceFunction, curParameters]);

  return {
    setUpdate,
    curPriceFunction,
    setCurPriceFunction,
    isLoading,
    hasChanges,
    priceFunction,
    curParameters,
    setCurParameters,
  };
};

export default usePriceFunctionDetail;
