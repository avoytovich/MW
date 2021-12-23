import React, { useState } from 'react';
import { toast } from 'react-toastify';
import TableComponent from '../../../../components/TableComponent';

import {
  generateData,
  defaultShow,
} from '../../../../services/useData/tableMarkups/priceFunctions';
import { useTableData } from '../../../../services/useData';

import {
  getSortParams,
  saveSortParams,
  sortKeys,
} from '../../../../services/sorting';

import localization from '../../../../localization';
import api from '../../../../api';
import useAllTablesItems from '../../../../services/customHooks/useAllTablesItems';

const PriceFunctionsScreen = () => {
  const scope = 'pricefunctions';
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(false);

  const [sortParams, setSortParams] = useState(getSortParams(sortKeys.priceFunctions));
  const [allCheckedItems, setAllCheckedItems] = useAllTablesItems();

  const requests = async (rowsPerPage, reduxCurrentPage, filtersUrl) => {
    const res = await api.getPriceFunctions({

      page: reduxCurrentPage, size: rowsPerPage, filters: filtersUrl, sortParams,
    });

    return generateData(res.data);
  };

  const priceFunctions = useTableData(
    setLoading,
    makeUpdate,
    scope,
    requests,
    sortParams,
  );

  const handleDeletePrice = (id) => api.deletePriceFunctionById(id).then(() => {
    setMakeUpdate((v) => v + 1);
    toast(
      `${localization.t('general.priceFunction')} ${id} ${localization.t(
        'general.hasBeenSuccessfullyDeleted',
      )}`,
    );
  });

  const handleSetSortParams = (params) => {
    setSortParams(params);

    saveSortParams(sortKeys.priceFunctions, params);
  };

  return (
    <TableComponent
      allCheckedItems={allCheckedItems}
      sortParams={sortParams}
      setSortParams={handleSetSortParams}
      scope={scope}
      handleDeleteItem={handleDeletePrice}
      defaultShowColumn={defaultShow}
      tableData={priceFunctions}
      isLoading={isLoading}
    />
  );
};

export default PriceFunctionsScreen;
