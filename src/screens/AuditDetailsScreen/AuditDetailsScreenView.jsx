import React from 'react';
import PropTypes from 'prop-types';
import General from './SubSections/General';
import Details from './SubSections/Details';
import Delta from './SubSections/Delta';
import SectionLayout from '../../components/SectionLayout';

const AuditDetailsScreenView = ({
  audit,
  details,
  curTab,
}) => (
  <>
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

AuditDetailsScreenView.propTypes = {
  audit: PropTypes.object,
  details: PropTypes.object,
  curTab: PropTypes.bool,
};

export default AuditDetailsScreenView;
