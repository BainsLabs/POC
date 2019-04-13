import * as facceRecog from "../actiontypes/faceRecognition";

const intialState = {};

export default (state = intialState, action) => {
  switch (action.type) {
    case facceRecog.FACE_MATCH:
      return {
        employee: { ...state, ...action.payload }
      };
    case facceRecog.SET_EMAIL:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};
