import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Tabs,
  Tab,
} from '@material-ui/core';
import SectionLayout from '../../../components/SectionLayout';
import localization from '../../../localization';
import General from './SubSections/General';
import Clearances from './SubSections/Clearances';

const RoleDetailView = ({ curRole, setCurRole, selectOptions }) => {
  const [curTab, setCurTab] = useState(0);

  return (
    <>
      <Box my={2} bgcolor="#fff">
        <Tabs
          value={curTab}
          onChange={(e, newTab) => setCurTab(newTab)}
          indicatorColor='primary'
          textColor='primary'
        >
          <Tab label={`${localization.t('labels.general')}`} />
          <Tab label={`${localization.t('labels.clearances')}`} />
        </Tabs>
      </Box>
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
};

RoleDetailView.propTypes = {
  curRole: PropTypes.object,
  selectOptions: PropTypes.object,
  setCurRole: PropTypes.func,

};

export default RoleDetailView;
