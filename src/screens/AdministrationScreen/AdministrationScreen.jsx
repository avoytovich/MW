import React from 'react';
import {
  Tabs, Tab, Box, Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import {
  Link,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import localization from '../../localization';
import TabTable from './TabTable';
import api from '../../api';
import { generateData as generateCustomers, defaultShow as defaultShowCustomers } from '../../services/useData/tableMarkups/adminCustomers';
import { generateData as generateRoles, defaultShow as defaultShowRoles } from '../../services/useData/tableMarkups/adminRoles';
import { generateData as generatePrivileges, defaultShow as defaultShowPrivileges } from '../../services/useData/tableMarkups/adminPrivileges';
import MetaRoles from './MetaRoles';
import TableActionsBar from '../../components/TableActionsBar';

const tabsData = [
  {
    label: 'customer',
    path: '/settings/administration/customers',
    request: api.getCustomers,
    sortKey: 'customerAdmin',
    generateData: generateCustomers,
    defaultShow: defaultShowCustomers,
    noActions: true,
    scope: 'customers',
    button: `${localization.t('general.add')} ${localization.t(
      'general.customer',
    )}`,
  },
  {
    label: 'role',
    path: '/settings/administration/roles',
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
  },
  {
    label: 'metaRole',
    path: '/settings/administration/metaRoles',
    button: `${localization.t('general.add')} ${localization.t(
      'general.metaRole',
    )}`,
    sortKey: 'metaRoleAdmin',
    scope: 'metaRoles',

  },
  {
    label: 'privilege',
    path: '/settings/administration/privileges',
    button: `${localization.t('general.add')} ${localization.t(
      'general.privilege',
    )}`,
    request: api.getPrivileges,
    sortKey: 'privilegesAdmin',
    generateData: generatePrivileges,
    defaultShow: defaultShowPrivileges,
    noActions: true,
    scope: 'privileges',

  },
];

const AdministrationScreen = ({ location }) => {
  const drawAddButton = () => {
    const currentTad = tabsData.find((item) => item.path === location.pathname) || tabsData[0];
    return (
      <TableActionsBar
        scope={currentTad.scope}
      >
        <Box alignSelf='flex-end'>
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
      </TableActionsBar>

    );
  };

  return (
    <Box display='flex' flexDirection='column'>
      {drawAddButton()}
      <Tabs
        value={location.pathname === '/settings/administration' ? tabsData[0].path
          : location.pathname}
        indicatorColor='primary'
        textColor='primary'
        data-test='tabs'
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
      <Box mt={4} mb={2}>
        <Switch>
          <Route exact path={tabsData[0].path}><TabTable tabObject={tabsData[0]} /></Route>
          <Route exact path={tabsData[1].path}><TabTable tabObject={tabsData[1]} /></Route>
          <Route exact path={tabsData[2].path}>
            <MetaRoles
              sortKey={tabsData[2].sortKey}
              scope={tabsData[2].scope}
              label={tabsData[2].label}
            />
          </Route>
          <Route exact path={tabsData[3].path}><TabTable tabObject={tabsData[3]} /></Route>
          <Redirect exact from="/settings/administration" to={tabsData[0].path} />
        </Switch>
      </Box>
    </Box>
  );
};

AdministrationScreen.propTypes = {
  location: PropTypes.object,
};
export default AdministrationScreen;
