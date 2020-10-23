import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import api from '../../api';
import {
  generateData,
  defaultShow,
} from '../../services/useData/tableMarkups/products';
import useTableData from '../../services/useData/useTableData';
import TableComponent from '../../components/TableComponent';
import { showNotification } from '../../redux/actions/HttpNotifications';
import localization from '../../localization';

const ProductsScreen = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(true);

  const requests = async (filtersUrl) => {
    const res = await api.getProducts(currentPage - 1, filtersUrl);
    return generateData(res.data);
  };

  const products = useTableData(
    currentPage - 1,
    setLoading,
    makeUpdate,
    'products',
    requests,
  );

  const handleDeleteProduct = (id) => api.deleteProductById(id).then(() => {
    setMakeUpdate((v) => v + 1);
    dispatch(
      showNotification(
        `${localization.t('general.product')} ${id} ${localization.t(
          'general.hasBeenSuccessfullyDeleted',
        )}`,
      ),
    );
  });

  const updatePage = (page) => setCurrentPage(page);

  return (
    <TableComponent
      handleDeleteItem={handleDeleteProduct}
      showColumn={defaultShow}
      currentPage={currentPage}
      updatePage={updatePage}
      tableData={products}
      isLoading={isLoading}
    />
  );
};

export default ProductsScreen;
