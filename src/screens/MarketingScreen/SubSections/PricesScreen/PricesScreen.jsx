import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import TableComponent from '../../../../components/TableComponent';

import {
  generateData,
  defaultShow,
} from '../../../../services/useData/tableMarkups/prices';
import { useTableData } from '../../../../services/useData';
import { showNotification } from '../../../../redux/actions/HttpNotifications';
import localization from '../../../../localization';
import api from '../../../../api';

const PricesScreen = () => {
  const scope = 'prices';

  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(false);

  const requests = async (rowsPerPage, filtersUrl) => {
    const res = await api.getMarketingPrices({
      page: currentPage - 1, size: rowsPerPage, filters: filtersUrl,
    });
    return generateData(res.data);
  };

  const prices = useTableData(
    currentPage - 1,
    setLoading,
    makeUpdate,
    scope,
    requests,
  );

  const handleDeletePrice = (id) => api.deletePriceById(id).then(() => {
    setMakeUpdate((v) => v + 1);
    dispatch(
      showNotification(
        `${localization.t('general.price')} ${id} ${localization.t(
          'general.hasBeenSuccessfullyDeleted',
        )}`,
      ),
    );
  });

  const updatePage = (page) => setCurrentPage(page);

  return (
    <TableComponent
      scope={scope}
      handleDeleteItem={handleDeletePrice}
      defaultShowColumn={defaultShow}
      currentPage={currentPage}
      updatePage={updatePage}
      tableData={prices}
      isLoading={isLoading}
    />
  );
};

export default PricesScreen;
