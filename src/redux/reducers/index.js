import { combineReducers } from 'redux';

import account from './Account';
import tableData from './TableData';
import sessionData from './SessionData';
import tempData from './TempData';
import showColumns from './ShowColumns';

const app = combineReducers({
  account,
  tableData,
  sessionData,
  showColumns,
  tempData,
});

export default app;
