import React from 'react';
import {
  Link, Route, Redirect, Switch,
} from 'react-router-dom';
import {
  Tabs, Tab, Box, Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import localization from '../../localization';
import TranslationsTab from './TranslationsTab';
import FontsTab from './FontsTab';
import ThemesTab from './ThemesTab';
import LayoutsTab from './LayoutsTab';
import './CheckoutExperienceScreen.scss';

const allTabs = [
  {
    label: localization.t('labels.themes'),
    path: '/checkout-experience/themes',
    button: `${localization.t('general.add')} ${localization.t(
      'general.theme',
    )}`,
  },
  {
    label: localization.t('labels.layouts'),
    path: '/checkout-experience/layouts',
    button: `${localization.t('general.add')} ${localization.t(
      'general.layout',
    )}`,
  },
  {
    label: localization.t('labels.translations'),
    path: '/checkout-experience/translations',
    button: `${localization.t('general.add')} ${localization.t(
      'general.translation',
    )}`,
  },
  {
    label: localization.t('labels.fonts'),
    path: '/checkout-experience/fonts',
    button: `${localization.t('general.add')} ${localization.t(
      'general.font',
    )}`,
  },
];

const CheckoutExperienceScreen = ({ location }) => {
  const drawAddButton = () => {
    const currentTad = allTabs.find((item) => item.path === location.pathname) || allTabs[0];
    return (
      <Button
        id="add-checkout-design-button"
        color="primary"
        size="large"
        variant="contained"
        component={Link}
        to={`${currentTad.path}/add`}
      >
        {currentTad.button}
      </Button>
    );
  };
  return (
    <Box display="flex" flexDirection="column">
      {drawAddButton()}
      <Tabs
        value={
          location.pathname === '/checkout-experience'
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
          <Route exact path={allTabs[2].path} component={TranslationsTab} />
          <Route exact path={allTabs[3].path} component={FontsTab} />
          <Redirect exact from="/checkout-experience" to={allTabs[0].path} />
        </Switch>
      </Box>
    </Box>
  );
};
CheckoutExperienceScreen.propTypes = {
  location: PropTypes.object,
};

export default CheckoutExperienceScreen;
