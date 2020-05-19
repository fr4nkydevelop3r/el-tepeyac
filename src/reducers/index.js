import { combineReducers } from 'redux';
import products from './products';
import orders from './orders';
import customerAddress from './customer';
import authedUser from './authedUser';
import categories from './categories';

const appReducer = combineReducers({
  products,
  orders,
  customerAddress,
  authedUser,
  categories,
});

export default appReducer;
