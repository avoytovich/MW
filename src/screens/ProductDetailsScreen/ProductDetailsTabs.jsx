import React from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Tabs,
  Tab,
} from '@mui/material';

import ArrowBack from '@mui/icons-material/ArrowBack';

import localization from '../../localization';

const ProductDetailsTabs = ({
  curTab,
  handleChangeTab,
  currentProductData,
  parentId,
  selectOptions,
  backToParent,
  setBackToParent,
}) => (
  <Tabs
    value={curTab}
    data-test='productTabs'
    indicatorColor='primary'
    textColor='primary'
    onChange={(e, tab) => {
      if (tab === 7 && !backToParent) {
        setBackToParent(true);
      }
      handleChangeTab(tab);
    }}
  >
    {(currentProductData?.parentId || parentId) && (
      <Tab
        style={{ color: 'white', backgroundColor: '#9ec5ec' }}
        label={(
          <Box display='flex' alignItems='center'>
            <ArrowBack color='white' />
            {localization.t('labels.backToParent')}
          </Box>
        )}
        value={7}
      />
    )}
    <Tab label={localization.t('labels.general')} value={0} />
    <Tab
      label={localization.t('labels.fulfillment')}
      value={1}
      disabled={!selectOptions?.sellingStores}
    />
    <Tab
      label={localization.t('labels.subscription')}
      value={2}
      disabled={!selectOptions?.sellingStores}
    />
    <Tab
      label={localization.t('labels.localizedContent')}
      value={3}
      disabled={!selectOptions?.sellingStores}
    />
    <Tab label={localization.t('labels.prices')} value={4} />
    <Tab label={localization.t('labels.productVariations')} value={5} />
    <Tab label={localization.t('labels.productFiles')} value={6} />
  </Tabs>
);

ProductDetailsTabs.propTypes = {
  curTab: PropTypes.number,
  handleChangeTab: PropTypes.func,
  currentProductData: PropTypes.object,
  parentId: PropTypes.string,
  selectOptions: PropTypes.object,
  backToParent: PropTypes.bool,
  setBackToParent: PropTypes.func,
};

export default ProductDetailsTabs;
