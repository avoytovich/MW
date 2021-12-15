import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';

import {
  Tabs, Tab, Box, Button,
} from '@material-ui/core';
import CampaignsScreen from './SubSections/CampaignsScreen';
import AbandonedScreen from './SubSections/AbandonedScreen';
import localization from '../../localization';
import TableActionsBar from '../../components/TableActionsBar';
import parentPaths from '../../services/paths';

import './marketingScreen.scss';

const availTabs = [
  {
    label: 'marketingCampaigns',
    scope: 'marketingCampaigns',
    path: `${parentPaths.campaigns.campaigns}`,
    deleteFunc: null,
    headers: null,
  },
  {
    label: 'marketingAbandoned',
    scope: 'marketingAbandoned',
    path: `${parentPaths.campaigns.abandoned}`,
    button: `${localization.t('general.add')} ${localization.t(
      'general.abandoned',
    )}`,
    deleteFunc: null,
    headers: null,
  },

];

const MarketingScreen = () => {
  const history = useHistory();
  const [curTab, setCurTab] = useState(0);

  const pathname = history?.location?.pathname || 'marketingCampaigns';

  useEffect(() => {
    const section = pathname.split('/').pop();
    const index = availTabs.findIndex((i) => i.label === section);
    if (index < 0) {
      return history.push(`${parentPaths.campaigns.main}`);
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
        {currentTab?.button && (
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
        )}
      </TableActionsBar>

    );
  };
  const changeTab = (tab) => history.push(`${parentPaths.campaigns.main}/${availTabs[tab].label}`);
  return (
    <Box display='flex' flexDirection='column'>

      {drawAddButton()}
      <Tabs
        value={curTab}
        onChange={(e, newTab) => changeTab(newTab)}
        indicatorColor='primary'
        textColor='primary'
      >
        <Tab label='Marketing Campaigns' />
        <Tab label='Abandoned Cart Campaigns' />
      </Tabs>

      <Box mt={4} mb={2}>
        {curTab === 0 && <CampaignsScreen />}
        {curTab === 1 && <AbandonedScreen />}
      </Box>
    </Box>
  );
};

export default MarketingScreen;
