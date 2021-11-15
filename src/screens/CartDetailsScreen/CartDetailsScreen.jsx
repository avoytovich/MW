/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import parentPaths from '../../services/paths';
import DetailPageWrapper from '../../components/utils/DetailPageWrapper';
import api from '../../api';
import localization from '../../localization';
import CartDetailsScreenView from './CartDetailsScreenView';

const CartDetailsScreen = () => {
  const [detailsData, setDetailsData] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);

  useEffect(() => {
    setLoading(true);
    api.getCartById(id)
      .then((data) => {
        setDetailsData(data.data);
        api.getCustomerById(data.data.customerId)
          .then((res) => setCustomer(res.data));
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <DetailPageWrapper
      nxState={nxState}
      id={id}
      name={`${localization.t('labels.cart')} ${localization.t('labels.id')} ${detailsData?.id}`}
      isLoading={isLoading}
      curParentPath={parentPaths.carts}
      curData={detailsData}
    >
      <CartDetailsScreenView
        detailsData={detailsData}
        customer={customer}
      />
    </DetailPageWrapper>
  );
};

export default CartDetailsScreen;
