import React from 'react';
import PropTypes from 'prop-types';

import Products from './SubSections/Products';
import Events from './SubSections/Events';
import StripedDetailSection from '../../components/StripedDetailSection';
import { emptyValue } from '../../services/useData/tableMarkups/orderDetails';

import './orderDetailsScreen.scss';

const OrderDetailsView = ({
  orderData,
  orderRows,
  curTab,
}) => (
  <>
    {curTab === 0
      && (
        <StripedDetailSection
          emptyValue={emptyValue}
          xsValue={12}
          mdValue={4}
          sectionsData={orderRows}
        />
      )}
    {curTab === 1 && <Products orderData={orderData} />}
    {curTab === 2 && <Events orderData={orderData} />}
  </>
);

OrderDetailsView.propTypes = {
  orderData: PropTypes.object,
  orderRows: PropTypes.object,
  curTab: PropTypes.number,
};
export default OrderDetailsView;
