import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import { useOrderDetailsData } from '../../services/useData';
import DetailLayout from '../../layouts/DetailLayout';

const OrderDetailsScreen = () => {
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setLoading] = useState(true);

  const { id } = useParams();
  // eslint-disable-next-line no-unused-vars
  const order = useOrderDetailsData(id, setLoading);

  if (isLoading) return <LinearProgress />;
  return order ? <DetailLayout data={order} /> : <></>;
};

export default OrderDetailsScreen;
