import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Box } from '@material-ui/core';

import {
  generateData,
  defaultShow,
} from '../../../services/useData/tableMarkups/orderDetailsProducts';

import TableComponent from '../../../components/TableComponent';
import CustomCard from '../../../components/utils/CustomCard';

const Products = ({ orderData }) => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const productsTableData = generateData(orderData?.lineItems || []);
    setProducts(productsTableData || []);

    return () => setProducts(null);
  }, []);

  return (
    <CustomCard title="Products">
      <Box pt={4}>
        <TableComponent
          showColumn={defaultShow}
          tableData={products}
          isLoading={products === null}
          customPath='disabled'
          errorHighlight='processingError'
          noActions
        />
      </Box>
    </CustomCard>
  );
};

Products.propTypes = {
  orderData: PropTypes.object,
};

export default Products;