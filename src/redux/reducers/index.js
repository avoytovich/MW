import { combineReducers } from 'redux';

import account from './Account';
import httpNotifications from './HttpNotifications';
import tableData from './TableData';
import sessionData from './SessionData';
import showColumns from './ShowColumns';

const app = combineReducers({
  account,
  httpNotifications,
  tableData,
  sessionData,
  showColumns,
});

export default app;
