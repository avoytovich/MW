import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Tabs, Tab, Box } from '@material-ui/core';

import CampaignsScreen from './SubSections/CampaignsScreen';
import RecommendationsScreen from './SubSections/RecommendationsScreen';
import DiscountsScreen from './SubSections/DiscountsScreen';
import PricesScreen from './SubSections/PricesScreen';

import './marketingScreen.scss';

const availTabs = ['campaigns', 'recommendations', 'discounts', 'prices'];

const MarketingScreen = () => {
  const history = useHistory();
  const [curTab, setCurTab] = useState(0);

  const pathname = history?.location?.pathname || 'campaigns';

  useEffect(() => {
    const section = pathname.split('/').pop();

    if (availTabs.indexOf(section) < 0) {
      return history.push('/marketing/campaigns');
    }

    setCurTab(availTabs.indexOf(section));

    return () => setCurTab(0);
  }, [pathname]);

  const changeTab = (tab) => history.push(`/marketing/${availTabs[tab]}`);

  return (
    <div className='marketing-screen'>
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
    </div>
  );
};

export default MarketingScreen;
