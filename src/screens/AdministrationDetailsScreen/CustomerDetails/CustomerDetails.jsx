import React from 'react';

import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import MainSection from './MainSection';
import PaymentSection from './PaymentSection';
import FeaturesSection from './FeaturesSection';

const CustomerDetails = ({
  selectOptions,
  setCurrentCustomer,
  currentCustomer,
}) => (
  <Box display="flex" flexDirection="column">
    <Box>
      <Box display="flex" flexDirection="row">
        <Box width="30%">
          <MainSection
            setCurrentCustomer={setCurrentCustomer}
            selectOptions={selectOptions}
            currentCustomer={currentCustomer}
          />
        </Box>
        <Box className="payment" width="60%">
          <PaymentSection
            setCurrentCustomer={setCurrentCustomer}
            selectOptions={selectOptions}
            currentCustomer={currentCustomer}
          />
        </Box>
      </Box>
    </Box>
    <Box>
      <FeaturesSection
        currentCustomer={currentCustomer}
        setCurrentCustomer={setCurrentCustomer}
      />
    </Box>
  </Box>
);

CustomerDetails.propTypes = {
  currentCustomer: PropTypes.object,
  setCurrentCustomer: PropTypes.func,
  selectOptions: PropTypes.object,
};

export default CustomerDetails;
