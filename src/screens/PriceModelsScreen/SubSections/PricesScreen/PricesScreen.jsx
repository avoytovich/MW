import React, { useState } from 'react';
import { toast } from 'react-toastify';
import TableComponent from '../../../../components/TableComponent';

import {
  generateData,
  defaultShow,
} from '../../../../services/useData/tableMarkups/prices';
import { useTableData } from '../../../../services/useData';

import {
  getSortParams,
  saveSortParams,
  sortKeys,
} from '../../../../services/sorting';

import localization from '../../../../localization';
import api from '../../../../api';

const PricesScreen = () => {
  const scope = 'prices';

  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [sortParams, setSortParams] = useState(getSortParams(sortKeys.prices));

  const requests = async (rowsPerPage, reduxCurrentPage, filtersUrl) => {
    const res = await api.getMarketingPrices({
      page: reduxCurrentPage, size: rowsPerPage, filters: filtersUrl, sortParams,
    });
    return generateData(res.data);
  };

  const prices = useTableData(
    setLoading,
    makeUpdate,
    scope,
    requests,
    sortParams,
  );

  const handleDeletePrice = (id) => api.deletePriceById(id).then(() => {
    setMakeUpdate((v) => v + 1);
    toast(
      `${localization.t('general.price')} ${id} ${localization.t(
        'general.hasBeenSuccessfullyDeleted',
      )}`,
    );
  });

  const handleSetSortParams = (params) => {
    setSortParams(params);
    saveSortParams(sortKeys.prices, params);
  };

  return (
    <TableComponent
      sortParams={sortParams}
      setSortParams={handleSetSortParams}
      scope={scope}
      handleDeleteItem={handleDeletePrice}
      defaultShowColumn={defaultShow}
      tableData={prices}
      isLoading={isLoading}
    />
  );
};

export default PricesScreen;
