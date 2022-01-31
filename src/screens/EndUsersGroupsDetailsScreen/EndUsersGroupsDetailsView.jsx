import React from 'react';
import PropTypes from 'prop-types';

import SectionLayout from '../../components/SectionLayout';

import General from './SubSections/General';
import LocalizedContent from './SubSections/LocalizedContent';

import './endUsersGroupsDetailsScreen.scss';

const EndUsersGroupsDetailsView = ({
  curData,
  setCurData,
  curTab,
  errors,
  setErrors,
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
          currentData={curData.localizedContent}
          handleSaveLocale={(newValue) => setCurData({ ...curData, localizedContent: newValue })}
          defaultLocale={curData.fallbackLocale}
          errors={errors}
          setErrors={setErrors}
        />
      </SectionLayout>
    )}
  </>
);

EndUsersGroupsDetailsView.propTypes = {
  curData: PropTypes.object,
  setCurData: PropTypes.func,
  curTab: PropTypes.number,
  errors: PropTypes.object,
  setErrors: PropTypes.func,
};
export default EndUsersGroupsDetailsView;
