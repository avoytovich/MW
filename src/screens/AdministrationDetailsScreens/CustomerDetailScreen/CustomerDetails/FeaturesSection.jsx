import React from 'react';
import PropTypes from 'prop-types';

import {
  Box, Checkbox, FormControlLabel, Typography,
} from '@material-ui/core';

import CustomCard from '../../../../components/utils/CustomCard';
import localization from '../../../../localization';

const FeaturesSection = ({ currentCustomer, setCurrentCustomer }) => (
  <Box display="flex" flexDirection="column">
    <Box width="10%">
      <Typography variant="h4">{localization.t('general.features')}</Typography>
    </Box>
    <Box display="flex" width="100%">
      <CustomCard title="Platform" width="33%" mr={3}>
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
                name='resellerManagement'
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
                name='onboardingManagement'
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
                name='remittanceManagement'
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
                name='productManagement'
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
      <CustomCard title="Workflow" width="33%" mr={3}>
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
                name='seller'
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
                name='sellOnBehalf'
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
                name='createInvoice'
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
                name='sendOrderConfirmationEmail'
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
      <CustomCard title="Tech" width="33%" mr={3} pb={10}>
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
                name='subscriptionUpgradeAuthorized'
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
                name='usingSubscriptionV1'
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
                name='usingFulfillmentV1'
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
  </Box>
);
FeaturesSection.propTypes = {
  currentCustomer: PropTypes.object,
  setCurrentCustomer: PropTypes.func,
};

export default FeaturesSection;
