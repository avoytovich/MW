// ToDo: consider making a common layout for such type of settings screens
import React from 'react';
import { useParams } from 'react-router-dom';

import DetailPageWrapper from '../../components/utils/DetailPageWrapper';
import api from '../../api';
import useOnboardingDetails from '../../services/useData/useOnboardingDetails';
import parentPaths from '../../services/paths';
import OnboardingDetailsView from './OnboardingDetailsView';

const OnboardingDetailsScreen = () => {
  const { id } = useParams();

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
    >
      <OnboardingDetailsView
        customer={customer}
        curOnboarding={curOnboarding}
        setCurOnboarding={setCurOnboarding}
        onboarding={onboarding}
      />
    </DetailPageWrapper>
  );
};

export default OnboardingDetailsScreen;
