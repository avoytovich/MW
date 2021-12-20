import React from 'react';
import {
  Box,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import localization from '../../../localization';
import TableComponent from '../../../components/TableComponent';

const Orders = ({ orders }) => (
  (orders ? (
    <Box>
      <TableComponent
        tableData={orders}
        scope='endUsersOrders'
        noActions
        noTableActionsBar
        noEditDeleteActions
        customPath='disabled'
        errorHighlight='processingError'
      />
    </Box>
  ) : (<Box p={2}><Typography>{localization.t('general.noOrdersYet')}</Typography></Box>))
);

Orders.propTypes = {
  orders: PropTypes.object,
};

export default Orders;
