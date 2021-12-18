import React, { useState } from 'react';
import { Button, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../api';

import {
  generateData,
  defaultShow,
  markUp,
} from '../../services/useData/tableMarkups/carts';
import useTableData from '../../services/useData/useTableData';
import TableComponent from '../../components/TableComponent';
import parentPaths from '../../services/paths';
import localization from '../../localization';
import TableActionsBar from '../../components/TableActionsBar';
import {
  getSortParams,
  saveSortParams,
  sortKeys,
} from '../../services/sorting';

const CartsScreen = () => {
  const scope = 'carts';
  const [currentPage, setCurrentPage] = useState(1);
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [sortParams, setSortParams] = useState(
    getSortParams(sortKeys.carts),
  );

  const requests = async (rowsPerPage, filtersUrl) => {
    const storeIds = [];
    const res = await api.getCarts({
      page: currentPage - 1, size: rowsPerPage, filters: filtersUrl, sortParams,
    });

    res.data.items.forEach((item) => {
      const store = `id=${item.storeId}`;
      if (!storeIds.includes(store)) {
        storeIds.push(store);
      }
    });
    const stores = await api.getStoresByIds(storeIds.join('&'));

    return generateData(res.data, stores.data);
  };

  const handleSetSortParams = (params) => {
    setSortParams(params);
    saveSortParams(sortKeys.carts, params);
  };

  const carts = useTableData(
    currentPage - 1,
    setLoading,
    makeUpdate,
    scope,
    requests,
    sortParams,
  );

  const handleDeleteCart = (id) => api.deleteCartById(id).then(() => {
    setMakeUpdate((v) => v + 1);
    toast(
      `${localization.t('general.cart')} ${id} ${localization.t(
        'general.hasBeenSuccessfullyDeleted',
      )}`,
    );
  });

  const updatePage = (page) => setCurrentPage(page);
  return (
    <>
      <TableActionsBar
        scope={scope}
        deleteFunc={api.deleteCartById}
        headers={markUp.headers}
      >
        <Box>
          <Button
            id="add-cart"
            color="primary"
            size="large"
            variant="contained"
            component={Link}
            to={`${parentPaths.carts}/add`}
          >
            {localization.t('general.addCart')}
          </Button>
        </Box>
      </TableActionsBar>
      <TableComponent
        sortParams={sortParams}
        setSortParams={handleSetSortParams}
        handleDeleteItem={handleDeleteCart}
        defaultShowColumn={defaultShow}
        scope={scope}
        currentPage={currentPage}
        updatePage={updatePage}
        tableData={carts}
        isLoading={isLoading}
      />
    </>
  );
};

export default CartsScreen;
