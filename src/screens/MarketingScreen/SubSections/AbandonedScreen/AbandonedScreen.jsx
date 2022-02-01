import React, { useState } from 'react';
import { toast } from 'react-toastify';

import TableComponent from '../../../../components/TableComponent';

import {
  generateData,
  defaultShow,
} from '../../../../services/useData/tableMarkups/abandoned';
import { useTableData } from '../../../../services/useData';
import api from '../../../../api';
import {
  getSortParams,
  saveSortParams,
  sortKeys,
} from '../../../../services/sorting';
import localization from '../../../../localization';

const AbandonedScreen = () => {
  const scope = 'marketingAbandoned';

  const [isLoading, setLoading] = useState(false);
  const [sortParams, setSortParams] = useState(
    getSortParams(sortKeys.abandoned),
  );
  const [makeUpdate, setMakeUpdate] = useState(0);


  const requests = async (rowsPerPage, reduxCurrentPage, filtersUrl) => {
    const res = await api.getAbandoned({
      page: reduxCurrentPage, size: rowsPerPage, filters: filtersUrl, sortParams,
    });
    return generateData(res.data);
  };

  const handleSetSortParams = (params) => {
    setSortParams(params);
    saveSortParams(sortKeys.abandoned, params);
  };

  const abandoned = useTableData(
    setLoading,
    makeUpdate,
    scope,
    requests,
    sortParams,
  );

  const handleDeleteAbandonedCart = (id) => api.deleteAbandonedCartById(id).then(() => {
    setMakeUpdate((v) => v + 1);
    toast(
      `${localization.t('general.abandonedCart')} ${id} ${localization.t(
        'general.hasBeenSuccessfullyDeleted',
      )}`,
    );
  });

  return (
    <TableComponent
      scope={scope}
      defaultShowColumn={defaultShow}
      sortParams={sortParams}
      handleDeleteItem={handleDeleteAbandonedCart}
      setSortParams={handleSetSortParams}
      tableData={abandoned}
      isLoading={isLoading}
      noActions
    />
  );
};

export default AbandonedScreen;
