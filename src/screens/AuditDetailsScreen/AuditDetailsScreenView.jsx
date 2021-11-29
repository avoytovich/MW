import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Tabs,
  Tab,
  Box,
} from '@material-ui/core';
import General from './SubSections/General';
import Details from './SubSections/Details';
import Delta from './SubSections/Delta';
import localization from '../../localization';
import SectionLayout from '../../components/SectionLayout';

const AuditDetailsScreenView = ({
  audit,
  details,
}) => {
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
          <Tab label={localization.t('labels.details')} />
          <Tab label={localization.t('labels.delta')} />
        </Tabs>
      </Box>
      {curTab === 0 && (
        <SectionLayout label='general'>
          <General
            audit={audit}
          />
        </SectionLayout>
      )}
      {curTab === 1 && (
        <SectionLayout label='details'>
          <Details
            detailsData={details}
          />
        </SectionLayout>
      )}
      {curTab === 2 && (
        <SectionLayout label='delta'>
          <Delta
            audit={audit}
          />
        </SectionLayout>
      )}
    </>
  );
};

AuditDetailsScreenView.propTypes = {
  audit: PropTypes.object,
  details: PropTypes.object,
};

export default AuditDetailsScreenView;
