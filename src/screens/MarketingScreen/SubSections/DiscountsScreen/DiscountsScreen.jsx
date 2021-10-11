import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Box, Button } from '@material-ui/core';
import TableActionsBar from '../../../../components/TableActionsBar';
import api from '../../../../api';
import parentPaths from '../../../../services/paths';
import TableComponent from '../../../../components/TableComponent';

import {
  markUp,
  generateData,
  defaultShow,
} from '../../../../services/useData/tableMarkups/discounts';
import { useTableData } from '../../../../services/useData';
import localization from '../../../../localization';
import {
  getSortParams,
  saveSortParams,
  sortKeys,
} from '../../../../services/sorting';

const DiscountsScreen = () => {
  const scope = 'discounts';

  const [currentPage, setCurrentPage] = useState(1);
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [sortParams, setSortParams] = useState(
    getSortParams(sortKeys.discounts),
  );

  const requests = async (rowsPerPage, filtersUrl) => {
    const res = await api.getDiscounts({
      page: currentPage - 1, size: rowsPerPage, filters: filtersUrl, sortParams,
    });
    return generateData(res.data);
  };

  const handleSetSortParams = (params) => {
    setSortParams(params);
    saveSortParams(sortKeys.discounts, params);
  };

  const discounts = useTableData(
    currentPage - 1,
    setLoading,
    makeUpdate,
    scope,
    requests,
    sortParams,
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
    <Box display='flex' flexDirection='column'>
      <TableActionsBar
        scope={scope}
        deleteFunc={api.deleteDiscountById}
        headers={markUp.headers}
      >
        <Button
          id='add-marketing-button'
          color='primary'
          size='large'
          variant='contained'
          component={Link}
          to={`${parentPaths.marketing.discounts}/add`}
        >
          {`${localization.t('general.add')} ${localization.t(
            'general.discount',
          )}`}
        </Button>
      </TableActionsBar>
      <Box mt={4} mb={2}>
        <TableComponent
          scope={scope}
          handleDeleteItem={handleDeleteDiscount}
          sortParams={sortParams}
          setSortParams={handleSetSortParams}
          defaultShowColumn={defaultShow}
          currentPage={currentPage}
          updatePage={updatePage}
          tableData={discounts}
          isLoading={isLoading}
        />
      </Box>
    </Box>
  );
};

export default DiscountsScreen;
