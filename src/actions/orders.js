import addOrder, { incrementTotalOrders, updateOrder } from '../database';

export const CREATE_ORDER = 'CREATE_ORDER';
export const RECEIVE_ORDERS = 'RECEIVE_ORDERS';
export const INCREMENT_TOTAL_ORDER = 'INCREMENT_TOTAL_ORDER';
export const RESTART_ORDERS = 'RESTART_ORDERS';
export const UPDATE_ORDER = 'UPDATE_ORDER';
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

export function restartOrders() {
  return {
    type: RESTART_ORDERS,
  };
}

export function updateCompletedOrder(order) {
  return {
    type: UPDATE_ORDER,
    order,
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
  //COMENZAR A DEBUGGEAR AQUI
  return (dispatch) => {
    return addOrder(order)
      .then((data) => {
        dispatch(createOrder(data));
        incrementTotalOrders()
          .then(() => dispatch(incrementOrdersToday()))
          .catch((error) => {
            console.error('No se pudo actualizar!: ', error);
          });
        return data;
      })
      .catch((error) => console.log(error));
  };
}

export function handleUpdateOrder(idOrder) {
  return (dispatch) => {
    return updateOrder(idOrder)
      .then((order) => dispatch(updateCompletedOrder(order)))
      .catch((error) => console.log(error));
  };
}
