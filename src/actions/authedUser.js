export const SET_USER = 'SET_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export default function setUser(user) {
  return {
    type: SET_USER,
    user,
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
  };
}
