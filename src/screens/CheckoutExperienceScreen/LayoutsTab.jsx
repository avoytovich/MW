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
import { getSortParams, saveSortParams, sortKeys } from '../../services/sorting';

const LayoutsTab = () => {
  const scope = 'layouts';
  const [currentPage, setCurrentPage] = useState(1);
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [sortParams, setSortParams] = useState(
    getSortParams(sortKeys.layoutsTab),
  );

  const handleSetSortParams = (params) => {
    setSortParams(params);
    saveSortParams(sortKeys.layoutsTab, params);
  };

  const requests = async (rowsPerPage) => {
    const costumersIds = [];
    const res = await api.getDesignsLayouts({
      page: currentPage - 1, size: rowsPerPage, sortParams,
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

  const layout = useTableData(
    currentPage - 1,
    setLoading,
    makeUpdate,
    scope,
    requests,
    sortParams,
  );

  const handleDeleteLayout = (id) => api.deleteLayoutById(id).then(() => {
    setMakeUpdate((v) => v + 1);
    toast(
      `${localization.t('general.layout')} ${id} ${localization.t(
        'general.hasBeenSuccessfullyDeleted',
      )}`,
    );
  });

  const updatePage = (page) => setCurrentPage(page);

  return (
    <TableComponent
      scope={scope}
      sortParams={sortParams}
      setSortParams={handleSetSortParams}
      handleDeleteItem={handleDeleteLayout}
      defaultShowColumn={defaultShow}
      currentPage={currentPage}
      updatePage={updatePage}
      tableData={layout}
      isLoading={isLoading}
    />
  );
};

export default LayoutsTab;
