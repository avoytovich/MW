import React, { useState } from 'react';

import { useParams } from 'react-router-dom';
import { useStoreDetailsData } from '../../services/useData';

const StoreDetailsScreen = () => {
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setLoading] = useState(true);

  const { id } = useParams();
  const store = useStoreDetailsData(id, setLoading);
  return <div>StoreDetailsScreen</div>;
};

export default StoreDetailsScreen;
