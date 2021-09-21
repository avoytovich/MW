import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../api';

import {
  generateData,
  defaultShow,
  markUp,
} from '../../services/useData/tableMarkups/endUsersGroups';
import useTableData from '../../services/useData/useTableData';
import TableComponent from '../../components/TableComponent';
import parentPaths from '../../services/paths';
import localization from '../../localization';
import TableActionsBar from '../../components/TableActionsBar';
import {
  getSortParams,
  saveSortParams,
  sortKeys,
} from '../../services/sorting';

const EndUsersGroupsScreen = () => {
  const scope = 'endusergroups';
  const [currentPage, setCurrentPage] = useState(1);
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [sortParams, setSortParams] = useState(
    getSortParams(sortKeys.endUsersGroups),
  );

  const { selectedCustomer } = useSelector(({ account: { nexwayState } }) => nexwayState);

  const requests = async (rowsPerPage, filtersUrl) => {
    const costumersIds = [];

    const customers = await api.getCustomersByIds(costumersIds.join('&'));

    const res = await api.getEndUsersGroups({
      page: currentPage - 1, size: rowsPerPage, filters: filtersUrl, sortParams,
    });
    return generateData(res.data, customers.data.items, selectedCustomer);
  };

  const handleSetSortParams = (params) => {
    setSortParams(params);
    saveSortParams(sortKeys.endUsersGroups, params);
  };

  const endUsersGroups = useTableData(
    currentPage - 1,
    setLoading,
    makeUpdate,
    scope,
    requests,
    sortParams,
  );

  const handleDeleteEndUserGroups = (id) => api.deleteEndUsersGroups(id).then(() => {
    setMakeUpdate((v) => v + 1);
    toast(
      `${localization.t('general.endUsersGroups')} ${id} ${localization.t(
        'general.hasBeenSuccessfullyDeleted',
      )}`,
    );
  });

  const updatePage = (page) => setCurrentPage(page);
  return (
    <>
      <TableActionsBar
        scope={scope}
        deleteFunc={api.deleteEndUsersGroups}
        headers={markUp.headers}
      >
        <Box>
          <Button
            id="add-endUsersGroups"
            color="primary"
            size="large"
            variant="contained"
            component={Link}
            to={`${parentPaths.endusergroups}/add`}
          >
            {localization.t('general.addEndUsersGroups')}
          </Button>
        </Box>
      </TableActionsBar>
      <TableComponent
        sortParams={sortParams}
        setSortParams={handleSetSortParams}
        handleDeleteItem={handleDeleteEndUserGroups}
        defaultShowColumn={defaultShow}
        scope={scope}
        currentPage={currentPage}
        updatePage={updatePage}
        tableData={endUsersGroups}
        isLoading={isLoading}
      />
    </>
  );
};

export default EndUsersGroupsScreen;
