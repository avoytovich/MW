import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProductDetailsData } from '../../services/useData';

const ProductDetailsScreen = () => {
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  // eslint-disable-next-line no-unused-vars
  const product = useProductDetailsData(id, setLoading);
  return <div>ProductDetailsScreen</div>;
};

export default ProductDetailsScreen;
