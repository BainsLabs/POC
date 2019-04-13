import * as facceRecog from "../actiontypes/faceRecognition";
import { faceMatchApi } from "../../services";

export const faceMatch = params => async dispatch => {
  console.log(params, "testing");
  const response = await faceMatchApi(params);
  dispatch({
    type: facceRecog.FACE_MATCH,
    payload: response.data
  });
};

export const setEmail = email => async dispatch => {
  dispatch({
    type: facceRecog.SET_EMAIL,
    payload: email
  });
};
