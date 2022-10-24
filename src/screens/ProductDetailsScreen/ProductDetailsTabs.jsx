import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Tabs,
  Tab,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import ArrowBack from '@mui/icons-material/ArrowBack';

import { tabLabels as tabLabelsProduct } from './utils';
import { productHightLight } from '../../components/utils/DetailPageWrapper/HighLightingTabs';
import localization from '../../localization';

const CustomizedTab = styled(Tab)`
    color: red;
  `;

const ProductDetailsTabs = ({
  curTab,
  handleChangeTab,
  currentProductData,
  curLocalizedData,
  parentId,
  selectOptions,
  backToParent,
  setBackToParent,
  tabs,
}) => {
  useEffect(() => {
    if (tabs?.scope === 'product' && tabLabelsProduct.includes(tabs?.tabLabels?.[tabs.curTab])) {
      productHightLight(
        currentProductData,
        curLocalizedData,
        tabs?.priceTableError,
        tabs?.errors,
        tabs?.setErrors,
        tabs,
        tabs?.localizedErrors,
      );
    }
  },
  [
    currentProductData,
    curLocalizedData,
    tabs?.curTab,
    tabs?.priceTableError,
    tabs?.localizedErrors,
  ]);

  return (
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
      {tabs?.errors?.general?.isFulfilled === false
        ? <CustomizedTab key='general' label={localization.t('labels.general')} />
        : <Tab label={localization.t('labels.general')} value={0} />}
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
      {tabs?.errors?.localizedContent?.isFulfilled === false
        ? <CustomizedTab key='localizedContent' label={localization.t('labels.localizedContent')} />
        : <Tab label={localization.t('labels.localizedContent')} value={3} disabled={!selectOptions?.sellingStores} />}
      {tabs?.errors?.prices?.isFulfilledParent === false && !parentId
        ? <CustomizedTab key='prices' label={localization.t('labels.prices')} value={4} />
        : tabs?.errors?.prices?.isFulfilledVariant === false && parentId
          ? <CustomizedTab key='prices' label={localization.t('labels.prices')} value={4} />
          : <Tab label={localization.t('labels.prices')} value={4} />}
      <Tab label={localization.t('labels.productFiles')} value={5} />
      {(!parentId) && (
      <Tab
        label={localization.t('labels.productVariations')}
        value={6}
      />
      )}
    </Tabs>
  );
};

ProductDetailsTabs.propTypes = {
  curTab: PropTypes.number,
  handleChangeTab: PropTypes.func,
  currentProductData: PropTypes.object,
  curLocalizedData: PropTypes.object,
  parentId: PropTypes.string,
  selectOptions: PropTypes.object,
  backToParent: PropTypes.bool,
  setBackToParent: PropTypes.func,
  tabs: PropTypes.object,
};

export default ProductDetailsTabs;
