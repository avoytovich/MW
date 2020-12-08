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
import { initialSortParams } from '../../services/constants';

const TranslationsTab = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [sortParams, setSortParams] = useState(initialSortParams);

  const requests = async () => {
    const costumersIds = [];
    const res = await api.getDesignsTranslations(currentPage - 1, sortParams);
    res.data.items.forEach((item) => {
      const costumer = `id=${item.customerId}`;
      if (!costumersIds.includes(costumer)) {
        costumersIds.push(costumer);
      }
    });
    const customers = await api.getCustomersByIds(costumersIds.join('&'));
    return generateData(res.data, customers.data.items);
  };

  const translations = useTableData(
    currentPage - 1,
    setLoading,
    makeUpdate,
    'checkout-experience',
    requests,
    sortParams,
  );

  const handleDeleteTranslation = (id) => api.deleteTranslationById(id).then(() => {
    setMakeUpdate((v) => v + 1);
    dispatch(
      showNotification(
        `${localization.t('general.translation')} ${id} ${localization.t(
          'general.hasBeenSuccessfullyDeleted',
        )}`,
      ),
    );
  });

  const updatePage = (page) => setCurrentPage(page);

  return (
    <TableComponent
      sortParams={sortParams}
      setSortParams={setSortParams}
      handleDeleteItem={handleDeleteTranslation}
      showColumn={defaultShow}
      currentPage={currentPage}
      updatePage={updatePage}
      tableData={translations}
      isLoading={isLoading}
    />
  );
};

export default TranslationsTab;
