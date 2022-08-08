import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import TableComponent from '../../../components/TableComponent';

import {
  generateData,
  defaultShow,
  links,
} from '../../../services/useData/tableMarkups/orderDetailsProducts';

const Products = ({ orderData, subscriptions }) => {
  const [products, setProducts] = useState(null);
  const scope = 'orderProducts';

  useEffect(() => {
    if (orderData?.lineItems) {
      generateData(orderData?.lineItems, subscriptions)
        .then((resp) => {
          setProducts(resp || []);
        });
    } else {
      setProducts([]);
    }

    return () => setProducts(null);
  }, []);

  return (
    <>
      <TableComponent
        tableCellLinks={links}
        defaultShowColumn={defaultShow}
        tableData={products}
        scope={scope}
        noActions
        noTableActionsBar
        noEditDeleteActions
        orderData={orderData?.lineItems[0].processingEvent}
        wrapperStyles={{
          paddingBottom: '24px',
        }}
      />
    </>
  );
};

Products.propTypes = {
  orderData: PropTypes.object,
  subscriptions: PropTypes.array,
};

export default Products;
