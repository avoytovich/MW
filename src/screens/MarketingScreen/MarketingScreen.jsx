import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';

import { Tabs, Tab, Box, Button } from '@material-ui/core';

import CampaignsScreen from './SubSections/CampaignsScreen';
import RecommendationsScreen from './SubSections/RecommendationsScreen';
import DiscountsScreen from './SubSections/DiscountsScreen';
import PricesScreen from './SubSections/PricesScreen';
import localization from '../../localization';

import './marketingScreen.scss';

const availTabs = [
  {
    label: 'campaigns',
    path: `/marketing/campaigns`,
    button: `${localization.t('general.add')} ${localization.t(
      'general.campaign',
    )}`,
  },
  {
    label: 'recommendations',
    path: `/marketing/recommendations`,
    button: `${localization.t('general.add')} ${localization.t(
      'general.recommendation',
    )}`,
  },
  {
    label: 'discounts',
    path: `/marketing/discounts`,
    button: `${localization.t('general.add')} ${localization.t(
      'general.discount',
    )}`,
  },
  {
    label: 'prices',
    path: `/marketing/prices`,
    button: `${localization.t('general.add')} ${localization.t(
      'general.price',
    )}`,
  },
];

const MarketingScreen = () => {
  const history = useHistory();
  const [curTab, setCurTab] = useState(0);

  const pathname = history?.location?.pathname || 'campaigns';

  useEffect(() => {
    const section = pathname.split('/').pop();
    const index = availTabs.findIndex((i) => i.label === section);
    if (index < 0) {
      return history.push('/marketing/campaigns');
    }

    setCurTab(index);

    return () => setCurTab(0);
  }, [pathname]);

  const drawAddButton = () => {
    const currentTad =
      availTabs.find((item) => item.path === pathname) || availTabs[0];
    return (
      <Button
        id="add-marketing-button"
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
  const changeTab = (tab) => history.push(`/marketing/${availTabs[tab].label}`);
  return (
    <Box display="flex" flexDirection="column">
      {drawAddButton()}

      <Tabs
        value={curTab}
        onChange={(e, newTab) => changeTab(newTab)}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Campaigns" />
        <Tab label="Recommendations" />
        <Tab label="Discounts" />
        <Tab label="Prices" />
      </Tabs>

      <Box mt={4} mb={2}>
        {curTab === 0 && <CampaignsScreen />}

        {curTab === 1 && <RecommendationsScreen />}

        {curTab === 2 && <DiscountsScreen />}

        {curTab === 3 && <PricesScreen />}
      </Box>
    </Box>
  );
};

export default MarketingScreen;
