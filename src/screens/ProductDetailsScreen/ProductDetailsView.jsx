import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  Zoom, Button, Box, Typography, Tabs, Tab,
} from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';

import localization from '../../localization';
import ProductFiles from './SubSections/ProductFiles';

import General from './SubSections/General';
import Prices from './SubSections/Prices';
import FulfillmentAndSubscription from './SubSections/FulfillmentAndSubscription';
import CheckoutMenu from './CheckoutMenu';
import SectionLayout from '../../components/SectionLayout';
import CustomBreadcrumbs from '../../components/utils/CustomBreadcrumbs';
import LocalizedContent from './SubSections/LocalizedContent';
import Variations from './SubSections/Variations';
import SubProductVariations from './SubSections/SubProductVariations';
import parentPaths from '../../services/paths';
const allTabs = [
  'general',
  'fulfillmentAndSubscription',
  'localizedContent',
  'prices',
  'productVariations',
  'productFiles',
];

const backButton = 'backToParent';

const ProductDetailsView = ({
  selectOptions,
  setProductData,
  currentProductData,
  productHasChanges,
  saveData,
  checkOutStores,
  productData,
  productId,
  productHasLocalizationChanges,
  setProductLocalizationChanges,
  productVariations,
  setProductDetails,
  productDetails,
  parentId,
  variablesDescriptions,
}) => {
  const [curTab, setCurTab] = useState(0);
  const [tabsDisabled, setTabsDisabled] = useState(true);
  const [saveDisabled, setSaveDisabled] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const {
      catalogId, publisherRefId, genericName, type, prices,
    } = currentProductData;
    const currency = prices?.state // eslint-disable-line
      ? prices?.state === 'inherits'
        ? prices?.parentValue?.priceByCountryByCurrency[prices?.parentValue?.defaultCurrency]
          ?.default?.value
        : prices?.value?.priceByCountryByCurrency[prices?.value?.defaultCurrency]?.default
          ?.value
      : prices?.defaultCurrency;

    if (catalogId && publisherRefId && genericName && type && currency) {
      setTabsDisabled(false);
    } else {
      setTabsDisabled(true);
    }
  }, [currentProductData]);
  const disabledTab = !productId && !parentId;

  const handleChangeTab = (tab) => (parentId && tab === 7 ? history.push(`${parentPaths.productlist}/${parentId}`) : setCurTab(tab));

  return (
    <>
      {productId && (
        <Box mx={2} data-test='breadcrumbs'>
          <CustomBreadcrumbs
            url={`${parentPaths.productlist}`}
            section={localization.t('general.product')}
            id={productId}
          />
        </Box>
      )}

      <Box display='flex' flexDirection='row' m={2} justifyContent='space-between'>
        <Box alignSelf='center'>
          {productId ? (
            <Typography data-test='productName' gutterBottom variant='h3'>
              {productData?.genericName?.value || productData.genericName}
            </Typography>
          ) : (
            <Typography data-test='productName' gutterBottom variant='h3'>
              {parentId ? 'VARIANT' : localization.t('general.addProduct')}
            </Typography>
          )}
        </Box>

        <Box display='flex' flexDirection='row'>
          <Zoom in={productHasChanges || !productId || productHasLocalizationChanges}>
            <Box mb={1} mr={1}>
              <Button
                disabled={tabsDisabled || saveDisabled}
                id='save-detail-button'
                color='primary'
                size='large'
                type='submit'
                variant='contained'
                onClick={saveData}
              >
                {localization.t('general.save')}
              </Button>
            </Box>
          </Zoom>

          {productId && (
            <Box data-test='checkoutMenu'>
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
      <Box my={2} bgcolor='#fff' display='flex'>
        <Tabs
          value={curTab}
          data-test='productTabs'
          indicatorColor='primary'
          textColor='primary'
          onChange={(e, tab) => handleChangeTab(tab)}
          aria-label='disabled tabs example'
        >
          {parentId && (
            <Tab
              style={{ color: 'white', backgroundColor: '#9ec5ec' }}
              label={(
                <Box display='flex' alignItems='center'>
                  <ArrowBack color='white' />
                  {localization.t(`labels.${backButton}`)}
                </Box>
              )}
              value={7}
            />
          )}
          <Tab label={localization.t(`labels.${allTabs[0]}`)} value={0} />
          <Tab
            disabled={disabledTab}
            label={localization.t(`labels.${allTabs[1]}`)}
            value={1}
          />
          <Tab
            disabled={disabledTab}
            label={localization.t(`labels.${allTabs[2]}`)}
            value={2}
          />
          <Tab label={localization.t(`labels.${allTabs[3]}`)} value={3} />
          <Tab
            disabled={disabledTab}
            label={localization.t(`labels.${allTabs[4]}`)}
            value={4}
          />
          <Tab
            disabled={disabledTab}
            label={localization.t(`labels.${allTabs[5]}`)}
            value={5}
          />
        </Tabs>
      </Box>
      <Box display='flex'>
        {curTab === 0 && (
          <SectionLayout dataTest={allTabs[0]} label={allTabs[0]}>
            <General
              selectOptions={selectOptions}
              setProductData={setProductData}
              currentProductData={currentProductData}
              parentId={parentId}
            />
          </SectionLayout>
        )}
        {curTab === 1 && (
          <SectionLayout dataTest={allTabs[1]} label={allTabs[1]}>
            <FulfillmentAndSubscription
              selectOptions={selectOptions}
              setProductData={setProductData}
              currentProductData={currentProductData}
            />
          </SectionLayout>
        )}
        {curTab === 2 && (
          <SectionLayout dataTest={allTabs[2]} label={allTabs[2]}>
            <LocalizedContent
              setProductData={setProductData}
              currentProductData={currentProductData}
              productData={productData}
              setNewData={setProductLocalizationChanges}
              parentId={parentId}
            />
          </SectionLayout>
        )}
        {curTab === 3 && (
          <SectionLayout dataTest={allTabs[3]} label={allTabs[3]}>
            <Prices
              selectOptions={selectOptions}
              setProductData={setProductData}
              currentProductData={currentProductData}
              productData={productData}
              setNewData={setProductLocalizationChanges}
              setSaveDisabled={setSaveDisabled}
              parentId={parentId}
            />
          </SectionLayout>
        )}
        {curTab === 4 ? ( // eslint-disable-line
          parentId ? (
            <SubProductVariations
              setProductData={setProductData}
              setProductDetails={setProductDetails}
              currentProductData={currentProductData}
              productDetails={productDetails}
              productVariations={productVariations}
              parentId={parentId}
              selectOptions={selectOptions}
              variablesDescriptions={variablesDescriptions}
            />
          ) : (
            <Variations
              selectOptions={selectOptions}
              setProductData={setProductData}
              currentProductData={currentProductData}
              productVariations={productVariations}
              setProductDetails={setProductDetails}
              productDetails={productDetails}
            />
          )
        ) : null}
        {curTab === 5 && (
          <SectionLayout dataTest={allTabs[5]} label={allTabs[5]}>
            <ProductFiles
              productData={productData}
              currentProductData={currentProductData}
              setProductData={setProductData}
            />
          </SectionLayout>
        )}
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
  productHasLocalizationChanges: PropTypes.bool,
  setProductLocalizationChanges: PropTypes.func,
  productVariations: PropTypes.object,
  setProductDetails: PropTypes.func,
  productDetails: PropTypes.object,
  parentId: PropTypes.string,
  variablesDescriptions: PropTypes.array,
};

export default ProductDetailsView;
