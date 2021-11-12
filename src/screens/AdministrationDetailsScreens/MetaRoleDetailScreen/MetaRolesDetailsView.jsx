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

const MetaRolesDetailsView = ({ curMetaRole, setCurMetaRole, selectOptions }) => {
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
};

MetaRolesDetailsView.propTypes = {
  curMetaRole: PropTypes.object,
  selectOptions: PropTypes.object,
  setCurMetaRole: PropTypes.func,

};
export default MetaRolesDetailsView;
