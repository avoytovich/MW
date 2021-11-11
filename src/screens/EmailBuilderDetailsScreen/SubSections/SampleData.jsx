/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactJson from 'react-json-view';

import {
  Box,
  Tabs,
  Tab,
} from '@material-ui/core';

import localization from '../../../localization';

const SampleData = ({ data }) => {
  const [curSampleData, setCurSampleData] = useState(null);
  const [curTab, setCurTab] = useState(data?.samples?.length ? 0 : 'merged');

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

          <Tab label={localization.t('labels.mergedSample')} value='merged' />
          <Tab label={localization.t('labels.lastSeenSample')} value='lastSeen' />
        </Tabs>
      </Box>

      <Box p={2} pt={4}>
        <ReactJson
          src={curSampleData || {}}
          name={false}
          displayDataTypes={false}
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
};

export default SampleData;
