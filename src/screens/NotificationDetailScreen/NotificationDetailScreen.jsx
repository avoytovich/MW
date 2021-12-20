/* eslint-disable consistent-return */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import localization from '../../localization';
import { useNotificationDetail } from '../../services/useData';
import { urlIsValid } from '../../services/helpers/inputValidators';
import { removeEmptyPropsInObject } from '../../services/helpers/dataStructuring';
import parentPaths from '../../services/paths';
import DetailPageWrapper from '../../components/utils/DetailPageWrapper';
import api from '../../api';
import NotificationDetailScreenView from './NotificationDetailScreenView';

const NotificationDetailScreen = () => {
  const { id } = useParams();
  const [curTab, setCurTab] = useState(0);
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);

  const {
    setUpdate,
    curNotification,
    setCurNotification,
    isLoading,
    selectOptions,
    hasChanges,
    notification,
  } = useNotificationDetail(id, nxState);

  const beforeSend = (curData) => {
    const sendObj = { ...curData };
    if (sendObj.receiverType === 'email') {
      delete sendObj.url;
    } else {
      delete sendObj.emails;
    }
    delete sendObj.receiverType;
    if (typeof sendObj !== 'object') {
      return sendObj;
    }
    return removeEmptyPropsInObject(sendObj);
  };

  return (
    <DetailPageWrapper
      nxState={nxState}
      id={id}
      name={notification?.name || `${localization.t('general.new')} ${localization.t(
        'general.notification',
      )}`}
      saveIsDisabled={!curNotification?.name || (curNotification?.receiverType === 'email' && curNotification?.emails.length < 1) || (curNotification?.receiverType === 'webhook' && !urlIsValid(curNotification?.url))}
      hasChanges={hasChanges}
      isLoading={isLoading}
      curParentPath={parentPaths.notifications.main}
      curData={curNotification}
      addFunc={api.addNotification}
      updateFunc={api.updateNotificationById}
      beforeSend={beforeSend}
      setUpdate={setUpdate}
      tabs={{
        curTab,
        setCurTab,
        tabLabels: ['general', 'httpHeaders', 'oAuthConfiguration', 'tlsConfiguration'],
      }}
    >
      <NotificationDetailScreenView
        curNotification={curNotification}
        setCurNotification={setCurNotification}
        selectOptions={selectOptions}
        curTab={curTab}
      />
    </DetailPageWrapper>
  );
};

export default NotificationDetailScreen;
