import { combineReducers } from 'redux';
import products from './products';
import orders from './orders';

const appReducer = combineReducers({
  products,
  orders,
});

export default appReducer;
