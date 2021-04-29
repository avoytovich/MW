import React, { useState, useEffect, Fragment } from 'react';
import { Tabs, Tab, Box, Button, Zoom } from '@material-ui/core';
import { useHistory, Link } from 'react-router-dom';
import localization from '../../localization';

import TabTable from './TabTable';
import api from '../../api';
import { generateData as generateCustomers } from '../../services/useData/tableMarkups/adminCustomers';
import { generateData as generateRoles } from '../../services/useData/tableMarkups/adminRoles';
import { generateData as generatePrivileges } from '../../services/useData/tableMarkups/adminPrivileges';
import MetaRoles from './MetaRoles';

const tabsData = [
  {
    label: 'customer',
    path: `/settings/administration/customers`,
    request: api.getCustomers,
    sortKey: 'customerAdmin',
    generateData: generateCustomers,
    noActions: true,
    scope: 'customers',
  },
  {
    label: 'role',
    path: `/settings/administration/roles`,
    button: `${localization.t('general.add')} ${localization.t(
      'general.role',
    )}`,
    request: api.getRoles,
    secondaryRequests: [],
    sortKey: 'roleAdmin',
    generateData: generateRoles,
    deleteFunc: api.deleteRoleById,
    scope: 'roles',

  },
  {
    label: 'metaRole',
    path: `/settings/administration/metaRoles`,
    button: `${localization.t('general.add')} ${localization.t(
      'general.metaRole',
    )}`,
    sortKey: 'metaRoleAdmin',
    scope: 'metaRoles',

  },
  {
    label: 'privilege',
    path: `/settings/administration/privileges`,
    request: api.getPrivileges,
    sortKey: 'privilegesAdmin',
    generateData: generatePrivileges,
    noActions: true,
    scope: 'privileges',

  },
];

const AdministrationScreen = () => {
  const history = useHistory();
  const [curTab, setCurTab] = useState(0);

  const pathname = history?.location?.pathname || 'customers';

  useEffect(() => {
    const section = pathname.split('/').pop();
    const index = tabsData.findIndex((i) => i.scope === section);
    if (index < 0) {
      return history.push('/settings/administration/customers');
    }
    setCurTab(index);
    return () => setCurTab(0);
  }, [pathname]);

  const drawAddButton = () => {
    const currentTad =
      tabsData.find((item) => item.path === pathname) || tabsData[0];
    return (
      <Zoom in={!!currentTad.button}>
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
      </Zoom>
    );
  };
  const changeTab = (tab) => history.push(`/settings/administration/${tabsData[tab].scope}`);
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
            {curTab === index &&
              (tab.label === 'metaRole' ? (
                <MetaRoles sortKey={tab.sortKey} scope={tab.scope} label={tab.label} />
              ) : (
                  <TabTable tabObject={tab} />
                ))}
          </Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default AdministrationScreen;
