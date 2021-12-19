import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import TableComponent from '../../components/TableComponent';
import TableActionsBar from '../../components/TableActionsBar';
import parentPaths from '../../services/paths';

import {
  generateData,
  defaultShow,
  markUp,
} from '../../services/useData/tableMarkups/recommendations';
import { useTableData } from '../../services/useData';
import localization from '../../localization';
import api from '../../api';

const RecommendationsScreen = () => {
  const scope = 'recommendations';
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(false);

  const requests = async (rowsPerPage, reduxCurrentPage, filtersUrl) => {
    const res = await api.getRecommendations({
      page: reduxCurrentPage, size: rowsPerPage, filters: filtersUrl,
    });
    return generateData(res.data);
  };

  const campaigns = useTableData(
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

  return (
    <>
      <TableActionsBar
        scope={scope}
        deleteFunc={api.deleteRecommendationById}
        headers={markUp.headers}
      >
        <Button
          id='add-marketing-button'
          color='primary'
          size='large'
          variant='contained'
          component={Link}
          to={`${parentPaths.recommendations}/add`}
        >
          {localization.t('general.addRecommendation')}
        </Button>
      </TableActionsBar>
      <TableComponent
        scope={scope}
        handleDeleteItem={handleDeleteRecommendation}
        defaultShowColumn={defaultShow}
        tableData={campaigns}
        isLoading={isLoading}
      />
    </>
  );
};

export default RecommendationsScreen;
