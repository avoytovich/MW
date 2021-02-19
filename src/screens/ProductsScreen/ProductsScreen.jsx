import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';

import api from '../../api';
import {
  generateData,
  defaultShow,
} from '../../services/useData/tableMarkups/products';
import useTableData from '../../services/useData/useTableData';
import TableComponent from '../../components/TableComponent';
import { showNotification } from '../../redux/actions/HttpNotifications';
import localization from '../../localization';
import {
  getSortParams,
  saveSortParams,
  sortKeys,
} from '../../services/sorting';

const ProductsScreen = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [sortParams, setSortParams] = useState(
    getSortParams(sortKeys.products),
  );

  const requests = async (filtersUrl) => {
    const res = await api.getProducts(currentPage - 1, filtersUrl, sortParams);
    return generateData(res.data);
  };

  const handleSetSortParams = (params) => {
    setSortParams(params);
    saveSortParams(sortKeys.products, params);
  };

  const products = useTableData(
    currentPage - 1,
    setLoading,
    makeUpdate,
    'products',
    requests,
    sortParams,
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
    <>
      <Box display="flex" justifyContent="flex-end" p="15px">
        <Button
          id="add-product"
          color="primary"
          size="large"
          variant="contained"
          component={Link}
          to="/products/add"
        >
          Add product
        </Button>
      </Box>
      <TableComponent
        sortParams={sortParams}
        setSortParams={handleSetSortParams}
        handleDeleteItem={handleDeleteProduct}
        showColumn={defaultShow}
        currentPage={currentPage}
        updatePage={updatePage}
        tableData={products}
        isLoading={isLoading}
      />
    </>
  );
};

export default ProductsScreen;
