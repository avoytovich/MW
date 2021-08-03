import React, { useState } from 'react';
import { toast } from 'react-toastify';
import TableComponent from '../../../../components/TableComponent';

import {
  generateData,
  defaultShow,
} from '../../../../services/useData/tableMarkups/recommendations';
import { useTableData } from '../../../../services/useData';
import localization from '../../../../localization';
import api from '../../../../api';

const RecommendationsScreen = () => {
  const scope = 'recommendations';

  const [currentPage, setCurrentPage] = useState(1);
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(false);

  const requests = async (rowsPerPage, filtersUrl) => {
    const res = await api.getRecommendations({
      page: currentPage - 1, size: rowsPerPage, filters: filtersUrl,
    });
    return generateData(res.data);
  };

  const campaigns = useTableData(
    currentPage - 1,
    setLoading,
    makeUpdate,
    scope,
    requests,
  );

  const handleDeleteRecommendation = (id) => api.deleteRecommendationById(id).then(() => {
    setMakeUpdate((v) => v + 1);
    toast(
      `${localization.t('general.recommendation')} ${id} ${localization.t(
        'general.hasBeenSuccessfullyDeleted',
      )}`,
    );
  });

  const updatePage = (page) => setCurrentPage(page);

  return (
    <TableComponent
      scope={scope}
      handleDeleteItem={handleDeleteRecommendation}
      defaultShowColumn={defaultShow}
      currentPage={currentPage}
      updatePage={updatePage}
      tableData={campaigns}
      isLoading={isLoading}
    />
  );
};

export default RecommendationsScreen;
