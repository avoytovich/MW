import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCustomerName } from '../../services/helpers/customersHelper';
import localization from '../../localization';
import api from '../../api';
import NotificationHistoryDetailsView from './NotificationHistoryDetailsView';
import DetailPageWrapper from '../../components/utils/DetailPageWrapper';
import parentPaths from '../../services/paths';

const NotificationHistoryDetailsScreen = () => {
  const [customerName, setCustomerName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notificationHistory, setNotificationHistory] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    if (notificationHistory?.customerId) {
      getCustomerName(notificationHistory?.customerId).then((name) => setCustomerName(name));
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    api.getNotificationHistoryById(id)
      .then((data) => {
        setNotificationHistory(data.data);
        api.getCustomerById(data.data.customerId)
          .then((res) => setCustomer(res.data));
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <DetailPageWrapper
      nxStateNotNeeded
      id={id}
      name={`${localization.t('labels.notification')} ${localization.t('labels.id')} ${notificationHistory?.id}`}
      isLoading={loading}
      curParentPath={parentPaths.notifications.notificationHistoryTab}
      curData={notificationHistory}
      addFunc={null}
      updateFunc={null}
      beforeSend={(data) => data}
    >
      <NotificationHistoryDetailsView
        customer={customer}
        notificationHistory={notificationHistory}
        customerName={customerName}
      />
    </DetailPageWrapper>
  );
};

export default NotificationHistoryDetailsScreen;
