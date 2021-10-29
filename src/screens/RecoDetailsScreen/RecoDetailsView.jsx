// ToDo: consider making a common layout for such type of settings screens + refactor
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Tabs,
  Tab,
  Box,
} from '@material-ui/core';
import Basic from './SubSections/Basic';
import Eligibility from './SubSections/Eligibility';
import Recommendations from './SubSections/Recommendations';
import CappingAndLimits from './SubSections/CappingAndLimits';

import './recoDetailsScreen.scss';

const RecoDetailsView = ({ curReco, setCurReco, selectOptions }) => {
  const [curTab, setCurTab] = useState(0);
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
    e.persist();
    const { name, value } = e.target;
    setCurReco({ ...curReco, [name]: value });
  };

  return (
    <div className='reco-details-screen'>
      <Box my={1} bgcolor='#fff'>
        <Tabs
          value={curTab}
          indicatorColor='primary'
          textColor='primary'
          onChange={(e, newTab) => setCurTab(newTab)}
        >
          <Tab label='General' />
          <Tab label='Eligibility' />
          <Tab label='Capping and limits' />
          <Tab label='Recommendations' disabled={!selectOptions.recoByParent} />
        </Tabs>
      </Box>
      <Box pt={1}>
        {curTab === 0 && (
          <Basic
            curReco={curReco}
            updateReco={updateReco}
            handleChange={handleChange}
            setCurReco={setCurReco}
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
      </Box>
    </div>
  );
};
RecoDetailsView.propTypes = {
  setCurReco: PropTypes.func,
  curReco: PropTypes.object,
  selectOptions: PropTypes.object,
};

export default RecoDetailsView;
