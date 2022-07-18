import React from 'react';
import PropTypes from 'prop-types';

import Payment from './SubSections/Payment';
import General from './SubSections/General';
import Design from './SubSections/Design';
import LocalizedContent from '../../components/utils/LocalizedContent';
import StoreSection from './StoreSection';
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
  errors,
  setErrors,
  isRankingOpen,
  setIsRankingOpen,
  curTab,
  customer,
  localizedErrors,
  setLocalizedErrors,
}) => (
  <>
    {curTab === 0 && (
      <StoreSection label={tabLabels[0]}>
        <General
          errors={errors}
          setErrors={setErrors}
          currentStoreData={currentStoreData}
          customer={customer}
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
          errors={errors}
          setErrors={setErrors}
          isRankingOpen={isRankingOpen}
          setIsRankingOpen={setIsRankingOpen}
          selectOptions={selectOptions}
          currentStoreData={currentStoreData}
          setCurrentStoreData={setCurrentStoreData}
        />
      </StoreSection>
    )}
    {curTab === 3 && (
      <StoreSection label={tabLabels[3]}>
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
    )}
  </>
);

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
  curTab: PropTypes.number,
  customer: PropTypes.object,
};

export default StoreDetailsView;
