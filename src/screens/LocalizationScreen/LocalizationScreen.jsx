import React from 'react';
import PropTypes from 'prop-types';

import {
  Link, Route, Redirect, Switch,
} from 'react-router-dom';

import {
  Tabs, Tab, Box, Button,
} from '@material-ui/core';
import api from '../../api';
import { markUp } from '../../services/useData/tableMarkups/checkoutExperience';
import TranslationsTab from './TranslationsTab';
import InvoiceTranslationsTab from './InvoiceTranslationsTab';
import TableActionsBar from '../../components/TableActionsBar';
import parentPaths from '../../services/paths';
import localization from '../../localization';

import './LocalizationScreen.scss';

const allTabs = [
  {
    label: localization.t('labels.translations'),
    path: `${parentPaths.localization}/translations`,
    button: `${localization.t('general.add')} ${localization.t(
      'general.translation',
    )}`,
    scope: 'translations',
    deleteFunc: api.deleteTranslationById,
    headers: markUp.headers,
  },
  {
    label: localization.t('labels.invoiceTranslations'),
    path: `${parentPaths.localization}/invoice-translations`,
    scope: 'invoice-translations',
  },
];

const LocalizationScreen = ({ location }) => {
  const drawAddButton = () => {
    const currentTab = allTabs.find((item) => item.path === location.pathname) || allTabs[0];
    return currentTab.button && (
      <TableActionsBar
        scope={currentTab.scope}
        deleteFunc={currentTab.deleteFunc}
        headers={currentTab.headers}
      >
        <Button
          id="add-localization-button"
          color="primary"
          size="large"
          variant="contained"
          component={Link}
          to={`${currentTab.path}/add`}
        >
          {currentTab.button}
        </Button>
      </TableActionsBar>
    );
  };

  return (
    <>
      {drawAddButton()}
      <Box display="flex" flexDirection="column">
        <Tabs
          value={
            location.pathname === `${parentPaths.localization}`
              ? allTabs[0].path
              : location.pathname
          }
          indicatorColor="primary"
          textColor="primary"
        >
          {allTabs.map((item) => (
            <Tab
              key={item.label}
              label={item.label}
              value={item.path}
              to={item.path}
              component={Link}
            />
          ))}
        </Tabs>
        <Box mt={3}>
          <Switch>
            <Route exact path={allTabs[0].path} component={TranslationsTab} />
            <Route exact path={allTabs[1].path} component={InvoiceTranslationsTab} />
            <Redirect exact from={`${parentPaths.localization}`} to={allTabs[0].path} />
          </Switch>
        </Box>
      </Box>
    </>
  );
};

LocalizationScreen.propTypes = {
  location: PropTypes.object,
};

export default LocalizationScreen;
