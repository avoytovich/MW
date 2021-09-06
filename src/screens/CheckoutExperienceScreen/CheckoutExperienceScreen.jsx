import React from 'react';
import {
  Link, Route, Redirect, Switch,
} from 'react-router-dom';
import {
  Tabs, Tab, Box, Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import localization from '../../localization';
import FontsTab from './FontsTab';
import ThemesTab from './ThemesTab';
import LayoutsTab from './LayoutsTab';
import TableActionsBar from '../../components/TableActionsBar';
import api from '../../api';
import { markUp } from '../../services/useData/tableMarkups/checkoutExperience';
import './CheckoutExperienceScreen.scss';
import parentPaths from '../../services/paths';

const allTabs = [
  {
    label: localization.t('labels.themes'),
    path: parentPaths.checkoutpagebuilder.themesTab,
    button: `${localization.t('general.add')} ${localization.t(
      'general.theme',
    )}`,
    scope: 'themes',
    deleteFunc: api.deleteThemeById,
    headers: markUp.headers,
  },
  {
    label: localization.t('labels.layouts'),
    path: parentPaths.checkoutpagebuilder.layoutsTab,
    button: `${localization.t('general.add')} ${localization.t(
      'general.layout',
    )}`,
    scope: 'layouts',
    deleteFunc: api.deleteLayoutById,
    headers: markUp.headers,
  },
  {
    label: localization.t('labels.fonts'),
    path: parentPaths.checkoutpagebuilder.fontsTab,
    button: `${localization.t('general.add')} ${localization.t(
      'general.font',
    )}`,
    scope: 'fonts',
    deleteFunc: api.deleteFontById,
    headers: markUp.headers,
  },
];

const CheckoutExperienceScreen = ({ location }) => {
  const drawAddButton = () => {
    const currentTab = allTabs.find((item) => item.path === location.pathname) || allTabs[0];
    return (
      <TableActionsBar
        scope={currentTab.scope}
        deleteFunc={currentTab.deleteFunc}
        headers={currentTab.headers}
      >
        <Button
          id="add-checkout-design-button"
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
        {console.log( location.pathname === parentPaths.checkoutpagebuilder.main)}
        <Tabs
          value={
            location.pathname === parentPaths.checkoutpagebuilder.main
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
            <Route exact path={allTabs[0].path} component={ThemesTab} />
            <Route exact path={allTabs[1].path} component={LayoutsTab} />
            <Route exact path={allTabs[2].path} component={FontsTab} />
            <Redirect exact from={parentPaths.checkoutpagebuilder.main} to={allTabs[0].path} />
          </Switch>
        </Box>
      </Box>
    </>
  );
};
CheckoutExperienceScreen.propTypes = {
  location: PropTypes.object,
};

export default CheckoutExperienceScreen;
