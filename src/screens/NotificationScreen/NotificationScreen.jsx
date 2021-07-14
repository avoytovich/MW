import React, { useState, useEffect, Fragment } from 'react';
import {
  Tabs, Tab, Box, Button, Zoom,
} from '@material-ui/core';
import { useHistory, Link } from 'react-router-dom';
import localization from '../../localization';

import TableActionsBar from '../../components/TableActionsBar';
import TabTable from './TabTable';
import api from '../../api';

import { generateData as generateNotifications } from '../../services/useData/tableMarkups/notifications';
import { generateData as notificationsDefinition } from '../../services/useData/tableMarkups/notificationsDefinition';
import { generateData as generateNotificationsHistory } from '../../services/useData/tableMarkups/notificationsHistory';

const tabsData = [
  {
    label: 'notification',
    path: '/settings/notifications',
    request: api.getNotifications,
    sortKey: 'notification',
    generateData: generateNotifications,
    scope: 'notifications',
    button: `${localization.t('general.add')} ${localization.t(
      'general.notifications.notification',
    )}`,
  },
  {
    label: 'notificationDefinitions',
    path: '/settings/notification-definition',
    request: api.getNotificationDefinition,
    sortKey: 'notificationDefinition',
    generateData: notificationsDefinition,
    scope: 'notification-definition',
    button: `${localization.t('general.add')} ${localization.t(
      'general.notifications.notificationDefinition',
    )}`,
  },
  {
    label: 'notificationHistory',
    path: '/settings/notification-history',
    request: api.getNotificationsHistory,
    sortKey: 'notificationHistory',
    generateData: generateNotificationsHistory,
    scope: 'notification-history',
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
      return history.push('/settings');
    }
    setCurTab(index);
    return () => setCurTab(0);
  }, [pathname]);

  const drawAddButton = () => {
    const currentTad = tabsData.find((item) => item.path === pathname) || tabsData[0];

    return (
      <Box display="flex" alignItems='baseline' justifyContent='space-between'>
        <TableActionsBar/>

        {currentTad.label !== 'notificationHistory' && (
          <Zoom in={!!currentTad.button}>
            <Box>
              <Button
                id='add-administration-button'
                color='primary'
                size='large'
                variant='contained'
                component={Link}
                to={`${currentTad.path}/add`}
              >
                {currentTad.button}
              </Button>
            </Box>
          </Zoom>
        )}
      </Box>
    );
  };
  const changeTab = (tab) => history.push(`/settings/${tabsData[tab].scope}`);

  return (
    <Box display='flex' flexDirection='column'>

      {drawAddButton()}

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
    </Box>
  );
};

export default NotficationScreen;
