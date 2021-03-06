import { combineReducers } from 'redux';
import products from './products';
import orders from './orders';
import customerAddress from './customer';
import authedUser from './authedUser';
import categories from './categories';
import deliveryTip from './deliveryTip';
import specialInstructions from './specialInstructions';

const appReducer = combineReducers({
  products,
  orders,
  customerAddress,
  authedUser,
  categories,
  deliveryTip,
  specialInstructions,
});

export default appReducer;
