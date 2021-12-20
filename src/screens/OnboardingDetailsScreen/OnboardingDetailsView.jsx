// ToDo: consider making a common layout for such type of settings screens
import React from 'react';
import PropTypes from 'prop-types';

import General from './SubSections/General';
import Features from './SubSections/Features';
import OnboardingSection from './OnboardingSection';
import { tabLabels } from './utils';

import './onboardingDetailsScreen.scss';

const OnboardingDetailsView = ({
  customer,
  curTab,
  curOnboarding,
  setCurOnboarding,
  onboarding,
}) => (
  <>
    {curTab === 0 && (
      <OnboardingSection label={tabLabels[curTab]}>
        <General
          id={onboarding.id}
          customer={customer}
          curOnboarding={curOnboarding}
          setCurOnboarding={setCurOnboarding}
          onboarding={onboarding}
        />
      </OnboardingSection>
    )}
    {curTab === 1 && (
      <OnboardingSection label={tabLabels[curTab]}>
        <Features
          curOnboarding={curOnboarding}
          setCurOnboarding={setCurOnboarding}
        />
      </OnboardingSection>
    )}
  </>
);

OnboardingDetailsView.propTypes = {
  customer: PropTypes.object,
  setCurOnboarding: PropTypes.func,
  curOnboarding: PropTypes.object,
  onboarding: PropTypes.object,
  curTab: PropTypes.number,
};

export default OnboardingDetailsView;
