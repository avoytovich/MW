import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';

import {
  Tabs, Tab, Box, Button,
} from '@material-ui/core';
import api from '../../api';
import CampaignsScreen from './SubSections/CampaignsScreen';
import DiscountsScreen from './SubSections/DiscountsScreen';
import AbandonedScreen from './SubSections/AbandonedScreen';
import localization from '../../localization';
import TableActionsBar from '../../components/TableActionsBar';
import parentPaths from '../../services/paths';
import { markUp as markUpDiscounts } from '../../services/useData/tableMarkups/discounts';

import './marketingScreen.scss';

const availTabs = [
  {
    label: 'campaigns',
    scope: 'campaigns',
    path: `${parentPaths.marketing}/campaigns`,
    button: `${localization.t('general.add')} ${localization.t(
      'general.campaign',
    )}`,
    deleteFunc: null,
    headers: null,
  },
  {
    label: 'abandoned',
    scope: 'abandoned',
    path: `${parentPaths.marketing}/abandoned`,
    button: `${localization.t('general.add')} ${localization.t(
      'general.abandoned',
    )}`,
    // deleteFunc: api.deleteDiscountById,
    // headers: markUpDiscounts.headers,
  },
  {
    label: 'discounts',
    scope: 'discounts',
    path: `${parentPaths.marketing}/discounts`,
    button: `${localization.t('general.add')} ${localization.t(
      'general.discount',
    )}`,
    deleteFunc: api.deleteDiscountById,
    headers: markUpDiscounts.headers,
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
      return history.push(`${parentPaths.marketing}/campaigns`);
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
  const changeTab = (tab) => history.push(`${parentPaths.marketing}/${availTabs[tab].label}`);
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
        <Tab label='Abandoned' />
        <Tab label='Discounts' />
      </Tabs>

      <Box mt={4} mb={2}>
        {curTab === 0 && <CampaignsScreen />}

        {curTab === 1 && <AbandonedScreen />}

        {curTab === 2 && <DiscountsScreen />}
      </Box>
    </Box>
  );
};

export default MarketingScreen;
