import * as faceRecog from "../actiontypes/faceRecognition";
import { faceMatchApi } from "../../services";

export const faceMatch = params => async dispatch => {
  console.log(params, "testing");
  const response = await faceMatchApi(params);
  dispatch({
    type: faceRecog.FACE_MATCH,
    payload: response.data
  });
};

export const setEmail = email => async dispatch => {
  dispatch({
    type: faceRecog.SET_EMAIL,
    payload: email
  });
};

export const setBase64 = base64 => async dispatch => {
  dispatch({
    type: faceRecog.SET_BASE64,
    payload: base64
  });
};
