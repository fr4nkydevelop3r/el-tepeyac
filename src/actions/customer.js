export const SET_DIRECTION = 'SET_DIRECTION';

export default function setDirection(address) {
  return {
    type: SET_DIRECTION,
    address,
  };
}
