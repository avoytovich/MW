import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import NotificationDefinitionDetailView from './NotificationDefinitionDetailView';
import DetailPageWrapper from '../../components/utils/DetailPageWrapper';

import parentPaths from '../../services/paths';

import localization from '../../localization';
import api from '../../api';

const NotificationDefinitionDetailScreen = () => {
  const { id } = useParams();
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);
  const [isLoading, setLoading] = useState(true);
  const [curNotification, setCurNotification] = useState(null);
  const [notification, setNotification] = useState(null);
  const [update, setUpdate] = useState(0);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);

    const notificationData = id !== 'add'
      ? api.getNotificationDefinitionById(id)
      : Promise.resolve({
        data: {
          customerId: nxState.selectedCustomer.id,
        },
      });

    notificationData
      .then(({ data }) => {
        if (!isCancelled) {
          setNotification({ ...data });
          setCurNotification(JSON.parse(JSON.stringify(data)));
          setLoading(false);
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setLoading(false);
        }
      });

    return () => { isCancelled = true; };
  }, [update]);

  useEffect(() => {
    setHasChanges(JSON.stringify(curNotification) !== JSON.stringify(notification));

    return () => setHasChanges(false);
  }, [curNotification]);

  const isValid = () => {
    if (!curNotification || !curNotification.eventMatcher) return false;

    const {
      subject, fact, mainIdJsonPath, filters,
    } = curNotification.eventMatcher;

    const filtersValid = !filters || filters.filter((i) => (i.filterJsonPath === '' || i.filterRegex === '')).length <= 0;

    return curNotification.name && subject && fact && mainIdJsonPath && filtersValid;
  };

  return (
    <DetailPageWrapper
      nxState={nxState}
      id={id}
      name={notification?.name || `${localization.t('general.new')} ${localization.t(
        'general.notificationDefinition',
      )}`}
      saveIsDisabled={!isValid()}
      hasChanges={hasChanges}
      isLoading={isLoading}
      curParentPath={parentPaths.notifications.notificationDefinitionTab}
      curData={curNotification}
      addFunc={api.addNotificationDefinition}
      updateFunc={api.updateNotificationDefinitionById}
      beforeSend={(data) => data}
      setUpdate={setUpdate}
    >
      <NotificationDefinitionDetailView
        curNotification={curNotification}
        setCurNotification={setCurNotification}
      />
    </DetailPageWrapper>
  );
};

export default NotificationDefinitionDetailScreen;
