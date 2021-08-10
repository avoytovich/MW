import React from 'react';
import PropTypes from 'prop-types';

import {
  Link, Route, Redirect, Switch,
} from 'react-router-dom';

import {
  Tabs, Tab, Box, Button,
} from '@material-ui/core';

import TranslationsTab from './TranslationsTab';
import InvoiceTranslationsTab from './InvoiceTranslationsTab';
import TableActionsBar from '../../components/TableActionsBar';

import localization from '../../localization';

import './LocalizationScreen.scss';

const allTabs = [
  {
    label: localization.t('labels.translations'),
    path: '/localization/translations',
    button: `${localization.t('general.add')} ${localization.t(
      'general.translation',
    )}`,
    scope: 'translations',
  },
  {
    label: localization.t('labels.invoiceTranslations'),
    path: '/localization/invoice-translations',
    scope: 'invoice-translations',
  },
];

const LocalizationScreen = ({ location }) => {
  const drawAddButton = () => {
    const currentTad = allTabs.find((item) => item.path === location.pathname) || allTabs[0];
    return currentTad.button && (
      <TableActionsBar
        scope={currentTad.scope}
      >
        <Button
          id="add-localization-button"
          color="primary"
          size="large"
          variant="contained"
          component={Link}
          to={`${currentTad.path}/add`}
        >
          {currentTad.button}
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
            location.pathname === '/lozalization'
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
            <Redirect exact from='/localization' to={allTabs[0].path} />
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
