import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import TableComponent from '../../components/TableComponent';
import api from '../../api';
import { useTableData } from '../../services/useData';
import { generateData } from '../../services/useData/tableMarkups/adminMetaRole';
import PropTypes from 'prop-types';

import {
  getSortParams,
  saveSortParams,
  sortKeys,
} from '../../services/sorting';

const MetaRoles = ({ sortKey, scope }) => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [sortParams, setSortParams] = useState(
    getSortParams(sortKeys[sortKey]),
  );

  const handleSetSortParams = (params) => {
    setSortParams(params);
    saveSortParams(sortKeys[sortKey], params);
  };

  const requests = async (filtersUrl) => {
    const costumersIds = [];
    const res = await api.getMetaRoles(currentPage - 1, filtersUrl, sortParams);
    res.data.items.forEach((item) => {
      const costumer = `id=${item.customerId}`;
      if (!costumersIds.includes(costumer)) {
        costumersIds.push(costumer);
      }
    });
    const customers = await api.getCustomersByIds(costumersIds.join('&'));
    return generateData(res.data, customers.data.items);
  };
  const data = useTableData(
    currentPage - 1,
    setLoading,
    makeUpdate,
    scope,
    requests,
    sortParams,
  );
  const handleDelete = (id) => {
    api.deleteMetaRoleById(id).then(() => {
      const localizedLabel = `general.${scope}`;
      setMakeUpdate((v) => v + 1);
      dispatch(
        showNotification(
          `${localization.t(localizedLabel)} ${id} ${localization.t(
            'general.hasBeenSuccessfullyDeleted',
          )}`,
        ),
      );
    });
  };
  const updatePage = (page) => setCurrentPage(page);
  return (
    <TableComponent
      sortParams={sortParams}
      setSortParams={handleSetSortParams}
      handleDeleteItem={handleDelete}
      showColumn={data?.defaultShow}
      currentPage={currentPage}
      updatePage={updatePage}
      tableData={data}
      isLoading={isLoading}
    />
  );
};

MetaRoles.propTypes = {
  tabObject: PropTypes.object,
};

export default MetaRoles;
