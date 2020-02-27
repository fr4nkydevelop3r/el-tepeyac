import { omit } from 'lodash';

import {
  RECEIVE_PRODUCTS,
  INCREMENT_PRODUCT,
  DECREMENT_PRODUCT,
  DELETE_PRODUCT,
  RESTART_PRODUCTS,
} from '../actions/products';

export default function products(state = {}, action) {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return {
        ...state,
        ...action.products,
      };
    case INCREMENT_PRODUCT:
      return {
        ...state,
        [action.idProduct]: {
          ...state[action.idProduct],
          totalOrdered: state[action.idProduct].totalOrdered + 1,
        },
      };
    case DECREMENT_PRODUCT:
      return {
        ...state,
        [action.idProduct]: {
          ...state[action.idProduct],
          totalOrdered: state[action.idProduct].totalOrdered - 1,
        },
      };
    case DELETE_PRODUCT:
      return omit(state, action.idProduct);
    case RESTART_PRODUCTS:
      return null;

    default:
      return state;
  }
}
