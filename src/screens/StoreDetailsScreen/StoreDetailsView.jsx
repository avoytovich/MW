import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Tabs,
  Tab,
} from '@material-ui/core';

import Payment from './SubSections/Payment';
import General from './SubSections/General';
import Design from './SubSections/Design';
import LocalizedContent from './SubSections/LocalizedContent';
import StoreSection from './StoreSection';
import localization from '../../localization';

import {
  tabLabels,
  resourceLabel,
} from './utils';

const StoreDetailsView = ({
  currentStoreData,
  selectOptions,
  setCurrentStoreData,
  currentStoreResources,
  setCurrentStoreResources,
  selectedLang,
  setSelectedLang,
}) => {
  const [curTab, setCurTab] = useState(0);
  return (
    <>
      <Box my={2} bgcolor='#fff'>
        <Tabs
          value={curTab}
          indicatorColor='primary'
          textColor='primary'
          onChange={(event, newValue) => {
            setCurTab(newValue);
          }}
          aria-label='disabled tabs example'
        >
          {tabLabels.map((tab) => (
            <Tab key={tab} label={localization.t(`labels.${tab}`)} />
          ))}
        </Tabs>
      </Box>
      {curTab === 0 && (
        <StoreSection label={tabLabels[0]}>
          <General
            currentStoreData={currentStoreData}
            setCurrentStoreData={setCurrentStoreData}
            selectOptions={selectOptions}
          />
        </StoreSection>
      )}
      {curTab === 1 && (
        <Design
          resourceLabel={resourceLabel}
          currentStoreResources={currentStoreResources}
          setCurrentStoreResources={setCurrentStoreResources}
          selectOptions={selectOptions}
          currentStoreData={currentStoreData}
          setCurrentStoreData={setCurrentStoreData}
        />
      )}
      {curTab === 2 && (
        <StoreSection label={tabLabels[2]}>
          <Payment
            selectOptions={selectOptions}
            currentStoreData={currentStoreData}
            setCurrentStoreData={setCurrentStoreData}
          />
        </StoreSection>
      )}
      {curTab === 3 && (
        <StoreSection label={tabLabels[3]}>
          <LocalizedContent
            selectedLang={selectedLang}
            setSelectedLang={setSelectedLang}
            currentStoreData={currentStoreData}
            setCurrentStoreData={setCurrentStoreData}
          />
        </StoreSection>
      )}
    </>
  );
};
StoreDetailsView.propTypes = {
  setCurrentStoreData: PropTypes.func,
  currentStoreData: PropTypes.object,
  selectOptions: PropTypes.object,
  setSelectedLang: PropTypes.func,
  setCurrentStoreResources: PropTypes.func,
  currentStoreResources: PropTypes.array,
  selectedLang: PropTypes.any,
};

export default StoreDetailsView;
