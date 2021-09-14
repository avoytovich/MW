import React from 'react';
import {
  Box,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import localization from '../../../localization';
import OrderDetailsTableComponent from '../../../components/TableComponent/OrderDetailsTableComponent';

const Orders = ({ orders }) => (orders ? (
  <Box
    border={1}
    borderRadius="borderRadius"
    borderColor="#c7c7c7"
  >
    <OrderDetailsTableComponent
      showColumn={orders.defaultOrdersShow}
      tableData={orders}
      isLoading={orders === null}
      customPath='disabled'
      errorHighlight='processingError'
      noActions
    />
  </Box>
) : (<Box p={2}><Typography>{localization.t('general.noOrdersYet')}</Typography></Box>));

Orders.propTypes = {
  orders: PropTypes.object,
};

export default Orders;
