import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import { useProductDetailsData } from '../../services/useData';
import DetailLayout from '../../layouts/DetailLayout';

const ProductDetailsScreen = () => {
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  // eslint-disable-next-line no-unused-vars
  const product = useProductDetailsData(id, setLoading);

  if (isLoading) return <LinearProgress />;
  return product ? <DetailLayout data={product} /> : <></>;
};

export default ProductDetailsScreen;
