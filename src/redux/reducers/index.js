import { combineReducers } from 'redux';

import account from './Account';
import httpNotifications from './HttpNotifications';
import tableData from './TableData';

const app = combineReducers({
  account,
  httpNotifications,
  tableData,
});

export default app;
