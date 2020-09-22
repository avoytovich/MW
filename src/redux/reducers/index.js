import { combineReducers } from 'redux';

import account from './Account';
import httpNotifications from './HttpNotifications';
import products from './Products';
import stores from './Stores';
import orders from './Orders';

const app = combineReducers({
  account,
  httpNotifications,
  products,
  stores,
  orders,
});

export default app;
