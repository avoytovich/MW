import React from 'react';
import PropTypes from 'prop-types';
import ScrollSectionLayout from '../../components/SectionLayout/ScrollSectionLayout';

import Payment from './SubSections/Payment';
import General from './SubSections/General';
import Design from './SubSections/Design';
import LocalizedContent from '../../components/utils/LocalizedContent';
import {
  resourceLabel,
} from './utils';

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
  customer,
  localizedErrors,
  setLocalizedErrors,
  sectionRefs,
  setSelectedSection,
  selectedSection,
}) => (
  <>
    <ScrollSectionLayout
      sectionRef={sectionRefs[0]}
      setSelectedSection={setSelectedSection}
      selectedSection={selectedSection}
    >
      <General
        errors={errors}
        setErrors={setErrors}
        currentStoreData={currentStoreData}
        customer={customer}
        setCurrentStoreData={setCurrentStoreData}
        selectOptions={selectOptions}
      />
    </ScrollSectionLayout>

    <ScrollSectionLayout
      sectionRef={sectionRefs[1]}
      setSelectedSection={setSelectedSection}
      selectedSection={selectedSection}
    >
      <Design
        resourceLabel={resourceLabel}
        currentStoreResources={currentStoreResources}
        setCurrentStoreResources={setCurrentStoreResources}
        selectOptions={selectOptions}
        currentStoreData={currentStoreData}
        setCurrentStoreData={setCurrentStoreData}
      />
    </ScrollSectionLayout>

    <ScrollSectionLayout
      sectionRef={sectionRefs[2]}
      setSelectedSection={setSelectedSection}
      selectedSection={selectedSection}
    >
      <Payment
        customer={customer}
        errors={errors}
        handleSetErrors={setErrors}
        isRankingOpen={isRankingOpen}
        setIsRankingOpen={setIsRankingOpen}
        selectOptions={selectOptions}
        currentStoreData={currentStoreData}
        setCurrentStoreData={setCurrentStoreData}
      />
    </ScrollSectionLayout>

    <ScrollSectionLayout
      sectionRef={sectionRefs[3]}
      setSelectedSection={setSelectedSection}
      selectedSection={selectedSection}
    >
      <LocalizedContent
        errors={localizedErrors}
        setErrors={setLocalizedErrors}
        isVertical
        setLocalizedData={(newValue) => {
          setCurrentStoreData((c) => ({
            ...c,
            thankYouDesc: newValue,
          }));
        }}
        localizedErrors={localizedErrors}
        setLocalizedErrors={setLocalizedErrors}
        defaultLocale={currentStoreData.defaultLocale}
        localizedData={currentStoreData.thankYouDesc}
      />
    </ScrollSectionLayout>
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
  customer: PropTypes.object,
  sectionRefs: PropTypes.array,
  setSelectedSection: PropTypes.func,
  selectedSection: PropTypes.string,
};

export default StoreDetailsView;
