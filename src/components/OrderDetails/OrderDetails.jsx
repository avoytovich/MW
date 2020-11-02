import React from 'react';
import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';

import RelatedProducts from './RelatedProducts';
import MainInfo from './MainInfo';
import './OrderDetails.scss';

const OrderDetails = ({ orderData, setOrderData, customer, productsData }) => (
  <Box className="detailContainer" display="flex" flexDirection="column">
    <Box>
      <Box display="flex" justify="space-between">
        <Box width="60%" sm={9} className="actionBlockWrapper">
          <MainInfo
            setOrderData={setOrderData}
            orderData={orderData}
            customer={customer}
          />
        </Box>
      </Box>
    </Box>
    <Box>
      {/* <RelatedProducts productsData={productsData} /> */}
    </Box>
  </Box>
);
OrderDetails.propTypes = {
  orderData: PropTypes.object,
  setOrderData: PropTypes.func,
  customer: PropTypes.string,
  productsData: PropTypes.object,
};

export default OrderDetails;
