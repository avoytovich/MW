import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Box, Button } from '@material-ui/core';
import TableActionsBar from '../../components/TableActionsBar';
import api from '../../api';
import parentPaths from '../../services/paths';
import TableComponent from '../../components/TableComponent';

import {
  markUp,
  generateData,
  defaultShow,
} from '../../services/useData/tableMarkups/catalogs';
import { useTableData } from '../../services/useData';
import localization from '../../localization';
import {
  getSortParams,
  saveSortParams,
  sortKeys,
} from '../../services/sorting';

const CatalogsScreen = () => {
  const scope = 'catalogs';

  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [sortParams, setSortParams] = useState(
    getSortParams(sortKeys.catalogs),
  );

  const requests = async (rowsPerPage, reduxCurrentPage, filtersUrl) => {
    const res = await api.getCatalogs({
      page: reduxCurrentPage, size: rowsPerPage, filters: filtersUrl, sortParams,
    });
    return generateData(res.data);
  };

  const handleSetSortParams = (params) => {
    setSortParams(params);
    saveSortParams(sortKeys.catalogs, params);
  };

  const catalogs = useTableData(
    setLoading,
    makeUpdate,
    scope,
    requests,
    sortParams,
  );

  const handleDeleteCatalogs = (id) => api.deleteCatalogsById(id).then(() => {
    setMakeUpdate((v) => v + 1);
    toast(
      `${localization.t('general.catalog')} ${id} ${localization.t(
        'general.hasBeenSuccessfullyDeleted',
      )}`,
    );
  });


  return (
    <Box display='flex' flexDirection='column'>
      <TableActionsBar
        scope={scope}
        deleteFunc={api.deleteCatalogsById}
        handleDeleteItem={api.deleteCatalogsById}
        headers={markUp.headers}
      >
        <Button
          id='add-marketing-button'
          color='primary'
          size='large'
          variant='contained'
          component={Link}
          to={`${parentPaths.catalogs}/add`}
        >
          {`${localization.t('general.add')} ${localization.t(
            'general.catalog',
          )}`}
        </Button>
      </TableActionsBar>
      <Box mt={4} mb={2}>
        <TableComponent
          scope={scope}
          handleDeleteItem={handleDeleteCatalogs}
          sortParams={sortParams}
          setSortParams={handleSetSortParams}
          defaultShowColumn={defaultShow}
          tableData={catalogs}
          isLoading={isLoading}
        />
      </Box>
    </Box>
  );
};

export default CatalogsScreen;
