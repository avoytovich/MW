import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TableComponent from '../../components/TableComponent';
import getOrders from '../../redux/actions/Orders';

const OrdersScreen = () => {
  const orders = useSelector((state) => state.orders);
  console.log('orders', orders);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getOrders());
    };
    fetchData();
  }, []);

  return <div>OrdersScreen</div>;
  // <TableComponent tableData={stores} />;
};

export default OrdersScreen;
