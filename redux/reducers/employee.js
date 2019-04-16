import * as facceRecog from "../actiontypes/faceRecognition";

const intialState = {};

export default (state = intialState, { type, payload }) => {
  switch (type) {
    case facceRecog.FACE_MATCH:
      return {
        employee: { ...state, ...payload }
      };
    case facceRecog.SET_BASE64:
      return {
        ...state,
        base64: payload
      };
    case facceRecog.SET_EMAIL:
      return {
        ...state,
        email: payload
      };
    case facceRecog.EMPLOYEE_PROFILE:
      return {
        profile: { ...state, ...payload }
      };
    default:
      return state;
  }
};
