import React, { useState } from 'react';
import { toast } from 'react-toastify';

import TableComponent from '../../../../components/TableComponent';

import {
  generateData,
  defaultShow,
} from '../../../../services/useData/tableMarkups/discounts';
import { useTableData } from '../../../../services/useData';
import localization from '../../../../localization';
import api from '../../../../api';

const DiscountsScreen = () => {
  const scope = 'discounts';

  const [currentPage, setCurrentPage] = useState(1);
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(false);

  const requests = async (rowsPerPage, filtersUrl) => {
    const res = await api.getDiscounts({
      page: currentPage - 1, size: rowsPerPage, filters: filtersUrl,
    });
    return generateData(res.data);
  };

  const discounts = useTableData(
    currentPage - 1,
    setLoading,
    makeUpdate,
    scope,
    requests,
  );

  const handleDeleteDiscount = (id) => api.deleteDiscountById(id).then(() => {
    setMakeUpdate((v) => v + 1);
    toast(
      `${localization.t('general.discount')} ${id} ${localization.t(
        'general.hasBeenSuccessfullyDeleted',
      )}`,
    );
  });

  const updatePage = (page) => setCurrentPage(page);

  return (
    <TableComponent
      scope={scope}
      handleDeleteItem={handleDeleteDiscount}
      defaultShowColumn={defaultShow}
      currentPage={currentPage}
      updatePage={updatePage}
      tableData={discounts}
      isLoading={isLoading}
    />
  );
};

export default DiscountsScreen;
