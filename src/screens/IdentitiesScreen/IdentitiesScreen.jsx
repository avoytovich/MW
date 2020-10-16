import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import useIdentitiesData from '../../services/useData/useIdentitiesData';
import { defaultShow } from '../../services/useData/tableMarkups/identities';
import TableComponent from '../../components/TableComponent';
import { showNotification } from '../../redux/actions/HttpNotifications';

import api from '../../api';

const IdentitiesScreen = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(true);

  const identities = useIdentitiesData(currentPage - 1, setLoading, makeUpdate);

  const handleDeleteIdentity = (id) => api
    .deleteIdentityById(id)
    .then(() => {
      setMakeUpdate((v) => (v + 1));
      // ToDo: make message localized
      dispatch(showNotification(`Identity ${id} has been successfully deleted!`));
    });

  const updatePage = (page) => setCurrentPage(page);

  return (
    <TableComponent
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
