// ToDo: consider making a common layout for such type of settings screens
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import DetailPageWrapper from '../../components/utils/DetailPageWrapper';
import api from '../../api';
import useOnboardingDetails from '../../services/useData/useOnboardingDetails';
import parentPaths from '../../services/paths';
import OnboardingDetailsView from './OnboardingDetailsView';
import { tabLabels } from './utils';

const OnboardingDetailsScreen = () => {
  const { id } = useParams();
  const [curTab, setCurTab] = useState(0);

  const {
    isLoading,
    onboarding,
    curOnboarding,
    customer,
    hasChanges,
    setCurOnboarding,
    setUpdate,
  } = useOnboardingDetails(id);

  return (
    <DetailPageWrapper
      nxStateNotNeeded
      id={id}
      name={onboarding?.companyName}
      saveIsDisabled={!curOnboarding?.companyName}
      hasChanges={hasChanges}
      isLoading={isLoading}
      curParentPath={parentPaths.onboarding}
      curData={curOnboarding}
      updateFunc={api.updateOnboardingById}
      setUpdate={setUpdate}
      tabs={{
        curTab,
        setCurTab,
        tabLabels,
      }}
    >
      <OnboardingDetailsView
        customer={customer}
        curOnboarding={curOnboarding}
        setCurOnboarding={setCurOnboarding}
        onboarding={onboarding}
        curTab={curTab}
      />
    </DetailPageWrapper>
  );
};

export default OnboardingDetailsScreen;
