import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Box, Typography } from '@material-ui/core';

import api from '../../api';

import ExtraTopComponent from './ExtraTopComponent';
import TableComponent from '../../components/TableComponent';
import TableActionsBar from '../../components/TableActionsBar';

import {
  generateData,
  defaultShow,
  markUp,
} from '../../services/useData/tableMarkups/crudHelper';
import { useTableData } from '../../services/useData';

import {
  getSortParams,
  saveSortParams,
  sortKeys,
} from '../../services/sorting';

import localization from '../../localization';

import './crudHelperScreen.scss';

const CrudHelperScreen = () => {
  const scope = 'crudHelper';
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [sortParams, setSortParams] = useState(getSortParams(sortKeys.crudHelper));

  const nxCrudHelper = useSelector(({ account: { nexwayState } }) => nexwayState?.crudHelper);

  const handleSetSortParams = (params) => {
    setSortParams(params);
    saveSortParams(sortKeys.crudHelper, params);
  };

  const requests = async (rowsPerPage, reduxCurrentPage, filtersUrl) => {
    if (nxCrudHelper?.endpointId) {
      const res = await api.getRequest(
        nxCrudHelper?.endpointId,
        {
          page: reduxCurrentPage,
          size: rowsPerPage,
          filters: filtersUrl,
          sortParams,
        },
        nxCrudHelper?.extraParams,
      );

      return generateData(res.data);
    }

    return [];
  };

  const resources = useTableData(
    setLoading,
    makeUpdate,
    scope,
    requests,
    sortParams,
  );

  return (
    <Box display='flex' flexDirection='column'>
      <TableActionsBar
        scope={scope}
        deleteFunc={api.deleteIdentityById}
        headers={markUp.headers}
        extraComponent={<ExtraTopComponent />}
        noActions={!nxCrudHelper?.endpointId}
      />

      {
        !nxCrudHelper?.endpointId ? (
          <Box textAlign='center' mt='40px'>
            <Typography gutterBottom variant='h4'>
              {localization.t('general.noResourceUrl')}
            </Typography>

            <Typography gutterBottom variant='h5'>
              {localization.t('general.selectResource')}
            </Typography>
          </Box>
        ) : (
          <TableComponent
            scope={scope}
            sortParams={sortParams}
            setSortParams={handleSetSortParams}
            defaultShowColumn={defaultShow}
            tableData={resources}
            isLoading={isLoading}
            noActionButtons
            noActions
          />
        )
      }
    </Box>
  );
};

export default CrudHelperScreen;
