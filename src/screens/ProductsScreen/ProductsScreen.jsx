import React, { useState } from 'react';
import { Button, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../api';
import {
  generateData,
  defaultShow,
  markUp,
} from '../../services/useData/tableMarkups/products';
import useTableData from '../../services/useData/useTableData';
import TableComponent from '../../components/TableComponent';

import localization from '../../localization';
import TableActionsBar from '../../components/TableActionsBar';
import {
  getSortParams,
  saveSortParams,
  sortKeys,
} from '../../services/sorting';

const ProductsScreen = () => {
  const scope = 'products';

  const [currentPage, setCurrentPage] = useState(1);
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [sortParams, setSortParams] = useState(
    getSortParams(sortKeys.products),
  );

  const requests = async (rowsPerPage, filtersUrl) => {
    const res = await api.getProducts({
      page: currentPage - 1, size: rowsPerPage, filters: filtersUrl, sortParams,
    });
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
    scope,
    requests,
    sortParams,
  );

  const handleDeleteProduct = (id) => api.deleteProductById(id).then(() => {
    setMakeUpdate((v) => v + 1);
    toast(
      `${localization.t('general.product')} ${id} ${localization.t(
        'general.hasBeenSuccessfullyDeleted',
      )}`,
    );
  });

  const updatePage = (page) => setCurrentPage(page);
  return (
    <>
      <TableActionsBar
        scope={scope}
        deleteFunc={api.deleteProductById}
        headers={markUp.headers}
      >
        <Box>
          <Button
            id="add-product"
            color="primary"
            size="large"
            variant="contained"
            component={Link}
            to="/products/add"
          >
            {localization.t('general.addProduct')}
          </Button>
        </Box>
      </TableActionsBar>
      <TableComponent
        sortParams={sortParams}
        setSortParams={handleSetSortParams}
        handleDeleteItem={handleDeleteProduct}
        defaultShowColumn={defaultShow}
        scope={scope}
        currentPage={currentPage}
        updatePage={updatePage}
        tableData={products}
        isLoading={isLoading}
      />
    </>
  );
};

export default ProductsScreen;
