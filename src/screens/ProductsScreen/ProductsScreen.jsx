import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../api';
import {
  generateData,
  defaultShow,
  markUp,
} from '../../services/useData/tableMarkups/products';
import useTableData from '../../services/useData/useTableData';
import TableComponent from '../../components/TableComponent/TreeTable';

import localization from '../../localization';
import TableActionsBar from '../../components/TableActionsBar';
import {
  getSortParams,
  saveSortParams,
  sortKeys,
} from '../../services/sorting';
import parentPaths from '../../services/paths';

const ProductsScreen = () => {
  const scope = 'productlist';
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [sortParams, setSortParams] = useState(
    getSortParams(sortKeys.products),
  );

  const requests = async (
    rowsPerPage,
    reduxCurrentPage,
    filtersUrl,
    searchRequest,
  ) => {
    const productData = await api.getProducts({
      page: reduxCurrentPage,
      size: rowsPerPage,
      filters: filtersUrl,
      sortParams,
      notAddParentId: searchRequest,
    });
    const childRequests = productData.data.items.map((item) => api.getProducts({
      parentId: item.id,
    }));
    const childrenData = await Promise.allSettled(childRequests);

    const resData = childrenData.filter((e) => e.value?.data?.items?.length > 0);
    const childItems = resData.map((el) => el.value?.data?.items);
    return generateData(productData.data, childItems);
  };

  const handleSetSortParams = (params) => {
    setSortParams(params);
    saveSortParams(sortKeys.products, params);
  };

  const products = useTableData(
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
            to={`${parentPaths.productlist}/add`}
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
        tableData={products}
        isLoading={isLoading}
      />
    </>
  );
};

export default ProductsScreen;
