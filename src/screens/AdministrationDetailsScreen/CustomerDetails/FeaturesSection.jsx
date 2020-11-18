import React from 'react';

import PropTypes from 'prop-types';
import {
  Box, Checkbox, FormControlLabel, Typography,
} from '@material-ui/core';
import localization from '../../../localization';
import CustomCard from '../../../components/utils/CustomCard';

const FeaturesSection = ({ currentCustomer, setCurrentCustomer }) => (
  <Box display="flex" alignItems="baseline" mt={3}>
    <Box width="10%">
      <Typography variant="h4">{localization.t('general.features')}</Typography>
    </Box>
    <CustomCard title="Platform" width="30%" mx={3}>
      <Box
        display="flex"
        flexDirection="column"
        py={1}
        className="rights-details-privileges"
      >
        <FormControlLabel
          label={localization.t('labels.reseller')}
          control={(
            <Checkbox
              color="primary"
              checked={currentCustomer.features.resellerManagement}
              onChange={(e) => {
                setCurrentCustomer({
                  ...currentCustomer,
                  features: {
                    ...currentCustomer.features,
                    resellerManagement: e.target.checked,
                  },
                });
              }}
            />
          )}
        />
        <FormControlLabel
          label={localization.t('labels.onboarding')}
          control={(
            <Checkbox
              color="primary"
              checked={currentCustomer.features.onboardingManagement}
              onChange={(e) => {
                setCurrentCustomer({
                  ...currentCustomer,
                  features: {
                    ...currentCustomer.features,
                    onboardingManagement: e.target.checked,
                  },
                });
              }}
            />
          )}
        />
        <FormControlLabel
          label={localization.t('labels.remittance')}
          control={(
            <Checkbox
              color="primary"
              checked={currentCustomer.features.remittanceManagement}
              onChange={(e) => {
                setCurrentCustomer({
                  ...currentCustomer,
                  features: {
                    ...currentCustomer.features,
                    remittanceManagement: e.target.checked,
                  },
                });
              }}
            />
          )}
        />
        <FormControlLabel
          label={localization.t('labels.product')}
          control={(
            <Checkbox
              color="primary"
              checked={currentCustomer.features.productManagement}
              onChange={(e) => {
                setCurrentCustomer({
                  ...currentCustomer,
                  features: {
                    ...currentCustomer.features,
                    productManagement: e.target.checked,
                  },
                });
              }}
            />
          )}
        />
      </Box>
    </CustomCard>
    <CustomCard title="Workflow" width="30%" mx={3}>
      <Box
        display="flex"
        flexDirection="column"
        py={1}
        className="rights-details-privileges"
      >
        <FormControlLabel
          label={localization.t('labels.seller')}
          control={(
            <Checkbox
              color="primary"
              checked={currentCustomer.features.seller}
              onChange={(e) => {
                setCurrentCustomer({
                  ...currentCustomer,
                  features: {
                    ...currentCustomer.features,
                    seller: e.target.checked,
                  },
                });
              }}
            />
          )}
        />
        <FormControlLabel
          label={localization.t('labels.sellerOnBehalf')}
          control={(
            <Checkbox
              color="primary"
              checked={currentCustomer.features.sellOnBehalf}
              onChange={(e) => {
                setCurrentCustomer({
                  ...currentCustomer,
                  features: {
                    ...currentCustomer.features,
                    sellOnBehalf: e.target.checked,
                  },
                });
              }}
            />
          )}
        />
        <FormControlLabel
          label={localization.t('labels.createInvoice')}
          control={(
            <Checkbox
              color="primary"
              checked={currentCustomer.features.createInvoice}
              onChange={(e) => {
                setCurrentCustomer({
                  ...currentCustomer,
                  features: {
                    ...currentCustomer.features,
                    createInvoice: e.target.checked,
                  },
                });
              }}
            />
          )}
        />
        <FormControlLabel
          label={localization.t('labels.orderConfirmation')}
          control={(
            <Checkbox
              color="primary"
              checked={currentCustomer.features.sendOrderConfirmationEmail}
              onChange={(e) => {
                setCurrentCustomer({
                  ...currentCustomer,
                  features: {
                    ...currentCustomer.features,
                    sendOrderConfirmationEmail: e.target.checked,
                  },
                });
              }}
            />
          )}
        />
      </Box>
    </CustomCard>
    <CustomCard title="Tech" width="30%" mx={3} pb={9}>
      <Box
        display="flex"
        flexDirection="column"
        py={1}
        className="rights-details-privileges"
      >
        <FormControlLabel
          label={localization.t('labels.subscriptionUpgrade')}
          control={(
            <Checkbox
              color="primary"
              checked={
                currentCustomer.features.subscriptionUpgradeAuthorized
              }
              onChange={(e) => {
                setCurrentCustomer({
                  ...currentCustomer,
                  features: {
                    ...currentCustomer.features,
                    subscriptionUpgradeAuthorized: e.target.checked,
                  },
                });
              }}
            />
          )}
        />
        <FormControlLabel
          label={localization.t('labels.subscriptionV1')}
          control={(
            <Checkbox
              color="primary"
              checked={currentCustomer.features.usingSubscriptionV1}
              onChange={(e) => {
                setCurrentCustomer({
                  ...currentCustomer,
                  features: {
                    ...currentCustomer.features,
                    usingSubscriptionV1: e.target.checked,
                  },
                });
              }}
            />
          )}
        />
        <FormControlLabel
          label={localization.t('labels.fulfillmentV1')}
          control={(
            <Checkbox
              color="primary"
              checked={currentCustomer.features.usingFulfillmentV1}
              onChange={(e) => {
                setCurrentCustomer({
                  ...currentCustomer,
                  features: {
                    ...currentCustomer.features,
                    usingFulfillmentV1: e.target.checked,
                  },
                });
              }}
            />
          )}
        />
      </Box>
    </CustomCard>
  </Box>
);
FeaturesSection.propTypes = {
  currentCustomer: PropTypes.object,
  setCurrentCustomer: PropTypes.func,
};

export default FeaturesSection;
