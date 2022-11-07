import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import Payment from './SubSections/Payment';
import General from './SubSections/General';
import Design from './SubSections/Design';
import LocalizedContent from '../../components/utils/LocalizedContent';
import StoreSection from './StoreSection';
import {
  tabLabels,
  resourceLabel,
} from './utils';

import useScroolWithTabs from './hooks/useScroolWithTabs';

import './storeDetailsScreen.scss';

const StoreDetailsView = ({
  currentStoreData,
  selectOptions,
  setCurrentStoreData,
  currentStoreResources,
  setCurrentStoreResources,
  errors,
  setErrors,
  isRankingOpen,
  setIsRankingOpen,
  curTab,
  setCurTab,
  customer,
  refScrool = [],
  refTab = [],
  localizedErrors,
  setLocalizedErrors,
  isScroolUp,
  isScroolDown,
}) => {
  const [showTopBtn, goToTop] = useScroolWithTabs(
    refScrool, curTab, setCurTab, isScroolUp, isScroolDown, refTab,
  );

  return (
    <>
      <StoreSection
        label={tabLabels[0]}
        myRef={refTab[0]}
      >
        <General
          myRef={refScrool[0]}
          errors={errors}
          setErrors={setErrors}
          currentStoreData={currentStoreData}
          customer={customer}
          setCurrentStoreData={setCurrentStoreData}
          selectOptions={selectOptions}
        />
      </StoreSection>
      <StoreSection
        label={tabLabels[1]}
        myRef={refTab[1]}
      >
        <Design
          myRef={refScrool[1]}
          resourceLabel={resourceLabel}
          currentStoreResources={currentStoreResources}
          setCurrentStoreResources={setCurrentStoreResources}
          selectOptions={selectOptions}
          currentStoreData={currentStoreData}
          setCurrentStoreData={setCurrentStoreData}
        />
      </StoreSection>
      <StoreSection
        label={tabLabels[2]}
        myRef={refTab[2]}
      >
        <Payment
          myRef={refScrool[2]}
          errors={errors}
          setErrors={setErrors}
          customer={customer}
          isRankingOpen={isRankingOpen}
          setIsRankingOpen={setIsRankingOpen}
          selectOptions={selectOptions}
          currentStoreData={currentStoreData}
          setCurrentStoreData={setCurrentStoreData}
        />
      </StoreSection>
      <StoreSection
        label={tabLabels[3]}
        myRef={refTab[3]}
      >
        <LocalizedContent
          myRef={refScrool[3]}
          isVertical
          setLocalizedData={(newValue) => {
            setCurrentStoreData((c) => ({
              ...c,
              thankYouDesc: newValue,
            }));
          }}
          errors={localizedErrors}
          setErrors={setLocalizedErrors}
          defaultLocale={currentStoreData.defaultLocale}
          localizedData={currentStoreData.thankYouDesc}
        />
      </StoreSection>
      <Box m={2} className='top-to-btm'>
        {showTopBtn && (
          <ArrowUpwardIcon
            className='icon-position icon-style'
            onClick={goToTop}
          />
        )}
      </Box>
    </>
  );
};

StoreDetailsView.propTypes = {
  setCurrentStoreData: PropTypes.func,
  currentStoreData: PropTypes.object,
  selectOptions: PropTypes.object,
  setCurrentStoreResources: PropTypes.func,
  currentStoreResources: PropTypes.array,
  errors: PropTypes.object,
  localizedErrors: PropTypes.object,
  setLocalizedErrors: PropTypes.func,
  setErrors: PropTypes.func,
  isRankingOpen: PropTypes.bool,
  setIsRankingOpen: PropTypes.func,
  setCurTab: PropTypes.func,
  customer: PropTypes.object,
  curTab: PropTypes.number,
  refTab: PropTypes.array,
  refScrool: PropTypes.array,
  isScroolUp: PropTypes.bool,
  isScroolDown: PropTypes.bool,
};

export default StoreDetailsView;
