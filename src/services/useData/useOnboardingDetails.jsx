import { useEffect, useState } from 'react';
import api from '../../api';

const useOnboardingDetails = (id) => {
  const [isLoading, setLoading] = useState(true);

  const [onboarding, setOnboarding] = useState(null);
  const [curOnboarding, setCurOnboarding] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [curCustomer, setCurCustomer] = useState(null);
  const [customerHasChanges, setCustomerHasChanges] = useState(null);
  const [update, setUpdate] = useState(0);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    api.getOnboardingById(id)
      .then(({ data }) => {
        setOnboarding(JSON.parse(JSON.stringify(data)));
        setCurOnboarding(JSON.parse(JSON.stringify(data)));
        setLoading(false);

        const { customerId } = data;
        api.getCustomerById(customerId).then((res) => {
          setCustomer(JSON.parse(JSON.stringify(res.data)));
          setCurCustomer(JSON.parse(JSON.stringify(res.data)));
        });
      })
      .catch(() => {
        setLoading(false);
      });
  }, [update]);

  useEffect(() => {
    setHasChanges(JSON.stringify(curOnboarding) !== JSON.stringify(onboarding));
    setCustomerHasChanges(JSON.stringify(curCustomer) !== JSON.stringify(customer));

    return () => {
      setHasChanges(false);
      setCustomerHasChanges(false);
    };
  }, [
    curOnboarding,
    onboarding,
    curCustomer,
    customer,
  ]);

  return {
    isLoading,
    onboarding,
    curOnboarding,
    setCurCustomer,
    customer,
    curCustomer,
    hasChanges,
    customerHasChanges,
    setCurOnboarding,
    setUpdate,
  };
};

export default useOnboardingDetails;
