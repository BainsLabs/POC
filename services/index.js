import axios from "axios";

const api = async (url, params, method = "GET") => {
  const api = await fetch(`http://742fbc1a.ngrok.io${url}`, {
    method,
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json"
    }
  });
  const apiResponse = await api.json();
  return apiResponse;
};

export const faceMatchApi = params => api("/", params, "POST");
