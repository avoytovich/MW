import React from 'react';
import PropTypes from 'prop-types';

import General from './SubSections/General';
import HTTPConfiguration from './SubSections/HTTPConfiguration';
import TestModeHTTPConfiguration from './SubSections/TestModeHTTPConfiguration';
import OperationDetails from './SubSections/OperationDetails';

import SectionLayout from '../../components/SectionLayout';

const LicenseProviderDefinitionDetailsView = ({
  curTab,
  curLicenseProvider,
  setCurLicenseProvider,
}) => (
  <>
    {
      curTab === 0 && curLicenseProvider && (
        <SectionLayout label='general'>
          <General
            curLicenseProvider={curLicenseProvider}
            setCurLicenseProvider={setCurLicenseProvider}
          />
        </SectionLayout>
      )
    }
    {
      curTab === 1 && curLicenseProvider && (
        <SectionLayout label='operationDetails'>
          <OperationDetails
            curLicenseProvider={curLicenseProvider}
            setCurLicenseProvider={setCurLicenseProvider}
          />
        </SectionLayout>
      )
    }
    {
      curTab === 2 && curLicenseProvider && (
        <SectionLayout label='httpConfiguration'>
          <HTTPConfiguration
            curLicenseProvider={curLicenseProvider}
            setCurLicenseProvider={setCurLicenseProvider}
          />
        </SectionLayout>
      )
    }
    {
      curTab === 3 && curLicenseProvider && (
        <SectionLayout label='testModeHTTPConfiguration'>
          <TestModeHTTPConfiguration
            curLicenseProvider={curLicenseProvider}
            setCurLicenseProvider={setCurLicenseProvider}
          />
        </SectionLayout>
      )
    }
  </>
);

LicenseProviderDefinitionDetailsView.propTypes = {
  curLicenseProvider: PropTypes.object,
  setCurLicenseProvider: PropTypes.func,
  curTab: PropTypes.bool,
};
export default LicenseProviderDefinitionDetailsView;
