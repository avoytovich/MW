import { useState, useEffect } from 'react';
import api from '../../api';

const useOnboardingDetails = (id) => {
  const [isLoading, setLoading] = useState(true);

  const [onboarding, setOnboarding] = useState(null);
  const [curOnboarding, setCurOnboarding] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [update, setUpdate] = useState(0);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    api.getOnboardingById(id)
      .then(({ data }) => {
        setOnboarding(JSON.parse(JSON.stringify(data)));
        setCurOnboarding(JSON.parse(JSON.stringify(data)));
        setLoading(false);

        const { customerId } = data;
        api.getCustomerById(customerId).then((res) => setCustomer(res.data));
      })
      .catch(() => {
        setLoading(false);
      });
  }, [update]);

  useEffect(() => {
    setHasChanges(JSON.stringify(curOnboarding) !== JSON.stringify(onboarding));

    return () => setHasChanges(false);
  }, [
    curOnboarding,
    onboarding,
  ]);

  return {
    isLoading,
    onboarding,
    curOnboarding,
    customer,
    hasChanges,
    setCurOnboarding,
    setUpdate,
  };
};

export default useOnboardingDetails;
