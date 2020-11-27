import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@material-ui/core';
import CampaignsScreen from '../CampaignsScreen';
import './marketingScreen.scss';

const MarketingScreen = () => {
  const [curTab, setCurTab] = useState(0);

  return (
    <div className='marketing-screen'>
      <Tabs
        value={curTab}
        onChange={(e, newTab) => setCurTab(newTab)}
        indicatorColor='primary'
        textColor='primary'
      >
        <Tab label='Campaigns' />
        <Tab label='Recommendations' />
        <Tab label='Discounts' />
      </Tabs>

      <Box mt={4} mb={2}>
        {curTab === 0 && <CampaignsScreen />}

        {curTab === 1 && (
          <div>Recommendations</div>
        )}

        {curTab === 2 && (
          <div>Discounts</div>
        )}
      </Box>
    </div>
  );
};

export default MarketingScreen;
