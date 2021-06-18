import { combineReducers } from 'redux';

import account from './Account';
import httpNotifications from './HttpNotifications';
import tableData from './TableData';
import sessionData from './SessionData';

const app = combineReducers({
  account,
  httpNotifications,
  tableData,
  sessionData,
});

export default app;
