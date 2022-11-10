import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Tabs, Tab,
} from '@mui/material';

import AssetsResource from '../../../components/AssetsResoursesWithSelectLabel';

import localization from '../../../localization';
import { AutocompleteCustom } from '../../../components/Inputs';

const Design = ({
  currentStoreData,
  setCurrentStoreData,
  selectOptions,
  resourceLabel,
  currentStoreResources,
  setCurrentStoreResources,
}) => {
  const [curTab, setCurTab] = useState(0);
  const handleUpdateDesign = (parent, updateParam, value) => {
    let resObj = {};

    if (value) {
      const valueArray = value.split(':');

      if (valueArray?.length >= 2) {
        resObj = { customerId: valueArray[0], name: valueArray[1].trim() };
      } else {
        resObj = { customerId: value };
      }
    }

    setCurrentStoreData({
      ...currentStoreData,
      designs: {
        ...currentStoreData.designs,
        [parent]: {
          ...currentStoreData.designs[parent],
          [updateParam]: resObj,
        },
      },
    });
  };

  const defaultResources = [
    {
      key: 0,
      label: null,
      url: null,
    },
  ];

  return (
    <>
      <Box mb={3} bgcolor="#fff" boxShadow={2} pb={4}>
        <Box px={6}>
          <Tabs
            value={curTab}
            indicatorColor="primary"
            textColor="primary"
            onChange={(event, newValue) => {
              setCurTab(newValue);
            }}
            aria-label="disabled tabs example"
          >
            <Tab label={localization.t('labels.enduserPortal')} />
            <Tab label={localization.t('labels.checkout')} />
            <Tab label={localization.t('labels.resellerPortalEmbeddedCheckout')} />
            <Tab label={localization.t('labels.assetsResource')} />
          </Tabs>
        </Box>
        <Box display="flex" flexDirection="column" width={1} px={4}>
          {curTab === 0 && (
            <>
              <Box p={2}>
                <AutocompleteCustom
                  optionLabelKey='value'
                  label="theme"
                  onSelect={(newValue) => handleUpdateDesign(
                    'endUserPortal',
                    'themeRef',
                    newValue,
                  )}
                  selectOptions={selectOptions.theme || []}
                  curValue={Object.keys(currentStoreData.designs.endUserPortal.themeRef)
                    .length !== 0
                    ? `${currentStoreData?.designs?.endUserPortal?.themeRef?.customerId
                    || currentStoreData?.customerId
                    }: ${currentStoreData?.designs?.endUserPortal?.themeRef?.name || ''}`
                    : ''}
                />
              </Box>
              <Box p={2}>
                <AutocompleteCustom
                  optionLabelKey='value'
                  label="layout"
                  onSelect={(newValue) => handleUpdateDesign(
                    'endUserPortal',
                    'layoutRef',
                    newValue,
                  )}
                  selectOptions={selectOptions.layout || []}
                  curValue={Object.keys(currentStoreData.designs.endUserPortal.layoutRef)
                    .length !== 0
                    ? `${currentStoreData?.designs?.endUserPortal?.layoutRef?.customerId
                    || currentStoreData?.customerId
                    }: ${currentStoreData?.designs?.endUserPortal?.layoutRef?.name || ''}`
                    : ''}
                />
              </Box>
              <Box p={2}>
                <AutocompleteCustom
                  optionLabelKey='value'
                  label="font"
                  onSelect={(newValue) => handleUpdateDesign(
                    'endUserPortal',
                    'fontRef',
                    newValue,
                  )}
                  selectOptions={selectOptions.font || []}
                  curValue={Object.keys(currentStoreData.designs.endUserPortal.fontRef)
                    .length !== 0
                    ? `${currentStoreData?.designs?.endUserPortal?.fontRef?.customerId
                    || currentStoreData?.customerId
                    }: ${currentStoreData?.designs?.endUserPortal?.fontRef?.name || ''}`
                    : ''}
                />
              </Box>
              <Box p={2}>
                <AutocompleteCustom
                  optionLabelKey='name'
                  label="i18n"
                  onSelect={(newValue) => handleUpdateDesign(
                    'endUserPortal',
                    'i18nRef',
                    newValue,
                  )}
                  selectOptions={selectOptions?.customersList?.sort((a, b) => ((a.name > b.name) ? 1
                    : -1)) || []}
                  curValue={currentStoreData?.designs?.endUserPortal?.i18nRef?.customerId || ''}
                />
              </Box>
            </>
          )}
          {curTab === 1 && (
            <>
              <Box p={2}>
                <AutocompleteCustom
                  optionLabelKey='value'
                  label="theme"
                  onSelect={(newValue) => handleUpdateDesign(
                    'checkout',
                    'themeRef',
                    newValue,
                  )}
                  selectOptions={selectOptions.theme || []}
                  curValue={
                    Object.keys(currentStoreData.designs.checkout.themeRef)
                      .length !== 0
                      ? `${currentStoreData?.designs?.checkout?.themeRef?.customerId
                      || currentStoreData?.customerId
                      }: ${currentStoreData?.designs?.checkout?.themeRef?.name || ''}`
                      : ''
                  }
                />
              </Box>
              <Box p={2}>
                <AutocompleteCustom
                  optionLabelKey='value'
                  label="layout"
                  onSelect={(newValue) => handleUpdateDesign(
                    'checkout',
                    'layoutRef',
                    newValue,
                  )}
                  selectOptions={selectOptions.layout || []}
                  curValue={
                    Object.keys(currentStoreData.designs.checkout.layoutRef)
                      .length !== 0
                      ? `${currentStoreData?.designs?.checkout?.layoutRef?.customerId
                      || currentStoreData?.customerId
                      }: ${currentStoreData?.designs?.checkout?.layoutRef?.name || ''}`
                      : ''
                  }
                />
              </Box>
              <Box p={2}>
                <AutocompleteCustom
                  optionLabelKey='value'
                  label="font"
                  onSelect={(newValue) => handleUpdateDesign(
                    'checkout',
                    'fontRef',
                    newValue,
                  )}
                  selectOptions={selectOptions.font || []}
                  curValue={
                    Object.keys(currentStoreData.designs.checkout.fontRef)
                      .length !== 0
                      ? `${currentStoreData?.designs?.checkout?.fontRef?.customerId
                      || currentStoreData?.customerId
                      }: ${currentStoreData?.designs?.checkout?.fontRef?.name || ''}`
                      : ''
                  }
                />
              </Box>
              <Box p={2}>
                <AutocompleteCustom
                  optionLabelKey='name'
                  label="i18n"
                  onSelect={(newValue) => handleUpdateDesign(
                    'checkout',
                    'i18nRef',
                    newValue,
                  )}
                  selectOptions={selectOptions?.customersList?.sort((a, b) => ((a.name > b.name) ? 1
                    : -1)) || []}
                  curValue={currentStoreData?.designs?.checkout?.i18nRef?.customerId || ''}
                />
              </Box>
              <Box p={2}>
                <AutocompleteCustom
                  optionLabelKey='value'
                  label="dpTheme"
                  onSelect={(newValue) => handleUpdateDesign(
                    'checkout',
                    'dpThemeRef',
                    newValue,
                  )}
                  selectOptions={selectOptions.theme || []}
                  curValue={
                    Object.keys(currentStoreData.designs.checkout.dpThemeRef)
                      .length !== 0
                      ? `${currentStoreData?.designs?.checkout?.dpThemeRef?.customerId
                      || currentStoreData?.customerId
                      }: ${currentStoreData?.designs?.checkout?.dpThemeRef?.name || ''}`
                      : ''
                  }
                />
              </Box>
            </>
          )}
          {curTab === 2 && (
            <>
              <Box p={2}>
                <AutocompleteCustom
                  optionLabelKey='value'
                  label="theme"
                  onSelect={(newValue) => handleUpdateDesign(
                    'resellerCheckout',
                    'themeRef',
                    newValue,
                  )}
                  selectOptions={selectOptions.theme || []}
                  curValue={
                    Object.keys(currentStoreData.designs.resellerCheckout.themeRef)
                      .length !== 0
                      ? `${currentStoreData?.designs?.resellerCheckout?.themeRef?.customerId
                      || currentStoreData?.customerId
                      }: ${currentStoreData?.designs?.resellerCheckout?.themeRef?.name || ''}`
                      : ''
                  }
                />
              </Box>
              <Box p={2}>
                <AutocompleteCustom
                  optionLabelKey='value'
                  label="layout"
                  onSelect={(newValue) => handleUpdateDesign(
                    'resellerCheckout',
                    'layoutRef',
                    newValue,
                  )}
                  selectOptions={selectOptions.layout || []}
                  curValue={
                    Object.keys(currentStoreData.designs.resellerCheckout.layoutRef)
                      .length !== 0
                      ? `${currentStoreData?.designs?.resellerCheckout?.layoutRef?.customerId
                      || currentStoreData?.customerId
                      }: ${currentStoreData?.designs?.resellerCheckout?.layoutRef?.name || ''}`
                      : ''
                  }
                />
              </Box>
              <Box p={2}>
                <AutocompleteCustom
                  optionLabelKey='value'
                  label="font"
                  onSelect={(newValue) => handleUpdateDesign(
                    'resellerCheckout',
                    'fontRef',
                    newValue,
                  )}
                  selectOptions={selectOptions.font || []}
                  curValue={
                    Object.keys(currentStoreData.designs.resellerCheckout.fontRef)
                      .length !== 0
                      ? `${currentStoreData?.designs?.resellerCheckout?.fontRef?.customerId
                      || currentStoreData?.customerId
                      }: ${currentStoreData?.designs?.resellerCheckout?.fontRef?.name || ''}`
                      : ''
                  }
                />
              </Box>
              <Box p={2}>
                <AutocompleteCustom
                  optionLabelKey='name'
                  label="i18n"
                  onSelect={(newValue) => handleUpdateDesign(
                    'resellerCheckout',
                    'i18nRef',
                    newValue,
                  )}
                  selectOptions={selectOptions?.customersList?.sort((a, b) => ((a.name > b.name) ? 1
                    : -1)) || []}
                  curValue={currentStoreData?.designs?.resellerCheckout?.i18nRef?.customerId || ''}
                />
              </Box>
            </>
          )}
          {curTab === 3 && (
            <Box py={4}>
              <AssetsResource
                labelOptions={resourceLabel}
                maxPayloadFiles={4}
                resources={currentStoreResources.length ? currentStoreResources : defaultResources}
                setResources={setCurrentStoreResources}
                currentStoreData={currentStoreData}
                setCurrentStoreData={setCurrentStoreData}
              />
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

Design.propTypes = {
  resourceLabel: PropTypes.array,
  setCurrentStoreResources: PropTypes.func,
  currentStoreResources: PropTypes.array,
  currentStoreData: PropTypes.object,
  setCurrentStoreData: PropTypes.func,
  selectOptions: PropTypes.object,
};

export default Design;
