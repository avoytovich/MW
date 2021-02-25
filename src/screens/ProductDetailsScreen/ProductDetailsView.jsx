import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Zoom,
  Button,
  Box,
  Typography,
  Tabs,
  Tab,
} from '@material-ui/core';

import localization from '../../localization';

import General from './SubSections/General';
import Prices from './SubSections/Prices';
import FulfillmentAndSubscription from './SubSections/FulfillmentAndSubscription';
import CheckoutMenu from './CheckoutMenu';
import SectionLayout from '../../components/SectionLayout';

const allTabs = [
  'general',
  'fulfillmentAndSubscription',
  'localizedContent',
  'prices',
  'productVariations',
  'productFiles',
];

const ProductDetailsView = ({
  selectOptions,
  setProductData,
  currentProductData,
  productHasChanges,
  saveData,
  checkOutStores,
  productData,
  productId,
}) => {
  const [curTab, setCurTab] = useState(0);
  const [tabsDisabled, setTabsDisabled] = useState(true);

  useEffect(() => {
    const {
      catalogId,
      publisherRefId,
      genericName,
      type,
      prices,
    } = currentProductData;

    if (
      catalogId
      && publisherRefId
      && genericName
      && type
      && prices.defaultCurrency
      && prices.priceByCountryByCurrency[prices.defaultCurrency].default.value
    ) {
      setTabsDisabled(false);
    } else {
      setTabsDisabled(true);
    }
  }, [currentProductData]);
  return (
    <>
      <Box display="flex" flexDirection="row" mx={2} pb={2}>
        {productId && (
          <>
            <Typography component="div" color="primary">
              <Box fontWeight={500}>
                {localization.t('general.product')}
                {'/'}
              </Box>
            </Typography>
            <Typography component="div" color="secondary">
              <Box fontWeight={500}>{productId}</Box>
            </Typography>
          </>
        )}
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        m={2}
        justifyContent="space-between"
      >
        <Box alignSelf="center">
          {productId ? (
            <Typography data-test="productName" gutterBottom variant="h3">
              {productData.genericName}
            </Typography>
          ) : (
            <Typography data-test="productName" gutterBottom variant="h3">
              {localization.t('general.addProduct')}
            </Typography>
          )}
        </Box>

        <Box display="flex" flexDirection="row">
          <Zoom in={productHasChanges || !productId}>
            <Box mb={1} mr={1}>
              <Button
                disabled={tabsDisabled}
                id="save-detail-button"
                color="primary"
                size="large"
                type="submit"
                variant="contained"
                onClick={saveData}
              >
                {localization.t('general.save')}
              </Button>
            </Box>
          </Zoom>

          {productId && (
            <Box>
              {selectOptions.sellingStores && (
                <CheckoutMenu
                  checkOutStores={checkOutStores}
                  currentProductData={currentProductData}
                  sellingStores={selectOptions.sellingStores}
                />
              )}
            </Box>
          )}
        </Box>
      </Box>
      <Box my={2} bgcolor="#fff">
        <Tabs
          value={curTab}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newValue) => {
            setCurTab(newValue);
          }}
          aria-label="disabled tabs example"
        >
          <Tab label={localization.t(`labels.${allTabs[0]}`)} />
          <Tab
            disabled={tabsDisabled}
            label={localization.t(`labels.${allTabs[1]}`)}
          />
          <Tab
            disabled={tabsDisabled}
            label={localization.t(`labels.${allTabs[2]}`)}
          />
          <Tab label={localization.t(`labels.${allTabs[3]}`)} />
          <Tab
            disabled={tabsDisabled}
            label={localization.t(`labels.${allTabs[4]}`)}
          />
          <Tab
            disabled={tabsDisabled}
            label={localization.t(`labels.${allTabs[5]}`)}
          />
        </Tabs>
      </Box>
      <Box display="flex">
        {curTab === 0 && (
          <SectionLayout label={allTabs[0]}>
            <General
              selectOptions={selectOptions}
              setProductData={setProductData}
              currentProductData={currentProductData}
            />
          </SectionLayout>
        )}
        {curTab === 1 && (
          <SectionLayout label={allTabs[1]}>
            <FulfillmentAndSubscription
              selectOptions={selectOptions}
              setProductData={setProductData}
              currentProductData={currentProductData}
            />
          </SectionLayout>
        )}
        {curTab === 2 && <SectionLayout label={allTabs[2]} />}
        {curTab === 3 && (
          <SectionLayout label={allTabs[3]}>
            <Prices />
          </SectionLayout>
        )}
        {curTab === 4 && <SectionLayout label={allTabs[4]} />}
        {curTab === 5 && <SectionLayout label={allTabs[5]} />}
      </Box>
    </>
  );
};

ProductDetailsView.propTypes = {
  setProductData: PropTypes.func,
  currentProductData: PropTypes.object,
  selectOptions: PropTypes.object,
  productHasChanges: PropTypes.bool,
  saveData: PropTypes.func,
  checkOutStores: PropTypes.array,
  productData: PropTypes.object,
  productId: PropTypes.string,
};

export default ProductDetailsView;
