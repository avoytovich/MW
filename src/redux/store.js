import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';

export default createStore(reducer, applyMiddleware(thunkMiddleware));
