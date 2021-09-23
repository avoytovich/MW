import React, { useState } from 'react';
import {
  Tabs, Tab, Box,
} from '@material-ui/core';
import api from '../../api';
import localization from '../../localization';

import { generateData, defaultShow, secondaryRequest } from './utils';
import TableActionsBar from '../../components/TableActionsBar';
import TabTable from '../../components/TabTable';

const tabsData = [
  {
    label: 'pendingApprovals',
    request: api.getResellers,
    sortKey: 'resellers',
    generateData,
    defaultShow,
    noActions: true,
    scope: 'resellers',
    headers: null,
    additionalParams: { type: 'RESELLER_NOT_APPROVED' },
    secondaryRequest,
  },
  {
    label: 'approved',
    request: api.getResellers,
    sortKey: 'resellers',
    generateData,
    defaultShow,
    noActions: true,
    scope: 'resellers',
    headers: null,
    additionalParams: { type: 'RESELLER' },
    secondaryRequest,
  },
  {
    label: 'declined',
    request: api.getResellers,
    sortKey: 'resellers',
    generateData,
    defaultShow,
    noActions: true,
    scope: 'resellers',
    headers: null,
    additionalParams: { type: 'RESELLER_DECLINED' },
    secondaryRequest,
  },
];

const ResellerScreen = () => {
  const [curTab, setCurTab] = useState(0);

  return (
    <>
      <TableActionsBar
        scope={tabsData[curTab].scope}
        deleteFunc={tabsData[curTab].deleteFunc}
        headers={tabsData[curTab].headers}
      />
      <Tabs
        value={curTab}
        onChange={(e, newTab) => setCurTab(newTab)}
        indicatorColor='primary'
        textColor='primary'
      >
        <Tab label={`${localization.t('labels.pendingApprovals')}`} />
        <Tab label={`${localization.t('labels.approved')}`} />
        <Tab label={`${localization.t('labels.declined')}`} />
      </Tabs>
      <Box mt={4} mb={2}>
        {curTab === 0 && (<TabTable tabObject={tabsData[curTab]} />)}
        {curTab === 1 && (<TabTable tabObject={tabsData[curTab]} />)}
        {curTab === 2 && (<TabTable tabObject={tabsData[curTab]} />)}
      </Box>
    </>
  );
};
export default ResellerScreen;
