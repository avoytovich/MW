import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button } from '@material-ui/core';
import { toast } from 'react-toastify';
import api from '../../api';
import {
  generateData,
  defaultShow,
} from '../../services/useData/tableMarkups/identities';
import { useTableData } from '../../services/useData';
import TableComponent from '../../components/TableComponent';
import localization from '../../localization';
import TableActionsBar from '../../components/TableActionsBar';
import {
  getSortParams,
  saveSortParams,
  sortKeys,
} from '../../services/sorting';

const IdentitiesScreen = () => {
  const scope = 'identities';
  const [currentPage, setCurrentPage] = useState(1);
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [sortParams, setSortParams] = useState(
    getSortParams(sortKeys.identities),
  );

  const handleSetSortParams = (params) => {
    setSortParams(params);
    saveSortParams(sortKeys.identities, params);
  };

  const requests = async (rowsPerPage, filtersUrl) => {
    const res = await api.getIdentities(
      {
        page: currentPage - 1,
        size: rowsPerPage,
        filters: filtersUrl,
        sortParams,
      },
    );
    return generateData(res.data);
  };

  const identities = useTableData(
    currentPage - 1,
    setLoading,
    makeUpdate,
    scope,
    requests,
    sortParams,
  );

  const handleDeleteIdentity = (id) => api.deleteIdentityById(id).then(() => {
    setMakeUpdate((v) => v + 1);
    toast(
      `${localization.t('general.identity')} ${id} ${localization.t(
        'general.hasBeenSuccessfullyDeleted',
      )}`,
    );
  });

  const updatePage = (page) => setCurrentPage(page);

  return (
    <Box display='flex' flexDirection='column'>
      <TableActionsBar
        scope={scope}
      >
        <Box alignSelf='flex-end' py={2}>
          <Button
            id='add-identity-button'
            color='primary'
            size='large'
            variant='contained'
            component={Link}
            to='/settings/identities/add'
          >
            {`${localization.t('general.add')} ${localization.t(
              'general.identity',
            )}`}
          </Button>
        </Box>
      </TableActionsBar>
      <TableComponent
        scope={scope}
        sortParams={sortParams}
        setSortParams={handleSetSortParams}
        handleDeleteItem={handleDeleteIdentity}
        defaultShowColumn={defaultShow}
        currentPage={currentPage}
        updatePage={updatePage}
        tableData={identities}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default IdentitiesScreen;
