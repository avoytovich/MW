import React from 'react';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

import api from '../../api';
import localization from '../../localization';
import parentPaths from '../../services/paths';
import TableActionsBar from '../../components/TableActionsBar';
import TabTable from '../../components/TabTable';
import { generateData, defaultShow } from '../../services/useData/tableMarkups/adminCustomers';

const tabsData = {
  label: 'customer',
  path: `${parentPaths.customers}`,
  request: api.getCustomers,
  sortKey: 'customerAdmin',
  generateData,
  defaultShow,
  noActions: true,
  noEditDeleteActions: true,
  scope: 'customerslist',
  button: `${localization.t('general.add')} ${localization.t(
    'general.customer',
  )}`,
  headers: null,
};

const CustomersScreen = () => (
  <>
    <TableActionsBar
      scope={tabsData.scope}
      deleteFunc={tabsData.deleteFunc}
      headers={tabsData.headers}
    >
      <Box alignSelf='flex-end'>
        <Button
          id='add-administration-button'
          color='primary'
          size='large'
          variant='contained'
          component={Link}
          to={`${tabsData.path}/add`}
        >
          {tabsData.button}
        </Button>
      </Box>
    </TableActionsBar>

    <TabTable tabObject={tabsData} />
  </>
);
export default CustomersScreen;
