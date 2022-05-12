import React from 'react';
import PropTypes from 'prop-types';

import {
  Box, Button,
} from '@mui/material';

import localization from '../../../localization';

const CheckoutWithTrial = ({ currentProductData, sellingStores }) => (
  <Box data-test='checkoutWithTrial' ml={2}>
    <Button
      disabled={sellingStores?.length <= 0}
      aria-haspopup="true"
      variant="contained"
      color="primary"
      aria-controls="checkoutWithTrial"
      onClick={(e) => {
        e.stopPropagation();
        window.open(
          `http://${sellingStores[0].hostnames[0]}/checkout/add?products=${currentProductData.id}`,
          '_blank',
        );
      }}
      size="large"
    >
      <span style={{ whiteSpace: 'pre' }}>{localization.t('general.checkoutWithTrial')}</span>
    </Button>
  </Box>
);

CheckoutWithTrial.propTypes = {
  currentProductData: PropTypes.object,
  sellingStores: PropTypes.object,
};

export default CheckoutWithTrial;
