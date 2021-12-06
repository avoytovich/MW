import React from 'react';
import {
  Tabs, Tab, Box,
  Button,
} from '@material-ui/core';
import {
  Link, Switch, Redirect, Route,
} from 'react-router-dom';
import PropTypes from 'prop-types';

import localization from '../../localization';

import TableActionsBar from '../../components/TableActionsBar';
import TabTable from '../../components/TabTable';
import api from '../../api';
import parentPaths from '../../services/paths';
import { markUp as markUpTranslation, generateData as generateTranslation, defaultShow as defaultTranslation } from '../../services/useData/tableMarkups/checkoutExperience';
import { markUp as markUpInvoiceTranslation, generateData as generateInvoiceTranslation, defaultShow as defaultInvoiceTranslation } from '../../services/useData/tableMarkups/invoiceTranslation';

const tabsData = [
  {
    label: localization.t('labels.translations'),
    path: parentPaths.localization.translationsTab,
    button: `${localization.t('general.add')} ${localization.t(
      'general.translation',
    )}`,
    scope: 'translations',
    deleteFunc: api.deleteTranslationById,
    headers: markUpTranslation.headers,
    request: api.getDesignsTranslations,
    sortKey: 'translationsTab',
    generateData: generateTranslation,
    defaultShow: defaultTranslation,
  },
  {
    label: localization.t('labels.invoiceTranslations'),
    path: parentPaths.localization.invoiceTranslationsTab,
    request: api.getInvoiceTranslations,
    sortKey: 'invoiceTranslations',
    generateData: generateInvoiceTranslation,
    scope: 'invoicetranslations',
    button: `${localization.t('general.add')} ${localization.t(
      'labels.invoiceTranslation',
    )}`,
    defaultShow: defaultInvoiceTranslation,
    deleteFunc: api.deleteInvoiceTranslationsById,
    headers: markUpInvoiceTranslation.headers,
  },

];

const LocalizationScreen = ({ location }) => {
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
    <>
      {drawAddButton()}
      <Tabs
        value={location.pathname === parentPaths.localization.main ? tabsData[0].path
          : location.pathname}
        indicatorColor='primary'
        textColor='primary'
      >
        {tabsData.map((tab) => (
          <Tab
            key={tab.path}
            label={tab.label}
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
          <Redirect exact from={`${parentPaths.localization.main}`} to={tabsData[0].path} />
        </Switch>
      </Box>
    </>
  );
};
LocalizationScreen.propTypes = {
  location: PropTypes.object,
};
export default LocalizationScreen;
