import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { showNotification } from '../../redux/actions/HttpNotifications';
import localization from '../../localization';

import TableComponent from '../../components/TableComponent';
import api from '../../api';
import { useTableData } from '../../services/useData';
import { generateData } from '../../services/useData/tableMarkups/adminMetaRole';
import {
  getSortParams,
  saveSortParams,
  sortKeys,
} from '../../services/sorting';

const MetaRoles = ({ sortKey, scope, label }) => {
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

  const requests = async (rowsPerPage, filtersUrl) => {
    const costumersIds = [];
    const res = await api.getMetaRoles({
      page: currentPage - 1, size: rowsPerPage, filters: filtersUrl, sortParams,
    });
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
      const localizedLabel = `labels.${label}`;
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
  sortKey: PropTypes.string,
  label: PropTypes.string,
  scope: PropTypes.string,
};

export default MetaRoles;
