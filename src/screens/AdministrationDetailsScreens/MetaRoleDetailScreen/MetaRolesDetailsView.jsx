import React from 'react';
import PropTypes from 'prop-types';

import SectionLayout from '../../../components/SectionLayout';

import General from './SubSections/General';
import Clearances from './SubSections/Clearances';

const MetaRolesDetailsView = ({
  curMetaRole,
  setCurMetaRole,
  selectOptions,
  curTab,
}) => (
  <>
    {curTab === 0 && (
      <SectionLayout label='general'>
        <General
          setCurMetaRole={setCurMetaRole}
          curMetaRole={curMetaRole}
        />
      </SectionLayout>
    )}
    {curTab === 1 && (
      <SectionLayout label='clearances'>
        <Clearances
          setCurMetaRole={setCurMetaRole}
          curMetaRole={curMetaRole}
          selectOptions={selectOptions}
        />
      </SectionLayout>
    )}
  </>
);

MetaRolesDetailsView.propTypes = {
  curMetaRole: PropTypes.object,
  selectOptions: PropTypes.object,
  setCurMetaRole: PropTypes.func,
  curTab: PropTypes.number,
};
export default MetaRolesDetailsView;
