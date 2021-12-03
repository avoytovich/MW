/* eslint-disable react/prop-types */
import React from 'react';

import PropTypes from 'prop-types';

import StripedDetailSection from '../../components/StripedDetailSection';
import { emptyValue } from './utils';

import './subscriptionDetailsScreen.scss';

const SubscriptionDetailsView = ({ subscription }) => (
  <div className="subscription-details-screen">
    <StripedDetailSection
      emptyValue={emptyValue}
      xsValue={12}
      mdValue={6}
      sectionsData={subscription}
    />
  </div>
);

SubscriptionDetailsView.propTypes = {
  subscription: PropTypes.object,
};
export default SubscriptionDetailsView;
