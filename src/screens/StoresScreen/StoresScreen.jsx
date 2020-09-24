import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TableComponent from '../../components/TableComponent';
import getStores from '../../redux/actions/Stores';

const StoresScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const stores = useSelector((state) => state.stores);
  const dispatch = useDispatch();
  const fetchData = () => dispatch(getStores(currentPage - 1));

  useEffect(() => {
    let isCancelled = false;

    fetchData()
      .then(() => {
        if (!isCancelled) {
          setLoading(false);
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setLoading(false);
        }
      });

    return () => { isCancelled = true; };
  }, []);

  return (
    <TableComponent
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      tableData={stores}
      isLoading={isLoading}
      type="stores"
    />
  );
};

export default StoresScreen;
