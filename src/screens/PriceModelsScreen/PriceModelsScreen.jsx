import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';

import {
  Tabs, Tab, Box, Button,
} from '@material-ui/core';

import PricesScreen from './SubSections/PricesScreen';
import PriceFunctionsScreen from './SubSections/PriceFunctionsScreen';
import TableActionsBar from '../../components/TableActionsBar';

import parentPaths from '../../services/paths';
import { markUp as markUpPrices } from '../../services/useData/tableMarkups/prices';
import { markUp as markUpPriceFunctions } from '../../services/useData/tableMarkups/priceFunctions';

import localization from '../../localization';
import api from '../../api';

import './priceModelsScreen.scss';

const availTabs = [
  {
    label: 'prices',
    scope: 'prices',
    path: parentPaths.pricemodels.pricesTab,
    button: `${localization.t('general.add')} ${localization.t(
      'general.price',
    )}`,
    deleteFunc: api.deletePriceById,
    headers: markUpPrices.headers,
  },
  {
    label: 'pricefunctions',
    scope: 'pricefunctions',
    path: parentPaths.pricemodels.pricefunctionsTab,
    deleteFunc: api.deletePriceFunctionById,
    headers: markUpPriceFunctions.headers,
    button: `${localization.t('general.add')} ${localization.t(
      'labels.priceFunction',
    )}`,
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
      return history.push(`${parentPaths.pricemodels.pricesTab}`);
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
        {currentTab.button && (
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
        )}
      </TableActionsBar>

    );
  };

  const changeTab = (tab) => history.push(`${availTabs[tab].path}`);

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

        <Tab label='Price Functions' />
      </Tabs>

      <Box mt={4} mb={2}>
        {curTab === 0 && <PricesScreen />}

        {curTab === 1 && <PriceFunctionsScreen />}
      </Box>
    </Box>
  );
};

export default PriceModelsScreen;
