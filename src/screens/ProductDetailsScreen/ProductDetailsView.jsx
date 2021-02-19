import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

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
import SectionLayout from './SectionLayout';

const allTabs = [
  'general',
  'fulfillmentAndSubscription',
  'localizedContent',
  'prices',
  'productVariations',
  'productFiles',
];

const ProductDetailsView = ({
  inputErrors,
  setInputErrors,
  selectOptions,
  setProductData,
  currentProductData,
  productHasChanges,
  saveData,
  checkOutStores,
}) => {
  const [curTab, setCurTab] = useState(0);
  const params = useParams();
  return (
    <>
      <Box display="flex" flexDirection="row" mx={2} pb={2}>
        <Typography component="div" color="primary">
          <Box fontWeight={500}>
            {localization.t('general.product')}
            {'/'}
          </Box>
        </Typography>
        <Typography component="div" color="secondary">
          <Box fontWeight={500}>{params.id}</Box>
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        m={2}
        justifyContent="space-between"
      >
        <Box alignSelf="center">
          <Typography data-test="productName" gutterBottom variant="h3">
            {currentProductData.genericName}
          </Typography>
        </Box>

        <Box display="flex" flexDirection="row">
          <Zoom in={productHasChanges}>
            <Box mb={1} mr={1}>
              <Button
                disabled={Object.keys(inputErrors).length !== 0}
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

          <Box>
            {selectOptions.sellingStores && (
              <CheckoutMenu
                checkOutStores={checkOutStores}
                currentProductData={currentProductData}
                sellingStores={selectOptions.sellingStores}
              />
            )}
          </Box>
        </Box>
      </Box>
      <Box m={2} bgcolor="#fff">
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
          <Tab label={localization.t(`labels.${allTabs[1]}`)} />
          <Tab label={localization.t(`labels.${allTabs[2]}`)} />
          <Tab label={localization.t(`labels.${allTabs[3]}`)} />
          <Tab label={localization.t(`labels.${allTabs[4]}`)} />
          <Tab label={localization.t(`labels.${allTabs[5]}`)} />
        </Tabs>
      </Box>
      <Box display="flex">
        {curTab === 0 && (
          <SectionLayout label={allTabs[0]}>
            <General
              inputErrors={inputErrors}
              setInputErrors={setInputErrors}
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
  inputErrors: PropTypes.object,
  setInputErrors: PropTypes.func,
  productHasChanges: PropTypes.bool,
  saveData: PropTypes.func,
  checkOutStores: PropTypes.array,
};

export default ProductDetailsView;
