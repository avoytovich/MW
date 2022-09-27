import React, { useState } from 'react';
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

import tabsData from './utils';
import TableActionsBar from '../../components/TableActionsBar';
import TabTable from '../../components/TabTable';
import parentPaths from '../../services/paths';

const ReferentialsScreen = ({ location }) => {
  const [curBab, setCurTab] = useState(location.pathname === parentPaths.referentials.main
    ? tabsData[0].path
    : location.pathname);
  const drawAddButton = () => {
    const currentTab = tabsData.find((item) => item.path === location.pathname) || tabsData[0];
    return (
      <TableActionsBar
        scope={currentTab.scope}
        deleteFunc={currentTab.deleteFunc}
        headers={currentTab.headers}
      >
        {currentTab.button && (
          <Box alignSelf='flex-end'>
            <Button
              id='add-referentials-button'
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

  return (
    <>
      {drawAddButton()}

      <Tabs
        value={curBab}
        indicatorColor='primary'
        textColor='primary'
        data-test='tabs'
        onChange={(e, newTab) => setCurTab(newTab)}
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
        <Redirect exact from={`${parentPaths.referentials.main}`} to={tabsData[0].path} />
      </Switch>
    </>
  );
};

ReferentialsScreen.propTypes = {
  location: PropTypes.object,
};
export default ReferentialsScreen;
