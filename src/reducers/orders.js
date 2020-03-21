import {
  CREATE_ORDER,
  RECEIVE_ORDERS,
  RESTART_ORDERS,
  UPDATE_ORDER,
} from '../actions/orders';

export default function orders(state = {}, action) {
  switch (action.type) {
    case CREATE_ORDER:
      return {
        ...state,
        [action.order.dayOrder]: {
          ...state[action.order.dayOrder],
          [action.order.idOrder]: {
            idOrder: action.order.idOrder,
            timeOrder: action.order.timeOrder,
            orderCompleted: action.order.orderCompleted,
            dishes: action.order.dishes,
            infoCustomer: action.order.infoCustomer,
          },
        },
      };
    case UPDATE_ORDER:
      return {
        ...state,
        [action.order.idOrder]: {
          ...state[action.order.idOrder],
          orderCompleted: !state[action.order.idOrder].orderCompleted,
        },
      };
    case RECEIVE_ORDERS:
      return {
        ...state,
        ...action.orders,
      };
    case RESTART_ORDERS:
      return null;

    default:
      return state;
  }
}
