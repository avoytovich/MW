/* eslint-disable no-nested-ternary */
import React, { useEffect, useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import ReactJson from 'react-json-view';

import { Edit } from '@material-ui/icons';

import {
  Box,
  Tabs,
  Tab,
} from '@material-ui/core';

import localization from '../../../localization';

const SampleData = ({ data, saveCustomSample }) => {
  const [curSampleData, setCurSampleData] = useState(null);
  const [customSampleData, setCustomSampleData] = useState({});
  const [curTab, setCurTab] = useState(data?.samples?.length ? 0 : 'custom');

  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);

  const editSample = (edit) => {
    /* eslint-disable camelcase */
    const { updated_src } = edit;
    setCustomSampleData({ ...updated_src });
    saveCustomSample({ ...updated_src });
  };

  useEffect(() => {
    if (curTab === 'merged') {
      setCurSampleData(data?.mergedSample ? JSON.parse(data.mergedSample) : {});
    } else if (curTab === 'lastSeen') {
      setCurSampleData(data?.lastSeenSample ? JSON.parse(data.lastSeenSample) : {});
    } else {
      setCurSampleData(
        data?.samples && data.samples[curTab] ? JSON.parse(data.samples[curTab]) : {},
      );
    }
  }, [curTab]);

  useEffect(() => {
    setCustomSampleData(nxState?.customSample || {});
  }, [nxState]);

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
            data?.samples?.length && data?.samples.map((smpl, ind) => <Tab label={`${localization.t('labels.sampleData')} #${ind + 1}`} />)
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

      <Box p={2} pt={4}>
        <ReactJson
          src={curTab === 'custom' ? customSampleData : curSampleData || {}}
          name={false}
          displayDataTypes={false}
          onAdd={curTab === 'custom' && editSample}
          onEdit={curTab === 'custom' && editSample}
          onDelete={curTab === 'custom' && editSample}
          defaultValue=''
          sortKeys
          collapsed={1}
          iconStyle='square'
          theme={{
            base00: 'rgba(255, 255, 255, 1)',
            base01: 'rgba(206, 200, 197, 1)',
            base02: 'rgba(71, 145, 219, 1)',
            base03: 'rgba(206, 200, 197, 1)',
            base04: 'rgba(206, 200, 197, 1)',
            base05: 'rgba(71, 145, 219, 1)',
            base06: 'rgba(206, 200, 197, 1)',
            base07: 'rgba(0, 0, 0, 1)',
            base08: 'rgba(71, 145, 219, 1)',
            base09: 'rgba(255, 0, 0, 1)',
            base0A: 'rgba(0, 0, 0, 1)',
            base0B: 'rgba(71, 145, 219, 1)',
            base0C: 'rgba(71, 145, 219, 1)',
            base0D: 'rgba(71, 145, 219, 1)',
            base0E: 'rgba(71, 145, 219, 1)',
            base0F: 'rgba(71, 145, 219, 1)',
          }}
        />
      </Box>
    </>
  );
};

SampleData.propTypes = {
  data: PropTypes.object,
  saveCustomSample: PropTypes.func,
};

export default SampleData;
