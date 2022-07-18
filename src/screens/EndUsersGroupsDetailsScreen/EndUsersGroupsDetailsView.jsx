import React from 'react';
import PropTypes from 'prop-types';

import SectionLayout from '../../components/SectionLayout';

import General from './SubSections/General';
import LocalizedContent from '../../components/utils/LocalizedContent';
import './endUsersGroupsDetailsScreen.scss';

const EndUsersGroupsDetailsView = ({
  curData,
  setCurData,
  curTab,
  localizedErrors,
  setLocalizedErrors,
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
          isVertical
          localizedData={curData.localizedContent}
          setLocalizedData={(newValue) => setCurData({ ...curData, localizedContent: newValue })}
          defaultLocale={curData.fallbackLocale}
          errors={localizedErrors}
          setErrors={setLocalizedErrors}
        />
      </SectionLayout>
    )}
  </>
);

EndUsersGroupsDetailsView.propTypes = {
  curData: PropTypes.object,
  setCurData: PropTypes.func,
  curTab: PropTypes.number,
  localizedErrors: PropTypes.object,
  setLocalizedErrors: PropTypes.func,
};
export default EndUsersGroupsDetailsView;
