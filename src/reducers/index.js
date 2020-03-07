import { combineReducers } from 'redux';
import products from './products';
import orders from './orders';
import customerAddress from './customer';

const appReducer = combineReducers({
  products,
  orders,
  customerAddress,
});

export default appReducer;
