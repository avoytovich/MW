import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import api from '../../api';
import {
  generateData,
  defaultShow,
} from '../../services/useData/tableMarkups/identities';
import { useTableData } from '../../services/useData';
import TableComponent from '../../components/TableComponent';
import { showNotification } from '../../redux/actions/HttpNotifications';
import localization from '../../localization';
import { initialIdentitiesSortParams } from '../../services/constants';

const IdentitiesScreen = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [sortParams, setSortParams] = useState(initialIdentitiesSortParams);

  const requests = async (filtersUrl) => {
    const res = await api.getIdentities(
      currentPage - 1,
      filtersUrl,
      sortParams,
    );
    return generateData(res.data);
  };

  const identities = useTableData(
    currentPage - 1,
    setLoading,
    makeUpdate,
    'identities',
    requests,
    sortParams,
  );

  const handleDeleteIdentity = (id) => api.deleteIdentityById(id).then(() => {
    setMakeUpdate((v) => v + 1);
    dispatch(
      showNotification(
        `${localization.t('general.identity')} ${id} ${localization.t(
          'general.hasBeenSuccessfullyDeleted',
        )}`,
      ),
    );
  });

  const updatePage = (page) => setCurrentPage(page);

  return (
    <TableComponent
      sortParams={sortParams}
      setSortParams={setSortParams}
      handleDeleteItem={handleDeleteIdentity}
      showColumn={defaultShow}
      currentPage={currentPage}
      updatePage={updatePage}
      tableData={identities}
      isLoading={isLoading}
    />
  );
};

export default IdentitiesScreen;
