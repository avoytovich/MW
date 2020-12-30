import React from 'react';
import PropTypes from 'prop-types';

import { Box } from '@material-ui/core';

import RelatedProducts from './RelatedProducts';
import MainInfo from './MainInfo';

import './OrderDetails.scss';

const OrderDetails = ({
  currentOrderData,
  orderData,
  customer,
  productsData,
  setCurrentOrderData,
}) => (
  <Box className="detailContainer" display="flex" flexDirection="column">
    <Box>
      <Box display="flex" justify="space-between">
        <Box width="100%" sm={9} className="actionBlockWrapper">
          <MainInfo
            orderData={orderData}
            setCurrentOrderData={setCurrentOrderData}
            currentOrderData={currentOrderData}
            customer={customer}
          />
        </Box>
      </Box>
    </Box>
    <Box>
      <RelatedProducts
        currentOrderData={currentOrderData}
        productsData={productsData}
      />
    </Box>
  </Box>
);

OrderDetails.propTypes = {
  currentOrderData: PropTypes.object,
  customer: PropTypes.string,
  productsData: PropTypes.object,
  setCurrentOrderData: PropTypes.func,
  orderData: PropTypes.object,
};

export default OrderDetails;
