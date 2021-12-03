/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DetailPageWrapper from '../../components/utils/DetailPageWrapper';

import SubscriptionDetailsView from './SubscriptionDetailsView';
import api from '../../api';
import parentPaths from '../../services/paths';
import { generateData } from './utils';
import './subscriptionDetailsScreen.scss';

const SubscriptionDetailsScreen = () => {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState(null);
  const [subscriptionName, setSubscriptionName] = useState(null);
  useEffect(() => {
    setLoading(true);
    api
      .getSubscriptionById(id)
      .then(({ data }) => {
        const subscriptionData = generateData(data);
        setSubscriptionName(data.name);
        subscriptionData.then((res) => setSubscription(res));
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <DetailPageWrapper
      nxStateNotNeeded
      id={id}
      name={subscriptionName}
      isLoading={isLoading}
      curParentPath={parentPaths.subscriptions}
      curData={subscription}
      addFunc={null}
      updateFunc={null}
      beforeSend={null}
    >
      <SubscriptionDetailsView subscription={subscription} />
    </DetailPageWrapper>
  );
};

export default SubscriptionDetailsScreen;
