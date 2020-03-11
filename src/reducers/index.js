import { combineReducers } from 'redux';
import products from './products';
import orders from './orders';
import customerAddress from './customer';
import authedUser from './authedUser';

const appReducer = combineReducers({
  products,
  orders,
  customerAddress,
  authedUser,
});

export default appReducer;
