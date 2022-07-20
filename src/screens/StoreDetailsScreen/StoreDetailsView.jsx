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

import useScroolWithTabs from '../../services/hooks/useScroolWithTabs';

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
  setCurTab,
  customer,
  refScrool = [],
  localizedErrors,
  setLocalizedErrors,
}) => {
  const [showTopBtn, goToTop] = useScroolWithTabs(refScrool, setCurTab);

  return (
    <>
      <StoreSection
        label={tabLabels[0]}
        myRef={refScrool[0]}
      >
        <General
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
        myRef={refScrool[1]}
      >
        <Design
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
        myRef={refScrool[2]}
      >
        <Payment
          errors={errors}
          setErrors={setErrors}
          isRankingOpen={isRankingOpen}
          setIsRankingOpen={setIsRankingOpen}
          selectOptions={selectOptions}
          currentStoreData={currentStoreData}
          setCurrentStoreData={setCurrentStoreData}
        />
      </StoreSection>
      <StoreSection
        label={tabLabels[3]}
        myRef={refScrool[3]}
      >
        <LocalizedContent
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
  refScrool: PropTypes.array,
};

export default StoreDetailsView;
