import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import localization from '../../../localization';
import TableComponent from '../../../components/TableComponent';

import { useTableData } from '../../../services/useData';
import {
  getSortParams,
  saveSortParams,
  sortKeys,
} from '../../../services/sorting';

const TabTable = ({ tabObject }) => {
  const {
    sortKey, generateData, request, deleteFunc, label, scope, defaultShow,
  } = tabObject;
  const [currentPage, setCurrentPage] = useState(1);
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [sortParams, setSortParams] = useState(
    getSortParams(sortKeys[sortKey]),
  );

  const handleSetSortParams = (params) => {
    setSortParams(params);
    saveSortParams(sortKeys[sortKey], params);
  };

  const handleDelete = (id) => {
    if (deleteFunc) {
      deleteFunc(id).then(() => {
        const localizedLabel = `labels.${label}`;
        setMakeUpdate((v) => v + 1);
        toast(
          `${localization.t(localizedLabel)} ${id} ${localization.t(
            'general.hasBeenSuccessfullyDeleted',
          )}`,
        );
      });
    }
  };

  const requests = async (rowsPerPage, filtersUrl) => {
    const res = await request({
      page: currentPage - 1, size: rowsPerPage, filters: filtersUrl, sortParams,
    });
    return generateData(res.data);
  };

  const data = useTableData(
    currentPage - 1,
    setLoading,
    makeUpdate,
    scope,
    requests,
    sortParams,
  );
  const updatePage = (page) => setCurrentPage(page);
  return (
    <TableComponent
      noActions={tabObject.noActions}
      sortParams={sortParams}
      setSortParams={handleSetSortParams}
      handleDeleteItem={handleDelete}
      defaultShowColumn={defaultShow}
      currentPage={currentPage}
      updatePage={updatePage}
      tableData={data}
      isLoading={isLoading}
      scope={scope}
    />
  );
};

TabTable.propTypes = {
  tabObject: PropTypes.object,
};

export default TabTable;
