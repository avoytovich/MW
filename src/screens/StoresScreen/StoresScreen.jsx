import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TableComponent from '../../components/TableComponent';
import getStores from '../../redux/actions/Stores';

const StoresScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const stores = useSelector((state) => state.stores);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getStores());
    };
    fetchData();
  }, []);

  return (
    <TableComponent
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      tableData={stores}
      type="stores"
    />
  );
};

export default StoresScreen;
