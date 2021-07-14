import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';

import TableComponent from '../../components/TableComponent';
import useTableData from '../../services/useData/useTableData';
import { showNotification } from '../../redux/actions/HttpNotifications';
import localization from '../../localization';
import TableActionsBar from '../../components/TableActionsBar';

import api from '../../api';
import {
  getSortParams,
  saveSortParams,
  sortKeys,
} from '../../services/sorting';
import {
  generateData,
  defaultShow,
} from '../../services/useData/tableMarkups/stores';

const StoresScreen = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [sortParams, setSortParams] = useState(getSortParams(sortKeys.stores));

  const handleSetSortParams = (params) => {
    setSortParams(params);
    saveSortParams(sortKeys.stores, params);
  };

  const requests = async (rowPerPage, filtersUrl) => {
    const costumersIds = [];
    const res = await api.getStores({
      page: currentPage - 1,
      size: rowPerPage,
      filters: filtersUrl,
      sortParams,
    });
    res.data.items.forEach((item) => {
      const costumer = `id=${item.customerId}`;
      if (!costumersIds.includes(costumer)) {
        costumersIds.push(costumer);
      }
    });
    const customers = await api.getCustomersByIds(costumersIds.join('&'));
    return generateData(res.data, customers.data);
  };

  const handleDeleteStore = (id) => api.deleteStoreById(id).then(() => {
    setMakeUpdate((v) => v + 1);
    dispatch(
      showNotification(
        `${localization.t('general.store')} ${id} ${localization.t(
          'general.hasBeenSuccessfullyDeleted',
        )}`,
      ),
    );
  });

  const stores = useTableData(
    currentPage - 1,
    setLoading,
    makeUpdate,
    'stores',
    requests,
    sortParams,
  );
  const updatePage = (page) => setCurrentPage(page);

  return (
    <>
      <TableActionsBar>
        <Box>
          <Button
            id="add-product"
            color="primary"
            size="large"
            variant="contained"
            component={Link}
            to="/overview/stores/add"
          >
            {`${localization.t('general.add')} ${localization.t('labels.store')}`}
          </Button>
        </Box>
      </TableActionsBar>
      <TableComponent
        sortParams={sortParams}
        setSortParams={handleSetSortParams}
        handleDeleteItem={handleDeleteStore}
        showColumn={defaultShow}
        currentPage={currentPage}
        updatePage={updatePage}
        tableData={stores}
        isLoading={isLoading}
      />
    </>
  );
};

export default StoresScreen;
