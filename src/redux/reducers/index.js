import { combineReducers } from 'redux';

import account from './Account';
import tableData from './TableData';
import sessionData from './SessionData';
import showColumns from './ShowColumns';

const app = combineReducers({
  account,
  tableData,
  sessionData,
  showColumns,
});

export default app;
