import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import TableComponent from '../../components/TableComponent';
import TableActionsBar from '../../components/TableActionsBar';

import api from '../../api';
import useAllTablesItems from '../../services/customHooks/useAllTablesItems';
import {
  getSortParams,
  saveSortParams,
  sortKeys,
} from '../../services/sorting';

import {
  generateData,
  defaultShow,
  markUp,
} from '../../services/useData/tableMarkups/stores';
import parentPaths from '../../services/paths';
import useTableData from '../../services/useData/useTableData';

import localization from '../../localization';

const StoresScreen = () => {
  const scope = 'stores';
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [sortParams, setSortParams] = useState(getSortParams(sortKeys.stores));
  const [allCheckedItems, setAllCheckedItems] = useAllTablesItems();

  const handleSetSortParams = (params) => {
    setSortParams(params);
    saveSortParams(sortKeys.stores, params);
  };

  const requests = async (rowPerPage, reduxCurrentPage, filtersUrl) => {
    const costumersIds = [];
    const res = await api.getStores({
      page: reduxCurrentPage,
      size: rowPerPage,
      filters: filtersUrl,
      sortParams,
    });
    res.data.items.forEach((item) => {
      const costumer = `id=${item.customerId}`;
      if (!costumersIds.includes(costumer)) {
        costumersIds.push(costumer);
      }
    });
    const customers = await api.getCustomersByIds(costumersIds.join('&'));
    return generateData(res.data, customers.data);
  };

  const handleDeleteStore = (id, force) => api.deleteStoreById(id, force)
    .then(() => {
      setMakeUpdate((v) => v + 1);
    })
    .catch((msg) => {
      if (force) {
        toast.error(msg);
      } else {
        handleDeleteStore(id, true);
        toast(
          `${localization.t('general.store')} ${id} ${localization.t(
            'general.hasBeenSuccessfullyDeleted',
          )}`,
        );
      }
    });

  const stores = useTableData(
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
        deleteFunc={api.deleteStoreById}
        headers={markUp.headers}
        handleDeleteItem={handleDeleteStore}
        withDeletePopup
      >
        <Box>
          <Button
            id="add-product"
            color="primary"
            size="large"
            variant="contained"
            component={Link}
            to={`${parentPaths.stores}/add`}
          >
            {`${localization.t('general.add')} ${localization.t('labels.store')}`}
          </Button>
        </Box>
      </TableActionsBar>
      <TableComponent
        allCheckedItems={allCheckedItems}
        scope={scope}
        sortParams={sortParams}
        setSortParams={handleSetSortParams}
        handleDeleteItem={handleDeleteStore}
        defaultShowColumn={defaultShow}
        tableData={stores}
        isLoading={isLoading}
        withDeletePopup
      />
    </>
  );
};

export default StoresScreen;
