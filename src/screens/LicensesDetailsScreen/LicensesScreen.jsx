import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';

import api from '../../api';
import {
  generateData,
  defaultShow,
} from '../../services/useData/tableMarkups/licenses';
import useTableData from '../../services/useData/useTableData';
import TableComponent from '../../components/TableComponent';
import { showNotification } from '../../redux/actions/HttpNotifications';
import localization from '../../localization';
import TableActionsBar from '../../components/TableActionsBar';
import {
  getSortParams,
  saveSortParams,
  sortKeys,
} from '../../services/sorting';

const CartsScreen = () => {
  const scope = 'lcenses';

  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [sortParams, setSortParams] = useState(
    getSortParams(sortKeys.carts),
  );

  const requests = async (rowsPerPage, filtersUrl) => {
    const res = await api.getLicenses({
      page: currentPage - 1, size: rowsPerPage, filters: filtersUrl, sortParams,
    });

    return generateData(res.data);
  };

  const handleSetSortParams = (params) => {
    setSortParams(params);
    saveSortParams(sortKeys.carts, params);
  };

  const licenses = useTableData(
    currentPage - 1,
    setLoading,
    makeUpdate,
    'licenses',
    requests,
    sortParams,
  );

  const handleDeleteCart = (id) => api.deleteCartById(id).then(() => {
    setMakeUpdate((v) => v + 1);
    dispatch(
      showNotification(
        `${localization.t('general.licenses')} ${id} ${localization.t(
          'general.hasBeenSuccessfullyDeleted',
        )}`,
      ),
    );
  });

  const updatePage = (page) => setCurrentPage(page);
  return (
    <>
      <TableActionsBar />
      <TableComponent
        sortParams={sortParams}
        setSortParams={handleSetSortParams}
        handleDeleteItem={handleDeleteCart}
        defaultShowColumn={defaultShow}
        scope={scope}
        currentPage={currentPage}
        updatePage={updatePage}
        tableData={licenses}
        isLoading={isLoading}
      />
    </>
  );
};

export default CartsScreen;
