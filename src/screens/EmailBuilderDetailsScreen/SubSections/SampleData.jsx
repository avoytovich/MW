/* eslint-disable eqeqeq */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState, forwardRef } from 'react';
import PropTypes from 'prop-types';

import { Edit } from '@mui/icons-material';

import {
  Box,
  Tabs,
  Tab,
  LinearProgress,
} from '@mui/material';
import JsonEditor from '../../../components/JsonEditor';
import SelectCustom from '../../../components/Inputs/SelectCustom';
import localization from '../../../localization';

const SampleData = ({
  data,
  saveCustomSample,
  jsonIsValid,
  setJsonIsValid,
  customSample,
  curRefCustomer,
  setCurRefCustomer,
  curSelectedSample,
  setCurSelectedSample,
  refCustomers,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [curSampleData, setCurSampleData] = useState(null);
  const [curTab, setCurTab] = useState(curSelectedSample || (data?.samples?.length ? 0 : 'custom'));

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

    const newTab = data?.samples?.length ? 0 : 'custom';

    if (!curSelectedSample && curTab !== newTab) {
      setCurTab(newTab);
      setCurSelectedSample(newTab);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    formateCurSampleData();
  }, [data]);

  if (isLoading) return <LinearProgress />;

  return (
    <>
      <Box pb={1} pt={4} width='300px'>
        <SelectCustom
          optionKeyName='name'
          label='customer'
          onChangeSelect={
            (e) => {
              setCurRefCustomer(refCustomers.filter((c) => c.id === e.target.value)[0]);
              setIsLoading(true);
            }
          }
          selectOptions={
            refCustomers
              .filter((c) => !!c.name)
              .sort((a, b) => ((a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)))
            || []
          }
          value={curRefCustomer?.id}
        />
      </Box>

      <Box bgcolor='#fff'>
        <Tabs
          data-test='tabs'
          value={curTab}
          indicatorColor='primary'
          textColor='primary'
          variant='scrollable'
          scrollButtons
          onChange={(event, newValue) => {
            setCurTab(newValue);
            setCurSelectedSample(newValue);
          }}
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
              cursorPage={`email-builder-${data?.id}-${curTab}`}
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
  refCustomers: PropTypes.array,
  curRefCustomer: PropTypes.object,
  setCurRefCustomer: PropTypes.func,
  curSelectedSample: PropTypes.any,
  setCurSelectedSample: PropTypes.func,
};

export default SampleData;
