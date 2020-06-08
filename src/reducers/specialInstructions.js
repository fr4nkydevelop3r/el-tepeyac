import { SET_INSTRUCTIONS } from '../actions/specialInstructions';

export default function specialInstructions(state = '', action) {
  switch (action.type) {
    case SET_INSTRUCTIONS:
      state = action.instructions;
      return state;
    default:
      return state;
  }
}
