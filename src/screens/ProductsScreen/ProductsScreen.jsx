import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import useTableData from '../../services/useData/useTableData';
import TableComponent from '../../components/TableComponent';
import { showNotification } from '../../redux/actions/HttpNotifications';
import localization from '../../localization';

import api from '../../api';

const ProductsScreen = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(true);

  const products = useTableData(currentPage - 1, setLoading, makeUpdate, 'products');

  const handleDeleteProduct = (id) => api
    .deleteProductById(id)
    .then(() => {
      setMakeUpdate((v) => (v + 1));
      dispatch(showNotification(`${localization.t('general.product')} ${id} ${localization.t('general.hasBeenSuccessfullyDeleted')}`));
    });

  const updatePage = (page) => setCurrentPage(page);

  return (
    <TableComponent
      handleDeleteItem={handleDeleteProduct}
      showColumn={products?.defaultShow}
      currentPage={currentPage}
      updatePage={updatePage}
      tableData={products}
      isLoading={isLoading}
    />
  );
};

export default ProductsScreen;
