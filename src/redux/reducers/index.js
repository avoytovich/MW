import { combineReducers } from 'redux';

import account from './Account';
import httpNotifications from './HttpNotifications';

const app = combineReducers({
  account,
  httpNotifications,
});

export default app;
