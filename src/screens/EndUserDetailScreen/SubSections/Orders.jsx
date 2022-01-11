import React from 'react';
import {
  Box,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import localization from '../../../localization';
import TableComponent from '../../../components/TableComponent';
import parentPaths from '../../../services/paths';

const Orders = ({ orders }) => (
  (orders ? (
    <TableComponent
      defaultShowColumn={orders.defaultOrdersShow}
      tableData={orders}
      scope='endUsersOrders'
      noActions
      noTableActionsBar
      noEditDeleteActions
      customPath={`${parentPaths.orderlist}/:id`}
      errorHighlight='processingError'
    />
  ) : (<Box p={2}><Typography>{localization.t('general.noOrdersYet')}</Typography></Box>))
);

Orders.propTypes = {
  orders: PropTypes.object,
};

export default Orders;
