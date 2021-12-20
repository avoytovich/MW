import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import localization from '../../localization';
import TableComponent from '../TableComponent';
import { useTableData } from '../../services/useData';
import {
  getSortParams,
  saveSortParams,
  sortKeys,
} from '../../services/sorting';

const TabTable = ({ tabObject }) => {
  const {
    sortKey,
    generateData,
    request,
    deleteFunc,
    label,
    scope,
    defaultShow,
    secondaryRequest,
    additionalParams,
  } = tabObject;
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(true);
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

  const requests = async (rowsPerPage, reduxCurrentPage, filtersUrl) => {
    let secondaryData;
    const res = await request({
      ...additionalParams,
      page: reduxCurrentPage,
      size: rowsPerPage,
      filters: filtersUrl,
      sortParams,
    });
    if (secondaryRequest) {
      secondaryData = await secondaryRequest(res.data);
    }
    return secondaryRequest
      ? generateData(res.data, secondaryData.data) : generateData(res.data);
  };

  const data = useTableData(
    setLoading,
    makeUpdate,
    scope,
    requests,
    sortParams,
  );
  return (
    <TableComponent
      noActions={tabObject.noActions}
      noEditDeleteActions={tabObject.noEditDeleteActions}
      sortParams={sortParams}
      setSortParams={handleSetSortParams}
      handleDeleteItem={handleDelete}
      defaultShowColumn={defaultShow}
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
