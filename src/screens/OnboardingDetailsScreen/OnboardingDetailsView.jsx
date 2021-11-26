// ToDo: consider making a common layout for such type of settings screens
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Tabs,
  Tab,
} from '@material-ui/core';

import { tabLabels } from './utils';
import General from './SubSections/General';
import Features from './SubSections/Features';
import OnboardingSection from './OnboardingSection';
import localization from '../../localization';

import './onboardingDetailsScreen.scss';

const OnboardingDetailsView = ({
  customer, curOnboarding, setCurOnboarding, onboarding,
}) => {
  const [curTab, setCurTab] = useState(0);

  return (
    <>
      <Box my={2} bgcolor='#fff'>
        <Tabs
          data-test='tabs'
          value={curTab}
          indicatorColor='primary'
          textColor='primary'
          onChange={(event, newValue) => {
            setCurTab(newValue);
          }}
        >
          <Tab label={localization.t(`labels.${tabLabels[0]}`)} />
          <Tab label={localization.t(`labels.${tabLabels[1]}`)} />
        </Tabs>
      </Box>
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
};
OnboardingDetailsView.propTypes = {
  customer: PropTypes.object,
  setCurOnboarding: PropTypes.func,
  curOnboarding: PropTypes.object,
  onboarding: PropTypes.object,
};

export default OnboardingDetailsView;
