import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import TableComponent from '../../components/TableComponent';
import TableActionsBar from '../../components/TableActionsBar';
import parentPaths from '../../services/paths';
import useAllTablesItems from '../../services/customHooks/useAllTablesItems';

import {
  generateData,
  defaultShow,
  markUp,
} from '../../services/useData/tableMarkups/recommendations';
import { useTableData } from '../../services/useData';
import localization from '../../localization';
import api from '../../api';
import {
  getSortParams,
  saveSortParams,
  sortKeys,
} from '../../services/sorting';

const RecommendationsScreen = () => {
  const scope = 'recommendations';
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [allCheckedItems, setAllCheckedItems] = useAllTablesItems();

  const [sortParams, setSortParams] = useState(
    getSortParams(sortKeys.recommendations),
  );

  const requests = async (rowsPerPage, reduxCurrentPage, filtersUrl) => {
    const res = await api.getRecommendations({
      page: reduxCurrentPage, size: rowsPerPage, filters: filtersUrl, sortParams,
    });
    return generateData(res.data);
  };

  const handleSetSortParams = (params) => {
    setSortParams(params);
    saveSortParams(sortKeys.recommendations, params);
  };

  const campaigns = useTableData(
    setLoading,
    makeUpdate,
    scope,
    requests,
    sortParams,
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
        allCheckedItems={allCheckedItems}
        scope={scope}
        sortParams={sortParams}
        handleDeleteItem={handleDeleteRecommendation}
        defaultShowColumn={defaultShow}
        tableData={campaigns}
        isLoading={isLoading}
        setSortParams={handleSetSortParams}
      />
    </>
  );
};

export default RecommendationsScreen;
