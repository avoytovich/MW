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

const PriceFunctionsScreen = () => {
  const scope = 'pricefunctions';

  const [currentPage, setCurrentPage] = useState(1);
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(false);

  const [sortParams, setSortParams] = useState(getSortParams(sortKeys.priceFunctions));

  const requests = async (rowsPerPage, filtersUrl) => {
    const res = await api.getPriceFunctions({

      page: currentPage - 1, size: rowsPerPage, filters: filtersUrl, sortParams,
    });

    return generateData(res.data);
  };

  const priceFunctions = useTableData(
    currentPage - 1,
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

  const updatePage = (page) => setCurrentPage(page);

  return (
    <TableComponent
      sortParams={sortParams}
      setSortParams={handleSetSortParams}
      scope={scope}
      handleDeleteItem={handleDeletePrice}
      defaultShowColumn={defaultShow}
      currentPage={currentPage}
      updatePage={updatePage}
      tableData={priceFunctions}
      isLoading={isLoading}
    />
  );
};

export default PriceFunctionsScreen;
