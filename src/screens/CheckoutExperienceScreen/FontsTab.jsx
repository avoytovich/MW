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
import {
  getSortParams,
  saveSortParams,
  sortKeys,
} from '../../services/sorting';

const FontsTab = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [sortParams, setSortParams] = useState(
    getSortParams(sortKeys.fontsTab),
  );

  const handleSetSortParams = (params) => {
    setSortParams(params);
    saveSortParams(sortKeys.fontsTab, params);
  };

  const requests = async (rowsPerPage) => {
    const costumersIds = [];
    const res = await api.getDesignsFonts({
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

  const fonts = useTableData(
    currentPage - 1,
    setLoading,
    makeUpdate,
    'fonts',
    requests,
    sortParams,
  );

  const handleDeleteFont = (id) => api.deleteFontById(id).then(() => {
    setMakeUpdate((v) => v + 1);
    dispatch(
      showNotification(
        `${localization.t('general.font')} ${id} ${localization.t(
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
      handleDeleteItem={handleDeleteFont}
      showColumn={defaultShow}
      currentPage={currentPage}
      updatePage={updatePage}
      tableData={fonts}
      isLoading={isLoading}
    />
  );
};

export default FontsTab;
