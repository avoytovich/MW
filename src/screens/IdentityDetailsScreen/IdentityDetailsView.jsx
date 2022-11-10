/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

import General from './SubSections/General';
import Identification from './SubSections/Identification';
import Permissions from './SubSections/Permissions';
import Emails from './SubSections/Emails';
import ScrollSectionLayout from '../../components/SectionLayout/ScrollSectionLayout';
import './identityDetailsScreen.scss';
import localization from '../../localization';

const IdentityDetailsView = ({
  curIdentity,
  identityType,
  setIdentityType,
  setCurIdentity,
  addSecretKey,
  removeSecretKey,
  selectOptions,
  sectionRefs,
  setSelectedSection,
  selectedSection,
}) => (
  <>
    <ScrollSectionLayout
      sectionRef={sectionRefs[0]}
      setSelectedSection={setSelectedSection}
      selectedSection={selectedSection}
    >
      <General
        identityType={identityType}
        setIdentityType={setIdentityType}
        curIdentity={curIdentity}
        setCurIdentity={setCurIdentity}
      />
    </ScrollSectionLayout>
    <ScrollSectionLayout
      sectionRef={sectionRefs[1]}
      setSelectedSection={setSelectedSection}
      selectedSection={selectedSection}
    >
      <Identification
        addSecretKey={addSecretKey}
        identityType={identityType}
        curIdentity={curIdentity}
        setCurIdentity={setCurIdentity}
        removeSecretKey={removeSecretKey}
      />
    </ScrollSectionLayout>
    <ScrollSectionLayout
      sectionRef={sectionRefs[2]}
      setSelectedSection={setSelectedSection}
      selectedSection={selectedSection}
    >
      <Permissions
        curIdentity={curIdentity}
        setCurIdentity={setCurIdentity}
        selectOptions={selectOptions}
      />
    </ScrollSectionLayout>
    <Box
      onMouseOver={() => {
        if (selectedSection !== sectionRefs[3].section) {
          setSelectedSection(sectionRefs[3].section);
        }
      }}
      mb={3}
      bgcolor='#fff'
      boxShadow={2}
      height='100%'
      id="EmailsRef"
      ref={sectionRefs[3].ref}
    >
      <Box p={4}>
        <Typography gutterBottom variant='h4'>
          {localization.t(`labels.${sectionRefs[3].section}`)}
        </Typography>
      </Box>
      <Emails curIdentity={curIdentity} />
    </Box>

  </>

);

IdentityDetailsView.propTypes = {
  curIdentity: PropTypes.object,
  identityType: PropTypes.string,
  setIdentityType: PropTypes.func,
  setCurIdentity: PropTypes.func,
  addSecretKey: PropTypes.func,
  removeSecretKey: PropTypes.func,
  selectOptions: PropTypes.object,
  sectionRefs: PropTypes.array,
  setSelectedSection: PropTypes.func,
  selectedSection: PropTypes.string,
};
export default IdentityDetailsView;
