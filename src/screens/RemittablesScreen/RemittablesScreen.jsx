import React, { useState } from 'react';
import { Button, Box } from '@material-ui/core';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import TableComponent from '../../components/TableComponent';
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
  markUp,
} from '../../services/useData/tableMarkups/remittables';
import parentPaths from '../../services/paths';
import useTableData from '../../services/useData/useTableData';

import localization from '../../localization';

const RemittablesScreen = () => {
  const scope = 'remittables';
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [sortParams, setSortParams] = useState(getSortParams(sortKeys.remittables));

  const handleSetSortParams = (params) => {
    setSortParams(params);
    saveSortParams(sortKeys.remittables, params);
  };

  const requests = async (rowPerPage, reduxCurrentPage, filtersUrl) => {
    const res = await api.getRemittables({
      page: reduxCurrentPage,
      size: rowPerPage,
      filters: filtersUrl,
      sortParams,
    });
    return generateData(res.data);
  };

  const handleDeleteRemittables = (id) => api.deleteRemittablesById(id)
    .then(() => {
      setMakeUpdate((v) => v + 1);
      toast(
        `${localization.t('labels.remittable')} ${id} ${localization.t(
          'general.hasBeenSuccessfullyDeleted',
        )}`,
      );
    });

  const remittables = useTableData(
    setLoading,
    makeUpdate,
    scope,
    requests,
    sortParams,
  );
  return (
    <>
      <TableActionsBar
        scope={scope}
        deleteFunc={api.deleteRemittablesById}
        headers={markUp.headers}
      >
        <Box>
          <Button
            id="add-remittable"
            color="primary"
            size="large"
            variant="contained"
            component={Link}
            to={`${parentPaths.remittables}/add`}
          >
            {`${localization.t('general.add')} ${localization.t('labels.remittable')}`}
          </Button>
        </Box>
      </TableActionsBar>
      <TableComponent
        scope={scope}
        sortParams={sortParams}
        setSortParams={handleSetSortParams}
        handleDeleteItem={handleDeleteRemittables}
        defaultShowColumn={defaultShow}
        tableData={remittables}
        isLoading={isLoading}
      />
    </>
  );
};

export default RemittablesScreen;
