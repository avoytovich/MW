import React, { useState, useEffect } from 'react';
import TableComponent from '../../components/TableComponent';
import api from '../../api';

const StoresScreen = () => {
  const [stores, setStores] = useState({});

  useEffect(() => {}, []);

  return <TableComponent tableData={stores} />;
};

export default StoresScreen;
