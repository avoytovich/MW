import React from 'react';
import {
  Tabs, Tab, Box, Button,
} from '@mui/material';
import PropTypes from 'prop-types';
import {
  Link,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import localization from '../../localization';
import TabTable from '../../components/TabTable';
import api from '../../api';
import { generateData as generateRoles, defaultShow as defaultShowRoles, markUp as markUpRoles } from '../../services/useData/tableMarkups/adminRoles';
import { markUp as markUpMetaRole } from '../../services/useData/tableMarkups/adminMetaRole';

import { generateData as generatePrivileges, defaultShow as defaultShowPrivileges } from '../../services/useData/tableMarkups/adminPrivileges';
import MetaRoles from './MetaRoles';
import TableActionsBar from '../../components/TableActionsBar';
import parentPaths from '../../services/paths';

const tabsData = [
  {
    label: 'role',
    path: parentPaths.userroles.roles,
    button: `${localization.t('general.add')} ${localization.t(
      'general.role',
    )}`,
    request: api.getRoles,
    defaultShow: defaultShowRoles,
    secondaryRequests: [],
    sortKey: 'roleAdmin',
    generateData: generateRoles,
    deleteFunc: api.deleteRoleById,
    scope: 'roles',
    headers: markUpRoles.headers,
  },
  {
    label: 'metaRole',
    path: parentPaths.userroles.metaRoles,
    button: `${localization.t('general.add')} ${localization.t(
      'general.metaRole',
    )}`,
    sortKey: 'metaRoleAdmin',
    scope: 'metaRoles',
    deleteFunc: api.deleteMetaRoleById,
    headers: markUpMetaRole.headers,
  },
  {
    label: 'privilege',
    path: parentPaths.userroles.privileges,
    button: `${localization.t('general.add')} ${localization.t(
      'general.privilege',
    )}`,
    request: api.getPrivileges,
    sortKey: 'privilegesAdmin',
    generateData: generatePrivileges,
    defaultShow: defaultShowPrivileges,
    noActions: true,
    scope: 'privileges',
    headers: null,
  },
];

const AdministrationScreen = ({ location }) => {
  const drawAddButton = () => {
    const currentTab = tabsData.find((item) => item.path === location.pathname) || tabsData[0];
    return (
      <TableActionsBar
        scope={currentTab.scope}
        deleteFunc={currentTab.deleteFunc}
        headers={currentTab.headers}
      >
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
      </TableActionsBar>

    );
  };

  return (
    <Box display='flex' flexDirection='column' height={1}>
      {drawAddButton()}
      <Tabs
        value={location.pathname === parentPaths.userroles.main ? tabsData[0].path
          : location.pathname}
        indicatorColor='primary'
        textColor='primary'
        data-test='tabs'
        sx={{ marginBottom: '20px' }}
      >
        {tabsData.map((tab) => (
          <Tab
            key={tab.path}
            label={localization.t(`labels.${tab.label}`)}
            to={tab.path}
            value={tab.path}
            component={Link}
          />
        ))}
      </Tabs>

      <Switch>
        <Route exact path={tabsData[0].path}><TabTable tabObject={tabsData[0]} /></Route>
        <Route exact path={tabsData[1].path}>
          <MetaRoles
            sortKey={tabsData[1].sortKey}
            scope={tabsData[1].scope}
            label={tabsData[1].label}
          />
        </Route>
        <Route exact path={tabsData[2].path}><TabTable tabObject={tabsData[2]} /></Route>
        <Redirect exact from={parentPaths.userroles.main} to={tabsData[0].path} />
      </Switch>
    </Box>
  );
};

AdministrationScreen.propTypes = {
  location: PropTypes.object,
};
export default AdministrationScreen;
