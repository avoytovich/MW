import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Tabs, Tab,
} from '@mui/material';

import AssetsResource from '../../../components/AssetsResoursesWithSelectLabel';

import localization from '../../../localization';
import { SelectWithDeleteIcon } from '../../../components/Inputs';

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
                <SelectWithDeleteIcon
                  label="theme"
                  value={
                    Object.keys(currentStoreData.designs.endUserPortal.themeRef)
                      .length !== 0
                      ? `${
                        currentStoreData?.designs?.endUserPortal?.themeRef?.customerId
                        || currentStoreData?.customerId
                      }: ${currentStoreData?.designs?.endUserPortal?.themeRef?.name || ''}`
                      : ''
                  }
                  selectOptions={selectOptions.theme}
                  onChangeSelect={(e) => handleUpdateDesign(
                    'endUserPortal',
                    'themeRef',
                    e.target.value,
                  )}
                  onClickDelIcon={() => handleUpdateDesign('endUserPortal', 'themeRef')}
                />
              </Box>
              <Box p={2}>
                <SelectWithDeleteIcon
                  label="layout"
                  value={
                    Object.keys(currentStoreData.designs.endUserPortal.layoutRef)
                      .length !== 0
                      ? `${
                        currentStoreData?.designs?.endUserPortal?.layoutRef?.customerId
                        || currentStoreData?.customerId
                      }: ${currentStoreData?.designs?.endUserPortal?.layoutRef?.name || ''}`
                      : ''
                  }
                  selectOptions={selectOptions.layout}
                  onChangeSelect={(e) => handleUpdateDesign(
                    'endUserPortal',
                    'layoutRef',
                    e.target.value,
                  )}
                  onClickDelIcon={() => handleUpdateDesign('endUserPortal', 'layoutRef')}
                />
              </Box>
              <Box p={2}>
                <SelectWithDeleteIcon
                  label="font"
                  value={
                    Object.keys(currentStoreData.designs.endUserPortal.fontRef)
                      .length !== 0
                      ? `${
                        currentStoreData?.designs?.endUserPortal?.fontRef?.customerId
                        || currentStoreData?.customerId
                      }: ${currentStoreData?.designs?.endUserPortal?.fontRef?.name || ''}`
                      : ''
                  }
                  selectOptions={selectOptions.font}
                  onChangeSelect={(e) => handleUpdateDesign(
                    'endUserPortal',
                    'fontRef',
                    e.target.value,
                  )}
                  onClickDelIcon={() => handleUpdateDesign('endUserPortal', 'fontRef')}
                />
              </Box>
              <Box p={2}>
                <SelectWithDeleteIcon
                  label="i18n"
                  value={currentStoreData?.designs?.endUserPortal?.i18nRef?.customerId || ''}
                  selectOptions={
                    selectOptions?.customersList?.sort((a, b) => ((a.name > b.name) ? 1 : -1))
                  }
                  onChangeSelect={(e) => handleUpdateDesign(
                    'endUserPortal',
                    'i18nRef',
                    e.target.value,
                  )}
                  onClickDelIcon={() => handleUpdateDesign('endUserPortal', 'i18nRef')}
                />
              </Box>
            </>
          )}
          {curTab === 1 && (
            <>
              <Box p={2}>
                <SelectWithDeleteIcon
                  label="theme"
                  value={
                    Object.keys(currentStoreData.designs.checkout.themeRef)
                      .length !== 0
                      ? `${
                        currentStoreData?.designs?.checkout?.themeRef?.customerId
                        || currentStoreData?.customerId
                      }: ${currentStoreData?.designs?.checkout?.themeRef?.name || ''}`
                      : ''
                  }
                  selectOptions={selectOptions.theme}
                  onChangeSelect={(e) => handleUpdateDesign('checkout', 'themeRef', e.target.value)}
                  onClickDelIcon={() => handleUpdateDesign('checkout', 'themeRef')}
                />
              </Box>
              <Box p={2}>
                <SelectWithDeleteIcon
                  label="layout"
                  value={
                    Object.keys(currentStoreData.designs.checkout.layoutRef)
                      .length !== 0
                      ? `${
                        currentStoreData?.designs?.checkout?.layoutRef?.customerId
                        || currentStoreData?.customerId
                      }: ${currentStoreData?.designs?.checkout?.layoutRef?.name || ''}`
                      : ''
                  }
                  selectOptions={selectOptions.layout}
                  onChangeSelect={(e) => handleUpdateDesign('checkout', 'layoutRef', e.target.value)}
                  onClickDelIcon={() => handleUpdateDesign('checkout', 'layoutRef')}
                />
              </Box>
              <Box p={2}>
                <SelectWithDeleteIcon
                  label="font"
                  value={
                    Object.keys(currentStoreData.designs.checkout.fontRef)
                      .length !== 0
                      ? `${
                        currentStoreData?.designs?.checkout?.fontRef?.customerId
                        || currentStoreData?.customerId
                      }: ${currentStoreData?.designs?.checkout?.fontRef?.name || ''}`
                      : ''
                  }
                  selectOptions={selectOptions.font}
                  onChangeSelect={(e) => handleUpdateDesign('checkout', 'fontRef', e.target.value)}
                  onClickDelIcon={() => handleUpdateDesign('checkout', 'fontRef')}
                />
              </Box>
              <Box p={2}>
                <SelectWithDeleteIcon
                  label="i18n"
                  value={currentStoreData?.designs?.checkout?.i18nRef?.customerId || ''}
                  selectOptions={selectOptions?.customersList}
                  onChangeSelect={(e) => handleUpdateDesign('checkout', 'i18nRef', e.target.value)}
                  onClickDelIcon={() => handleUpdateDesign('checkout', 'i18nRef')}
                />
              </Box>
              <Box p={2}>
                <SelectWithDeleteIcon
                  label="dpTheme"
                  value={
                    Object.keys(currentStoreData.designs.checkout.dpThemeRef)
                      .length !== 0
                      ? `${
                        currentStoreData?.designs?.checkout?.dpThemeRef?.customerId
                        || currentStoreData?.customerId
                      }: ${currentStoreData?.designs?.checkout?.dpThemeRef?.name || ''}`
                      : ''
                  }
                  selectOptions={selectOptions.theme}
                  onChangeSelect={(e) => handleUpdateDesign('checkout', 'dpThemeRef', e.target.value)}
                  onClickDelIcon={() => handleUpdateDesign('checkout', 'dpThemeRef')}
                />
              </Box>
            </>
          )}
          {curTab === 2 && (
            <>
              <Box p={2}>
                <SelectWithDeleteIcon
                  label="theme"
                  value={
                    Object.keys(currentStoreData.designs.resellerCheckout.themeRef)
                      .length !== 0
                      ? `${
                        currentStoreData?.designs?.resellerCheckout?.themeRef?.customerId
                        || currentStoreData?.customerId
                      }: ${currentStoreData?.designs?.resellerCheckout?.themeRef?.name || ''}`
                      : ''
                  }
                  selectOptions={selectOptions.theme}
                  onChangeSelect={(e) => handleUpdateDesign(
                    'resellerCheckout',
                    'themeRef',
                    e.target.value,
                  )}
                  onClickDelIcon={() => handleUpdateDesign('resellerCheckout', 'themeRef')}
                />
              </Box>
              <Box p={2}>
                <SelectWithDeleteIcon
                  label="layout"
                  value={
                    Object.keys(currentStoreData.designs.resellerCheckout.layoutRef)
                      .length !== 0
                      ? `${
                        currentStoreData?.designs?.resellerCheckout?.layoutRef?.customerId
                        || currentStoreData?.customerId
                      }: ${currentStoreData?.designs?.resellerCheckout?.layoutRef?.name || ''}`
                      : ''
                  }
                  selectOptions={selectOptions.layout}
                  onChangeSelect={(e) => handleUpdateDesign(
                    'resellerCheckout',
                    'layoutRef',
                    e.target.value,
                  )}
                  onClickDelIcon={() => handleUpdateDesign('resellerCheckout', 'layoutRef')}
                />
              </Box>
              <Box p={2}>
                <SelectWithDeleteIcon
                  label="font"
                  value={
                    Object.keys(currentStoreData.designs.resellerCheckout.fontRef)
                      .length !== 0
                      ? `${
                        currentStoreData?.designs?.resellerCheckout?.fontRef?.customerId
                        || currentStoreData?.customerId
                      }: ${currentStoreData?.designs?.resellerCheckout?.fontRef?.name || ''}`
                      : ''
                  }
                  selectOptions={selectOptions.font}
                  onChangeSelect={(e) => handleUpdateDesign(
                    'resellerCheckout',
                    'fontRef',
                    e.target.value,
                  )}
                  onClickDelIcon={() => handleUpdateDesign('resellerCheckout', 'fontRef')}
                />
              </Box>
              <Box p={2}>
                <SelectWithDeleteIcon
                  label="i18n"
                  value={currentStoreData?.designs?.resellerCheckout?.i18nRef?.customerId || ''}
                  selectOptions={selectOptions?.customersList}
                  onChangeSelect={(e) => handleUpdateDesign(
                    'resellerCheckout',
                    'i18nRef',
                    e.target.value,
                  )}
                  onClickDelIcon={() => handleUpdateDesign('resellerCheckout', 'i18nRef')}
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
