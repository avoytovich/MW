import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Box, Tabs, Tab,
} from '@material-ui/core';

import localization from '../../localization';
import SectionLayout from '../../components/SectionLayout';

import General from './SubSections/General';
import LocalizedContent from './SubSections/LocalizedContent';

import './endUsersGroupsDetailsScreen.scss';

const EndUsersGroupsDetailsView = ({
  curData,
  setCurData,
  selectedLang,
  setSelectedLang,
}) => {
  const [curTab, setCurTab] = useState(0);

  return (
    <>
      <Box my={2} bgcolor='#fff' position='sticky' top='90px' zIndex='2'>
        <Tabs
          value={curTab}
          indicatorColor='primary'
          textColor='primary'
          onChange={(e, tab) => setCurTab(tab)}
        >
          <Tab label={localization.t('labels.general')} value={0} />
          <Tab label={localization.t('labels.localizedContent')} value={1} />
        </Tabs>
      </Box>

      <Box display='flex'>
        {curTab === 0 && (
          <SectionLayout label='general'>
            <General data={curData} setData={setCurData} />
          </SectionLayout>
        )}

        {curTab === 1 && (
          <SectionLayout label='localizedContent'>
            <LocalizedContent
              data={curData}
              setData={setCurData}
              selectedLang={selectedLang}
              setSelectedLang={setSelectedLang}
            />
          </SectionLayout>
        )}
      </Box>
    </>
  );
};
EndUsersGroupsDetailsView.propTypes = {
  curData: PropTypes.object,
  setCurData: PropTypes.func,
  selectedLang: PropTypes.number,
  setSelectedLang: PropTypes.func,
};
export default EndUsersGroupsDetailsView;
