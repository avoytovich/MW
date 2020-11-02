import React from 'react';
import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';

import PaymentMethods from './PaymentMethods';
import ImagesBlock from './ImagesBlock';
import MainInfo from './MainInfo';
import './StoreDetails.scss';


const StoreDetails = ({ storeData, customerData, setStoreData }) => (
  <Box className="detailContainer" display="flex" flexDirection="column">
    <Box>
      <Box display="flex" justify="space-between">
        <Box width="60%" sm={9} className="actionBlockWrapper">
          <MainInfo
            setStoreData={setStoreData}
            storeData={storeData}
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
          pl="10%"
          pb="10%"
        >
          <PaymentMethods setStoreData={setStoreData} storeData={storeData} />
        </Box>
      </Box>
    </Box>
    <Box>
      <ImagesBlock storeData={storeData} setStoreData={setStoreData} />
    </Box>
  </Box>
);
StoreDetails.propTypes = {
  storeData: PropTypes.object,
  customerData: PropTypes.object,
  setStoreData: PropTypes.func,
};

export default StoreDetails;
