import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TableComponent from '../../components/TableComponent';
import getOrders from '../../redux/actions/Orders';

const OrdersScreen = () => {
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useState(1);

  // eslint-disable-next-line no-unused-vars
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getOrders());
    };
    fetchData();
  }, []);

  return <></>
    // <TableComponent
    //   currentPage={currentPage}
    //   setCurrentPage={setCurrentPage}
    //   tableData={stores}
    //   type="orders"
    // />

};

export default OrdersScreen;
