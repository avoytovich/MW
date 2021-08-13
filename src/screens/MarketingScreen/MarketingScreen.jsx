import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';

import {
  Tabs, Tab, Box, Button,
} from '@material-ui/core';
import api from '../../api';
import CampaignsScreen from './SubSections/CampaignsScreen';
import RecommendationsScreen from './SubSections/RecommendationsScreen';
import DiscountsScreen from './SubSections/DiscountsScreen';
import PricesScreen from './SubSections/PricesScreen';
import localization from '../../localization';
import TableActionsBar from '../../components/TableActionsBar';
import { markUp as markUpRecommendations } from '../../services/useData/tableMarkups/recommendations';
import { markUp as markUpDiscounts } from '../../services/useData/tableMarkups/discounts';
import { markUp as markUpPrices } from '../../services/useData/tableMarkups/prices';

import './marketingScreen.scss';

const availTabs = [
  {
    label: 'campaigns',
    scope: 'campaigns',
    path: '/marketing/campaigns',
    button: `${localization.t('general.add')} ${localization.t(
      'general.campaign',
    )}`,
    deleteFunc: null,
    headers: null,
  },
  {
    label: 'recommendations',
    scope: 'recommendations',
    path: '/marketing/recommendations',
    button: `${localization.t('general.add')} ${localization.t(
      'general.recommendation',
    )}`,
    deleteFunc: api.deleteRecommendationById,
    headers: markUpRecommendations.headers,
  },
  {
    label: 'discounts',
    scope: 'discounts',
    path: '/marketing/discounts',
    button: `${localization.t('general.add')} ${localization.t(
      'general.discount',
    )}`,
    deleteFunc: api.deleteDiscountById,
    headers: markUpDiscounts.headers
  },
  {
    label: 'prices',
    scope: 'prices',
    path: '/marketing/prices',
    button: `${localization.t('general.add')} ${localization.t(
      'general.price',
    )}`,
    deleteFunc: api.deletePriceById,
    headers: markUpPrices.headers,
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
    const currentTab = availTabs.find((item) => item.path === pathname) || availTabs[0];
    return (
      <TableActionsBar
        scope={currentTab.scope}
        deleteFunc={currentTab.deleteFunc}
        headers={currentTab.headers}
      >
        <Button
          id='add-marketing-button'
          color='primary'
          size='large'
          variant='contained'
          component={Link}
          to={`${currentTab.path}/add`}
        >
          {currentTab.button}
        </Button>
      </TableActionsBar>

    );
  };
  const changeTab = (tab) => history.push(`/marketing/${availTabs[tab].label}`);
  return (
    <Box display='flex' flexDirection='column'>

      {drawAddButton()}
      <Tabs
        value={curTab}
        onChange={(e, newTab) => changeTab(newTab)}
        indicatorColor='primary'
        textColor='primary'
      >
        <Tab label='Campaigns' />
        <Tab label='Recommendations' />
        <Tab label='Discounts' />
        <Tab label='Prices' />
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
