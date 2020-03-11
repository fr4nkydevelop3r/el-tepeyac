import { SET_USER, LOGOUT_USER } from '../actions/authedUser';

export default function authedUser(state = {}, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.user,
      };
    case LOGOUT_USER:
      return null;
    default:
      return state;
  }
}
