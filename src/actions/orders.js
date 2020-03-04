import addOrder, { getOrders } from '../database';

export const CREATE_ORDER = 'CREATE_ORDER';
export const RECEIVE_ORDERS = 'RECEIVE_ORDERS';

export default function createOrder(order) {
  return {
    type: CREATE_ORDER,
    order,
  };
}

export function receiveOrders(orders) {
  return {
    type: RECEIVE_ORDERS,
    orders,
  };
}

export function handleCreateOrder(order) {
  return (dispatch) => {
    addOrder(order).then((data) => dispatch(createOrder(data)));
  };
}

export function handleReceiveOrders() {
  return (dispatch) => {
    getOrders();
  };
}
