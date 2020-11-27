import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import TableComponent from '../../../../components/TableComponent';

import {
  generateData,
  defaultShow,
} from '../../../../services/useData/tableMarkups/recommendations';
import { useTableData } from '../../../../services/useData';
import { showNotification } from '../../../../redux/actions/HttpNotifications';
import localization from '../../../../localization';
import api from '../../../../api';

const RecommendationsScreen = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(false);

  const requests = async (filtersUrl) => {
    const res = await api.getRecommendations(currentPage - 1, filtersUrl);
    return generateData(res.data);
  };

  const campaigns = useTableData(
    currentPage - 1,
    setLoading,
    makeUpdate,
    'recommendations',
    requests,
  );

  const handleDeleteRecommendation = (id) => api.deleteRecommendationById(id).then(() => {
    setMakeUpdate((v) => v + 1);
    dispatch(
      showNotification(
        `${localization.t('general.recommendation')} ${id} ${localization.t(
          'general.hasBeenSuccessfullyDeleted',
        )}`,
      ),
    );
  });

  const updatePage = (page) => setCurrentPage(page);

  return (
    <TableComponent
      handleDeleteItem={handleDeleteRecommendation}
      showColumn={defaultShow}
      currentPage={currentPage}
      updatePage={updatePage}
      tableData={campaigns}
      isLoading={isLoading}
    />
  );
};

export default RecommendationsScreen;
