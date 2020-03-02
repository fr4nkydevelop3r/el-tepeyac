import addOrder from '../database';

export const CREATE_ORDER = 'CREATE_ORDER';

export default function createOrder(order) {
  return {
    type: CREATE_ORDER,
    order,
  };
}

export function handleCreateOrder(order) {
  return (dispatch) => {
    addOrder(order).then((data) => dispatch(createOrder(data)));
  };
}
