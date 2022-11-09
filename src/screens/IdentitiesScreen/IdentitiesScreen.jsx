import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { toast } from 'react-toastify';
import api from '../../api';
import {
  generateData,
  defaultShow,
  markUp,
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
import parentPaths from '../../services/paths';

const IdentitiesScreen = () => {
  const scope = 'users';
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [sortParams, setSortParams] = useState(
    getSortParams(sortKeys.identities),
  );

  const handleSetSortParams = (params) => {
    setSortParams(params);
    saveSortParams(sortKeys.identities, params);
  };

  const requests = async (rowsPerPage, reduxCurrentPage, filtersUrl) => {
    const res = await api.getIdentities(
      {
        page: reduxCurrentPage,
        size: rowsPerPage,
        filters: filtersUrl,
        sortParams,
      },
    );

    return generateData(res.data);
  };

  const identities = useTableData(
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

  return (
    <>
      <TableActionsBar
        scope={scope}
        deleteFunc={api.deleteIdentityById}
        headers={markUp.headers}
      >
        <Box alignSelf='flex-end' py={2}>
          <Button
            id='add-identity-button'
            color='primary'
            size='large'
            variant='contained'
            component={Link}
            to={`${parentPaths.users}/add`}
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
        tableData={identities}
        isLoading={isLoading}
      />
    </>
  );
};

export default IdentitiesScreen;
