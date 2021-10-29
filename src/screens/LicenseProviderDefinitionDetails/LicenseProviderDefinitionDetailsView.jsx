import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Tabs,
  Tab,
  Box,
} from '@material-ui/core';

import General from './SubSections/General';
import HTTPConfiguration from './SubSections/HTTPConfiguration';
import TestModeHTTPConfiguration from './SubSections/TestModeHTTPConfiguration';
import OperationDetails from './SubSections/OperationDetails';

import localization from '../../localization';
import SectionLayout from '../../components/SectionLayout';

const LicenseProviderDefinitionDetailsView = ({ curLicenseProvider, setCurLicenseProvider }) => {
  const [curTab, setCurTab] = useState(0);

  return (
    <>
      <Box my={2} bgcolor='#fff'>
        <Tabs
          data-test='tabs'
          value={curTab}
          onChange={(e, newTab) => setCurTab(newTab)}
          indicatorColor='primary'
          textColor='primary'
        >
          <Tab label={localization.t('labels.general')} />
          <Tab label={localization.t('labels.operationDetails')} />
          <Tab label={localization.t('labels.httpConfiguration')} />
          <Tab label={localization.t('labels.testModeHTTPConfiguration')} disabled={curLicenseProvider.status !== 'TestMode'} />
        </Tabs>
      </Box>
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
};

LicenseProviderDefinitionDetailsView.propTypes = {
  curLicenseProvider: PropTypes.object,
  setCurLicenseProvider: PropTypes.func,
};
export default LicenseProviderDefinitionDetailsView;
