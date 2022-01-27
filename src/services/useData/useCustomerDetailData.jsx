import { useState, useEffect } from 'react';
import { structureSelectOptions } from '../helpers/dataStructuring';
import {
  checkRequiredFields,
  formatPaymentOptions,
} from '../../screens/CustomerDetailScreen/utils';
import api from '../../api';

const useCustomerDetailData = (id) => {
  const [isLoading, setLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  const [update, setUpdate] = useState(0);
  const [selectOptions, setSelectOptions] = useState({
    subscriptions: null,
    fulfillments: null,
    additionalPaymentTypes: null,
    blackPaymentTypes: null,
    forcedPaymentTypes: null,
  });
  const [customerData, setCustomerData] = useState(null);

  const [currentCustomer, setCurrentCustomer] = useState(null);
  useEffect(() => {
    let customerRequest;
    setLoading(true);

    const createCustomer = id === 'add';
    if (id === 'add') {
      customerRequest = Promise.resolve({
        data: {},
      });
    } else {
      customerRequest = api.getCustomerById(id);
    }
    customerRequest.then(({ data }) => {
      const checkedData = checkRequiredFields(data, createCustomer);
      setCustomerData(checkedData);
      setCurrentCustomer(checkedData);
      setLoading(false);

      Promise.allSettled([
        api.getSubscriptionsOptions(),
        api.getFulfillmentsOptions(),
        api.getPaymentConfigOptions(),
      ]).then(([subscriptionsOptions, fulfillmentsOptions, paymentTypesOptions]) => {
        const allPayments = formatPaymentOptions(paymentTypesOptions.value?.data.paymentTypes);
        setSelectOptions({
          ...selectOptions,
          subscriptions: structureSelectOptions({ options: subscriptionsOptions.value?.data.items, optionValue: 'code' }) || [],
          fulfillments: structureSelectOptions({ options: fulfillmentsOptions.value?.data.items, optionValue: 'name' }) || [],
          additionalPaymentTypes: allPayments.additional || [],
          blackPaymentTypes: allPayments.black || [],
          forcedPaymentTypes: allPayments.forced || [],
        });
      });
    })
      .catch(() => {
        setLoading(false);
      });
  }, [update]);
  useEffect(() => {
    setHasChanges(
      JSON.stringify(currentCustomer) !== JSON.stringify(customerData),
    );
    return () => setHasChanges(false);
  }, [currentCustomer]);

  return {
    isLoading,
    customerData,
    currentCustomer,
    setCurrentCustomer,
    hasChanges,
    setUpdate,
    selectOptions,
  };
};

export default useCustomerDetailData;
