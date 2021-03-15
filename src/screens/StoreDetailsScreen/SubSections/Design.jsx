import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Typography, Tabs, Tab,
} from '@material-ui/core';

import localization from '../../../localization';
import { SelectWithDeleteIcon } from '../../../components/Inputs';

const Design = ({ currentStoreData, setCurrentStoreData, selectOptions }) => {
  const [curTab, setCurTab] = useState(0);
  const handleUpdateDesign = (parent, updateParam, value) => {
    let resObj = {};
    if (value) {
      const valueArray = value.split(':');
      resObj = { customerId: valueArray[0], name: valueArray[1].trim() };
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
  return (
    <>
      <Box bgcolor="#fff" boxShadow={2}>
        <Box pt={6} px={6} my={3}>
          <Typography gutterBottom variant="h4">
            {localization.t('labels.design')}
          </Typography>
        </Box>
        <Box>
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
            <Tab
              label={localization.t('labels.resellerPortalEmbeddedCheckout')}
            />
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
                      ? `${currentStoreData.designs.endUserPortal.themeRef.customerId}: ${currentStoreData.designs.endUserPortal.themeRef.name}`
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
                    Object.keys(
                      currentStoreData.designs.endUserPortal.layoutRef,
                    ).length !== 0
                      ? `${currentStoreData.designs.endUserPortal.layoutRef.customerId}: ${currentStoreData.designs.endUserPortal.layoutRef.name}`
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
                      ? `${currentStoreData.designs.endUserPortal.fontRef.customerId}: ${currentStoreData.designs.endUserPortal.fontRef.name}`
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
                  value={
                    Object.keys(currentStoreData.designs.endUserPortal.i18nRef)
                      .length !== 0
                      ? `${currentStoreData.designs.endUserPortal.i18nRef.customerId}: ${currentStoreData.designs.endUserPortal.i18nRef.name}`
                      : ''
                  }
                  selectOptions={selectOptions.translation}
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
                      ? `${currentStoreData.designs.checkout.themeRef.customerId}: ${currentStoreData.designs.checkout.themeRef.name}`
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
                      ? `${currentStoreData.designs.checkout.layoutRef.customerId}: ${currentStoreData.designs.checkout.layoutRef.name}`
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
                      ? `${currentStoreData.designs.checkout.fontRef.customerId}: ${currentStoreData.designs.checkout.fontRef.name}`
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
                  value={
                    Object.keys(currentStoreData.designs.checkout.i18nRef)
                      .length !== 0
                      ? `${currentStoreData.designs.checkout.i18nRef.customerId}: ${currentStoreData.designs.checkout.i18nRef.name}`
                      : ''
                  }
                  selectOptions={selectOptions.translation}
                  onChangeSelect={(e) => handleUpdateDesign('checkout', 'i18nRef', e.target.value)}
                  onClickDelIcon={() => handleUpdateDesign('checkout', 'i18nRef')}
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
                    Object.keys(
                      currentStoreData.designs.resellerCheckout.themeRef,
                    ).length !== 0
                      ? `${currentStoreData.designs.resellerCheckout.themeRef.customerId}: ${currentStoreData.designs.resellerCheckout.themeRef.name}`
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
                    Object.keys(
                      currentStoreData.designs.resellerCheckout.layoutRef,
                    ).length !== 0
                      ? `${currentStoreData.designs.resellerCheckout.layoutRef.customerId}: ${currentStoreData.designs.resellerCheckout.layoutRef.name}`
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
                    Object.keys(
                      currentStoreData.designs.resellerCheckout.fontRef,
                    ).length !== 0
                      ? `${currentStoreData.designs.resellerCheckout.fontRef.customerId}: ${currentStoreData.designs.resellerCheckout.fontRef.name}`
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
                  value={
                    Object.keys(
                      currentStoreData.designs.resellerCheckout.i18nRef,
                    ).length !== 0
                      ? `${currentStoreData.designs.resellerCheckout.i18nRef.customerId}: ${currentStoreData.designs.resellerCheckout.i18nRef.name}`
                      : ''
                  }
                  selectOptions={selectOptions.translation}
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
        </Box>
      </Box>
    </>
  );
};

Design.propTypes = {
  currentStoreData: PropTypes.object,
  setCurrentStoreData: PropTypes.func,
  selectOptions: PropTypes.object,
};

export default Design;
