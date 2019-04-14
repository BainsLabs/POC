import * as facceRecog from "../actiontypes/faceRecognition";

const intialState = {};

export default (state = intialState, { type, payload }) => {
  switch (type) {
    case facceRecog.FACE_MATCH:
      return {
        employee: { ...state, ...payload }
      };
    case facceRecog.SET_EMAIL:
      return {
        email: payload
      };
    case facceRecog.SET_BASE64:
      return {
        base64: payload
      };
    default:
      return state;
  }
};
