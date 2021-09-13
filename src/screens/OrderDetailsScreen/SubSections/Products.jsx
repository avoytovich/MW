import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Box } from '@material-ui/core';
import TableComponent from '../../../components/TableComponent';

import {
  generateData,
  defaultShow,
} from '../../../services/useData/tableMarkups/orderDetailsProducts';

const Products = ({ orderData }) => {
  const [products, setProducts] = useState(null);
  const scope = 'orderProducts';

  useEffect(() => {
    const productsTableData = generateData(orderData?.lineItems || []);
    setProducts(productsTableData || []);

    return () => setProducts(null);
  }, []);
  return (
    <Box>
      <TableComponent
        defaultShowColumn={defaultShow}
        tableData={products}
        scope={scope}
        noActions
        noTableActionsBar
        noEditDeleteActions
        customPath
      />
    </Box>
  );
};

Products.propTypes = {
  orderData: PropTypes.object,
};

export default Products;
