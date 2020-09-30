import React, { useState } from 'react';

import { useParams } from 'react-router-dom';
import { useOrderDetailsData } from '../../services/useData';

const OrderDetailsScreen = () => {
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setLoading] = useState(true);

  const { id } = useParams();
  // eslint-disable-next-line no-unused-vars
  const oreder = useOrderDetailsData(id, setLoading);

  return <div>OrderDetailsScreen</div>;
};

export default OrderDetailsScreen;
