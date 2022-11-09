import React, { useState } from 'react';
import { toast } from 'react-toastify';

import api from '../../api';

import {
  generateData,
  defaultShow,
} from '../../services/useData/tableMarkups/checkoutExperience';
import { useTableData } from '../../services/useData';
import TableComponent from '../../components/TableComponent';

import localization from '../../localization';
import {
  getSortParams,
  saveSortParams,
  sortKeys,
} from '../../services/sorting';

const FontsTab = () => {
  const scope = 'fonts';
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [sortParams, setSortParams] = useState(
    getSortParams(sortKeys.fontsTab),
  );

  const handleSetSortParams = (params) => {
    setSortParams(params);
    saveSortParams(sortKeys.fontsTab, params);
  };

  const requests = async (rowsPerPage, reduxCurrentPage, filtersUrl) => {
    const res = await api.getDesignsFonts({
      page: reduxCurrentPage, size: rowsPerPage, sortParams, filters: filtersUrl,
    });

    return generateData(res.data);
  };

  const fonts = useTableData(
    setLoading,
    makeUpdate,
    scope,
    requests,
    sortParams,
  );

  const handleDeleteFont = (id) => api.deleteFontById(id).then(() => {
    setMakeUpdate((v) => v + 1);
    toast(
      `${localization.t('general.font')} ${id} ${localization.t(
        'general.hasBeenSuccessfullyDeleted',
      )}`,
    );
  });

  return (
    <TableComponent
      scope={scope}
      sortParams={sortParams}
      setSortParams={handleSetSortParams}
      handleDeleteItem={handleDeleteFont}
      defaultShowColumn={defaultShow}
      tableData={fonts}
      isLoading={isLoading}
    />
  );
};

export default FontsTab;
