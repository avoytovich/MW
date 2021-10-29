/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DetailPageWrapper from '../../components/utils/DetailPageWrapper';

import SubscriptionDetailsView from './SubscriptionDetailsView';
import api from '../../api';
import parentPaths from '../../services/paths';
import { getCustomerName } from '../../services/helpers/customersHelper';

import './subscriptionDetailsScreen.scss';

const SubscriptionDetailsScreen = () => {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [customerName, setCustomerName] = useState(null);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    setLoading(true);
    api
      .getSubscriptionById(id)
      .then(({ data }) => {
        setSubscription(data);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (subscription?.customerId) {
      getCustomerName(subscription?.customerId).then((name) => setCustomerName(name));
    }
  }, [subscription?.customerId]);

  return (
    <DetailPageWrapper
      nxStateNotNeeded
      id={id}
      name={subscription?.name}
      isLoading={isLoading}
      curParentPath={parentPaths.subscriptions}
      curData={subscription}
      addFunc={null}
      updateFunc={null}
      beforeSend={null}
    >
      <SubscriptionDetailsView customerName={customerName} subscription={subscription} />
    </DetailPageWrapper>
  );
};

export default SubscriptionDetailsScreen;
