import { SET_TIP } from '../actions/deliveryTip';

export default function deliveryTip(state = 3, action) {
  switch (action.type) {
    case SET_TIP:
      state = action.tip;
      return state;
    default:
      return state;
  }
}
