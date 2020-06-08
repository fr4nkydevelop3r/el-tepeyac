export const SET_INSTRUCTIONS = 'SET_INSTRUCTIONS';

export default function setInstructions(instructions) {
  return {
    type: SET_INSTRUCTIONS,
    instructions,
  };
}
