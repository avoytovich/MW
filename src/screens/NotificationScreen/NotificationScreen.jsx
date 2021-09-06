import React, { useState, useEffect } from 'react';
import {
  Tabs, Tab, Box, Button,
} from '@material-ui/core';
import {
  useHistory, Link, Switch, Redirect, Route,
} from 'react-router-dom';
import localization from '../../localization';

import TableActionsBar from '../../components/TableActionsBar';
import TabTable from './TabTable';
import api from '../../api';
import parentPaths from '../../services/paths';
import { generateData as generateNotifications, defaultShow as defaultShowNotifications, markUp as markUpNotifications } from '../../services/useData/tableMarkups/notifications';
import { generateData as notificationsDefinition, defaultShow as defaultShowNotificationsDefinition, markUp as markUpNotificationsDefinition } from '../../services/useData/tableMarkups/notificationsDefinition';
import { generateData as generateNotificationsHistory, defaultShow as defaultShowNotificationsHistory, markUp as markUpNotificationsHistory } from '../../services/useData/tableMarkups/notificationsHistory';

const tabsData = [
  {
    label: 'notification',
    path: parentPaths.notifications.notificationTab,
    request: api.getNotifications,
    sortKey: 'notification',
    generateData: generateNotifications,
    scope: 'notifications',
    button: `${localization.t('general.add')} ${localization.t(
      'general.notifications.notification',
    )}`,
    defaultShow: defaultShowNotifications,
    deleteFunc: api.deleteNotificationById,
    headers: markUpNotifications.headers,
  },
  {
    label: 'notificationDefinitions',
    path: parentPaths.notifications.notificationDefinitionTab,
    request: api.getNotificationDefinition,
    sortKey: 'notificationDefinition',
    generateData: notificationsDefinition,
    scope: 'notification-definition',
    button: `${localization.t('general.add')} ${localization.t(
      'general.notifications.notificationDefinition',
    )}`,
    defaultShow: defaultShowNotificationsDefinition,
    deleteFunc: api.deleteNotificationDefinitionsById,
    headers: markUpNotificationsDefinition.headers,
  },
  {
    label: 'notificationHistory',
    path: parentPaths.notifications.notificationHistoryTab,
    request: api.getNotificationsHistory,
    sortKey: 'notificationHistory',
    generateData: generateNotificationsHistory,
    scope: 'notification-history',
    defaultShow: defaultShowNotificationsHistory,
    deleteFunc: null,
    headers: markUpNotificationsHistory.headers,
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
    const currentTab = tabsData.find((item) => item.path === pathname) || tabsData[0];

    return (
      <TableActionsBar
        scope={currentTab.scope}
        deleteFunc={currentTab.deleteFunc}
        headers={currentTab.headers}
      >
        {currentTab.label !== 'notificationHistory' && (
          <Box alignSelf='flex-end'>
            <Button
              id='add-administration-button'
              color='primary'
              size='large'
              variant='contained'
              component={Link}
              to={`${currentTab.path}/add`}
            >
              {currentTab.button}
            </Button>
          </Box>

        )}
      </TableActionsBar>
    );
  };
  const changeTab = (tab) => history.push(`${parentPaths.notifications.main}/${tabsData[tab].scope}`);

  return (
    <>
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
        <Switch>
          <Route
            exact
            path={tabsData[0].path}
            component={() => <TabTable tabObject={tabsData[0]} />}
          />
          <Route
            exact
            path={tabsData[1].path}
            component={() => <TabTable tabObject={tabsData[1]} />}
          />
          <Route
            exact
            path={tabsData[2].path}
            component={() => <TabTable tabObject={tabsData[2]} />}
          />
          <Redirect exact from={`${parentPaths.notifications.main}`} to={tabsData[0].path} />
        </Switch>
      </Box>
    </>
  );
};

export default NotficationScreen;
