import React, { useState, useEffect, Fragment } from 'react';
import {
  Tabs, Tab, Box,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import localization from '../../localization';

import TabTable from './TabTable';
import { generateData as generateNotifications } from '../../services/useData/tableMarkups/notifications';

import api from '../../api';

const tabsData = [
  {
    label: 'notification',
    path: '/settings/notifications/customers',
    request: api.getNotifications,
    sortKey: 'notification',
    generateData: generateNotifications,
    scope: 'notifications',
  },
  {
    label: 'notificationDefinitions',
    path: '/settings/notifications/notificationDefinitions',
    scope: 'notificationDefinitions',

  },
  {
    label: 'notificationHistory',
    path: '/settings/notifications/notificationHistory',
    scope: 'notificationHistory',
  },
];

const NotficationScreen = () => {
  const history = useHistory();
  const [curTab, setCurTab] = useState(0);

  const pathname = history?.location?.pathname || 'notifications';

  useEffect(() => {
    const section = pathname.split('/').pop();
    const index = tabsData.findIndex((i) => i.scope === section);
    if (index < 0) {
      return history.push('/settings/notifications');
    }
    setCurTab(index);
    return () => setCurTab(0);
  }, [pathname]);

  const changeTab = (tab) => history.push(`/settings/notifications/${tabsData[tab].scope}`);

  return (
    <>
      <Tabs
        value={curTab}
        onChange={(e, newTab) => changeTab(newTab)}
        indicatorColor='primary'
        textColor='primary'
      >
        {tabsData.map((tab) => (
          <Tab key={tab.path} label={localization.t(`labels.${tab.label}`)} />
        ))}
      </Tabs>
      <Box mt={4} mb={2}>
        {tabsData.map((tab, index) => (
          <Fragment key={tab.label}>
            {curTab === index && (
              <TabTable tabObject={tab} />
            )}
          </Fragment>
        ))}
      </Box>
    </>
  );
};

export default NotficationScreen;
