import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import parentPaths from '../../services/paths';
import localization from '../../localization';
import api from '../../api';
import { generateData } from '../../services/useData/tableMarkups/orderDetails';

import OrderDetailsView from './OrderDetailsView';
import DetailPageWrapper from '../../components/utils/DetailPageWrapper';

const OrderDetailsScreen = () => {
  const [curLanguage, setCurLanguage] = useState('');
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  const [orderRows, setOrderRows] = useState(null);
  const [customer, setCustomer] = useState({ name: '-' });

  const [currentOrderData, setCurrentOrderData] = useState(null);
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    api.getOrderById(id).then(({ data: order }) => {
      if (!isCancelled) {
        setOrderData(order);
        setCurrentOrderData(order);
        setCurLanguage(order.endUser.locale);
      }
      Promise.allSettled([
        api.getCustomerById(order.customer?.id),
        api.getPaymentById(order.id),
      ]).then(([customerData, payment]) => {
        const rows = generateData(
          order,
          payment.value ? payment.value.data : null,
        );
        setOrderRows(rows);
        setCustomer(customerData.value ? customerData.value.data : null);
        setLoading(false);
      });
    }).catch(() => {
      setLoading(false);
    });
    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <DetailPageWrapper
      nxStateNotNeeded
      id={id}
      name={`${localization.t('labels.order')} ${localization.t('labels.id')} ${currentOrderData?.id}`}
      isLoading={isLoading}
      curParentPath={parentPaths.orderlist}
      curData={currentOrderData}
      addFunc={null}
      updateFunc={null}
      beforeSend={null}
    >
      <OrderDetailsView
        orderData={orderData}
        currentOrderData={currentOrderData}
        customer={customer}
        orderRows={orderRows}
        curLanguage={curLanguage}
        id={id}
      />
    </DetailPageWrapper>
  );
};

export default OrderDetailsScreen;
