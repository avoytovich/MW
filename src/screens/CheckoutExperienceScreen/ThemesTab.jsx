import React, { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../api';
import useAllTablesItems from '../../services/customHooks/useAllTablesItems';
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

const ThemesTab = () => {
  const scope = 'themes';

  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [sortParams, setSortParams] = useState(
    getSortParams(sortKeys.themesTab),
  );
  const [allCheckedItems, setAllCheckedItems] = useAllTablesItems();

  const handleSetSortParams = (params) => {
    setSortParams(params);
    saveSortParams(sortKeys.themesTab, params);
  };

  const requests = async (rowsPerPage, reduxCurrentPage) => {
    const costumersIds = [];
    const res = await api.getDesignsThemes({
      page: reduxCurrentPage, size: rowsPerPage, sortParams,
    });
    res.data.items.forEach((item) => {
      const costumer = `id=${item.customerId}`;
      if (!costumersIds.includes(costumer)) {
        costumersIds.push(costumer);
      }
    });
    const customers = await api.getCustomersByIds(costumersIds.join('&'));
    return generateData(res.data, customers.data.items);
  };

  const themes = useTableData(
    setLoading,
    makeUpdate,
    scope,
    requests,
    sortParams,
  );

  const handleDeleteTheme = (id) => api.deleteThemeById(id).then(() => {
    setMakeUpdate((v) => v + 1);
    toast(
      `${localization.t('general.theme')} ${id} ${localization.t(
        'general.hasBeenSuccessfullyDeleted',
      )}`,
    );
  });

  return (
    <TableComponent
      allCheckedItems={allCheckedItems}
      scope={scope}
      sortParams={sortParams}
      setSortParams={handleSetSortParams}
      handleDeleteItem={handleDeleteTheme}
      defaultShowColumn={defaultShow}
      tableData={themes}
      isLoading={isLoading}
    />
  );
};

export default ThemesTab;
