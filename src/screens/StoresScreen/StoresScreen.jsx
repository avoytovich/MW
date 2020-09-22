import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TableComponent from '../../components/TableComponent';
import getStores from '../../redux/actions/Stores';

const StoresScreen = () => {
  const stores = useSelector((state) => state.stores);
  console.log('stores', stores);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getStores());
    };
    fetchData();
  }, []);

  return <div>StoresScreen</div>;
  // <TableComponent tableData={stores} />;
};

export default StoresScreen;
