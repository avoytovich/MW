import React from 'react';
import PropTypes from 'prop-types';

import SectionLayout from '../../../components/SectionLayout';

import General from './SubSections/General';
import Clearances from './SubSections/Clearances';

const RoleDetailView = ({
  curRole,
  curTab,
  setCurRole,
  selectOptions,
}) => (
  <>
    {curTab === 0 && (
      <SectionLayout label='general'>
        <General
          setCurRole={setCurRole}
          curRole={curRole}
        />
      </SectionLayout>
    )}
    {curTab === 1 && (
      <SectionLayout label='clearances'>
        <Clearances
          setCurRole={setCurRole}
          curRole={curRole}
          selectOptions={selectOptions}
        />
      </SectionLayout>
    )}
  </>
);

RoleDetailView.propTypes = {
  curRole: PropTypes.object,
  selectOptions: PropTypes.object,
  setCurRole: PropTypes.func,
  curTab: PropTypes.number,
};

export default RoleDetailView;
