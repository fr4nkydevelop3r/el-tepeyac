import { SET_DIRECTION } from '../actions/customer';

export default function customerAddress(state = '', action) {
  console.log(action);
  switch (action.type) {
    case SET_DIRECTION:
      return action.address;
    default:
      return state;
  }
}
