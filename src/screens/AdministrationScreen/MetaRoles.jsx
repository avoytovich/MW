import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import localization from '../../localization';

import TableComponent from '../../components/TableComponent';
import api from '../../api';
import useAllTablesItems from '../../services/customHooks/useAllTablesItems';
import { useTableData } from '../../services/useData';
import { generateData, defaultShow } from '../../services/useData/tableMarkups/adminMetaRole';
import {
  getSortParams,
  saveSortParams,
  sortKeys,
} from '../../services/sorting';

const MetaRoles = ({ sortKey, scope, label }) => {
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [sortParams, setSortParams] = useState(
    getSortParams(sortKeys[sortKey]),
  );
  const [allCheckedItems, setAllCheckedItems] = useAllTablesItems();

  const handleSetSortParams = (params) => {
    setSortParams(params);
    saveSortParams(sortKeys[sortKey], params);
  };

  const requests = async (rowsPerPage, reduxCurrentPage, filtersUrl) => {
    const costumersIds = [];
    const res = await api.getMetaRoles({
      page: reduxCurrentPage, size: rowsPerPage, filters: filtersUrl, sortParams,
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
  const tableData = useTableData(
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
      toast(
        `${localization.t(localizedLabel)} ${id} ${localization.t(
          'general.hasBeenSuccessfullyDeleted',
        )}`,
      );
    });
  };

  return (
    <TableComponent
      allCheckedItems={allCheckedItems}
      sortParams={sortParams}
      setSortParams={handleSetSortParams}
      handleDeleteItem={handleDelete}
      defaultShowColumn={defaultShow}
      scope={scope}
      tableData={tableData}
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
