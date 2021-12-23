import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import api from '../../api';
import useAllTablesItems from '../../services/customHooks/useAllTablesItems';

import {
  generateData,
  defaultShow,
  markUp,
} from '../../services/useData/tableMarkups/onboarding';
import useTableData from '../../services/useData/useTableData';
import TableComponent from '../../components/TableComponent';
import localization from '../../localization';
import TableActionsBar from '../../components/TableActionsBar';
import {
  getSortParams,
  saveSortParams,
  sortKeys,
} from '../../services/sorting';

const OnboardingScreen = () => {
  const scope = 'onboarding';
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [sortParams, setSortParams] = useState(
    getSortParams(sortKeys.onboarding),
  );
  const [allCheckedItems, setAllCheckedItems] = useAllTablesItems();

  const { selectedCustomer } = useSelector(({ account: { nexwayState } }) => nexwayState);

  const requests = async (rowsPerPage, reduxCurrentPage, filtersUrl) => {
    const costumersIds = [];

    const customers = await api.getCustomersByIds(costumersIds.join('&'));

    const res = await api.getOnboardingList({
      page: reduxCurrentPage, size: rowsPerPage, filters: filtersUrl, sortParams,
    });
    return generateData(res.data, customers.data.items, selectedCustomer);
  };

  const handleSetSortParams = (params) => {
    setSortParams(params);
    saveSortParams(sortKeys.endUsersGroups, params);
  };

  const onboardingList = useTableData(
    setLoading,
    makeUpdate,
    scope,
    requests,
    sortParams,
  );

  const handleDeleteOnboarding = (id) => api.deleteOnboardingById(id).then(() => {
    setMakeUpdate((v) => v + 1);
    toast(
      `${localization.t('general.onboarding')} ${id} ${localization.t(
        'general.hasBeenSuccessfullyDeleted',
      )}`,
    );
  });

  return (
    <>
      <TableActionsBar
        scope={scope}
        deleteFunc={api.deleteOnboardingById}
        headers={markUp.headers}
      />
      <TableComponent
        allCheckedItems={allCheckedItems}
        sortParams={sortParams}
        setSortParams={handleSetSortParams}
        handleDeleteItem={handleDeleteOnboarding}
        defaultShowColumn={defaultShow}
        scope={scope}
        tableData={onboardingList}
        isLoading={isLoading}
      />
    </>
  );
};

export default OnboardingScreen;
