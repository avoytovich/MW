import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import { useStoreDetailsData } from '../../services/useData';
import DetailLayout from '../../layouts/DetailLayout';

const StoreDetailsScreen = () => {
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setLoading] = useState(true);

  const { id } = useParams();
  const store = useStoreDetailsData(id, setLoading);
  if (isLoading) return <LinearProgress />;

  return store ? <DetailLayout data={store} /> : <></>;
};

export default StoreDetailsScreen;
