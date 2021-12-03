import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Box, Typography, Tabs, Tab,
} from '@material-ui/core';

import { defaultShow } from '../../services/useData/tableMarkups/LicenseDetails';
import StripedDetailSection from '../../components/StripedDetailSection';
import TableComponent from '../../components/TableComponent';
import { emptyValue } from './utils';

import localization from '../../localization';

const LicenseDetailsView = ({ license, tableData, scope }) => {
  const tabLabels = ['general', 'operationExecutions'];
  const [curTab, setCurTab] = useState(0);

  return (
    <>
      <Box my={2} bgcolor='#fff'>
        <Tabs
          value={curTab}
          indicatorColor='primary'
          textColor='primary'
          onChange={(event, newValue) => {
            setCurTab(newValue);
          }}
          aria-label='disabled tabs example'
        >
          {tabLabels.map((tab) => (
            <Tab key={tab} label={localization.t(`labels.${tab}`)} />
          ))}
        </Tabs>
      </Box>
      {curTab === 0 && (
        <StripedDetailSection
          emptyValue={emptyValue}
          xsValue={12}
          mdValue={4}
          sectionsData={license}
        />
      )}
      {curTab === 1 && (
        <>
          <Box my={2} pt={2} pb={2} width='100%'>
            <Typography variant='h2'>
              {localization.t('labels.operationExecutions')}
            </Typography>
          </Box>
          <TableComponent
            defaultShowColumn={defaultShow}
            tableData={tableData}
            scope={scope}
            noActions
            noTableActionsBar
            noEditDeleteActions
            customPath
          />
        </>
      )}

    </>
  );
};

LicenseDetailsView.propTypes = {
  tableData: PropTypes.object,
  license: PropTypes.object,
  scope: PropTypes.string,
};
export default LicenseDetailsView;
