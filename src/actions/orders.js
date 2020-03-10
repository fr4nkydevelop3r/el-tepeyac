import addOrder, { getOrders, incrementTotalOrders } from '../database';

export const CREATE_ORDER = 'CREATE_ORDER';
export const RECEIVE_ORDERS = 'RECEIVE_ORDERS';
export const INCREMENT_TOTAL_ORDER = 'INCREMENT_TOTAL_ORDER';
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

export function incrementOrdersToday() {
  return {
    type: INCREMENT_TOTAL_ORDER,
  };
}

export function handleIncrementTotalOrders() {
  return (dispatch) => {
    incrementTotalOrders()
      .then(() => dispatch(incrementOrdersToday()))
      .catch((error) => {
        console.error('No se pudo actualizar!: ', error);
      });
  };
}

export function handleCreateOrder(order) {
  return (dispatch) => {
    addOrder(order).then((data) => {
      dispatch(createOrder(data));
      incrementTotalOrders()
        .then(() => dispatch(incrementOrdersToday()))
        .catch((error) => {
          console.error('No se pudo actualizar!: ', error);
        });
    });
  };
}
