import React, { useState } from 'react';
import {
  Tabs, Tab,
} from '@mui/material';
import { useDispatch } from 'react-redux';

import api from '../../api';
import localization from '../../localization';

import {
  generateData, defaultShow, secondaryRequest, markUp,
} from './utils';
import { setCurrentPage } from '../../redux/actions/TableData';
import TableActionsBar from '../../components/TableActionsBar';
import TabTable from '../../components/TabTable';

const tabsData = [
  {
    label: 'pendingApprovals',
    request: api.getResellers,
    sortKey: 'resellers',
    generateData,
    defaultShow,
    noActions: false,
    scope: 'resellers',
    headers: markUp.headers,
    additionalParams: { type: 'RESELLER_NOT_APPROVED' },
    secondaryRequest,
  },
  {
    label: 'approved',
    request: api.getResellers,
    sortKey: 'resellers',
    generateData,
    defaultShow,
    noActions: false,
    scope: 'resellers',
    headers: markUp.headers,
    additionalParams: { type: 'RESELLER' },
    secondaryRequest,
  },
  {
    label: 'declined',
    request: api.getResellers,
    sortKey: 'resellers',
    generateData,
    defaultShow,
    noActions: false,
    scope: 'resellers',
    headers: markUp.headers,
    additionalParams: { type: 'RESELLER_DECLINED' },
    secondaryRequest,
  },
];

const ResellerScreen = () => {
  const [curTab, setCurTab] = useState(0);
  const dispatch = useDispatch();

  return (
    <>
      <TableActionsBar
        scope={tabsData[curTab].scope}
        deleteFunc={tabsData[curTab].deleteFunc}
        headers={tabsData[curTab].headers}
      />

      <Tabs
        value={curTab}
        onChange={(e, newTab) => {
          setCurTab(newTab);
          dispatch(setCurrentPage(1));
        }}
        indicatorColor='primary'
        textColor='primary'
        sx={{ marginBottom: '20px' }}
      >
        <Tab label={`${localization.t('labels.pendingApprovals')}`} />
        <Tab label={`${localization.t('labels.approved')}`} />
        <Tab label={`${localization.t('labels.declined')}`} />
      </Tabs>

      {curTab === 0 && (<TabTable tabObject={tabsData[curTab]} />)}
      {curTab === 1 && (<TabTable tabObject={tabsData[curTab]} />)}
      {curTab === 2 && (<TabTable tabObject={tabsData[curTab]} />)}
    </>
  );
};
export default ResellerScreen;
