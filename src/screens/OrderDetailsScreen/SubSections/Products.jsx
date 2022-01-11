import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import TableComponent from '../../../components/TableComponent';

import {
  generateData,
  defaultShow,
} from '../../../services/useData/tableMarkups/orderDetailsProducts';
import parentPaths from '../../../services/paths';

const Products = ({ orderData }) => {
  const [products, setProducts] = useState(null);
  const scope = 'orderProducts';

  useEffect(() => {
    const productsTableData = generateData(orderData?.lineItems || []);
    setProducts(productsTableData || []);

    return () => setProducts(null);
  }, []);
  return (
    <>
      <TableComponent
        defaultShowColumn={defaultShow}
        tableData={products}
        scope={scope}
        noActions
        noTableActionsBar
        noEditDeleteActions
        customPath={`${parentPaths.productlist}/:productId`}
        orderData={orderData?.processingEvent}
        wrapperStyles={{
          paddingBottom: '24px',
        }}
      />
    </>
  );
};

Products.propTypes = {
  orderData: PropTypes.object,
};

export default Products;
