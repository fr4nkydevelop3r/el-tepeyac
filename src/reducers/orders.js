import { CREATE_ORDER } from '../actions/orders';

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
    default:
      return state;
  }
}
