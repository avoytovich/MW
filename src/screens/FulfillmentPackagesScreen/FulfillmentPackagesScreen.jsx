import React, { useState } from 'react';
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
import api from '../../api';
import localization from '../../localization';
import { generateData as generateAutoFulfillments, defaultShow as defaultShowAutoFulfillments } from '../../services/useData/tableMarkups/autoFulfillments';
import { generateData as generateManualFulfillments, defaultShow as defaultShowManualFulfillments } from '../../services/useData/tableMarkups/manualFulfillments';
import { generateData as generateLicenseProviderDefinitions, defaultShow as defaultShowLicenseProviderDefinitions } from '../../services/useData/tableMarkups/licenseProviderDefinitions';
import getCustomers from './utils';
import TableActionsBar from '../../components/TableActionsBar';
import TabTable from '../../components/TabTable';

const tabsData = [
  {
    label: 'autoFulfillments',
    path: '/overview/fulfillment-packages/autoFulfillments',
    request: api.getAutoFulfillments,
    sortKey: 'autoFulfillments',
    secondaryRequest: (data) => getCustomers(data, 'customerId'),
    generateData: generateAutoFulfillments,
    defaultShow: defaultShowAutoFulfillments,
    noActions: true,
    scope: 'autoFulfillments',
  },
  {
    label: 'manualFulfillments',
    noActions: true,
    path: '/overview/fulfillment-packages/manualFulfillments',
    request: api.getManualFulfillments,
    generateData: generateManualFulfillments,
    defaultShow: defaultShowManualFulfillments,
    secondaryRequest: (data) => getCustomers(data, 'publisherId'),

    sortKey: 'manualFulfillments',
    scope: 'manualFulfillments',
  },
  {
    label: 'licenseProviderDefinitions',
    path: '/overview/fulfillment-packages/licenseProviderDefinitions',
    button: `${localization.t('general.add')} ${localization.t(
      'labels.licenseProviderDefinition',
    )}`,
    request: api.getLicenseProviderDefinitions,
    secondaryRequest: (data) => getCustomers(data, 'customerId'),
    sortKey: 'licenseProviderDefinitions',
    generateData: generateLicenseProviderDefinitions,
    defaultShow: defaultShowLicenseProviderDefinitions,
    scope: 'licenseProviderDefinitions',
    deleteFunc: api.deleteLicenseProviderDefinitionById,
  },
];

const FulfillmentPackagesScreen = ({ location }) => {
  const [curBab, setCurTab] = useState(location.pathname === '/overview/fulfillment-packages' ? tabsData[0].path
    : location.pathname);
  const drawAddButton = () => {
    const currentTab = tabsData.find((item) => item.path === location.pathname) || tabsData[0];
    return (
      <TableActionsBar
        scope={currentTab.scope}
      >
        {currentTab.button && (
          <Box alignSelf='flex-end'>
            <Button
              id='add-fulfillmentPackages-button'
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
    <Box display='flex' flexDirection='column'>
      {drawAddButton()}
      <Tabs
        value={curBab}
        indicatorColor='primary'
        textColor='primary'
        data-test='tabs'
        onChange={(e, newTab) => setCurTab(newTab)}
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
          <Redirect exact from='/overview/fulfillment-packages' to={tabsData[0].path} />
        </Switch>
      </Box>
    </Box>
  );
};

FulfillmentPackagesScreen.propTypes = {
  location: PropTypes.object,
};
export default FulfillmentPackagesScreen;
