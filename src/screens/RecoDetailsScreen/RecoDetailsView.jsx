// ToDo: consider making a common layout for such type of settings screens + refactor
import React from 'react';
import PropTypes from 'prop-types';

import Basic from './SubSections/Basic';
import Eligibility from './SubSections/Eligibility';
import Recommendations from './SubSections/Recommendations';
import CappingAndLimits from './SubSections/CappingAndLimits';

import './recoDetailsScreen.scss';

const RecoDetailsView = ({
  curReco,
  curTab,
  setCurReco,
  selectOptions,
  localizedErrors,
  setLocalizedErrors,
  errors,
  setErrors,
}) => {
  const updateReco = (type, value, selections) => {
    let setValue = value;

    if (!curReco[type]) {
      setValue = [value];
    } else if (selections === 'multiple' || selections === 'empty') {
      const curValInd = curReco[type].indexOf(value);
      if (curValInd >= 0) {
        if (curReco[type].length === 1) {
          if (selections === 'multiple') return;
          setValue = [];
        } else {
          const newArr = [...curReco[type]];
          newArr.splice(curValInd, 1);
          setValue = newArr;
        }
      } else {
        setValue = [...curReco[type], value];
      }
    }

    setCurReco((c) => ({ ...c, [type]: setValue }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurReco({ ...curReco, [name]: value });
  };

  return (
    <div className='reco-details-screen'>
      {curTab === 0 && (
        <Basic
          localizedErrors={localizedErrors}
          setLocalizedErrors={setLocalizedErrors}
          curReco={curReco}
          updateReco={updateReco}
          handleChange={handleChange}
          setCurReco={setCurReco}
          errors={errors}
          setErrors={setErrors}
        />
      )}

      {curTab === 1 && (
        <Eligibility
          selectOptions={selectOptions}
          curReco={curReco}
          setCurReco={setCurReco}
        />
      )}

      {curTab === 2 && (
        <CappingAndLimits curReco={curReco} setCurReco={setCurReco} />
      )}

      {curTab === 3 && (
        <Recommendations
          selectOptions={selectOptions}
          curReco={curReco}
          setCurReco={setCurReco}
        />
      )}
    </div>
  );
};
RecoDetailsView.propTypes = {
  setCurReco: PropTypes.func,
  curReco: PropTypes.object,
  selectOptions: PropTypes.object,
  curTab: PropTypes.number,
  localizedErrors: PropTypes.object,
  setLocalizedErrors: PropTypes.func,
  errors: PropTypes.object,
  setErrors: PropTypes.func,
};

export default RecoDetailsView;
