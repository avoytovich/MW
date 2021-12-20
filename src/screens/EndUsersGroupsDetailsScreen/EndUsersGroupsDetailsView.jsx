import React from 'react';
import PropTypes from 'prop-types';

import SectionLayout from '../../components/SectionLayout';

import General from './SubSections/General';
import LocalizedContent from './SubSections/LocalizedContent';

import './endUsersGroupsDetailsScreen.scss';

const EndUsersGroupsDetailsView = ({
  curData,
  setCurData,
  selectedLang,
  setSelectedLang,
  curTab,
}) => (
  <>
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
  </>
);

EndUsersGroupsDetailsView.propTypes = {
  curData: PropTypes.object,
  setCurData: PropTypes.func,
  selectedLang: PropTypes.number,
  setSelectedLang: PropTypes.func,
  curTab: PropTypes.bool,
};
export default EndUsersGroupsDetailsView;
