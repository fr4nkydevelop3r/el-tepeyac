export const SET_TIP = 'SET_TIP';

export default function setTip(tip) {
  return {
    type: SET_TIP,
    tip,
  };
}
