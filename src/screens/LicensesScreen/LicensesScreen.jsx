import React, { useState } from 'react';

import { toast } from 'react-toastify';
import api from '../../api';

import {
  generateData,
  defaultShow,
} from '../../services/useData/tableMarkups/licenses';
import useTableData from '../../services/useData/useTableData';
import TableComponent from '../../components/TableComponent';
import localization from '../../localization';
import TableActionsBar from '../../components/TableActionsBar';
import {
  getSortParams,
  saveSortParams,
  sortKeys,
} from '../../services/sorting';

const LicenseScreen = () => {
  const scope = 'lcenses';

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
    toast(
      `${localization.t('general.licenses')} ${id} ${localization.t(
        'general.hasBeenSuccessfullyDeleted',
      )}`,
    );
  });

  const updatePage = (page) => setCurrentPage(page);
  return (
    <>
      <TableActionsBar scope={scope} />
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

export default LicenseScreen;
