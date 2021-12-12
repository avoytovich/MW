/* eslint-disable eqeqeq */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState, forwardRef } from 'react';
import PropTypes from 'prop-types';

import { Edit } from '@material-ui/icons';

import {
  Box,
  Tabs,
  Tab,
} from '@material-ui/core';
import JsonEditor from '../../../components/JsonEditor';
import localization from '../../../localization';

const SampleData = ({
  data, saveCustomSample, jsonIsValid, setJsonIsValid, customSample,
}) => {
  const [curSampleData, setCurSampleData] = useState(null);
  const [curTab, setCurTab] = useState(data?.samples?.length ? 0 : 'custom');

  // const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);

  const formateCurSampleData = () => {
    const res = {};
    data?.samples?.length && data?.samples.forEach((smpl, ind) => {
      res[ind] = JSON.stringify(JSON.parse(data.samples[ind] || {}), 0, 4);
    });
    if (data?.mergedSample) {
      res.merged = JSON.stringify(JSON.parse(data?.mergedSample), 0, 4);
    }
    if (data?.lastSeenSample) {
      res.lastSeen = JSON.stringify(JSON.parse(data?.lastSeenSample), 0, 4);
    }
    setCurSampleData({ ...res });
  };

  useEffect(() => {
    formateCurSampleData();
  }, []);

  return (
    <>
      <Box bgcolor='#fff'>
        <Tabs
          data-test='tabs'
          value={curTab}
          indicatorColor='primary'
          textColor='primary'
          variant='scrollable'
          scrollButtons='auto'
          onChange={(event, newValue) => setCurTab(newValue)}
        >
          {
            data?.samples?.length && data?.samples.map((smpl, ind) => <Tab key={`sampleData#${ind + 1}`} label={`${localization.t('labels.sampleData')} #${ind + 1}`} />)
          }
          {data?.mergedSample && <Tab label={localization.t('labels.mergedSample')} value='merged' />}
          {data?.lastSeenSample && <Tab label={localization.t('labels.lastSeenSample')} value='lastSeen' />}
          <Tab
            component={forwardRef(({ ...props }, ref) => (
              <div role='button' {...props} ref={ref}>
                <Edit style={{ marginRight: '5px' }} />
                {localization.t('labels.customSample')}
              </div>
            ))}
            value='custom'
          />
        </Tabs>
      </Box>
      {curSampleData && (
        <Box p={2} pt={4}>
          {Object.keys(curSampleData).map((key) => curTab == key && (
            <JsonEditor
              key={key}
              isReadOnly
              currentData={curSampleData[key]}
            />
          ))}
          {
            curTab === 'custom' && (
              <JsonEditor
                jsonIsValid={jsonIsValid}
                setJsonIsValid={setJsonIsValid}
                jsonKey={null}
                currentData={customSample}
                setCurrentData={saveCustomSample}
              />
            )
          }
        </Box>
      )}
    </>
  );
};

SampleData.propTypes = {
  data: PropTypes.object,
  saveCustomSample: PropTypes.func,
  jsonIsValid: PropTypes.bool,
  setJsonIsValid: PropTypes.func,
  customSample: PropTypes.string,
};

export default SampleData;
