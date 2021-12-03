import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Tabs,
  Tab,
  Box,
} from '@material-ui/core';
import General from './SubSections/General';
import Identification from './SubSections/Identification';
import Permissions from './SubSections/Permissions';
import Emails from './SubSections/Emails';

import SectionLayout from '../../components/SectionLayout';
import './identityDetailsScreen.scss';

const IdentityDetailsView = ({
  id,
  curIdentity,
  identityType,
  setIdentityType,
  setCurIdentity,
  addSecretKey,
  removeSecretKey,
  selectOptions,
}) => {
  const [curTab, setCurTab] = useState(0);
  return (
    <div className='identity-details-screen'>
      <Box my={2} position='sticky' top='90px' bgcolor='#fff' zIndex='2'>
        <Tabs
          data-test='tabs'
          value={curTab}
          onChange={(e, newTab) => setCurTab(newTab)}
          indicatorColor='primary'
          textColor='primary'
        >
          <Tab label='General' />
          <Tab label='Identification' />
          <Tab label='Permissions' disabled={id === 'add'} />
          <Tab label='Emails' disabled={id === 'add'} />
        </Tabs>
      </Box>

      {curTab === 0 && curIdentity && (
        <SectionLayout label='general'>
          <General
            identityType={identityType}
            setIdentityType={setIdentityType}
            curIdentity={curIdentity}
            setCurIdentity={setCurIdentity}
          />
        </SectionLayout>
      )}
      {curTab === 1 && curIdentity && (
        <SectionLayout label='identification'>
          <Identification
            addSecretKey={addSecretKey}
            identityType={identityType}
            curIdentity={curIdentity}
            setCurIdentity={setCurIdentity}
            removeSecretKey={removeSecretKey}
          />
        </SectionLayout>
      )}
      {curTab === 2 && curIdentity && (
        <SectionLayout label='permissions'>
          <Permissions
            curIdentity={curIdentity}
            setCurIdentity={setCurIdentity}
            selectOptions={selectOptions}
          />
        </SectionLayout>
      )}
      {curTab === 3 && curIdentity && (
        <SectionLayout label='emails'>
          <Emails curIdentity={curIdentity} />
        </SectionLayout>
      )}
    </div>
  );
};
IdentityDetailsView.propTypes = {
  id: PropTypes.string,
  curIdentity: PropTypes.object,
  identityType: PropTypes.string,
  setIdentityType: PropTypes.func,
  setCurIdentity: PropTypes.func,
  addSecretKey: PropTypes.func,
  removeSecretKey: PropTypes.func,
  selectOptions: PropTypes.object,
};
export default IdentityDetailsView;
