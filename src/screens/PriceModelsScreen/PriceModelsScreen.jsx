import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';

import {
  Tabs, Tab, Box, Button,
} from '@material-ui/core';

import PricesScreen from './SubSections/PricesScreen';
import TableActionsBar from '../../components/TableActionsBar';

import parentPaths from '../../services/paths';
import { markUp as markUpPrices } from '../../services/useData/tableMarkups/prices';

import localization from '../../localization';
import api from '../../api';

import './priceModelsScreen.scss';

const availTabs = [
  {
    label: 'prices',
    scope: 'prices',
    path: `${parentPaths.pricemodels}/prices`,
    button: `${localization.t('general.add')} ${localization.t(
      'general.price',
    )}`,
    deleteFunc: api.deletePriceById,
    headers: markUpPrices.headers,
  },
];

const PriceModelsScreen = () => {
  const history = useHistory();
  const [curTab, setCurTab] = useState(0);

  const pathname = history?.location?.pathname || 'prices';

  useEffect(() => {
    const section = pathname.split('/').pop();
    const index = availTabs.findIndex((i) => i.label === section);
    if (index < 0) {
      return history.push(`${parentPaths.pricemodels}/prices`);
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
          id='add-price-button'
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

  const changeTab = (tab) => history.push(`${parentPaths.pricemodels}/${availTabs[tab].label}`);

  return (
    <Box display='flex' flexDirection='column'>
      {drawAddButton()}
      <Tabs
        value={curTab}
        onChange={(e, newTab) => changeTab(newTab)}
        indicatorColor='primary'
        textColor='primary'
      >
        <Tab label='Prices' />
      </Tabs>

      <Box mt={4} mb={2}>
        {curTab === 0 && <PricesScreen />}
      </Box>
    </Box>
  );
};

export default PriceModelsScreen;
