import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import api from '../../api';
import {
  generateData,
  defaultShow,
} from '../../services/useData/tableMarkups/checkoutExperience';
import { useTableData } from '../../services/useData';
import TableComponent from '../../components/TableComponent';
import { showNotification } from '../../redux/actions/HttpNotifications';
import localization from '../../localization';
import { getSortParams, saveSortParams, sortKeys } from '../../services/sorting';

const LayoutsTab = () => {
  const dispatch = useDispatch();
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

  const requests = async () => {
    const costumersIds = [];
    const res = await api.getDesignsLayouts(currentPage - 1, sortParams);
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
    'checkout-experience',
    requests,
    sortParams,
  );

  const handleDeleteLayout = (id) => api.deleteLayoutById(id).then(() => {
    setMakeUpdate((v) => v + 1);
    dispatch(
      showNotification(
        `${localization.t('general.layout')} ${id} ${localization.t(
          'general.hasBeenSuccessfullyDeleted',
        )}`,
      ),
    );
  });

  const updatePage = (page) => setCurrentPage(page);

  return (
    <TableComponent
      sortParams={sortParams}
      setSortParams={handleSetSortParams}
      handleDeleteItem={handleDeleteLayout}
      showColumn={defaultShow}
      currentPage={currentPage}
      updatePage={updatePage}
      tableData={layout}
      isLoading={isLoading}
    />
  );
};

export default LayoutsTab;
