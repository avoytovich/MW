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
}) => (
  <Tabs
    value={curTab}
    data-test='productTabs'
    indicatorColor='primary'
    textColor='primary'
    onChange={(e, tab) => handleChangeTab(tab)}
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
      label={localization.t('labels.fulfillmentAndSubscription')}
      value={1}
      disabled={!selectOptions?.sellingStores}
    />
    <Tab
      label={localization.t('labels.localizedContent')}
      value={2}
      disabled={!selectOptions?.sellingStores}
    />
    <Tab label={localization.t('labels.prices')} value={3} />
    <Tab label={localization.t('labels.productVariations')} value={4} />
    <Tab label={localization.t('labels.productFiles')} value={5} />
  </Tabs>
);

ProductDetailsTabs.propTypes = {
  curTab: PropTypes.number,
  handleChangeTab: PropTypes.func,
  currentProductData: PropTypes.object,
  parentId: PropTypes.string,
  selectOptions: PropTypes.object,
};

export default ProductDetailsTabs;
