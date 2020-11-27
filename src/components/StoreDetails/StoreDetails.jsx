import React from 'react';
import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';

import PaymentMethods from './PaymentMethods';
import ImagesBlock from './ImagesBlock';
import MainInfo from './MainInfo';
import './StoreDetails.scss';

const StoreDetails = ({
  storeData,
  customerData,
  setCurrentStoreData,
  selectOptions,
  currentStoreData,
  inputErrors,
  setInputErrors,
}) => (
  <Box className="detailContainer" display="flex" flexDirection="column">
    <Box>
      <Box display="flex" justify="space-between">
        <Box width="80%" sm={9} className="actionBlockWrapper">
          <MainInfo
            inputErrors={inputErrors}
            setInputErrors={setInputErrors}
            storeData={storeData}
            selectOptions={selectOptions}
            setCurrentStoreData={setCurrentStoreData}
            currentStoreData={currentStoreData}
            customerData={customerData}
          />
        </Box>
        <Box
          className="paymentBlock"
          display="flex"
          flexDirection="column"
          flexWrap="wrap"
          justifyContent="space-around"
          alignSelf="flex-end"
          pl="2%"
          pb="10%"
        >
          <PaymentMethods
            setCurrentStoreData={setCurrentStoreData}
            storeData={storeData}
            currentStoreData={currentStoreData}
          />
        </Box>
      </Box>
    </Box>
    <Box>
      <ImagesBlock
        currentStoreData={currentStoreData}
        storeData={storeData}
        setCurrentStoreData={setCurrentStoreData}
      />
    </Box>
  </Box>
);
StoreDetails.propTypes = {
  selectOptions: PropTypes.object,
  storeData: PropTypes.object,
  currentStoreData: PropTypes.object,
  customerData: PropTypes.object,
  setCurrentStoreData: PropTypes.func,
  inputErrors: PropTypes.object,
  setInputErrors: PropTypes.func,
};

export default StoreDetails;
