import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import TableComponent from '../../../../components/TableComponent';

import {
  generateData,
  defaultShow,
} from '../../../../services/useData/tableMarkups/discounts';
import { useTableData } from '../../../../services/useData';
import { showNotification } from '../../../../redux/actions/HttpNotifications';
import localization from '../../../../localization';
import api from '../../../../api';

const DiscountsScreen = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(false);

  const requests = async (filtersUrl) => {
    const res = await api.getDiscounts(currentPage - 1, filtersUrl);
    return generateData(res.data);
  };

  const discounts = useTableData(
    currentPage - 1,
    setLoading,
    makeUpdate,
    'discounts',
    requests,
  );

  const handleDeleteDiscount = (id) => api.deleteDiscountById(id).then(() => {
    setMakeUpdate((v) => v + 1);
    dispatch(
      showNotification(
        `${localization.t('general.discount')} ${id} ${localization.t(
          'general.hasBeenSuccessfullyDeleted',
        )}`,
      ),
    );
  });

  const updatePage = (page) => setCurrentPage(page);

  return (
    <TableComponent
      handleDeleteItem={handleDeleteDiscount}
      showColumn={defaultShow}
      currentPage={currentPage}
      updatePage={updatePage}
      tableData={discounts}
      isLoading={isLoading}
    />
  );
};

export default DiscountsScreen;